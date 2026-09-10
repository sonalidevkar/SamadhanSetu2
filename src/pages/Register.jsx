import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
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

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const mobile = formData.mobile.trim();
    const city = formData.city.trim();
    const address = formData.address.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !mobile || !city || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name,
        email,
        mobile,
        city,
        address,
        password,
        role: "Citizen",
      });

      if (result?.success) {
        localStorage.removeItem("complaintUser");
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");

        alert("Account created successfully! Please login.");

        navigate("/login", {
          replace: true,
          state: {
            registeredEmail: email,
          },
        });
      } else {
        setError(result?.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err?.message ||
          "Registration failed. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">

        <div className="auth-logo">🏛️</div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Create your SamadhanSetu citizen account.
        </p>

        {error && (
          <div className="auth-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>
              Full Name <span>*</span>
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email <span>*</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Mobile Number <span>*</span>
            </label>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                setFormData((prev) => ({
                  ...prev,
                  mobile: value.slice(0, 10),
                }));

                setError("");
              }}
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              required
            />
          </div>

          <div className="form-group">
            <label>
              City <span>*</span>
            </label>

            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>
              Password <span>*</span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Confirm Password <span>*</span>
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "⏳ Creating Account..."
              : "📝 Create Account"}
          </button>
        </form>

        <div className="create-account-section">
          <p>Already have an account?</p>

          <Link
            to="/login"
            className="create-account-link"
          >
            🔐 Login here
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;