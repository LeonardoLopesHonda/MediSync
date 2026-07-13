# MediSync

MediSync is an AI-powered healthcare platform that delivers real-time medical insights from user-reported symptoms. It grounds its analysis in real biomedical literature (PubMed), recommends the appropriate medical specialty through AI-based triage, and helps users find nearby hospitals and healthcare professionals — all through a simple, responsive web interface.

## Documentation

Full product and technical context lives in [`docs/`](./docs):

- [PRD](./docs/PRD.md) — requirements, objectives, and assumptions.
- [Glossary](./docs/GLOSSARY.md) — shared vocabulary for the project.
- [Tech Stack](./docs/TECH_STACK.md) — chosen technologies and why.
- [Architecture](./docs/ARCHITECTURE.md) — how the system is structured and how requests flow through it.
- [Features](./docs/FEATURES.md) — feature list mapped to requirements.
- [Strategies](./docs/STRATEGIES.md) — retrieval, latency, prompting, and failure-handling approaches.

## Project structure

Monorepo, modular monolith backend:

```
medisync/
├── backend/     # FastAPI backend (intake, retrieval, triage, summary, location modules)
├── frontend/    # React (Vite) SPA
├── docs/        # PRD and supporting documentation
└── CLAUDE.md    # guidance for Claude Code when working in this repo
```

## Installation

Not yet available — this project is in the planning/pre-implementation stage. Setup instructions will be added here once the initial implementation is complete.
