from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.engine.rule_engine import evaluate_drug_risk
from app.services.explanation_service import generate_drug_explanation, AnalyzeResponseWithExplanation

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_genomic_risk(request: AnalyzeRequest):
    """
    Analyze pharmacogenomic risk based on patient diplotype and drug.
    Deterministic rule engine only.
    """
    try:
        response = evaluate_drug_risk(
            patient_id=request.patient_id,
            gene=request.gene,
            diplotype=request.diplotype,
            drug=request.drug
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/analyze-with-explanation", response_model=AnalyzeResponseWithExplanation)
async def analyze_risk_with_explanation(request: AnalyzeRequest):
    """
    Analyze risk AND provide an AI-generated clinical explanation.
    Uses RAG (CPIC Guidelines) + LLM (GPT-4o-mini).
    """
    try:
        response = await generate_drug_explanation(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Service Error: {str(e)}")
