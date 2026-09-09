
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useComplaints } from "../context/ComplaintContext";

function Notifications() {
  const { user } = useAuth();

  const {
    notifications,
    markNotificationRead,
  } = useComplaints();

  const userMobile =
    user?.mobile || "Mobile number not available";

  return (
    <div className="notifications-page">

      <div className="dashboard-header">
        <div>
          <h1>🔔 Notifications</h1>

          <p>
            Complaint updates and important messages for your
            registered mobile number.
          </p>
        </div>
      </div>

      {/* USER MOBILE */}

      <div className="dashboard-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "12px",
              background: "#eef4ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            📱
          </div>

          <div>
            <p
              style={{
                color: "#7a8597",
                fontSize: "12px",
                marginBottom: "3px",
              }}
            >
              Notifications for
            </p>

            <strong
              style={{
                fontSize: "15px",
                color: "#2563eb",
              }}
            >
              {userMobile}
            </strong>
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS */}

      <div className="dashboard-card">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔕</div>

            <h2>No Notifications</h2>

            <p>
              You will receive complaint submission and status
              updates here.
            </p>
          </div>
        ) : (
          <div className="notification-list">

            {notifications.map((notification) => (
              <div
                className="notification-item"
                key={notification.id}
                onClick={() =>
                  markNotificationRead(notification.id)
                }
                style={{
                  cursor: "pointer",
                  background: notification.read
                    ? "transparent"
                    : "#f8faff",
                  padding: "16px",
                  borderRadius: "12px",
                  marginBottom: "8px",
                }}
              >

                <div className="notification-icon">
                  {notification.type === "status"
                    ? notification.status === "Resolved"
                      ? "✅"
                      : notification.status ===
                        "In Progress"
                      ? "🔄"
                      : "📢"
                    : "📋"}
                </div>

                <div className="notification-content">

                  <h3>
                    {notification.title}
                  </h3>

                  <p>
                    {notification.message}
                  </p>

                  <div
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <span>
                      📱 {notification.userMobile}
                    </span>

                    {notification.complaintId && (
                      <span>
                        🆔 {notification.complaintId}
                      </span>
                    )}

                    <span>
                      🕐 {notification.date}
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* HELP */}

      <div className="dashboard-card notification-help">

        <h2>📌 Need Help?</h2>

        <p>
          Track your complaint to see the latest status or contact
          support for assistance.
        </p>

        <div className="complaint-actions">

          <Link
            to="/track-status"
            className="secondary-button"
          >
            📍 Track Status
          </Link>

          <Link
            to="/help-support"
            className="primary-button"
          >
            ❓ Help & Support
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Notifications;

