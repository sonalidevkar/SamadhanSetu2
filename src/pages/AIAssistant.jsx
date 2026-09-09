
import { useState } from "react";

function AIAssistant() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 I am Samadhan AI Assistant. Tell me about your civic problem and I will guide you.",
    },
  ]);

  const getAIResponse = (text) => {
    const problem = text.toLowerCase();

    if (
      problem.includes("road") ||
      problem.includes("pothole") ||
      problem.includes("रस्ता")
    ) {
      return "🛣️ This looks like a Road & Infrastructure problem. Recommended department: Public Works Department. Please provide the exact location and upload a photo if possible.";
    }

    if (
      problem.includes("water") ||
      problem.includes("पाणी")
    ) {
      return "💧 This looks like a Water Supply problem. Recommended department: Water Supply Department. Please mention the affected area and duration of the issue.";
    }

    if (
      problem.includes("garbage") ||
      problem.includes("waste") ||
      problem.includes("कचरा")
    ) {
      return "🗑️ This looks like a Waste Management problem. Recommended department: Municipal Sanitation Department. Add the location and photo of the garbage issue.";
    }

    if (
      problem.includes("electric") ||
      problem.includes("light") ||
      problem.includes("वीज")
    ) {
      return "⚡ This looks like an Electricity / Street Light problem. Recommended department: Electricity Department.";
    }

    if (
      problem.includes("drain") ||
      problem.includes("drainage") ||
      problem.includes("नाला")
    ) {
      return "🚰 This looks like a Drainage problem. Recommended department: Drainage & Sewerage Department.";
    }

    if (
      problem.includes("school") ||
      problem.includes("college") ||
      problem.includes("education")
    ) {
      return "🎓 This looks like an Education-related problem. Recommended department: Education Department.";
    }

    if (
      problem.includes("unsafe") ||
      problem.includes("danger") ||
      problem.includes("accident") ||
      problem.includes("सुरक्षित नाही")
    ) {
      return "🚨 This may be a high-priority public safety issue. Please provide the exact location and details. For an immediate emergency, contact the appropriate emergency service directly.";
    }

    return "🤖 I understand your concern. Please provide more details such as the problem type, exact location, how long it has existed, and how many people are affected.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    const aiMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: getAIResponse(input),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      aiMessage,
    ]);

    setInput("");
  };

  return (
    <div className="ai-container">

      <div className="ai-header">

        <div>
          <h1>🤖 Samadhan AI Assistant</h1>

          <p>
            Smart guidance for reporting community
            problems.
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
          onChange={(e) =>
            setInput(e.target.value)
          }
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

