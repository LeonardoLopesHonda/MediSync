from fastapi.testclient import TestClient

from app.intake.service import parse_symptoms
from app.main import app

client = TestClient(app)


def test_parse_symptoms_splits_and_normalizes():
    assert parse_symptoms("fever, cough, fatigue") == ["fever", "cough", "fatigue"]


def test_parse_symptoms_strips_whitespace_and_lowercases():
    assert parse_symptoms("  Fever ,COUGH,  Fatigue  ") == ["fever", "cough", "fatigue"]


def test_parse_symptoms_drops_empty_terms():
    assert parse_symptoms("fever,, cough,") == ["fever", "cough"]


def test_parse_symptoms_dedupes_preserving_order():
    assert parse_symptoms("fever, cough, Fever") == ["fever", "cough"]


def test_parse_symptoms_empty_input_returns_empty_list():
    assert parse_symptoms("") == []


def test_submit_symptoms_returns_parsed_terms():
    response = client.post("/intake", json={"symptoms": "fever, cough, fatigue"})

    assert response.status_code == 200
    assert response.json() == {"symptoms": ["fever", "cough", "fatigue"]}


def test_submit_symptoms_rejects_blank_input():
    response = client.post("/intake", json={"symptoms": "  ,  , "})

    assert response.status_code == 422
