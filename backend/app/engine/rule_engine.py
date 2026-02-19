from app.models.schemas import (
    AnalyzeResponse, 
    RiskAssessment, 
    PharmacogenomicProfile, 
    ClinicalRecommendation
)
from app.engine.phenotype_map import get_phenotype
from app.engine.drug_rules import DRUG_RULES

def evaluate_drug_risk(patient_id: str, gene: str, diplotype: str, drug: str) -> AnalyzeResponse:
    """
    Evaluates the risk of a drug based on genetic diplotype.
    Deterministic and based on CPIC guidelines defined in constants.
    """
    
    # 1. Validate inputs & Normalize
    # (Basic validation is handled by Pydantic, here we handle logic)
    
    # 2. Determine Phenotype
    phenotype = get_phenotype(gene, diplotype)
    
    # 3. Prepare Default/Fallback Response
    risk_assessment = RiskAssessment(
        risk_label="Unknown",
        confidence_score=0.5,
        severity="low"
    )
    clinical_recommendation = ClinicalRecommendation(
        dose_adjustment="No specific guideline found for this phenotype/drug combination.",
        monitoring="Standard monitoring."
    )
    
    # 4. Lookup Rule
    drug_entry = DRUG_RULES.get(drug)
    if drug_entry:
        gene_entry = drug_entry.get(gene)
        if gene_entry:
            rule = gene_entry.get(phenotype)
            
            if rule:
                risk_assessment = RiskAssessment(
                    risk_label=rule["risk_label"],
                    confidence_score=rule["confidence_score"],
                    severity=rule["severity"]
                )
                clinical_recommendation = ClinicalRecommendation(
                    dose_adjustment=rule["dose_adjustment"],
                    monitoring=rule["monitoring"]
                )
            elif phenotype == "Indeterminate":
                # Fallback for indeterminate phenotype
                clinical_recommendation.dose_adjustment = "Diplotype not recognized. improved genetic data required."

    # 5. Construct Final Response
    profile = PharmacogenomicProfile(
        primary_gene=gene,
        diplotype=diplotype,
        phenotype=phenotype
    )
    
    return AnalyzeResponse(
        patient_id=patient_id,
        drug=drug,
        risk_assessment=risk_assessment,
        pharmacogenomic_profile=profile,
        clinical_recommendation=clinical_recommendation
    )
