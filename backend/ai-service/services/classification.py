def classify_problem(text: str) -> dict:

    text_lower = text.lower()

    categories = {
        "Agriculture": [
            "farmer", "farmers", "farm", "farming",
            "crop", "crops", "agriculture",
            "irrigation", "soil", "fertilizer",
            "pesticide", "harvest", "seed",
            "cultivation", "agricultural",
            "livestock", "cattle"
        ],

        "Water Management": [
            "water", "water supply", "drinking water",
            "water shortage", "no water",
            "pipeline", "water pipeline",
            "water leakage", "leakage",
            "tap water", "clean water",
            "contaminated water", "irrigation water",
            "groundwater", "paani"
        ],

        "Environment": [
            "environment", "pollution",
            "air pollution", "water pollution",
            "noise pollution", "plastic pollution",
            "tree", "trees", "forest",
            "climate", "climate change",
            "river pollution", "environmental",
            "deforestation"
        ],

        "Transportation & Infrastructure": [
            "transport", "transportation",
            "bus", "train", "traffic",
            "vehicle", "public transport",
            "commuting", "travel",
            "road", "roads",
            "pothole", "potholes",
            "broken road", "highway",
            "bridge", "street",
            "infrastructure"
        ],

        "Sanitation & Waste Management": [
            "sanitation", "garbage",
            "waste", "cleanliness",
            "dirty", "toilet",
            "sewage", "drainage",
            "drain", "cleaning",
            "rubbish", "plastic waste",
            "garbage collection"
        ],

        "Healthcare": [
            "health", "hospital",
            "doctor", "doctors",
            "medicine", "ambulance",
            "patient", "medical",
            "healthcare", "clinic",
            "disease", "treatment",
            "health center"
        ],

        "Education": [
            "education", "school",
            "college", "student",
            "students", "teacher",
            "teachers", "classroom",
            "books", "study",
            "educational", "learning",
            "scholarship"
        ],

        "Employment & Livelihood": [
            "employment", "unemployment",
            "job", "jobs",
            "work", "job opportunity",
            "unemployed", "career",
            "income", "livelihood",
            "business opportunity"
        ],

        "Electricity & Energy": [
            "electricity", "power",
            "power cut", "power failure",
            "electricity supply",
            "street light", "street lights",
            "electric", "no electricity",
            "energy", "solar power",
            "bijli"
        ],

        "Government & Public Services": [
            "government", "government scheme",
            "government service", "scheme",
            "certificate", "ration",
            "document", "application",
            "public service",
            "government office",
            "subsidy", "benefit"
        ]
    }

    category_scores = {}
    detected_keywords = []

    for category, keywords in categories.items():

        score = 0

        for keyword in keywords:

            if keyword.lower() in text_lower:
                score += 1
                detected_keywords.append(keyword)

        category_scores[category] = score

    best_category = max(
        category_scores,
        key=category_scores.get
    )

    best_score = category_scores[best_category]

    # If no category is matched
    if best_score == 0:
        best_category = "Other"

    # Remove duplicate keywords
    detected_keywords = list(set(detected_keywords))

    # Simple subcategory
    sub_category = "General"

    if best_category == "Water Management":
        if "drinking water" in text_lower or "clean water" in text_lower:
            sub_category = "Drinking Water"
        elif "pipeline" in text_lower:
            sub_category = "Pipeline Issue"

    elif best_category == "Transportation & Infrastructure":
        if "pothole" in text_lower or "road" in text_lower:
            sub_category = "Road Maintenance"
        elif "bus" in text_lower:
            sub_category = "Public Transport"

    elif best_category == "Sanitation & Waste Management":
        if "garbage" in text_lower:
            sub_category = "Garbage Collection"
        elif "drainage" in text_lower or "drain" in text_lower:
            sub_category = "Drainage Issue"

    elif best_category == "Agriculture":
        if "crop" in text_lower:
            sub_category = "Crop Issue"
        elif "irrigation" in text_lower:
            sub_category = "Irrigation"

    return {
        "category": best_category,
        "sub_category": sub_category,
        "solution_domain": f"{best_category} Solutions",
        "keywords": detected_keywords
    }