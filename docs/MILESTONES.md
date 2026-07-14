# Milestones

Sequential milestones toward the v1 MVP defined in the [PRD](./PRD.md). Each milestone is independently demoable and builds on the previous one — work through them in order, and within each, follow the [code → test → commit → review loop](./WORKFLOW.md) one slice at a time. Check items off as they land; add new milestones as scope evolves rather than overloading an existing one.

## M0 — Project scaffolding
Goal: an empty but running system, monorepo wired end to end.
- [x] `backend/` FastAPI app skeleton with a health-check endpoint.
- [x] `frontend/` React (Vite) app skeleton that calls the health-check endpoint.
- [x] Postgres + `pgvector` running locally (docker-compose) with a minimal schema migration.
- [x] `pytest` and `vitest` wired up and runnable, even with placeholder tests.
- [x] `CLAUDE.md` **Commands** section updated with the real build/lint/test/dev commands.

## M1 — Symptom retrieval (FR-01, FR-06, FR-08)
Goal: given symptom text, return relevant PubMed literature via semantic search.
- [ ] `intake` module: endpoint accepting a comma-separated symptom list (e.g. `fever, cough, fatigue`), parsed into discrete symptom terms.
- [ ] `retrieval` module: PubMed/Entrez fetch for a given symptom term.
- [ ] Embedding pipeline (`text-embedding-3-small`) storing abstracts + vectors in `pgvector`.
- [ ] Semantic search query returning top-N relevant abstracts per symptom term, merged/deduplicated across the input list.
- [ ] Demo: submit symptoms → get back relevant PubMed abstracts.

## M2 — AI triage + condition summary (FR-02, FR-04, FR-07)
Goal: turn retrieved literature into an actionable recommendation.
- [ ] `triage` module: LangChain chain over `gpt-4o` that recommends a medical specialty from symptoms + retrieved abstracts.
- [ ] Doctor-type matching derived from the recommended specialty.
- [ ] `summary` module: chain producing causes/treatment/prevention summary, grounded in retrieved abstracts (per [STRATEGIES.md](./STRATEGIES.md) prompting strategy).
- [ ] Demo: submit symptoms → get specialty recommendation + condition summary.

## M3 — Location-aware provider lookup (FR-03, FR-05)
Goal: connect the triage result to real-world nearby care options.
- [ ] Frontend: automatic browser geolocation capture.
- [ ] `location` module: Google Maps integration for nearby hospitals/professionals.
- [ ] Filter/sort results by the specialty recommended in M2.
- [ ] Demo: full pipeline, symptoms in → specialty + summary + nearby providers out.

## M4 — UX and performance (NFR-01, NFR-02)
Goal: make the full flow feel fast and usable, not just functionally correct.
- [ ] Run triage/summary and location lookup concurrently (per [STRATEGIES.md](./STRATEGIES.md) latency strategy).
- [ ] Loading/error states in the frontend for each stage of the pipeline.
- [ ] Fallback behavior when PubMed or Google Maps is unavailable (per STRATEGIES.md failure strategy).
- [ ] Responsive layout pass.
- [ ] Measure end-to-end latency against the 5s budget (NFR-02) and address the biggest bottleneck if it's missed.

## M5 — Deployment
Goal: MediSync running somewhere real, not just locally.
- [ ] Backend + Postgres/pgvector deployed to Render/Railway.
- [ ] Frontend deployed to Vercel.
- [ ] Environment/secrets configuration documented.
- [ ] Smoke test the full pipeline against the deployed environment.
- [ ] README **Installation** section filled in with real setup steps.

## Deferred (post-v1)
Explicitly out of scope until a real requirement forces them (see PRD assumptions):
- Authentication/accounts.
- Rate limiting / anti-abuse safeguards.
- Pre-ingestion pipeline for common-condition literature (vs. live PubMed fetch).
- Automated retrieval/triage quality evaluation suite.
