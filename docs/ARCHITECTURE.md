# Architecture

## Style: Modular Monolith, Monorepo

The backend is a single deployable FastAPI service, internally split into clearly bounded modules — not a microservices architecture. This keeps the MVP simple to build, test, and deploy while no auth or heavy scale is required yet. Frontend and backend live in the same repository (monorepo) rather than split across repos.

Planned top-level layout:

```
medisync/
├── backend/                # FastAPI modular monolith
│   └── app/
│       ├── intake/         # receives symptoms + optional location
│       ├── retrieval/      # PubMed fetch, embedding, pgvector semantic search (RAG)
│       ├── triage/         # LLM-based specialty recommendation + doctor matching
│       ├── summary/        # causes/treatment/prevention summarization
│       ├── location/       # Google Maps: geolocation + nearby provider lookup
│       └── main.py
├── frontend/                # React (Vite) SPA
├── docs/                    # PRD, glossary, architecture, tech stack, features, strategies
└── CLAUDE.md
```

## Component diagram

```mermaid
flowchart LR
    FE["Frontend (React/Vite SPA)"]

    subgraph BE["Backend (FastAPI, modular monolith)"]
        IN["intake"]
        RET["retrieval"]
        TRI["triage"]
        SUM["summary"]
        LOC["location"]
        ASM["response assembly"]
    end

    PGV[("Postgres + pgvector")]
    PubMed[("PubMed / Entrez API")]
    OpenAI[("OpenAI API\ngpt-4o + text-embedding-3-small")]
    GMaps[("Google Maps API")]

    FE -- "symptoms (comma-separated) + geolocation" --> IN
    IN --> RET
    RET <--> PGV
    RET -- "fetch abstracts" --> PubMed
    RET -- "embed symptom terms" --> OpenAI
    RET --> TRI
    RET --> SUM
    IN --> LOC
    TRI -- "LangChain call" --> OpenAI
    SUM -- "LangChain call" --> OpenAI
    LOC -- "nearby providers" --> GMaps
    TRI --> ASM
    SUM --> ASM
    LOC --> ASM
    ASM --> FE
```

`triage`, `summary`, and `location` all branch off `intake`/`retrieval` and run independently — `response assembly` is where their outputs (and the specialty-based filtering of location results) come back together before the frontend renders anything.

## Request flow

1. **Intake** — user submits symptoms as a comma-separated list (e.g. `fever, cough, fatigue`) via the frontend; the `intake` module parses this into discrete symptom terms. Browser geolocation is captured automatically (FR-05) and sent alongside.
2. **Retrieval (RAG)** — the `retrieval` module embeds each discrete symptom term (`text-embedding-3-small`) and runs semantic search against PubMed abstracts stored in `pgvector` (FR-08), merging/deduplicating results across symptoms. If relevant literature isn't already ingested, it's fetched live from the PubMed/Entrez API (FR-06).
3. **Triage + Summary** — retrieved abstracts + symptoms are passed through a LangChain pipeline to `gpt-4o`, producing (a) a recommended medical specialty (FR-02, FR-07) and (b) a summary of possible causes, treatments, and preventive measures (FR-04).
4. **Location** — in parallel with step 3, the `location` module queries the Google Maps API for nearby hospitals/professionals near the user's location (FR-03).
5. **Response assembly** — the backend combines the triage result and summary with the location results, filtering/sorting the latter by the specialty recommended in step 3, into a single response for the frontend to render.

Steps 3 and 4 are run concurrently (not sequentially) since both depend only on the intake data, not on each other's output — this is the main lever for meeting the 5-second response budget (NFR-02). Specialty-based filtering of location results happens afterward, at assembly time, so it doesn't force step 4 to wait on step 3.

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant IN as intake
    participant RET as retrieval
    participant PGV as Postgres/pgvector
    participant PM as PubMed/Entrez
    participant TRI as triage
    participant SUM as summary
    participant LOC as location
    participant AI as OpenAI (gpt-4o / embeddings)
    participant GM as Google Maps
    participant ASM as response assembly

    FE->>IN: symptoms ("fever, cough, fatigue") + geolocation
    IN->>RET: discrete symptom terms
    RET->>AI: embed each symptom term
    RET->>PGV: semantic search per term
    alt literature not yet ingested
        RET->>PM: fetch abstracts
        PM-->>RET: abstracts
        RET->>PGV: store embeddings
    end
    RET-->>IN: merged, deduplicated abstracts

    par Triage
        IN->>TRI: symptoms + abstracts
        TRI->>AI: LangChain call (gpt-4o)
        AI-->>TRI: recommended specialty
        TRI-->>ASM: specialty
    and Summary
        IN->>SUM: symptoms + abstracts
        SUM->>AI: LangChain call (gpt-4o)
        AI-->>SUM: causes/treatment/prevention
        SUM-->>ASM: summary
    and Location
        IN->>LOC: geolocation
        LOC->>GM: nearby providers query
        GM-->>LOC: hospitals/professionals
        LOC-->>ASM: nearby providers
    end

    ASM->>ASM: filter/sort providers by recommended specialty
    ASM-->>FE: specialty + summary + nearby providers
```

## Why no auth in this architecture

Per the PRD's assumptions, v1 ships without an authentication service and without safeguards against anonymous usage. Requests are stateless — there is no user/session module in the MVP. Don't add one preemptively.
