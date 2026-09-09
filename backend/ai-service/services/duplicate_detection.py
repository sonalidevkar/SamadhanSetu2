# pyrefly: ignore [missing-import]
from sentence_transformers import SentenceTransformer, util
import torch

# Load a pre-trained model globally to avoid loading on every request
# all-MiniLM-L6-v2 is fast and performs well for general semantic similarity
model = None

def get_model():
    global model
    if model is None:
        model = SentenceTransformer('all-MiniLM-L6-v2')
    return model

def calculate_similarities(new_text: str, existing_texts: list) -> list:
    """
    Calculate semantic similarity between a new text and a list of existing texts.
    Returns a list of float scores between 0 and 1.
    """
    if not existing_texts:
        return []
        
    embedder = get_model()
    
    # Encode all texts
    new_embedding = embedder.encode(new_text, convert_to_tensor=True)
    existing_embeddings = embedder.encode(existing_texts, convert_to_tensor=True)
    
    # Compute cosine similarities
    cosine_scores = util.cos_sim(new_embedding, existing_embeddings)[0]
    
    # Convert tensor to python float list and scale to 0-1 (if negative)
    # Cosine similarity can be [-1, 1], we bound it to [0, 1] for our score
    scores = [(max(0, float(score)) * 100) / 100.0 for score in cosine_scores]
    
    return scores
