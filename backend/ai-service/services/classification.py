from services.keyword_extraction import extract_keywords


def classify_problem(text: str) -> dict:
    """
    Detect the category, sub-category, solution domain,
    and extract important keywords from a problem description.
    """

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

    # Store scores for every category
    category_scores = {}

    # Check every category
    for category, keywords in categories.items():

        score = 0

        for keyword in keywords:

            if keyword.lower() in text_lower:
                score += 1

        category_scores[category] = score

    # Find the highest-scoring category
    best_category = max(
        category_scores,
        key=category_scores.get
    )

    best_score = category_scores[best_category]

    # If no category matches
    if best_score == 0:
        best_category = "Other"

    # Extract important keywords from the complete text
    detected_keywords = extract_keywords(text)

    # Default sub-category
    sub_category = "General"

    # Water sub-categories
    if best_category == "Water Management":

        if (
            "drinking water" in text_lower
            or "clean water" in text_lower
        ):
            sub_category = "Drinking Water"

        elif "pipeline" in text_lower:
            sub_category = "Pipeline Issue"

        elif "leakage" in text_lower:
            sub_category = "Water Leakage"

        elif "shortage" in text_lower:
            sub_category = "Water Shortage"

    # Infrastructure sub-categories
    elif best_category == "Transportation & Infrastructure":

        if (
            "pothole" in text_lower
            or "road" in text_lower
        ):
            sub_category = "Road Maintenance"

        elif "bus" in text_lower:
            sub_category = "Public Transport"

        elif "bridge" in text_lower:
            sub_category = "Bridge Infrastructure"

    # Sanitation sub-categories
    elif best_category == "Sanitation & Waste Management":

        if "garbage" in text_lower:
            sub_category = "Garbage Collection"

        elif (
            "drainage" in text_lower
            or "drain" in text_lower
        ):
            sub_category = "Drainage Issue"

        elif "toilet" in text_lower:
            sub_category = "Public Sanitation"

    # Agriculture sub-categories
    elif best_category == "Agriculture":

        if "crop" in text_lower:
            sub_category = "Crop Issue"

        elif "irrigation" in text_lower:
            sub_category = "Irrigation"

        elif "soil" in text_lower:
            sub_category = "Soil Issue"

    # Healthcare sub-categories
    elif best_category == "Healthcare":

        if "hospital" in text_lower:
            sub_category = "Hospital Services"

        elif "doctor" in text_lower:
            sub_category = "Doctor Availability"

        elif "medicine" in text_lower:
            sub_category = "Medicine Availability"

    # Education sub-categories
    elif best_category == "Education":

        if "school" in text_lower:
            sub_category = "School Facilities"

        elif "teacher" in text_lower:
            sub_category = "Teacher Availability"

        elif "scholarship" in text_lower:
            sub_category = "Scholarship Issue"

    # Electricity sub-categories
    elif best_category == "Electricity & Energy":

        if "power cut" in text_lower:
            sub_category = "Power Outage"

        elif "street light" in text_lower:
            sub_category = "Street Lighting"

    # Return complete classification result
    return {
        "category": best_category,
        "sub_category": sub_category,
        "solution_domain": f"{best_category} Solutions",
        "keywords": detected_keywords
    }