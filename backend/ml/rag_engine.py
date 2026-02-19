import os
import chromadb
from chromadb.utils import embedding_functions
from sentence_transformers import SentenceTransformer

# Wrapper for SentenceTransformer to match ChromaDB's EmbeddingFunction interface
class LocalEmbeddingFunction(embedding_functions.EmbeddingFunction):
    def __init__(self, model_name="BAAI/bge-small-en-v1.5"):
        self.model = SentenceTransformer(model_name)

    def __call__(self, input: list[str]) -> list[list[float]]:
        # Returns a list of embeddings
        embeddings = self.model.encode(input).tolist()
        return embeddings

class LocalRAGEngine:
    def __init__(self):
        try:
            self.embedding_fn = LocalEmbeddingFunction()
            self.client = chromadb.PersistentClient(path="./chroma_local_db")
            
            self.collection = self.client.get_or_create_collection(
                name="cpic_guidelines_local",
                embedding_function=self.embedding_fn
            )
            
            # Check if empty, then ingest
            if self.collection.count() == 0:
                self._ingest_knowledge_base()
        except Exception as e:
            print(f"RAG Engine Initialization Error: {e}")
            self.collection = None

    def _ingest_knowledge_base(self):
        kb_path = os.path.join(os.path.dirname(__file__), "knowledge_base", "cpic_guidelines.txt")
        if not os.path.exists(kb_path):
            print(f"Knowledge base not found at {kb_path}")
            return

        with open(kb_path, "r", encoding="utf-8") as f:
            full_text = f.read()

        # Simple chunking by line for now (since our txt is line-based)
        # For larger texts, we'd use a more sophisticated splitter
        lines = [line.strip() for line in full_text.split('\n') if line.strip()]

        if not lines:
            return

        ids = [str(i) for i in range(len(lines))]
        
        print(f"Ingesting {len(lines)} guidelines into Local ChromaDB...")
        self.collection.add(
            documents=lines,
            ids=ids
        )
        print("Ingestion complete.")

    def retrieve_context(self, query: str, n_results: int = 3) -> str:
        """
        Retrieves top n_results relevant context chunks for the query using local embeddings.
        """
        if not self.collection:
            return "RAG Engine not initialized."

        try:
            results = self.collection.query(
                query_texts=[query],
                n_results=n_results
            )
            
            if not results['documents']:
                return "No relevant guidelines found."

            # Flatten list of lists
            context_chunks = results['documents'][0]
            return "\n\n".join(context_chunks)
        except Exception as e:
            return f"Error retrieving context: {str(e)}"

# Singleton instance
rag_engine = LocalRAGEngine()
