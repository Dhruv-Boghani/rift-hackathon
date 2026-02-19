from app.models.schemas import AnalyzeResponse, AnalyzeRequest
from app.engine.rule_engine import evaluate_drug_risk
from app.api.routes import AnalyzeResponse as BaseResponse
from ml.rag_engine import rag_engine
from ml.local_llm import local_llm
from pydantic import BaseModel

# Extended response model including explanation
class AIExplanation(BaseModel):
    summary: str
    biological_mechanism: str
    clinical_reasoning: str
    citations: str

class AnalyzeResponseWithExplanation(BaseResponse):
    llm_generated_explanation: AIExplanation

async def generate_drug_explanation(request: AnalyzeRequest) -> AnalyzeResponseWithExplanation:
    # 1. Run Deterministic Rule Engine
    base_result = evaluate_drug_risk(
        patient_id=request.patient_id,
        gene=request.gene,
        diplotype=request.diplotype,
        drug=request.drug
    )
    
    # 2. Build RAG Query
    query = f"CPIC guideline for {request.drug} and {request.gene} phenotype {base_result.pharmacogenomic_profile.phenotype}"
    
    # 3. Retrieve Context
    context = rag_engine.retrieve_context(query)
    
    # 4. Generate Explanation
    rule_summary = f"{base_result.clinical_recommendation.dose_adjustment} {base_result.clinical_recommendation.monitoring}"
    
    explanation_dict = local_llm.generate_explanation(
        drug=request.drug,
        gene=request.gene,
        phenotype=base_result.pharmacogenomic_profile.phenotype,
        risk_label=base_result.risk_assessment.risk_label,
        rule_summary=rule_summary,
        retrieved_context=context
    )
    
    # 5. Construct Final Response
    return AnalyzeResponseWithExplanation(
        **base_result.dict(),
        llm_generated_explanation=AIExplanation(**explanation_dict)
    )
