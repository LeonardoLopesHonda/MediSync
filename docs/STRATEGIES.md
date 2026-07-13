# Strategies

Cross-cutting approaches that aren't tied to a single feature but shape how the system is built.

## Retrieval (RAG) strategy

- Input is a comma-separated list of symptoms (e.g. `fever, cough, fatigue`), not free-text prose. The `intake` module splits/normalizes this into discrete symptom terms before anything downstream sees it.
- Each discrete symptom term is embedded separately with `text-embedding-3-small` and queried against `pgvector` independently, then results are merged and deduplicated — discrete per-symptom queries retrieve more precise abstracts than embedding the whole list as one blended query.
- Two ingestion modes to consider: pre-ingesting a curated set of common-condition abstracts (fast, predictable latency) vs. fetching live from PubMed/Entrez on cache miss (broader coverage, higher latency). Start with live fetch + cache-by-query, since v1 has no pre-defined symptom taxonomy to pre-ingest against.
- Cache retrieved PubMed results by normalized query to avoid re-fetching/re-embedding identical symptom queries.

## Latency strategy (NFR-02: 5s budget)

- Run the triage/summarization LLM chain and the Google Maps location lookup concurrently (`asyncio`), not sequentially — they don't depend on each other.
- Keep the RAG retrieval step (PubMed fetch + embed + pgvector query) on the critical path before triage, since triage depends on retrieved context; this is the main latency risk and the first place to optimize (e.g. caching) if the budget is missed.
- Prefer a single LangChain call per stage over multi-step agentic loops — agents introduce unpredictable numbers of LLM round-trips, which risks blowing the 5s budget.

## Prompting strategy

- Ground every triage/summary prompt in the retrieved PubMed abstracts explicitly (cite what was retrieved), rather than letting `gpt-4o` answer from parametric knowledge alone — this is the core RAG discipline that keeps outputs traceable to real literature.
- Keep triage and summarization as separate chain steps (not one combined prompt) so each can be tuned/evaluated independently.

## Failure/fallback strategy

- If PubMed is unavailable (PRD assumes it's generally available, but don't assume 100% uptime), degrade to an LLM-only response and flag to the user that it isn't literature-grounded, rather than failing the whole request.
- If Google Maps lookup fails or returns no results, still return the triage + summary — location is additive, not blocking.

## Testing/evaluation strategy

- Once implementation starts, prioritize evaluation of the retrieval step (are the right abstracts being retrieved for a given symptom set) and the triage step (does the recommended specialty match expectations for known symptom sets) — these are the two places where silent quality regressions are most likely and least visible from code review alone.

## Deferred (post-v1) strategies

Not needed for v1 per the PRD's assumptions — revisit only when a real requirement forces it:
- Authentication/session strategy.
- Rate limiting / anti-abuse strategy for anonymous usage.
