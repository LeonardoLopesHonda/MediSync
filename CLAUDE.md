# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository is **pre-implementation**. It currently contains only documentation (`docs/`) and no source code, scaffolding, or build/lint/test tooling. There is nothing to build or run yet. When code is added, this file should be updated with real commands (build/lint/test/dev), and this section should be replaced with an architecture overview grounded in that code.

## Documentation

Full context lives in [`docs/`](./docs) — read these before making product or technical decisions:

- [`docs/PRD.md`](./docs/PRD.md) — requirements (FR/NFR) and assumptions.
- [`docs/GLOSSARY.md`](./docs/GLOSSARY.md) — shared vocabulary.
- [`docs/TECH_STACK.md`](./docs/TECH_STACK.md) — chosen technologies and why.
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — modular monolith structure and request flow.
- [`docs/FEATURES.md`](./docs/FEATURES.md) — feature list mapped to requirements.
- [`docs/STRATEGIES.md`](./docs/STRATEGIES.md) — retrieval, latency, prompting, and failure-handling approaches.
- [`docs/WORKFLOW.md`](./docs/WORKFLOW.md) — the code → test → commit → review development loop; follow it for every change (small module-scoped slices, run `/verify` and `/code-review` before committing/pushing).
- [`docs/MILESTONES.md`](./docs/MILESTONES.md) — sequential iterations toward v1 (M0 scaffolding → M5 deployment). Check current milestone status here before starting new work, and check items off as they land.

## Decided direction (see docs for rationale)

- **Monorepo**, modular monolith backend: `backend/` (FastAPI) + `frontend/` (React/Vite) + `docs/`.
- **Backend**: Python + FastAPI. **Frontend**: React (Vite SPA).
- **Vector store**: Postgres + `pgvector`. **Embeddings**: OpenAI `text-embedding-3-small`.
- **LLM orchestration**: LangChain, calling OpenAI `gpt-4o` for triage and summarization.
- **External APIs**: PubMed/Entrez (literature), Google Maps (geolocation + provider lookup).
- **Deployment**: backend + Postgres on a cloud PaaS (Render/Railway), frontend on Vercel.
- **No auth in v1** — don't add user-account/session scaffolding unless requirements change.

## Key constraints

- The system assumes availability of the PubMed API and `gpt-4o` as external dependencies.
- No anti-abuse/rate-limiting safeguards required in v1.
- Non-functional target: end-to-end response within 5 seconds (NFR-02) — see the latency strategy in `docs/STRATEGIES.md` (concurrent triage + location lookup) before adding sequential external calls.
