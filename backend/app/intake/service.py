def parse_symptoms(raw: str) -> list[str]:
    """Split a comma-separated symptom string into discrete, deduplicated terms."""
    seen: set[str] = set()
    terms: list[str] = []
    for part in raw.split(","):
        term = part.strip().lower()
        if term and term not in seen:
            seen.add(term)
            terms.append(term)
    return terms
