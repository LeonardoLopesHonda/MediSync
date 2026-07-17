from xml.etree import ElementTree

import httpx

from app.config import settings
from app.retrieval.schemas import Abstract

ESEARCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
EFETCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"


async def fetch_abstracts(
    client: httpx.AsyncClient, term: str, max_results: int = 5
) -> list[Abstract]:
    """Fetch PubMed abstracts relevant to a single symptom term."""
    pmids = await _search_pmids(client, term, max_results)
    if not pmids:
        return []
    return await _fetch_abstracts_by_id(client, pmids)


def _with_api_key(params: dict[str, str | int]) -> dict[str, str | int]:
    if settings.ncbi_api_key:
        params["api_key"] = settings.ncbi_api_key
    return params


async def _search_pmids(client: httpx.AsyncClient, term: str, max_results: int) -> list[str]:
    params = _with_api_key({"db": "pubmed", "term": term, "retmax": max_results, "retmode": "json"})
    response = await client.get(ESEARCH_URL, params=params)
    response.raise_for_status()
    return response.json()["esearchresult"]["idlist"]


async def _fetch_abstracts_by_id(client: httpx.AsyncClient, pmids: list[str]) -> list[Abstract]:
    params = _with_api_key({"db": "pubmed", "id": ",".join(pmids), "rettype": "abstract", "retmode": "xml"})
    response = await client.get(EFETCH_URL, params=params)
    response.raise_for_status()
    return _parse_abstracts(response.text)


def _parse_abstracts(xml_text: str) -> list[Abstract]:
    root = ElementTree.fromstring(xml_text)
    abstracts = []
    for article in root.findall(".//PubmedArticle"):
        pmid = article.findtext(".//PMID", default="")
        title = article.findtext(".//ArticleTitle", default="")
        abstract_text = " ".join(
            (el.text or "") for el in article.findall(".//Abstract/AbstractText")
        ).strip()
        if pmid and abstract_text:
            abstracts.append(Abstract(pmid=pmid, title=title, abstract=abstract_text))
    return abstracts
