import React from "react";
import { Link } from "react-router-dom";

function HelpSupport() {
  const faqs = [
    {
      question: "How do I submit a complaint?",
      answer:
        "Go to Submit Problem, enter your personal details and problem details, then submit the complaint.",
    },
    {
      question: "How can I track my complaint?",
      answer:
        "Open Track Status and enter the Complaint ID generated after submission.",
    },
    {
      question: "What information should I provide?",
      answer:
        "Provide the problem description, exact location, category, priority and supporting evidence such as a photo.",
    },
    {
      question: "How do I contact support?",
      answer:
        "Use the support options below or submit your feedback from the Feedback page.",
    },
  ];

  return (
    <div className="help-page">
      <div className="dashboard-header">
        <div>
          <h1>❓ Help & Support</h1>
          <p>Find answers and get help using SamadhanSetu.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>🚀 Quick Help</h2>

          <div className="quick-actions">
            <Link to="/submit-problem" className="quick-action">
              <span>📝</span>
              <div>
                <strong>Submit a Problem</strong>
                <p>Report your civic issue.</p>
              </div>
            </Link>

            <Link to="/track-status" className="quick-action">
              <span>📍</span>
              <div>
                <strong>Track Complaint</strong>
                <p>Check your complaint status.</p>
              </div>
            </Link>

            <Link to="/ai-assistant" className="quick-action">
              <span>🤖</span>
              <div>
                <strong>Ask Samadhan AI</strong>
                <p>Get smart guidance for your problem.</p>
              </div>
            </Link>

            <Link to="/feedback" className="quick-action">
              <span>⭐</span>
              <div>
                <strong>Give Feedback</strong>
                <p>Help us improve the portal.</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📞 Support</h2>

          <div className="support-box">
            <div className="support-item">
              <span>📧</span>
              <div>
                <strong>Email Support</strong>
                <p>support@samadhansetu.com</p>
              </div>
            </div>

            <div className="support-item">
              <span>📱</span>
              <div>
                <strong>Helpline</strong>
                <p>1800-123-4567</p>
              </div>
            </div>

            <div className="support-item">
              <span>🕐</span>
              <div>
                <strong>Support Hours</strong>
                <p>Monday – Saturday, 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card faq-card">
        <h2>💬 Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={index}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="dashboard-card emergency-card">
        <h2>🚨 Emergency</h2>
        <p>
          For immediate emergencies involving life, safety or serious danger,
          contact the appropriate emergency service directly rather than
          waiting for a portal complaint to be processed.
        </p>
      </div>
    </div>
  );
}

export default HelpSupport;