# ==========================================================
# SAMADHAN SETU - SMART INSTITUTION MATCHING ENGINE
# ==========================================================


# Institution recommendations based on problem categories

INSTITUTIONS = {

    "Agriculture": [
        {
            "name": "Agriculture Department",
            "match_score": 95
        },
        {
            "name": "Agricultural Research Institute",
            "match_score": 90
        },
        {
            "name": "Agricultural University",
            "match_score": 85
        }
    ],

    "Water Management": [
        {
            "name": "Water Resources Department",
            "match_score": 95
        },
        {
            "name": "Water Supply Department",
            "match_score": 90
        },
        {
            "name": "Water Research Institute",
            "match_score": 85
        }
    ],

    "Environment": [
        {
            "name": "Environmental Protection Department",
            "match_score": 95
        },
        {
            "name": "Pollution Control Board",
            "match_score": 90
        },
        {
            "name": "Environmental Research Institute",
            "match_score": 85
        }
    ],

    "Transportation & Infrastructure": [
        {
            "name": "Transport Department",
            "match_score": 95
        },
        {
            "name": "Public Works Department",
            "match_score": 90
        },
        {
            "name": "Municipal Infrastructure Department",
            "match_score": 85
        }
    ],

    "Sanitation & Waste Management": [
        {
            "name": "Municipal Sanitation Department",
            "match_score": 95
        },
        {
            "name": "Waste Management Department",
            "match_score": 90
        },
        {
            "name": "Municipal Corporation",
            "match_score": 85
        }
    ],

    "Healthcare": [
        {
            "name": "Public Health Department",
            "match_score": 95
        },
        {
            "name": "Government Hospital",
            "match_score": 90
        },
        {
            "name": "Health Research Institute",
            "match_score": 85
        }
    ],

    "Education": [
        {
            "name": "Education Department",
            "match_score": 95
        },
        {
            "name": "District Education Office",
            "match_score": 90
        },
        {
            "name": "Educational Research Institute",
            "match_score": 85
        }
    ],

    "Employment & Livelihood": [
        {
            "name": "Employment Department",
            "match_score": 95
        },
        {
            "name": "Skill Development Department",
            "match_score": 90
        },
        {
            "name": "Employment and Training Center",
            "match_score": 85
        }
    ],

    "Electricity & Energy": [
        {
            "name": "Electricity Distribution Department",
            "match_score": 95
        },
        {
            "name": "Energy Department",
            "match_score": 90
        },
        {
            "name": "Renewable Energy Department",
            "match_score": 85
        }
    ],

    "Government & Public Services": [
        {
            "name": "District Administration",
            "match_score": 95
        },
        {
            "name": "Government Service Center",
            "match_score": 90
        },
        {
            "name": "Public Administration Department",
            "match_score": 85
        }
    ]
}


# ==========================================================
# FUNCTION: MATCH INSTITUTIONS
# ==========================================================

def match_institutions(category):

    # Return matching institutions for the category
    if category in INSTITUTIONS:
        return INSTITUTIONS[category]

    # Default recommendation for Other category
    return [
        {
            "name": "District Administration",
            "match_score": 60
        }
    ]


# ==========================================================
# TESTING THE INSTITUTION MATCHING SYSTEM
# ==========================================================

if __name__ == "__main__":

    test_categories = [
        "Agriculture",
        "Water Management",
        "Healthcare",
        "Education",
        "Other"
    ]

    print("\n========== SMART INSTITUTION MATCHING ==========\n")

    for category in test_categories:

        institutions = match_institutions(category)

        print("Category:", category)

        for institution in institutions:

            print(
                "Institution:",
                institution["name"]
            )

            print(
                "Match Score:",
                institution["match_score"],
                "%"
            )

        print("-" * 60)