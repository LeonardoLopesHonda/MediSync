# Features

Each feature maps directly to one or more Functional Requirements in the [PRD](./PRD.md).

## Symptom Analysis (FR-01, FR-06)
User enters symptoms as a comma-separated list (e.g. `fever, cough, fatigue`); the system parses them into discrete terms and retrieves relevant medical literature from PubMed to ground its analysis in real research rather than the LLM's unaided knowledge.

## AI Triage (FR-02, FR-07)
Given the symptoms and retrieved literature, the system recommends the appropriate medical specialty and automatically suggests specialized doctors matching that recommendation.

## Nearby Care Finder (FR-03, FR-05)
The user's location is detected automatically (browser geolocation), and the system surfaces nearby hospitals and healthcare professionals via Google Maps, filtered to the recommended specialty where possible.

## Condition Summary (FR-04)
A plain-language summary of possible causes, treatments, and preventive measures, generated from the retrieved literature.

## Semantic Search over Medical Literature (FR-08)
Symptom queries and PubMed abstracts are embedded and compared via vector similarity (`pgvector`), so retrieval is based on meaning rather than exact keyword overlap.

## Responsive, Simple UI (NFR-01)
Single-page React app, designed to be usable without onboarding or training.

## Fast Response (NFR-02)
End-to-end response within 5 seconds under normal conditions, achieved primarily by running triage/summarization and location lookup concurrently (see [ARCHITECTURE.md](./ARCHITECTURE.md)).

---

Features intentionally **out of scope for v1** (per PRD assumptions): authentication/accounts, rate limiting or anti-abuse safeguards. Don't build these speculatively — add them when a real requirement lands.
