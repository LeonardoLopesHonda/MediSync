from pydantic import BaseModel, Field


class IntakeRequest(BaseModel):
    symptoms: str = Field(examples=["fever, cough, fatigue"])


class IntakeResponse(BaseModel):
    symptoms: list[str]
