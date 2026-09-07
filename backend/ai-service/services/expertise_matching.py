def get_required_expertise(category: str, text: str) -> list:
    """
    Map problem category and problem context
    to relevant academic and technical expertise.
    """

    expertise_map = {

        "Agriculture": [
            "Agricultural Engineering",
            "Agronomy",
            "Soil Science",
            "Irrigation Engineering"
        ],

        "Water Management": [
            "Civil Engineering",
            "Hydrology",
            "Environmental Science",
            "IoT",
            "GIS"
        ],

        "Environment": [
            "Environmental Science",
            "Environmental Engineering",
            "Pollution Control",
            "Climate Science"
        ],

        "Transportation & Infrastructure": [
            "Civil Engineering",
            "Transportation Engineering",
            "Urban Planning"
        ],

        "Sanitation & Waste Management": [
            "Environmental Engineering",
            "Waste Management",
            "Civil Engineering"
        ],

        "Healthcare": [
            "Public Health",
            "Biomedical Engineering",
            "Data Science"
        ],

        "Education": [
            "Education Technology",
            "Social Sciences"
        ],

        "Employment & Livelihood": [
            "Skill Development",
            "Economics",
            "Business Development",
            "Social Work"
        ],

        "Electricity & Energy": [
            "Electrical Engineering",
            "Power Systems",
            "Renewable Energy"
        ],

        "Government & Public Services": [
            "Public Administration",
            "Government Policy",
            "Social Work"
        ]
    }

    # Get expertise for the detected category
    base_expertise = expertise_map.get(
        category,
        ["General Management", "Social Work"]
    ).copy()

    text_lower = text.lower()

    # Add technology expertise when relevant
    if (
        "app" in text_lower
        or "software" in text_lower
        or "website" in text_lower
    ):
        base_expertise.extend([
            "Computer Science",
            "Software Engineering",
            "UI/UX"
        ])

    # Add IoT expertise when relevant
    if "sensor" in text_lower or "smart" in text_lower:
        base_expertise.extend([
            "IoT",
            "Electronics"
        ])

    # Remove duplicates
    return list(set(base_expertise))