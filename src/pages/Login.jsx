
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    const result = login(email.trim(), password);

    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(result.message || "Invalid email or password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          🏛️
        </div>

        <h1>Welcome to SamadhanSetu</h1>

        <p className="auth-subtitle">
          Login to report and track community problems.
        </p>

        {/* Error */}
        {error && (
          <div className="auth-error">
            ❌ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            🔐 Login
          </button>

        </form>

        {/* Create Account */}
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

