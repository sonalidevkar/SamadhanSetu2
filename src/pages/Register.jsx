
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const {
      name,
      email,
      mobile,
      city,
      address,
      password,
      confirmPassword,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !city.trim() ||
      !password.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const result = register({
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      city: city.trim(),
      address: address.trim(),
      password,
    });

    if (result.success) {
      // Logout current session after registration
      localStorage.removeItem("complaintUser");

      alert("Account created successfully! Please login.");

      navigate("/login", { replace: true });
    } else {
      setError(result.message || "Registration failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">

        {/* Logo */}
        <div className="auth-logo">
          🏛️
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Create your SamadhanSetu citizen account.
        </p>

        {/* Error */}
        {error && (
          <div className="auth-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Name */}
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
            />
          </div>

          {/* Email */}
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
            />
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label>
              Mobile Number <span>*</span>
            </label>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
            />
          </div>

          {/* City */}
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
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </div>

          {/* Password */}
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
            />
          </div>

          {/* Confirm Password */}
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
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            📝 Create Account
          </button>

        </form>

        {/* Login */}
        <div className="create-account-section">
          <p>
            Already have an account?
          </p>

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

