import React from "react";
import { Link } from "react-router-dom";
import { useComplaints } from "../context/ComplaintContext";

function MyComplaints() {
  const { complaints, deleteComplaint } = useComplaints();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (confirmDelete) {
      deleteComplaint(id);
    }
  };

  return (
    <div className="page-content">
      <div className="dashboard-header">
        <div>
          <h1>📂 My Complaints</h1>
          <p>View and manage all your submitted complaints.</p>
        </div>

        <Link to="/submit-problem" className="primary-button">
          + New Complaint
        </Link>
      </div>

      {complaints.length === 0 ? (
        <div className="dashboard-card empty-state">
          <div className="empty-icon">📭</div>
          <h2>No Complaints Found</h2>
          <p>You have not submitted any complaint yet.</p>

          <Link to="/submit-problem" className="primary-button">
            Submit Problem
          </Link>
        </div>
      ) : (
        <div className="complaints-list">
          {complaints
            .slice()
            .reverse()
            .map((complaint) => (
              <div className="dashboard-card complaint-item" key={complaint.id}>
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
                    <strong>Submitted:</strong>{" "}
                    {complaint.createdAt || "Recently"}
                  </p>

                  {complaint.description && (
                    <p>
                      <strong>Description:</strong>{" "}
                      {complaint.description}
                    </p>
                  )}
                </div>

                <div className="complaint-actions">
                  <Link
                    to="/track-status"
                    className="secondary-button"
                  >
                    📍 Track Status
                  </Link>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(complaint.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default MyComplaints;