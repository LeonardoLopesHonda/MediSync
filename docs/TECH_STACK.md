# Tech Stack

Decisions below are locked in for the MVP. Each includes the "why" so the choice can be revisited deliberately rather than by drift.

## Frontend

- **React (Vite, SPA)** — client-only single-page app. No SSR/SEO needs for this product (it's an authenticated-feeling tool, not content to be indexed), so Vite's simpler dev/build story wins over Next.js.

## Backend

- **Python + FastAPI** — best fit for the AI/retrieval-heavy nature of this system: native access to the OpenAI SDK, LangChain, and PubMed/Entrez client libraries, plus async support for calling multiple external APIs (OpenAI, PubMed, Google Maps) concurrently to hit the 5s NFR-02 budget.

## Data & retrieval

- **Postgres + `pgvector`** — the vector store. Keeps embeddings in the same relational database as everything else (no separate vector service to run/pay for), which is the right tradeoff for an MVP with no auth and unknown scale.
- **OpenAI `text-embedding-3-small`** — embedding model for PubMed abstracts and user queries. Cheap and fast; upgrade to `text-embedding-3-large` only if retrieval quality on medical text proves insufficient.
- **LangChain** — orchestration layer for the RAG pipeline (retrieval → prompt assembly → LLM call) and for the triage/summarization chains. Chosen over hand-rolled orchestration for its retriever/chain abstractions since the pipeline spans multiple steps (retrieve → triage → summarize → locate).

## LLM

- **OpenAI `gpt-4o`** — used for AI-based triage (FR-02, FR-07) and for summarizing causes/treatment/prevention (FR-04).

## External APIs

- **PubMed / NCBI Entrez API** — source of research papers (FR-06).
- **Google Maps API** (Places/Geocoding) — nearby hospital/professional lookup (FR-03) and location detection support (FR-05).

## Deployment

- **Backend + Postgres/pgvector** on a **Cloud PaaS (Render or Railway)** — managed Postgres and simple container deploys without owning infra.
- **Frontend** on **Vercel** — standard static/SPA hosting with fast previews.

This split (PaaS backend + Vercel frontend) is a reasonable default for an MVP with no auth and no heavy scale requirements yet; revisit if traffic or compliance needs (e.g. HIPAA-grade hosting) change.
