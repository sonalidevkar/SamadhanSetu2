
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      console.log("LOGIN ATTEMPT:", email);

      const result = await login(email, password);

      console.log("LOGIN RESULT:", result);

      if (!result?.success) {
        setError(
          result?.message || "Invalid email or password."
        );
        return;
      }

      const role = String(
        result?.user?.role || ""
      ).toLowerCase();

      console.log("USER ROLE:", role);

      switch (role) {
        case "admin":
          navigate("/admin", {
            replace: true,
          });
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

      setError(
        error?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <h1>Welcome to SamadhanSetu</h1>

          <p>
            Login to report and track community problems.
          </p>
        </div>

        {error && (
          <div
            className="login-error"
            role="alert"
          >
            ❌ {error}
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "🔄 Logging in..."
              : "🔐 Login"}
          </button>
        </form>

        <div className="login-register">
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;

