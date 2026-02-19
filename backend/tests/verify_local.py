import sys
import os
import asyncio
import requests

# Add backend to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ml.local_llm import local_llm

async def verify_local_stack():
    print("Starting Local AI Verification...")
    
    # 1. Check Ollama Connectivity
    try:
        print("Checking Ollama connection...")
        response = requests.get("http://localhost:11434/")
        if response.status_code == 200:
             print("✅ Ollama is running.")
        else:
             print("⚠️ Ollama responded with status:", response.status_code)
    except Exception as e:
        print(f"❌ Ollama connection failed: {e}")
        print("Make sure Ollama is running ('ollama serve')")
        return

    # 2. Test RAG + LLM (via service)
    # We'll skip full service integration test if server is just starting, 
    # but we can test components directly.
    
    print("\nTesting Local LLM generation...")
    try:
        res = local_llm.generate_explanation(
            drug="TestDrug",
            gene="TestGene",
            phenotype="TestPhenotype",
            risk_label="Safe",
            rule_summary="No action needed",
            retrieved_context="Context from RAG"
        )
        print("✅ Local LLM Response Received:")
        print(res.get("summary", "No summary"))
    except Exception as e:
        print(f"❌ Local LLM Generation Error: {e}")

if __name__ == "__main__":
    asyncio.run(verify_local_stack())
