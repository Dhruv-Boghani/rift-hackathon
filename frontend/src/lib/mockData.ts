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
  citations: string;
}

export interface RiskAssessment {
  risk_label: "Safe" | "Adjust Dosage" | "Toxic or Ineffective";
  confidence_score: number;
  severity: "low" | "medium" | "high";
}

export interface DrugResult {
  patient_id: string;
  drug: string;
  risk_assessment: RiskAssessment;
  pharmacogenomic_profile: PharmacogenomicProfile;
  clinical_recommendation: ClinicalRecommendation;
  llm_generated_explanation: AIExplanation;
}

export const MOCK_RESULT: DrugResult = {
  patient_id: "PATIENT_001",
  drug: "Warfarin",
  risk_assessment: {
    risk_label: "Adjust Dosage",
    confidence_score: 0.87,
    severity: "high",
  },
  pharmacogenomic_profile: {
    primary_gene: "CYP2C9",
    diplotype: "*1/*3",
    phenotype: "Intermediate Metabolizer",
  },
  clinical_recommendation: {
    dose_adjustment: "Reduce starting dose by 20%",
    monitoring: "Monitor INR closely",
  },
  llm_generated_explanation: {
    summary: "Reduced metabolism increases bleeding risk.",
    biological_mechanism: "CYP2C9 variant decreases enzymatic clearance.",
    citations: "CPIC Guideline 2022",
  },
};

export const MOCK_RESULTS_MULTI: DrugResult[] = [
  MOCK_RESULT,
  {
    patient_id: "PATIENT_001",
    drug: "Clopidogrel",
    risk_assessment: {
      risk_label: "Toxic or Ineffective",
      confidence_score: 0.92,
      severity: "high",
    },
    pharmacogenomic_profile: {
      primary_gene: "CYP2C19",
      diplotype: "*2/*2",
      phenotype: "Poor Metabolizer",
    },
    clinical_recommendation: {
      dose_adjustment:
        "Consider alternative therapy (e.g., Prasugrel or Ticagrelor)",
      monitoring: "Verify platelet function if continued",
    },
    llm_generated_explanation: {
      summary: "Significant reduction in active metabolite formation.",
      biological_mechanism:
        "CYP2C19 loss-of-function alleles prevent bioactivation of Clopidogrel.",
      citations: "CPIC Guideline 2022; FDA Label",
    },
  },
  {
    patient_id: "PATIENT_001",
    drug: "Simvastatin",
    risk_assessment: {
      risk_label: "Safe",
      confidence_score: 0.95,
      severity: "low",
    },
    pharmacogenomic_profile: {
      primary_gene: "SLCO1B1",
      diplotype: "*1/*1",
      phenotype: "Normal Function",
    },
    clinical_recommendation: {
      dose_adjustment: "Standard dosing guidelines apply.",
      monitoring: "Routine monitoring.",
    },
    llm_generated_explanation: {
      summary: "Normal transport function indicates standard risk.",
      biological_mechanism:
        "SLCO1B1 transporter functions normally for hepatic uptake.",
      citations: "CPIC Guideline 2024",
    },
  },
];
