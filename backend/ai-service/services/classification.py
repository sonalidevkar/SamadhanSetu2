import re

def classify_problem(text: str) -> dict:
    """
    Baseline text classification using keyword matching.
    In a production system, this would be a fine-tuned NLP model.
    """
    text_lower = text.lower()
    
    # Baseline categories and keywords
    categories = {
        "Water Management": ["water", "drinking", "pipeline", "drainage", "sewage", "paani"],
        "Infrastructure": ["road", "bridge", "pothole", "street light", "building", "hospital"],
        "Healthcare": ["medicine", "doctor", "hospital", "clinic", "disease", "health"],
        "Education": ["school", "teacher", "books", "college", "student", "education"],
        "Electricity": ["power", "electricity", "transformer", "wire", "light", "bijli"]
    }
    
    detected_category = "Miscellaneous"
    detected_keywords = []
    
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in text_lower:
                detected_category = category
                detected_keywords.append(keyword)
                
    # Deduplicate keywords
    detected_keywords = list(set(detected_keywords))
    
    # Simple sub-category logic based on keyword
    sub_category = "General"
    if "drinking" in detected_keywords or "paani" in detected_keywords:
        sub_category = "Drinking Water"
    elif "road" in detected_keywords or "pothole" in detected_keywords:
        sub_category = "Road Maintenance"
        
    return {
        "category": detected_category,
        "sub_category": sub_category,
        "solution_domain": f"{detected_category} Solutions",
        "keywords": detected_keywords
    }
