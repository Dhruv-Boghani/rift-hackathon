# Phenotype Mapping
# Maps Gene -> Diplotype -> Phenotype
# Based on CPIC / PharmVar standardized terms

PHENOTYPE_MAP = {
    "CYP2C19": {
        "*1/*1": "Normal Metabolizer",
        "*1/*2": "Intermediate Metabolizer",
        "*1/*3": "Intermediate Metabolizer",
        "*2/*2": "Poor Metabolizer",
        "*2/*3": "Poor Metabolizer",
        "*3/*3": "Poor Metabolizer",
        "*1/*17": "Rapid Metabolizer",
        "*17/*17": "Ultrarapid Metabolizer",
        "*2/*17": "Intermediate Metabolizer"
    },
    "CYP2C9": {
        "*1/*1": "Normal Metabolizer",
        "*1/*2": "Intermediate Metabolizer",
        "*1/*3": "Intermediate Metabolizer",
        "*2/*2": "Poor Metabolizer",
        "*2/*3": "Poor Metabolizer",
        "*3/*3": "Poor Metabolizer"
    },
    "CYP2D6": {
        "*1/*1": "Normal Metabolizer",
        "*1/*2": "Normal Metabolizer",
        "*1/*4": "Intermediate Metabolizer",
        "*1/*5": "Intermediate Metabolizer",
        "*4/*4": "Poor Metabolizer",
        "*4/*5": "Poor Metabolizer",
        "*5/*5": "Poor Metabolizer",
        "*1/*1xN": "Ultrarapid Metabolizer",
        "*2/*2xN": "Ultrarapid Metabolizer"
    },
    "SLCO1B1": {
        "*1/*1": "Normal Function",
        "*1/*5": "Decreased Function",
        "*5/*5": "Poor Metabolizer",
        "*1/*15": "Decreased Function",
        "*15/*15": "Poor Metabolizer"
    },
    "TPMT": {
        "*1/*1": "Normal Metabolizer",
        "*1/*3A": "Intermediate Metabolizer",
        "*1/*3C": "Intermediate Metabolizer",
        "*3A/*3A": "Poor Metabolizer",
        "*3A/*3C": "Poor Metabolizer",
        "*3C/*3C": "Poor Metabolizer"
    },
    "DPYD": {
        "*1/*1": "Normal Metabolizer",
        "*1/*2A": "Intermediate Metabolizer",
        "*1/*13": "Intermediate Metabolizer",
        "*2A/*2A": "Poor Metabolizer",
        "*13/*13": "Poor Metabolizer"
    }
}

def get_phenotype(gene: str, diplotype: str) -> str:
    """
    Returns the phenotype for a given gene and diplotype.
    Defaults to 'Indeterminate' if not found.
    """
    return PHENOTYPE_MAP.get(gene, {}).get(diplotype, "Indeterminate")
