import re


STOP_WORDS = [
    "the", "is", "are", "a", "an", "and",
    "in", "on", "at", "for", "to", "of",
    "our", "we", "there", "this", "that",
    "with", "from", "many", "has", "have",
    "was", "were", "be", "being", "been",
    "it", "its", "their", "they", "people"
]


def extract_keywords(problem_text: str) -> list:

    text = problem_text.lower()

    words = re.findall(r'\b[a-zA-Z]{3,}\b', text)

    keywords = []

    for word in words:
        if word not in STOP_WORDS and word not in keywords:
            keywords.append(word)

    return keywords