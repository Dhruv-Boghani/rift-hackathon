# Deterministic Drug Rules
# Based on CPIC Guidelines

DRUG_RULES = {
    "Clopidogrel": {
        "CYP2C19": {
            "Poor Metabolizer": {
                "risk_label": "Ineffective",
                "severity": "high",
                "dose_adjustment": "Avoid clopidogrel. Use alternative antiplatelet therapy (e.g., prasugrel, ticagrelor).",
                "monitoring": "Monitor for adverse cardiovascular events.",
                "confidence_score": 0.95
            },
            "Intermediate Metabolizer": {
                "risk_label": "Ineffective",
                "severity": "moderate",
                "dose_adjustment": "Avoid clopidogrel. Use alternative antiplatelet therapy (e.g., prasugrel, ticagrelor).",
                "monitoring": "Monitor for adverse cardiovascular events.",
                "confidence_score": 0.90
            },
            "Rapid Metabolizer": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing. Use label-recommended dosage.",
                "monitoring": "Monitor for bleeding.",
                "confidence_score": 0.85
            },
            "Ultrarapid Metabolizer": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing. Use label-recommended dosage.",
                "monitoring": "Monitor for bleeding.",
                "confidence_score": 0.85
            },
            "Normal Metabolizer": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing.",
                "monitoring": "Standard monitoring.",
                "confidence_score": 1.0
            }
        }
    },
    "Warfarin": {
        "CYP2C9": {
            "Poor Metabolizer": {
                "risk_label": "Adjust Dosage",
                "severity": "high",
                "dose_adjustment": "Reduce daily dose by 30-50%. Consider alternative agents.",
                "monitoring": "Monitor INR extremely closely. Slower time to stable INR.",
                "confidence_score": 0.95
            },
            "Intermediate Metabolizer": {
                "risk_label": "Adjust Dosage",
                "severity": "moderate",
                "dose_adjustment": "Reduce daily dose by 10-30%.",
                "monitoring": "Monitor INR closely.",
                "confidence_score": 0.90
            },
            "Normal Metabolizer": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing.",
                "monitoring": "Standard INR monitoring.",
                "confidence_score": 1.0
            }
        }
    },
    "Simvastatin": {
        "SLCO1B1": {
            "Poor Metabolizer": {
                "risk_label": "Toxic",
                "severity": "high",
                "dose_adjustment": "Prescribe a lower dose or alternative statin (e.g., rosuvastatin). High risk of myopathy.",
                "monitoring": "Monitor for muscle pain/weakness (CK levels).",
                "confidence_score": 0.95
            },
            "Decreased Function": {
                "risk_label": "Adjust Dosage",
                "severity": "moderate",
                "dose_adjustment": "Prescribe a lower dose or alternative statin. Moderate risk of myopathy.",
                "monitoring": "Monitor for muscle pain/weakness.",
                "confidence_score": 0.90
            },
            "Normal Function": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing.",
                "monitoring": "Standard monitoring.",
                "confidence_score": 1.0
            }
        }
    },
    "Azathioprine": {
        "TPMT": {
            "Poor Metabolizer": {
                "risk_label": "Toxic",
                "severity": "critical",
                "dose_adjustment": "Drastic dose reduction (10% of standard) or avoid. Life-threatening myelosuppression risk.",
                "monitoring": "Frequent CBC monitoring required.",
                "confidence_score": 0.98
            },
            "Intermediate Metabolizer": {
                "risk_label": "Adjust Dosage",
                "severity": "high",
                "dose_adjustment": "Reduce starting dose by 30-70%.",
                "monitoring": "Monitor CBC closely for myelosuppression.",
                "confidence_score": 0.95
            },
            "Normal Metabolizer": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing.",
                "monitoring": "Standard monitoring.",
                "confidence_score": 1.0
            }
        }
    },
    "Fluorouracil": {
        "DPYD": {
            "Poor Metabolizer": {
                "risk_label": "Toxic",
                "severity": "critical",
                "dose_adjustment": "Avoid usage. Use alternative drug. Extremely high risk of severe toxicity.",
                "monitoring": "N/A if avoided.",
                "confidence_score": 0.98
            },
            "Intermediate Metabolizer": {
                "risk_label": "Adjust Dosage",
                "severity": "high",
                "dose_adjustment": "Reduce starting dose by 50%.",
                "monitoring": "Monitor for severe toxicity (neutropenia, mucositis).",
                "confidence_score": 0.95
            },
            "Normal Metabolizer": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing.",
                "monitoring": "Standard monitoring.",
                "confidence_score": 1.0
            }
        }
    },
    "Codeine": {
        "CYP2D6": {
            "Poor Metabolizer": {
                "risk_label": "Ineffective",
                "severity": "moderate",
                "dose_adjustment": "Avoid codeine. Use alternative analgesic (e.g., morphine, not tramadol).",
                "monitoring": "Monitor for lack of efficacy.",
                "confidence_score": 0.95
            },
            "Ultrarapid Metabolizer": {
                "risk_label": "Toxic",
                "severity": "high",
                "dose_adjustment": "Avoid codeine. Use alternative analgesic (e.g., non-opioid). High risk of respiratory depression.",
                "monitoring": "Monitor for signs of opioid overdose.",
                "confidence_score": 0.95
            },
            "Intermediate Metabolizer": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing. Monitor for efficacy.",
                "monitoring": "Monitor for reduced efficacy.",
                "confidence_score": 0.85
            },
            "Normal Metabolizer": {
                "risk_label": "Safe",
                "severity": "low",
                "dose_adjustment": "Standard dosing.",
                "monitoring": "Standard monitoring.",
                "confidence_score": 1.0
            }
        }
    }
}
