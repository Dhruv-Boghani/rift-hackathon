import requests
import json
import os

class LocalClinicalLLM:
    def __init__(self, model="mixtral", api_url="http://localhost:11434/api/generate"):
        self.model = model
        self.api_url = api_url

    def generate_explanation(
        self,
        drug: str,
        gene: str,
        phenotype: str,
        risk_label: str,
        rule_summary: str,
        retrieved_context: str
    ) -> dict:
        """
        Generates a clinical explanation using a local LLM via Ollama.
        """
        
        system_prompt = """You are a pharmacogenomics clinical assistant.
Only use provided context.
Do not hallucinate.
Do not override deterministic risk.
You must return the output as valid JSON."""

        user_prompt = f"""
        CONTEXT:
        - Drug: {drug}
        - Gene: {gene}
        - Phenotype: {phenotype}
        - DETERMINISTIC RISK LABEL: {risk_label}
        - Clinical Rule: {rule_summary}
        
        RETRIEVED GUIDELINES (CPIC):
        {retrieved_context}
        
        INSTRUCTIONS:
        1. Explain why this phenotype affects {drug} metabolism.
        2. Align with the risk label: {risk_label}.
        3. Use the guidelines provided.
        4. Return VALID JSON with keys: "summary", "biological_mechanism", "clinical_reasoning", "citations".
        """

        payload = {
            "model": self.model,
            "prompt": f"{system_prompt}\n\n{user_prompt}",
            "stream": False,
            "format": "json",
            "options": {
                "temperature": 0.2
            }
        }

        try:
            response = requests.post(self.api_url, json=payload, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            generated_text = data.get("response", "{}")
            
            # Parse JSON from string
            return json.loads(generated_text)
            
        except requests.exceptions.RequestException as e:
            print(f"Ollama Connection Error: {e}")
            return {
                "summary": "Local AI unavailable.",
                "biological_mechanism": "Check if Ollama is running.",
                "clinical_reasoning": str(e),
                "citations": "N/A"
            }
        except json.JSONDecodeError:
            print("Failed to parse LLM JSON output")
            return {
                "summary": "AI generation failed parsing.",
                "biological_mechanism": "Invalid JSON response.",
                "clinical_reasoning": "N/A",
                "citations": "N/A"
            }

# Singleton
local_llm = LocalClinicalLLM()
