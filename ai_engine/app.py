# ==========================================================
# SAMADHAN SETU - MAIN AI ENGINE
# ==========================================================

from category import detect_category
from priority import calculate_priority
from keywords import extract_keywords
from similarity import find_similar_problems
from matching import match_institutions


# ==========================================================
# MAIN FUNCTION: ANALYZE A CITIZEN PROBLEM
# ==========================================================

def analyze_problem(
    problem_text,
    people_affected=0,
    existing_problems=None
):

    # If there are no previous problems
    if existing_problems is None:
        existing_problems = []

    # ------------------------------------------------------
    # 1. CATEGORY DETECTION
    # ------------------------------------------------------

    category = detect_category(problem_text)

    # ------------------------------------------------------
    # 2. PRIORITY SCORING
    # ------------------------------------------------------

    priority_result = calculate_priority(
        problem_text,
        people_affected
    )

    # ------------------------------------------------------
    # 3. KEYWORD EXTRACTION
    # ------------------------------------------------------

    keywords = extract_keywords(problem_text)

    # ------------------------------------------------------
    # 4. SIMILAR PROBLEM DETECTION
    # ------------------------------------------------------

    similar_problems = find_similar_problems(
        problem_text,
        existing_problems
    )

    # ------------------------------------------------------
    # 5. SMART INSTITUTION MATCHING
    # ------------------------------------------------------

    institutions = match_institutions(category)

    # ------------------------------------------------------
    # FINAL RESULT
    # ------------------------------------------------------

    return {
        "problem": problem_text,
        "category": category,
        "priority": priority_result["priority"],
        "priority_score": priority_result["score"],
        "keywords": keywords,
        "similar_problems": similar_problems,
        "recommended_institutions": institutions
    }


# ==========================================================
# TEST THE COMPLETE AI ENGINE
# ==========================================================

if __name__ == "__main__":

    # New problem submitted by a citizen
    problem = (
        "Farmers in our village are facing severe water "
        "shortage and their crops are getting damaged."
    )

    # Sample existing problems
    existing_problems = [

        "Farmers are facing irrigation problems.",

        "There is a water shortage in our village.",

        "Garbage is not being collected properly.",

        "The main road has many potholes."
    ]

    # Analyze the problem
    result = analyze_problem(
        problem_text=problem,
        people_affected=500,
        existing_problems=existing_problems
    )

    # Display the final AI analysis
    print("\n")
    print("=" * 60)
    print("        SAMADHAN SETU - FINAL AI ANALYSIS")
    print("=" * 60)

    print("\nPROBLEM:")
    print(result["problem"])

    print("\nCATEGORY:")
    print(result["category"])

    print("\nPRIORITY:")
    print(result["priority"])

    print("\nPRIORITY SCORE:")
    print(result["priority_score"], "/10")

    print("\nKEYWORDS:")
    print(result["keywords"])

    print("\nSIMILAR PROBLEMS:")

    if result["similar_problems"]:

        for item in result["similar_problems"]:

            print("- Problem:", item["problem"])
            print("  Similarity:", item["similarity"], "%")

    else:
        print("No similar problems found.")

    print("\nRECOMMENDED INSTITUTIONS:")

    for institution in result["recommended_institutions"]:

        print(
            "-",
            institution["name"],
            "| Match:",
            institution["match_score"],
            "%"
        )

    print("\n" + "=" * 60)