import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { language, changeLanguage } =
    useLanguage();

  const { user, logout } = useAuth();

  return (
    <header className="navbar">

      <div className="navbar-left">

        <div className="navbar-logo">
          🏛️ SamadhanSetu
        </div>

        <span className="navbar-subtitle">
          AI-Powered Civic Helpdesk
        </span>

      </div>

      <div className="navbar-right">

        {/* LANGUAGE */}

        <select
          className="language-select"
          value={language}
          onChange={(e) =>
            changeLanguage(e.target.value)
          }
          aria-label="Select Language"
        >
          <option value="en">
            🇬🇧 English
          </option>

          <option value="mr">
            🇮🇳 मराठी
          </option>

          <option value="hi">
            🇮🇳 हिन्दी
          </option>
        </select>

        {/* USER */}

        {user && (
          <div className="navbar-user">
            <div className="navbar-avatar">
              👤
            </div>

            <div className="navbar-user-info">
              <strong>
                {user.name || "Citizen"}
              </strong>

              <small>
                {user.city || "India"}
              </small>
            </div>
          </div>
        )}

        {/* LOGOUT */}

        {user && (
          <button
            type="button"
            className="logout-button"
            onClick={logout}
          >
            🚪 Logout
          </button>
        )}

      </div>

    </header>
  );
}

export default Navbar;