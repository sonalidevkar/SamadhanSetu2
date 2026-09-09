const CHATBOT_API_URL = "http://127.0.0.1:8000/chat";

export async function sendMessageToChatbot(message) {
  try {
    const response = await fetch(CHATBOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get a response from the chatbot");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Chatbot API Error:", error);

    return {
      response:
        "Sorry, the chatbot service is currently unavailable. Please try again later.",
      intent: "error",
      confidence: 0,
      action: "none",
    };
  }
}