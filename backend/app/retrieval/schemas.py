from pydantic import BaseModel


class Abstract(BaseModel):
    pmid: str
    title: str
    abstract: str
