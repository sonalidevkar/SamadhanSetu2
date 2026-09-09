import React from "react";

function ComplaintCard({ complaint, onDelete }) {
  if (!complaint) return null;

  return (
    <div className="dashboard-card complaint-card">
      <div className="complaint-top">
        <div>
          <h2>{complaint.title || "Civic Problem"}</h2>

          <p className="complaint-id">
            Complaint ID: <strong>{complaint.id}</strong>
          </p>
        </div>

        <span className="status-badge">
          {complaint.status || "Submitted"}
        </span>
      </div>

      <div className="complaint-details">
        <p>
          <strong>Category:</strong>{" "}
          {complaint.category || "General"}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {complaint.exactLocation ||
            complaint.location ||
            "Not provided"}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {complaint.createdAt || "Recently"}
        </p>

        {complaint.description && (
          <p>
            <strong>Description:</strong>{" "}
            {complaint.description}
          </p>
        )}
      </div>

      {complaint.department && (
        <div className="department-info">
          🏢 <strong>Department:</strong>{" "}
          {complaint.department}
        </div>
      )}

      {onDelete && (
        <div className="complaint-actions">
          <button
            className="delete-button"
            onClick={() => onDelete(complaint.id)}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ComplaintCard;