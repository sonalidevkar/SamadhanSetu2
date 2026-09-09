import React from "react";
import { useComplaints } from "../context/ComplaintContext";
import { useAuth } from "../context/AuthContext";

function IndustryDashboard() {
  const {
    complaints = [],
    updateComplaintStatus,
  } = useComplaints();

  const { user } = useAuth();

  const industryName =
    user?.organizationName ||
    user?.name ||
    "Industry Partner";

  const assignedProblems = complaints.filter((complaint) => {
    const assignedIndustry =
      complaint.assignedIndustry ||
      complaint.industryName ||
      complaint.assignedToIndustry ||
      complaint.assignedTo;

    return (
      user?.role === "industry" &&
      (
        assignedIndustry === industryName ||
        assignedIndustry === user?.name
      )
    );
  });

  const pendingProblems = assignedProblems.filter((problem) => {
    return (
      problem.status !== "In Progress" &&
      problem.status !== "Resolved" &&
      problem.status !== "Rejected"
    );
  });

  const activeProblems = assignedProblems.filter((problem) => {
    return (
      problem.status === "In Progress" ||
      problem.status === "Resolved"
    );
  });

  const resolvedProblems = assignedProblems.filter(
    (problem) => problem.status === "Resolved"
  );

  const handleAccept = (problem) => {
    updateComplaintStatus(
      problem.id,
      "In Progress"
    );
  };

  const handleReject = (problem) => {
    const reason = window.prompt(
      "Enter reason for rejecting this problem:"
    );

    if (!reason?.trim()) return;

    updateComplaintStatus(
      problem.id,
      "Rejected"
    );
  };

  const handleResolve = (problem) => {
    const confirmed = window.confirm(
      "Are you sure this problem is solved?"
    );

    if (!confirmed) return;

    updateComplaintStatus(
      problem.id,
      "Resolved"
    );
  };

  return (
    <div className="industry-dashboard">

      <div className="industry-dashboard-header">
        <div>
          <span className="dashboard-badge">
            🏭 INDUSTRY PARTNER
          </span>

          <h1>{industryName}</h1>

          <p>
            Manage assigned problems and track
            community solutions.
          </p>
        </div>

        <div className="industry-header-icon">
          🏭
        </div>
      </div>

      <div className="industry-role-info">
        <div>
          <strong>👤 User:</strong>{" "}
          {user?.name || "Industry User"}
        </div>

        <div>
          <strong>📧 Email:</strong>{" "}
          {user?.email || "Not available"}
        </div>

        <div>
          <strong>🏭 Organization:</strong>{" "}
          {industryName}
        </div>
      </div>

      <div className="industry-stats-grid">

        <div className="industry-stat-card">
          <div className="stat-icon">📋</div>
          <div>
            <h3>{assignedProblems.length}</h3>
            <p>Total Assigned</p>
          </div>
        </div>

        <div className="industry-stat-card pending">
          <div className="stat-icon">⏳</div>
          <div>
            <h3>{pendingProblems.length}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="industry-stat-card progress">
          <div className="stat-icon">🔧</div>
          <div>
            <h3>{activeProblems.length}</h3>
            <p>Active</p>
          </div>
        </div>

        <div className="industry-stat-card solved">
          <div className="stat-icon">✅</div>
          <div>
            <h3>{resolvedProblems.length}</h3>
            <p>Resolved</p>
          </div>
        </div>

      </div>

      <section className="industry-section">

        <div className="section-heading">
          <div>
            <h2>📩 Assigned Problems</h2>
            <p>
              Problems assigned by the admin.
            </p>
          </div>
        </div>

        {pendingProblems.length === 0 ? (
          <div className="industry-empty-state">
            <div>📭</div>
            <h3>No pending problems</h3>
            <p>
              New assigned problems will appear here.
            </p>
          </div>
        ) : (
          <div className="industry-problem-list">

            {pendingProblems.map((problem) => (
              <div
                className="industry-problem-card"
                key={problem.id}
              >

                <div className="problem-card-top">
                  <div>
                    <span className="problem-id">
                      🆔 {problem.id}
                    </span>

                    <h3>
                      {problem.title ||
                        problem.problemTitle ||
                        problem.description ||
                        "Community Problem"}
                    </h3>
                  </div>

                  <span className="status pending-status">
                    Pending
                  </span>
                </div>

                <div className="problem-details">

                  <div>
                    <strong>🔧 Category</strong>
                    <span>
                      {problem.category || "General"}
                    </span>
                  </div>

                  <div>
                    <strong>📍 Location</strong>
                    <span>
                      {problem.location ||
                        problem.address ||
                        "Location not available"}
                    </span>
                  </div>

                  <div>
                    <strong>👤 Citizen</strong>
                    <span>
                      {problem.userName ||
                        problem.citizenName ||
                        "Citizen"}
                    </span>
                  </div>

                </div>

                <p className="problem-description">
                  {problem.description ||
                    "No description available."}
                </p>

                <div className="industry-action-buttons">

                  <button
                    type="button"
                    className="accept-problem-btn"
                    onClick={() =>
                      handleAccept(problem)
                    }
                  >
                    ✅ Accept
                  </button>

                  <button
                    type="button"
                    className="reject-problem-btn"
                    onClick={() =>
                      handleReject(problem)
                    }
                  >
                    ❌ Reject
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      <section className="industry-section">

        <div className="section-heading">
          <div>
            <h2>🔧 Problems Under Work</h2>
            <p>
              Track accepted problems and update progress.
            </p>
          </div>
        </div>

        {activeProblems.length === 0 ? (
          <div className="industry-empty-state">
            <div>📭</div>
            <h3>No active problems</h3>
            <p>
              Accepted problems will appear here.
            </p>
          </div>
        ) : (
          <div className="industry-problem-list">

            {activeProblems.map((problem) => (
              <div
                className="industry-problem-card"
                key={problem.id}
              >

                <div className="problem-card-top">

                  <div>
                    <span className="problem-id">
                      🆔 {problem.id}
                    </span>

                    <h3>
                      {problem.title ||
                        problem.problemTitle ||
                        "Community Problem"}
                    </h3>
                  </div>

                  <span className="status progress-status">
                    {problem.status === "Resolved"
                      ? "Resolved"
                      : "In Progress"}
                  </span>

                </div>

                <div className="problem-details">

                  <div>
                    <strong>📍 Location</strong>
                    <span>
                      {problem.location ||
                        problem.address ||
                        "Location not available"}
                    </span>
                  </div>

                  <div>
                    <strong>🔧 Category</strong>
                    <span>
                      {problem.category || "General"}
                    </span>
                  </div>

                  <div>
                    <strong>👤 Citizen</strong>
                    <span>
                      {problem.userName ||
                        problem.citizenName ||
                        "Citizen"}
                    </span>
                  </div>

                </div>

                <div className="tracking-box">

                  <div className="tracking-step completed">
                    <span>1</span>
                    <p>Assigned</p>
                  </div>

                  <div className="tracking-line"></div>

                  <div className="tracking-step completed">
                    <span>2</span>
                    <p>Accepted</p>
                  </div>

                  <div className="tracking-line"></div>

                  <div
                    className={`tracking-step ${
                      problem.status === "Resolved"
                        ? "completed"
                        : "current"
                    }`}
                  >
                    <span>3</span>
                    <p>In Progress</p>
                  </div>

                  <div className="tracking-line"></div>

                  <div
                    className={`tracking-step ${
                      problem.status === "Resolved"
                        ? "completed"
                        : ""
                    }`}
                  >
                    <span>4</span>
                    <p>Resolved</p>
                  </div>

                </div>

                {problem.status !== "Resolved" && (
                  <button
                    type="button"
                    className="resolve-problem-btn"
                    onClick={() =>
                      handleResolve(problem)
                    }
                  >
                    ✅ Mark as Resolved
                  </button>
                )}

                {problem.status === "Resolved" && (
                  <div className="resolved-message">
                    ✅ Problem successfully resolved.
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default IndustryDashboard;