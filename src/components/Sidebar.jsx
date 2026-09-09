
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/dashboard",
      label: t("dashboard"),
      icon: "🏠",
    },
    {
      path: "/submit-problem",
      label: t("submitProblem"),
      icon: "📝",
    },
    {
      path: "/my-complaints",
      label: t("myComplaints"),
      icon: "📂",
    },
    {
      path: "/track-status",
      label: t("trackStatus"),
      icon: "📍",
    },
    {
      path: "/ai-assistant",
      label: t("aiAssistant"),
      icon: "🤖",
    },
    {
      path: "/notifications",
      label: t("notifications"),
      icon: "🔔",
    },
    {
      path: "/help-support",
      label: t("helpSupport"),
      icon: "❓",
    },
    {
      path: "/feedback",
      label: t("feedback"),
      icon: "⭐",
    },
    {
      path: "/profile",
      label: t("profile"),
      icon: "👤",
    },
    {
      path: "/admin",
      label: t("departmentPanel"),
      icon: "🏢",
    },
    {
      path: "/college-requests",
      label: t("collegeRequests"),
      icon: "🏫",
    },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <aside className="sidebar">

      {/* Sidebar Title */}
      <div className="sidebar-title">
        Citizen Portal
      </div>

      {/* Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span className="sidebar-label">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Login / Register */}
      <div className="sidebar-auth-section">

        <div className="sidebar-auth-title">
          Account
        </div>

        <button
          type="button"
          className="sidebar-auth-btn sidebar-login-btn"
          onClick={handleLogin}
        >
          🔐 Login
        </button>

        <button
          type="button"
          className="sidebar-auth-btn sidebar-register-btn"
          onClick={handleRegister}
        >
          📝 Register
        </button>

        {user && (
          <button
            type="button"
            className="sidebar-auth-btn sidebar-logout-btn"
            onClick={logout}
          >
            🚪 Logout
          </button>
        )}

      </div>
    </aside>
  );
}

export default Sidebar;
