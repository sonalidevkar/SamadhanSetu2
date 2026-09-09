def detect_priority(text: str, people_affected=0) -> dict:
    """
    Priority and severity detection based on keywords
    and the number of people affected.
    """

    text_lower = text.lower()

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
        "fatal",
        "disaster",
        "collapsing",
        "no drinking water",
        "no water for days"
    ]

    # Moderate problems
    medium_priority_words = [
        "broken",
        "damage",
        "damaged",
        "shortage",
        "pollution",
        "leakage",
        "pothole",
        "garbage",
        "power cut",
        "no water",
        "no electricity",
        "dirty",
        "delay",
        "not working"
    ]

    # Add score for serious words
    for word in high_priority_words:
        if word in text_lower:
            score += 2

    # Add score for moderate words
    for word in medium_priority_words:
        if word in text_lower:
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

    # Decide priority and severity
    if score >= 7:
        priority = "HIGH"
        severity = "CRITICAL"
    elif score >= 4:
        priority = "MEDIUM"
        severity = "HIGH"
    else:
        priority = "LOW"
        severity = "LOW"

    return {
        "severity": severity,
        "priority": priority
    }