# ==========================================================
# SAMADHAN SETU - PRIORITY SCORING ENGINE
# ==========================================================


def calculate_priority(problem_text, people_affected=0):

    text = problem_text.lower()

    # Starting priority score
    score = 1

    # Serious or urgent situations
    high_priority_words = [
        "emergency",
        "urgent",
        "critical",
        "danger",
        "dangerous",
        "severe",
        "flood",
        "fire",
        "accident",
        "disease",
        "death",
        "no drinking water"
    ]

    # Moderate problems
    medium_priority_words = [
        "broken",
        "damage",
        "shortage",
        "pollution",
        "leakage",
        "pothole",
        "garbage",
        "power cut"
    ]

    # Add score for serious words
    for word in high_priority_words:
        if word in text:
            score += 2

    # Add score for moderate words
    for word in medium_priority_words:
        if word in text:
            score += 1

    # Increase score depending on affected people
    if people_affected >= 1000:
        score += 3

    elif people_affected >= 500:
        score += 2

    elif people_affected >= 100:
        score += 1

    # Maximum score is 10
    score = min(score, 10)

    # Decide priority level
    if score >= 7:
        priority = "High"

    elif score >= 4:
        priority = "Medium"

    else:
        priority = "Low"

    return {
        "priority": priority,
        "score": score
    }


# ==========================================================
# TESTING
# ==========================================================

if __name__ == "__main__":

    problem = (
        "There is a severe water shortage affecting "
        "many people in our village."
    )

    result = calculate_priority(
        problem,
        people_affected=500
    )

    print("\n========== PRIORITY ANALYSIS ==========\n")

    print("Problem:", problem)
    print("Priority:", result["priority"])
    print("Priority Score:", result["score"], "/10")