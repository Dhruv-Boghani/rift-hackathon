from pydantic import BaseModel, Field
from typing import Literal

# Enum-like Literals for strict typing
RiskLabel = Literal["Safe", "Adjust Dosage", "Toxic", "Ineffective", "Unknown"]
SeverityLevel = Literal["low", "moderate", "high", "critical"]

class AnalyzeRequest(BaseModel):
    """
    Schema for the analysis request.
    """
    patient_id: str = Field(..., description="Unique identifier for the patient")
    gene: str = Field(..., description="Gene symbol (e.g., CYP2C19)")
    diplotype: str = Field(..., description="Genetic diplotype (e.g., *1/*2)")
    drug: str = Field(..., description="Drug name to analyze (e.g., Clopidogrel)")

class RiskAssessment(BaseModel):
    """
    Assessment of the risk associated with the drug given the genotype.
    """
    risk_label: RiskLabel
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Confidence score between 0 and 1")
    severity: SeverityLevel

class PharmacogenomicProfile(BaseModel):
    """
    The interpreted pharmacogenomic profile.
    """
    primary_gene: str
    diplotype: str
    phenotype: str

class ClinicalRecommendation(BaseModel):
    """
    Actionable clinical advice.
    """
    dose_adjustment: str
    monitoring: str

class AnalyzeResponse(BaseModel):
    """
    Full response object for the analysis.
    """
    patient_id: str
    drug: str
    risk_assessment: RiskAssessment
    pharmacogenomic_profile: PharmacogenomicProfile
    clinical_recommendation: ClinicalRecommendation
