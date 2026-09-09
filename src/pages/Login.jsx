import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = login(cleanEmail, cleanPassword);

      if (!result?.success) {
        setError(
          result?.message || "Invalid email or password."
        );
        setLoading(false);
        return;
      }

      const loggedInUser = result.user;

      console.log("LOGIN SUCCESS:", loggedInUser);

      // Role based redirect
      switch (loggedInUser?.role) {
        case "admin":
          navigate("/admin", { replace: true });
          break;

        case "college":
          navigate("/college-dashboard", {
            replace: true,
          });
          break;

        case "industry":
          navigate("/industry-dashboard", {
            replace: true,
          });
          break;

        case "citizen":
        default:
          navigate("/dashboard", {
            replace: true,
          });
          break;
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError("Something went wrong during login.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          🏛️
        </div>

        <h1>
          Welcome to SamadhanSetu
        </h1>

        <p className="auth-subtitle">
          Login to report and track community problems.
        </p>

        {error && (
          <div className="auth-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "⏳ Logging in..."
              : "🔐 Login"}
          </button>

        </form>

        <div className="create-account-section">
          <p>
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="create-account-link"
          >
            📝 Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;