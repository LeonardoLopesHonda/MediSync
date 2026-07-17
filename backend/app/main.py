from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.intake.router import router as intake_router

app = FastAPI(title="MediSync API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(intake_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
