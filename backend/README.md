# PharmaGuard Backend

## Overview

A hybrid deterministic/AI pharmacogenomics engine.

## Tech Stack

- **Framework**: FastAPI (Python 3.11)
- **Rule Engine**: Deterministic CPIC guidelines
- **AI Engine**: Local RAG + LLM (Ollama)
- **Database**: ChromaDB (Vector Store)

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Setup Local AI (Ollama)

This project uses **Ollama** for local LLM inference.

1.  **Install Ollama**:
    - macOS/Linux: `curl -fsSL https://ollama.com/install.sh | sh`
    - Windows: Download from [ollama.com](https://ollama.com)

2.  **Pull the Model**:

    ```bash
    ollama pull mixtral
    ```

    _Note: You can use `mistral` or `llama3` if your hardware is limited, but update `ml/local_llm.py` accordingly._

3.  **Start Ollama Server**:
    ```bash
    ollama serve
    ```
    Ensure it is running on port `11434`.

### 3. Run Backend

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

## API Endpoints

- `POST /api/v1/analyze`: Returns deterministic risk only.
- `POST /api/v1/analyze-with-explanation`: Returns risk + AI explanation (Local LLM).
