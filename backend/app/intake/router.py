from fastapi import APIRouter, HTTPException

from app.intake.schemas import IntakeRequest, IntakeResponse
from app.intake.service import parse_symptoms

router = APIRouter(prefix="/intake", tags=["intake"])


@router.post("", response_model=IntakeResponse)
def submit_symptoms(request: IntakeRequest) -> IntakeResponse:
    symptoms = parse_symptoms(request.symptoms)
    if not symptoms:
        raise HTTPException(status_code=422, detail="No symptom terms provided")
    return IntakeResponse(symptoms=symptoms)
