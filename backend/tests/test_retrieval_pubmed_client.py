import httpx

from app.retrieval.pubmed_client import _parse_abstracts, fetch_abstracts

EFETCH_XML = """<?xml version="1.0"?>
<PubmedArticleSet>
<PubmedArticle>
  <MedlineCitation>
    <PMID Version="1">111</PMID>
    <Article>
      <ArticleTitle>Fever study</ArticleTitle>
      <Abstract>
        <AbstractText>Fever abstract text.</AbstractText>
      </Abstract>
    </Article>
  </MedlineCitation>
</PubmedArticle>
<PubmedArticle>
  <MedlineCitation>
    <PMID Version="1">222</PMID>
    <Article>
      <ArticleTitle>Cough study</ArticleTitle>
      <Abstract>
        <AbstractText Label="BACKGROUND">Cough background.</AbstractText>
        <AbstractText Label="METHODS">Cough methods.</AbstractText>
      </Abstract>
    </Article>
  </MedlineCitation>
</PubmedArticle>
</PubmedArticleSet>
"""

NO_ABSTRACT_XML = """<?xml version="1.0"?>
<PubmedArticleSet>
<PubmedArticle>
  <MedlineCitation>
    <PMID Version="1">333</PMID>
    <Article>
      <ArticleTitle>No abstract available</ArticleTitle>
    </Article>
  </MedlineCitation>
</PubmedArticle>
</PubmedArticleSet>
"""


def _handler(request: httpx.Request) -> httpx.Response:
    if "esearch.fcgi" in str(request.url):
        return httpx.Response(200, json={"esearchresult": {"idlist": ["111", "222"]}})
    if "efetch.fcgi" in str(request.url):
        return httpx.Response(200, text=EFETCH_XML)
    raise AssertionError(f"unexpected request: {request.url}")


async def test_fetch_abstracts_returns_parsed_articles():
    transport = httpx.MockTransport(_handler)
    async with httpx.AsyncClient(transport=transport) as client:
        abstracts = await fetch_abstracts(client, "fever", max_results=2)

    assert [a.pmid for a in abstracts] == ["111", "222"]
    assert abstracts[0].title == "Fever study"
    assert abstracts[0].abstract == "Fever abstract text."
    assert abstracts[1].abstract == "Cough background. Cough methods."


async def test_fetch_abstracts_returns_empty_when_no_pmids_found():
    def handler(request: httpx.Request) -> httpx.Response:
        if "esearch.fcgi" in str(request.url):
            return httpx.Response(200, json={"esearchresult": {"idlist": []}})
        raise AssertionError("efetch should not be called when no PMIDs are found")

    transport = httpx.MockTransport(handler)
    async with httpx.AsyncClient(transport=transport) as client:
        abstracts = await fetch_abstracts(client, "nonexistent symptom")

    assert abstracts == []


def test_parse_abstracts_skips_articles_without_abstract_text():
    assert _parse_abstracts(NO_ABSTRACT_XML) == []
