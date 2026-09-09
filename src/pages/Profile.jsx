import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    city: user?.city || "",
    address: user?.address || "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser =
      JSON.parse(localStorage.getItem("registeredUser")) || {};

    const updatedUser = {
      ...existingUser,
      ...profile,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "complaintUser",
      JSON.stringify(updatedUser)
    );

    setSaved(true);
  };

  return (
    <div className="profile-page">
      <div className="dashboard-header">
        <div>
          <h1>👤 My Profile</h1>
          <p>Manage your personal information.</p>
        </div>
      </div>

      <div className="profile-layout">
        <div className="dashboard-card profile-summary">
          <div className="profile-avatar">
            {profile.name
              ? profile.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <h2>{profile.name || "Citizen"}</h2>
          <p>{profile.email || "No email added"}</p>

          <div className="profile-info">
            <div>
              <span>📱</span>
              <p>{profile.mobile || "Mobile not added"}</p>
            </div>

            <div>
              <span>📍</span>
              <p>{profile.city || "City not added"}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card profile-form-card">
          <h2>✏️ Edit Profile</h2>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
              />
            </div>

            <div className="form-group">
              <label>City</label>

              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </div>

            <div className="form-group">
              <label>Address</label>

              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows="4"
              />
            </div>

            {saved && (
              <div className="success-message">
                ✅ Profile updated successfully!
              </div>
            )}

            <button type="submit" className="primary-button">
              💾 Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;