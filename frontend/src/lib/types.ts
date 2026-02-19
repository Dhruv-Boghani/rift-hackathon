/**
 * Pharmacogenomics Types
 * Matches the Python Backend API response structure.
 */

export interface RiskAssessment {
  risk_label: "Safe" | "Adjust Dosage" | "Toxic" | "Ineffective" | "Unknown";
  confidence_score: number;
  severity: "low" | "moderate" | "high" | "critical";
}

export interface PharmacogenomicProfile {
  primary_gene: string;
  diplotype: string;
  phenotype: string;
}

export interface ClinicalRecommendation {
  dose_adjustment: string;
  monitoring: string;
}

export interface AIExplanation {
  summary: string;
  biological_mechanism: string;
  clinical_reasoning: string;
  citations: string;
}

export interface AnalyzeResponse {
  patient_id: string;
  drug: string;
  risk_assessment: RiskAssessment;
  pharmacogenomic_profile: PharmacogenomicProfile;
  clinical_recommendation: ClinicalRecommendation;
  llm_generated_explanation?: AIExplanation;
}

// For frontend display purposes, if needed
export type DrugResult = AnalyzeResponse;
