import { useState } from "react";
import { sendMessageToChatbot } from "../services/chatbotService";

function AIAssistant() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 I am Samadhan AI Assistant. Tell me about your civic problem and I will guide you.",
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: userText,
    };

    // Show user's message
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    // Clear input box
    setInput("");

    try {
      // Send message to Python AI backend
      const data = await sendMessageToChatbot(userText);

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          data.response ||
          "Sorry, I could not understand your question.",
      };

      // Show AI response
      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

    } catch (error) {
      console.error("Chatbot Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          "Sorry, the AI chatbot is currently unavailable.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    }
  };

  return (
    <div className="ai-container">

      <div className="ai-header">
        <div>
          <h1>🤖 Samadhan AI Assistant</h1>

          <p>
            Smart guidance for reporting community problems.
          </p>
        </div>
      </div>

      <div className="chat-box">

        {messages.map((message) => (

          <div
            key={message.id}
            className={
              message.sender === "user"
                ? "chat-message user"
                : "chat-message bot"
            }
          >

            <div className="chat-bubble">
              {message.text}
            </div>

          </div>

        ))}

      </div>

      <div className="chat-input-area">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Describe your problem..."
        />

        <button
          className="primary-button"
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default AIAssistant;