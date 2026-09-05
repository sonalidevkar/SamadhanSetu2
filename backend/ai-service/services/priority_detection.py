def detect_priority(text: str) -> dict:
    """
    Baseline priority and severity detection based on urgent keywords.
    """
    text_lower = text.lower()
    
    critical_keywords = ["emergency", "death", "fatal", "disaster", "urgent", "no water for days", "15 days", "collapsing"]
    high_keywords = ["broken", "no water", "no electricity", "damaged", "accident"]
    medium_keywords = ["pothole", "dirty", "delay", "not working"]
    
    severity = "LOW"
    priority = "LOW"
    
    if any(keyword in text_lower for keyword in critical_keywords):
        severity = "CRITICAL"
        priority = "CRITICAL"
    elif any(keyword in text_lower for keyword in high_keywords):
        severity = "HIGH"
        priority = "HIGH"
    elif any(keyword in text_lower for keyword in medium_keywords):
        severity = "MEDIUM"
        priority = "MEDIUM"
        
    return {
        "severity": severity,
        "priority": priority
    }
