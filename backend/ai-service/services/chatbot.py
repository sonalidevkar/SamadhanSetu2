# ==========================================================
# SAMADHAN SETU - AI MULTILINGUAL CHATBOT
# English | Hindi | Marathi | Roman Hindi | Roman Marathi
# ==========================================================

from sentence_transformers import SentenceTransformer, util


# ==========================================================
# LOAD AI MODEL
# ==========================================================

model = None
knowledge_embeddings = {}


def get_model():
    global model

    if model is None:
        print("Loading AI language model...")
        model = SentenceTransformer("all-MiniLM-L6-v2")

    return model


# ==========================================================
# CHATBOT KNOWLEDGE BASE
# ==========================================================

CHATBOT_KNOWLEDGE = {

    "about": {
        "questions": [
            "What is Samadhan Setu?",
            "Tell me about Samadhan Setu",
            "How does Samadhan Setu work?",
            "What does this portal do?",
            "What is this website for?",
            "Explain Samadhan Setu",

            "samadhan setu kya hai",
            "samadhan setu kya karta hai",
            "samadhan setu kaise kaam karta hai",

            "samadhan setu mhanje kay",
            "samadhan setu mhnje kay",
            "samadhan setu kay aahe",
            "samadhan setu kasa chalta",
            "samadhan setu kasa work karta",
            "he samadhan setu kay aahe"
        ],

        "responses": {
            "english": (
                "Samadhan Setu is a digital platform that helps citizens "
                "report local and community problems. It uses AI to analyze "
                "problems and helps connect citizens with relevant authorities, "
                "institutions and experts."
            ),

            "hindi": (
                "समाधान सेतु एक डिजिटल प्लेटफॉर्म है जो नागरिकों को अपनी "
                "स्थानीय और सामुदायिक समस्याएँ दर्ज करने में मदद करता है। "
                "यह AI की मदद से समस्याओं का विश्लेषण करता है और संबंधित "
                "अधिकारियों, संस्थानों और विशेषज्ञों से जोड़ने में मदद करता है।"
            ),

            "marathi": (
                "Samadhan Setu हे एक डिजिटल प्लॅटफॉर्म आहे जे नागरिकांना "
                "स्थानिक आणि सामाजिक समस्या नोंदवण्यासाठी मदत करते. "
                "हे AI वापरून समस्येचे विश्लेषण करते आणि योग्य प्रशासन, "
                "संस्था व तज्ञांशी जोडण्यास मदत करते."
            )
        },

        "action": "about"
    },


    "chatbot_working": {
        "questions": [
            "How does the chatbot work?",
            "How does this chatbot work?",
            "What does the chatbot do?",
            "How can the chatbot help me?",
            "What can the chatbot do?",

            "chatbot kaise work karta hai",
            "chatbot kaise kaam karta hai",
            "chatbot kya karta hai",

            "chatbot kasa work karta",
            "chatbot kasa work karat",
            "chatbot kasa chalta",
            "chatbot kasa kam karta",
            "chatbot mhanje kay",
            "chatbot kasa chalto"
        ],

        "responses": {
            "english": (
                "The Samadhan Setu chatbot helps citizens understand and use "
                "the portal. You can ask about submitting problems, tracking "
                "problems, uploading evidence, AI analysis, nearby problems "
                "and other portal features."
            ),

            "hindi": (
                "Samadhan Setu chatbot नागरिकों को portal समझने और उपयोग करने "
                "में मदद करता है। आप समस्या दर्ज करने, status देखने, evidence "
                "upload करने और AI analysis के बारे में पूछ सकते हैं।"
            ),

            "marathi": (
                "Samadhan Setu chatbot नागरिकांना portal समजून घेण्यासाठी "
                "आणि वापरण्यास मदत करतो. तुम्ही समस्या नोंदवणे, status पाहणे, "
                "photos upload करणे आणि AI analysis बद्दल विचारू शकता."
            )
        },

        "action": "help"
    },


    "submit_problem": {
        "questions": [
            "How can I submit my problem?",
            "How do I report a problem?",
            "I want to submit a complaint",
            "Where can I register my problem?",
            "How do I report an issue?",
            "Tell me how to submit a problem",
            "How can I complain about a problem?",
            "I want to report a complaint",

            "problem kaise submit kare",
            "mujhe problem submit karni hai",
            "mujhe complaint karni hai",
            "problem register kaise kare",

            "problem kasa submit karaycha",
            "mala problem report karaycha aahe",
            "mala problem submit karaychi aahe",
            "majhi complaint submit karaychi aahe",
            "problem kasa report karu",
            "mala complaint karaychi aahe"
        ],

        "responses": {
            "english": (
                "To submit a problem, go to the Problem Submission section. "
                "Enter the problem title, description and location. You can "
                "also add supporting photos, videos or documents."
            ),

            "hindi": (
                "समस्या दर्ज करने के लिए Problem Submission section में जाएँ। "
                "समस्या का शीर्षक, विवरण और स्थान दर्ज करें। आप फोटो, वीडियो "
                "या आवश्यक दस्तावेज़ भी जोड़ सकते हैं।"
            ),

            "marathi": (
                "समस्या नोंदवण्यासाठी Problem Submission विभागात जा. "
                "समस्येचे शीर्षक, वर्णन आणि ठिकाण भरा. आवश्यक असल्यास "
                "फोटो, व्हिडिओ किंवा documents देखील जोडू शकता."
            )
        },

        "action": "submit_problem"
    },


    "location": {
        "questions": [
            "How do I add my location?",
            "How can I select the problem location?",
            "Why is location required?",
            "Can I add my village location?",
            "Where did the problem happen?",
            "How do I enter my village?",

            "location kaise add kare",
            "location kaise select kare",

            "location kasa add karaycha",
            "problem cha location kasa takaycha",
            "gavacha location kasa add karaycha"
        ],

        "responses": {
            "english": (
                "When submitting a problem, provide the location where the "
                "problem occurred. You can enter details such as village, "
                "block, district or geographical location."
            ),

            "hindi": (
                "समस्या दर्ज करते समय उस स्थान की जानकारी दें जहाँ समस्या "
                "हुई है। आप गाँव, ब्लॉक, जिला या geographical location "
                "दर्ज कर सकते हैं।"
            ),

            "marathi": (
                "समस्या नोंदवताना ज्या ठिकाणी समस्या आहे त्या ठिकाणाची "
                "माहिती द्या. तुम्ही गाव, ब्लॉक, जिल्हा किंवा location देऊ शकता."
            )
        },

        "action": "add_location"
    },


    "upload_media": {
        "questions": [
            "How do I upload a photo?",
            "Can I upload images?",
            "Can I upload a video?",
            "Can I attach documents?",
            "How do I add proof?",
            "How can I upload evidence?",
            "Can I upload a document?",

            "photo kaise upload kare",
            "video kaise upload kare",
            "document kaise upload kare",

            "photo kasa upload karaycha",
            "video kasa upload karaycha",
            "document kasa upload karaycha",
            "proof kasa upload karaycha"
        ],

        "responses": {
            "english": (
                "While submitting a problem, you can upload supporting photos, "
                "videos and documents. These files can provide evidence and "
                "help others understand the problem."
            ),

            "hindi": (
                "समस्या दर्ज करते समय आप supporting photos, videos और "
                "documents upload कर सकते हैं। इससे समस्या को बेहतर तरीके "
                "से समझने में मदद मिलती है।"
            ),

            "marathi": (
                "समस्या नोंदवताना तुम्ही supporting photos, videos आणि "
                "documents upload करू शकता. यामुळे समस्येबद्दल अधिक माहिती "
                "आणि पुरावा मिळण्यास मदत होते."
            )
        },

        "action": "upload_media"
    },


    "track_status": {
        "questions": [
            "How can I check my problem status?",
            "Where can I track my complaint?",
            "How do I know the status of my problem?",
            "Track my submitted problem",
            "Check my problem status",
            "Where is my complaint?",

            "problem status kaise dekhe",
            "meri problem ka status kya hai",
            "meri complaint kaha hai",

            "problem status kasa baghaycha",
            "majhya problem cha status kasa baghaycha",
            "majhi complaint kuthparyant aali"
        ],

        "responses": {
            "english": (
                "You can check the current status of your submitted problem "
                "from the My Problems or Dashboard section of the portal."
            ),

            "hindi": (
                "आप अपनी दर्ज की गई समस्या की वर्तमान स्थिति My Problems "
                "या Dashboard section में देख सकते हैं।"
            ),

            "marathi": (
                "तुम्ही तुमच्या नोंदवलेल्या समस्येची सध्याची स्थिती "
                "My Problems किंवा Dashboard विभागात पाहू शकता."
            )
        },

        "action": "track_problem"
    },


    "ai_analysis": {
        "questions": [
            "How does AI work?",
            "How does AI analyze my problem?",
            "What does the AI system do?",
            "Explain AI analysis",
            "How is my problem analyzed?",
            "How does artificial intelligence work?",

            "AI kaise kaam karta hai",
            "AI meri problem kaise analyze karta hai",

            "AI kasa work karta",
            "AI majhya problem cha analysis kasa karto",
            "AI kasa kam karta"
        ],

        "responses": {
            "english": (
                "The AI system analyzes the problem description and helps "
                "identify its category, priority, severity, important keywords, "
                "similar problems and required expertise."
            ),

            "hindi": (
                "AI system समस्या का विश्लेषण करके उसकी category, priority, "
                "severity, important keywords, similar problems और required "
                "expertise पहचानने में मदद करता है।"
            ),

            "marathi": (
                "AI system समस्येचे विश्लेषण करून तिची category, priority, "
                "severity, important keywords, similar problems आणि आवश्यक "
                "expertise ओळखण्यास मदत करते."
            )
        },

        "action": "ai_analysis"
    },


    "problem_category": {
        "questions": [
            "How is my problem categorized?",
            "What is a problem category?",
            "How does the system identify the category?",
            "Which category will my problem go to?",
            "problem category kaise decide hoti hai",
            "problem kis category mein jayegi",
            "category kasa decide hote",
            "majhi problem kontya category madhye yeil"
        ],

        "responses": {
            "english": (
                "The AI analyzes the problem description and identifies the "
                "most relevant category. Problems may relate to water, "
                "infrastructure, healthcare, education or electricity."
            ),

            "hindi": (
                "AI समस्या के विवरण का विश्लेषण करके सबसे उपयुक्त category "
                "पहचानने में मदद करता है, जैसे water, infrastructure, "
                "healthcare, education या electricity।"
            ),

            "marathi": (
                "AI समस्येच्या वर्णनाचे विश्लेषण करून योग्य category ओळखण्यास "
                "मदत करते, जसे water, infrastructure, healthcare, education "
                "किंवा electricity."
            )
        },

        "action": "problem_category"
    },


    "priority": {
        "questions": [
            "What is problem priority?",
            "How is priority decided?",
            "What does severity mean?",
            "How urgent is my problem?",
            "How does the system identify urgent problems?",
            "priority kaise decide hoti hai",
            "problem kitni urgent hai",
            "problem priority kasa tharavtat",
            "majhi problem kiti urgent aahe"
        ],

        "responses": {
            "english": (
                "The system analyzes the problem description to estimate its "
                "priority and severity. Problems affecting many people or "
                "requiring urgent attention may receive higher priority."
            ),

            "hindi": (
                "System समस्या के विवरण का विश्लेषण करके उसकी priority और "
                "severity का अनुमान लगाने में मदद करता है। अधिक लोगों को "
                "प्रभावित करने वाली urgent समस्याओं को higher priority "
                "दी जा सकती है।"
            ),

            "marathi": (
                "System समस्येच्या वर्णनाचे विश्लेषण करून तिची priority आणि "
                "severity ठरवण्यास मदत करते. अनेक लोकांवर परिणाम करणाऱ्या "
                "तातडीच्या समस्यांना higher priority दिली जाऊ शकते."
            )
        },

        "action": "problem_priority"
    },


    "duplicate_problem": {
        "questions": [
            "What is duplicate problem detection?",
            "How do you find similar problems?",
            "Does the system detect duplicate problems?",
            "What happens if two people report the same problem?",
            "Can you find the same complaint?",
            "duplicate problem kaise find hoti hai",
            "same problem ko kaise detect karte ho",
            "duplicate problem kasa shodhta",
            "same problem kasa olakhta"
        ],

        "responses": {
            "english": (
                "The system can identify potentially similar or duplicate "
                "problems. This helps manage repeated reports efficiently "
                "and shows when multiple citizens report the same issue."
            ),

            "hindi": (
                "System समान या duplicate समस्याओं को पहचानने में मदद करता है। "
                "इससे repeated reports को बेहतर तरीके से manage किया जा सकता है।"
            ),

            "marathi": (
                "System समान किंवा duplicate समस्या ओळखण्यास मदत करते. "
                "यामुळे repeated reports अधिक प्रभावीपणे manage करता येतात."
            )
        },

        "action": "duplicate_problem"
    },


    "expertise_matching": {
        "questions": [
            "How are experts selected?",
            "Who will solve my problem?",
            "How does the system find the right expert?",
            "What is required expertise?",
            "How are institutions matched?",
            "expert kaise select hota hai",
            "kaunsa expert meri problem solve karega",
            "problem sathi expert kasa milel",
            "majhi problem kon solve karel"
        ],

        "responses": {
            "english": (
                "Based on the category and context of a problem, the system "
                "can identify relevant expertise. For example, a water-related "
                "problem may require civil engineering or environmental expertise."
            ),

            "hindi": (
                "समस्या की category और context के आधार पर system आवश्यक "
                "expertise पहचानने में मदद करता है।"
            ),

            "marathi": (
                "समस्येच्या category आणि context नुसार system आवश्यक "
                "expertise ओळखण्यास मदत करते."
            )
        },

        "action": "expertise_matching"
    },


    "nearby_problems": {
        "questions": [
            "Can I see nearby problems?",
            "How do I find problems near me?",
            "Show problems in my area",
            "Are there similar problems near my location?",
            "nearby problems kaise dekhe",
            "mere area ki problems dikhao",
            "majhya area madhye problems",
            "majhya jawalche problems dakhva"
        ],

        "responses": {
            "english": (
                "The portal can help identify problems near a specified "
                "location. This helps citizens and authorities understand "
                "local issues affecting a particular area."
            ),

            "hindi": (
                "Portal किसी location के आसपास की समस्याओं को पहचानने में "
                "मदद कर सकता है।"
            ),

            "marathi": (
                "Portal दिलेल्या location जवळील समस्या ओळखण्यास मदत करू शकते."
            )
        },

        "action": "nearby_problems"
    },


    "open_challenges": {
        "questions": [
            "What are open challenges?",
            "How can I see open challenges?",
            "What problems need solutions?",
            "Can students solve challenges?",
            "What is an open challenge?",
            "open challenges kya hai",
            "open challenges mhanje kay"
        ],

        "responses": {
            "english": (
                "Open Challenges present important unresolved problems that "
                "need innovative solutions. They can help connect citizens, "
                "students, experts and institutions to work on real-world problems."
            ),

            "hindi": (
                "Open Challenges महत्वपूर्ण unresolved problems को प्रस्तुत "
                "कर सकते हैं जिनके लिए innovative solutions की आवश्यकता होती है।"
            ),

            "marathi": (
                "Open Challenges महत्त्वाच्या unresolved problems साठी "
                "innovative solutions शोधण्यास मदत करू शकतात."
            )
        },

        "action": "open_challenges"
    }
}


# ==========================================================
# LANGUAGE DETECTION
# ==========================================================

def detect_language(message: str) -> str:

    message_lower = message.lower()

    # Explicit language request
    if any(phrase in message_lower for phrase in [
        "in marathi",
        "marathi madhe",
        "marathi mein",
        "मराठीत"
    ]):
        return "marathi"

    if any(phrase in message_lower for phrase in [
        "in hindi",
        "hindi mein",
        "हिंदी में"
    ]):
        return "hindi"

    if any(phrase in message_lower for phrase in [
        "in english",
        "english please",
        "tell me in english"
    ]):
        return "english"

    # Marathi script
    marathi_words = [
        "म्हणजे", "काय", "कसे", "कशी",
        "मला", "आहे", "सांगा", "मध्ये"
    ]

    if any(word in message for word in marathi_words):
        return "marathi"

    # Hindi script
    hindi_words = [
        "क्या", "कैसे", "मुझे", "करना",
        "करें", "बताओ", "है", "कहाँ"
    ]

    if any(word in message for word in hindi_words):
        return "hindi"

    # Roman Marathi
    words = message_lower.split()

    marathi_indicators = [
        "kay", "kasa", "kashi", "mhanje",
        "mhnje", "mala", "ahe", "aahe",
        "sanga", "karaycha", "karaychi",
        "majhya", "gavacha", "chalta",
        "chalto", "baghaycha", "karat"
    ]

    marathi_score = sum(
        1 for word in words
        if word in marathi_indicators
    )

    # Roman Hindi
    hindi_indicators = [
        "kya", "kaise", "mujhe", "batao",
        "hai", "kare", "karna", "kaam",
        "mera", "meri", "kyu", "kyon",
        "dikhao", "chahiye"
    ]

    hindi_score = sum(
        1 for word in words
        if word in hindi_indicators
    )

    if marathi_score > hindi_score and marathi_score > 0:
        return "marathi"

    if hindi_score > marathi_score and hindi_score > 0:
        return "hindi"

    return "english"


# ==========================================================
# PREPARE KNOWLEDGE EMBEDDINGS
# ==========================================================

def prepare_embeddings():

    global knowledge_embeddings

    if knowledge_embeddings:
        return

    print("Preparing chatbot knowledge...")

    embedder = get_model()

    for intent, data in CHATBOT_KNOWLEDGE.items():

        knowledge_embeddings[intent] = embedder.encode(
            data["questions"],
            convert_to_tensor=True
        )


# ==========================================================
# SEMANTIC INTENT DETECTION
# ==========================================================

def detect_intent(message: str):

    prepare_embeddings()

    embedder = get_model()

    user_embedding = embedder.encode(
        message,
        convert_to_tensor=True
    )

    best_intent = None
    best_score = -1

    for intent, question_embeddings in knowledge_embeddings.items():

        scores = util.cos_sim(
            user_embedding,
            question_embeddings
        )[0]

        score = float(scores.max())

        if score > best_score:

            best_score = score
            best_intent = intent

    return best_intent, best_score


# ==========================================================
# FALLBACK RESPONSES
# ==========================================================

DEFAULT_RESPONSES = {

    "english": (
        "Sorry, I could not fully understand your question. "
        "I can help you with Samadhan Setu, submitting a problem, "
        "uploading photos or documents, tracking your problem, "
        "AI analysis, nearby problems and other portal features."
    ),

    "hindi": (
        "माफ़ कीजिए, मैं आपका प्रश्न पूरी तरह नहीं समझ पाया। "
        "आप समाधान सेतु, समस्या दर्ज करने, फोटो या दस्तावेज़ upload करने, "
        "problem status और AI analysis के बारे में पूछ सकते हैं।"
    ),

    "marathi": (
        "माफ करा, मला तुमचा प्रश्न पूर्णपणे समजला नाही. "
        "तुम्ही Samadhan Setu, समस्या नोंदवणे, फोटो किंवा documents upload करणे, "
        "problem status आणि AI analysis बद्दल विचारू शकता."
    )
}


# ==========================================================
# MAIN CHATBOT FUNCTION
# ==========================================================

def get_chatbot_response(message: str) -> dict:

    language = detect_language(message)

    intent, confidence = detect_intent(message)

    # Low confidence
    if confidence < 0.55:

        return {
            "language": language,
            "intent": "unknown",
            "confidence": round(confidence, 2),
            "response": DEFAULT_RESPONSES[language],
            "action": None
        }

    # Medium confidence
    confidence_level = "high"

    if confidence < 0.75:
        confidence_level = "medium"

    chatbot_data = CHATBOT_KNOWLEDGE[intent]

    return {
        "language": language,
        "intent": intent,
        "confidence": round(confidence, 2),
        "confidence_level": confidence_level,
        "response": chatbot_data["responses"][language],
        "action": chatbot_data["action"]
    }


# ==========================================================
# TEST CHATBOT
# ==========================================================

if __name__ == "__main__":

    print("\n========== SAMADHAN SETU AI CHATBOT ==========")
    print("Type 'exit' to close the chatbot.\n")

    while True:

        user_message = input("You: ").strip()

        if not user_message:
            print("Chatbot: Please type your question.\n")
            continue

        if user_message.lower() in [
            "exit",
            "quit",
            "bye",
            "बाय"
        ]:
            print("Chatbot: Thank you for using Samadhan Setu! 👋")
            break

        result = get_chatbot_response(user_message)

        print("Language:", result["language"])
        print("Intent:", result["intent"])
        print("Confidence:", result["confidence"])

        if "confidence_level" in result:
            print("Confidence Level:", result["confidence_level"])

        print("Action:", result["action"])
        print("Chatbot:", result["response"])
        print()