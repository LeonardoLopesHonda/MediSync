# Development Workflow

A fast, tight loop: **code → test → commit → review**, repeated per small slice of work. The goal is short iterations, not big-bang changes.

## 1. Code

- Scope each loop iteration to one module (`intake`, `retrieval`, `triage`, `summary`, `location` — see [ARCHITECTURE.md](./ARCHITECTURE.md)) or one frontend feature at a time. Touching multiple modules in one iteration slows the loop and makes step 4 harder.
- Prefer the smallest change that makes the next test pass over speculative, broader implementation.

## 2. Test

- Write/run automated tests scoped to the slice just written before moving on:
  - Backend (FastAPI): `pytest`, run against the specific module changed.
  - Frontend (React/Vite): `vitest` + React Testing Library, run against the specific component/feature changed.
- For anything touching an external integration (OpenAI, PubMed/Entrez, Google Maps, pgvector queries) or a user-facing flow, also run the `/verify` skill — it exercises the actual behavior end-to-end rather than relying on tests/typecheck alone, which matters here since these integrations fail silently in ways unit tests miss.
- Once the test runners are scaffolded, add the exact commands (`pytest`, `npm test`, etc.) to the **Commands** section of `CLAUDE.md` — don't leave future instances guessing.

## 3. Commit

- Small, focused commits — one logical change per commit.
- Commit message describes *why*, and references the requirement it serves where relevant, e.g. `feat(retrieval): add pgvector similarity search (FR-08)`.
- Don't bundle unrelated slices into one commit just because they landed in the same session.

## 4. Review

- Before pushing, run `/code-review` on the diff to catch correctness bugs and simplification opportunities while the change is still small and cheap to fix.
- Use `/code-review high` for changes crossing module boundaries or touching the RAG/triage pipeline; the default effort is enough for small, single-module slices.
- Reserve `/code-review ultra` for larger, riskier batches (e.g. end-of-week integration of several slices) — it's a heavier, billed cloud review, not a per-commit step.
- Address findings, then loop back to step 1 for the next slice.

## Branching

Solo/small-team trunk-based development: small commits go directly on `main`, gated by the test + `/code-review` steps above rather than a separate PR review. Move to feature branches + PR review only if/when more contributors join.
