# Glossary

| Term | Definition |
|---|---|
| PRD | Product Requirements Document — see [PRD.md](./PRD.md). |
| FR / NFR | Functional Requirement / Non-Functional Requirement, as numbered in the PRD. |
| MVP | Minimum Viable Product — the first shippable version of MediSync, scoped to the PRD's FR-01 through FR-08 with no authentication. |
| Triage | The process of mapping a user's reported symptoms to a recommended medical specialty (FR-02, FR-07). |
| Symptom Intake | The entry point of the system where a user submits symptoms as a comma-separated list (e.g. `fever, cough, fatigue`), and optionally location. |
| RAG (Retrieval-Augmented Generation) | The pattern of retrieving relevant documents (PubMed abstracts) and injecting them into an LLM prompt so responses are grounded in real medical literature instead of the model's unaided memory. |
| Embedding | A numeric vector representation of text, produced by an embedding model, used to measure semantic similarity. |
| Vector Database | A database optimized for storing embeddings and running similarity search over them. MediSync uses Postgres with the `pgvector` extension. |
| Semantic Search | Retrieval based on meaning (embedding similarity) rather than exact keyword match (FR-08). |
| PubMed / Entrez API | NCBI's biomedical literature database and the API used to fetch research papers (FR-06). |
| LLM | Large Language Model. MediSync uses OpenAI `gpt-4o` for triage reasoning and summarization, and `text-embedding-3-small` for embeddings. |
| Modular Monolith | An architecture style where the backend is a single deployable service internally split into clearly bounded modules (see [ARCHITECTURE.md](./ARCHITECTURE.md)). |
| Provider | A hospital or healthcare professional returned by the location lookup (FR-03). |
| Geolocation | Automatic detection of the user's physical location, used to find nearby providers (FR-05). |

Add new terms here as the product vocabulary grows — keep definitions short and link to the doc that goes deeper.
