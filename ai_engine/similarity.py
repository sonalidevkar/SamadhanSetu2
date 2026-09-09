# ==========================================================
# SAMADHAN SETU - SIMILAR PROBLEM DETECTION
# ==========================================================

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def find_similar_problems(new_problem, existing_problems):

    # If there are no existing problems
    if not existing_problems:
        return []

    # Combine existing problems and new problem
    all_problems = existing_problems + [new_problem]

    # Convert text into numerical vectors
    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(all_problems)

    # Vector of the new problem
    new_problem_vector = vectors[-1]

    # Vectors of existing problems
    existing_vectors = vectors[:-1]

    # Calculate similarity
    similarity_scores = cosine_similarity(
        new_problem_vector,
        existing_vectors
    )[0]

    results = []

    # Check every existing problem
    for index, score in enumerate(similarity_scores):

        percentage = round(score * 100, 2)

        # Consider problems above 30% as potentially related
        if percentage >= 30:

            results.append({
                "problem": existing_problems[index],
                "similarity": percentage
            })

    # Highest similarity first
    results.sort(
        key=lambda item: item["similarity"],
        reverse=True
    )

    return results


# ==========================================================
# TESTING
# ==========================================================

if __name__ == "__main__":

    existing_problems = [

        "There is no clean drinking water in our village.",

        "Garbage is not collected from our area.",

        "There are many potholes on the main road.",

        "Farmers are facing irrigation problems."
    ]

    new_problem = (
        "Our village is facing a shortage "
        "of clean drinking water."
    )

    similar_problems = find_similar_problems(
        new_problem,
        existing_problems
    )

    print("\n========== SIMILAR PROBLEM DETECTION ==========\n")

    print("New Problem:")
    print(new_problem)

    print("\nSimilar Problems:\n")

    if similar_problems:

        for item in similar_problems:

            print("Problem:", item["problem"])
            print("Similarity:", item["similarity"], "%")
            print("-" * 60)

    else:

        print("No similar problem found.")