# ==========================================================
# SAMADHAN SETU - KEYWORD EXTRACTION ENGINE
# ==========================================================

import re


# Common words that should not be treated as important keywords
STOP_WORDS = [
    "the", "is", "are", "a", "an", "and",
    "in", "on", "at", "for", "to", "of",
    "our", "we", "there", "this", "that",
    "with", "from", "many", "has", "have",
    "was", "were", "be", "being", "been",
    "it", "its", "their", "they", "people"
]


# ==========================================================
# FUNCTION: EXTRACT KEYWORDS
# ==========================================================

def extract_keywords(problem_text):

    # Convert text to lowercase
    text = problem_text.lower()

    # Extract words containing at least 3 letters
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text)

    keywords = []

    # Remove common words and duplicate words
    for word in words:

        if word not in STOP_WORDS and word not in keywords:
            keywords.append(word)

    return keywords


# ==========================================================
# TESTING THE KEYWORD EXTRACTION SYSTEM
# ==========================================================

if __name__ == "__main__":

    test_problems = [

        "Farmers are facing severe water shortage for crop irrigation in our village.",

        "Garbage is not being collected properly and it is creating pollution.",

        "There are many potholes on the road causing accidents.",

        "Students do not have proper classrooms and educational facilities."
    ]

    print("\n========== SAMADHAN SETU KEYWORD EXTRACTION ==========\n")

    for problem in test_problems:

        keywords = extract_keywords(problem)

        print("Problem:", problem)
        print("Keywords:", keywords)

        print("-" * 60)