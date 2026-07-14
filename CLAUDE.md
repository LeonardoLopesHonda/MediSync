# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

M0 (project scaffolding) is complete: an empty but running system, wired end to end. `backend/` and `frontend/` skeletons exist with a working health-check round trip; module logic (`intake`, `retrieval`, `triage`, `summary`, `location`) is still unimplemented — see [`docs/MILESTONES.md`](./docs/MILESTONES.md) for what's next (M1).

## Commands

Backend (from `backend/`, Python 3.13, venv at `backend/.venv`):
- Install deps: `python -m venv .venv && .venv/Scripts/pip install -r requirements-dev.txt` (Windows) or `.venv/bin/pip install -r requirements-dev.txt` (macOS/Linux)
- Dev server: `.venv/Scripts/python -m uvicorn app.main:app --reload --port 8000` — health-check at `GET /health`
- Test: `.venv/Scripts/python -m pytest`
- Migrations: `.venv/Scripts/python -m alembic upgrade head` (apply) / `alembic revision -m "..."` (new)

Frontend (from `frontend/`, Node 24):
- Install deps: `npm install`
- Dev server: `npm run dev` — served at `http://localhost:5173`, fetches backend at `VITE_API_BASE_URL` (see `.env.example`, defaults to `http://localhost:8000`)
- Test: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`

Database (from repo root): `docker compose up -d db` — Postgres + `pgvector` on `localhost:5432` (credentials in `docker-compose.yml`), then run backend migrations against it.

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
