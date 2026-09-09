# ==========================================================
# SAMADHAN SETU - AI PROBLEM CATEGORY DETECTION
# ==========================================================
# This module analyzes a citizen's problem description
# and identifies the most relevant problem category.
# ==========================================================


CATEGORIES = {

    # ------------------------------------------------------
    # 1. AGRICULTURE
    # ------------------------------------------------------
    "Agriculture": [
        "farmer", "farmers", "farm", "farming",
        "crop", "crops", "agriculture",
        "irrigation", "soil", "fertilizer",
        "pesticide", "harvest", "seed",
        "cultivation", "agricultural",
        "livestock", "cattle"
    ],

    # ------------------------------------------------------
    # 2. WATER MANAGEMENT
    # ------------------------------------------------------
    "Water Management": [
        "water", "water supply", "drinking water",
        "water shortage", "no water",
        "pipeline", "water pipeline",
        "water leakage", "leakage",
        "tap water", "clean water",
        "contaminated water", "irrigation water",
        "groundwater"
    ],

    # ------------------------------------------------------
    # 3. ENVIRONMENT
    # ------------------------------------------------------
    "Environment": [
        "environment", "pollution",
        "air pollution", "water pollution",
        "noise pollution", "plastic pollution",
        "tree", "trees", "forest",
        "climate", "climate change",
        "river pollution", "environmental",
        "deforestation"
    ],

    # ------------------------------------------------------
    # 4. TRANSPORTATION AND INFRASTRUCTURE
    # ------------------------------------------------------
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

    # ------------------------------------------------------
    # 5. SANITATION AND WASTE MANAGEMENT
    # ------------------------------------------------------
    "Sanitation & Waste Management": [
        "sanitation", "garbage",
        "waste", "cleanliness",
        "dirty", "toilet",
        "sewage", "drainage",
        "drain", "cleaning",
        "rubbish", "plastic waste",
        "garbage collection"
    ],

    # ------------------------------------------------------
    # 6. HEALTHCARE
    # ------------------------------------------------------
    "Healthcare": [
        "health", "hospital",
        "doctor", "doctors",
        "medicine", "ambulance",
        "patient", "medical",
        "healthcare", "clinic",
        "disease", "treatment",
        "health center"
    ],

    # ------------------------------------------------------
    # 7. EDUCATION
    # ------------------------------------------------------
    "Education": [
        "education", "school",
        "college", "student",
        "students", "teacher",
        "teachers", "classroom",
        "books", "study",
        "educational", "learning",
        "scholarship"
    ],

    # ------------------------------------------------------
    # 8. EMPLOYMENT AND LIVELIHOOD
    # ------------------------------------------------------
    "Employment & Livelihood": [
        "employment", "unemployment",
        "job", "jobs",
        "work", "job opportunity",
        "unemployed", "career",
        "income", "livelihood",
        "business opportunity"
    ],

    # ------------------------------------------------------
    # 9. ELECTRICITY AND ENERGY
    # ------------------------------------------------------
    "Electricity & Energy": [
        "electricity", "power",
        "power cut", "power failure",
        "electricity supply",
        "street light", "street lights",
        "electric", "no electricity",
        "energy", "solar power"
    ],

    # ------------------------------------------------------
    # 10. GOVERNMENT AND PUBLIC SERVICES
    # ------------------------------------------------------
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


# ==========================================================
# FUNCTION: DETECT PROBLEM CATEGORY
# ==========================================================

def detect_category(problem_text):

    # Convert the problem text to lowercase
    problem_text = problem_text.lower()

    # Dictionary to store scores for all categories
    category_scores = {}

    # Check every category
    for category, keywords in CATEGORIES.items():

        score = 0

        # Check every keyword in the category
        for keyword in keywords:

            if keyword.lower() in problem_text:

                score += 1

        # Store category score
        category_scores[category] = score

    # Find the category with the highest score
    best_category = max(
        category_scores,
        key=category_scores.get
    )

    best_score = category_scores[best_category]

    # If no category matches, return Other
    if best_score == 0:
        return "Other"

    return best_category


# ==========================================================
# TESTING THE CATEGORY DETECTION SYSTEM
# ==========================================================

if __name__ == "__main__":

    test_problems = [

        "Farmers are facing crop damage because of water shortage.",

        "There is no clean drinking water in our village.",

        "Air pollution is increasing due to vehicles and factories.",

        "The road has many potholes and buses are not available regularly.",

        "Garbage and waste are not being collected from our area.",

        "The hospital does not have enough doctors or medicines.",

        "Students do not have proper classrooms in the school.",

        "Many young people are struggling to find jobs and employment.",

        "There are frequent electricity and power cuts in our village.",

        "Citizens are facing problems while applying for government schemes.",

        "This problem does not match any available category."
    ]


    print("\n========== SAMADHAN SETU AI CATEGORY DETECTION ==========\n")


    for problem in test_problems:

        detected_category = detect_category(problem)

        print("Problem:", problem)
        print("Detected Category:", detected_category)

        print("-" * 60)