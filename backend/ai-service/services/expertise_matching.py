def get_required_expertise(category: str, text: str) -> list:
    """
    Map category and problem context to academic/industry disciplines.
    """
    expertise_map = {
        "Water Management": ["Civil Engineering", "Hydrology", "Environmental Science", "IoT", "GIS"],
        "Infrastructure": ["Civil Engineering", "Transportation Engineering", "Urban Planning"],
        "Healthcare": ["Public Health", "Biomedical Engineering", "Data Science"],
        "Education": ["Education Technology", "Social Sciences"],
        "Electricity": ["Electrical Engineering", "Power Systems", "Renewable Energy"]
    }
    
    # Default expertise based on category
    base_expertise = expertise_map.get(category, ["General Management", "Social Work"])
    
    text_lower = text.lower()
    # Add specific expertise based on keywords in text
    if "app" in text_lower or "software" in text_lower or "website" in text_lower:
        base_expertise.extend(["Computer Science", "Software Engineering", "UI/UX"])
        
    if "sensor" in text_lower or "smart" in text_lower:
        base_expertise.extend(["IoT", "Electronics"])
        
    return list(set(base_expertise))
