
import React from "react";
import { useComplaints } from "../context/ComplaintContext";
import { useLanguage } from "../context/LanguageContext";

function Notifications() {
  const {
    notifications,
    markNotificationRead,
    deleteNotification,
    clearAllNotifications,
  } = useComplaints();

  const { t } = useLanguage();

  const handleDelete = (id) => {
    deleteNotification(id);
  };

  const handleClearAll = () => {
    if (notifications.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all notifications?"
    );

    if (confirmed) {
      clearAllNotifications();
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "college":
        return "🏫";
      case "admin":
        return "🏢";
      default:
        return "🔔";
    }
  };

  const formatDate = (notification) => {
    if (notification.date) return notification.date;
    if (notification.createdAt) {
      return new Date(notification.createdAt).toLocaleString();
    }
    return "";
  };

  return (
    <div className="notifications-page">
      {/* Header */}
      <div className="notifications-header">
        <div>
          <h1>🔔 {t("notifications") || "Notifications"}</h1>
          <p>
            Stay updated with your complaint status, department responses,
            college requests and other important updates.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            type="button"
            className="clear-all-notifications-btn"
            onClick={handleClearAll}
          >
            🧹 Clear All
          </button>
        )}
      </div>

      {/* Notification Count */}
      <div className="notification-summary">
        <span>
          🔔 <strong>{notifications.length}</strong> notification
          {notifications.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Notifications */}
      {notifications.length === 0 ? (
        <div className="empty-notifications">
          <div className="empty-notification-icon">🔕</div>
          <h2>No Notifications</h2>
          <p>
            You don't have any notifications right now.
          </p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => {
            const notificationId =
              notification.id ||
              notification.notificationId ||
              `${notification.title}-${notification.message}`;

            return (
              <div
                key={notificationId}
                className={`notification-card ${
                  notification.read ? "read" : "unread"
                }`}
              >
                <div className="notification-main">
                  {/* Icon */}
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="notification-content">
                    <div className="notification-title-row">
                      <h3>
                        {notification.title || "Notification"}
                      </h3>

                      {!notification.read && (
                        <span className="new-badge">NEW</span>
                      )}
                    </div>

                    <p className="notification-message">
                      {notification.message ||
                        notification.text ||
                        "You have a new notification."}
                    </p>

                    {formatDate(notification) && (
                      <small className="notification-date">
                        🕒 {formatDate(notification)}
                      </small>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="notification-actions">
                  {!notification.read && (
                    <button
                      type="button"
                      className="mark-read-btn"
                      onClick={() =>
                        markNotificationRead(notificationId)
                      }
                    >
                      ✓ Mark as Read
                    </button>
                  )}

                  <button
                    type="button"
                    className="delete-notification-btn"
                    onClick={() => handleDelete(notificationId)}
                    title="Delete notification"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notifications;

