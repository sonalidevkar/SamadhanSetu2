import React, { useState } from "react";
import { useComplaints } from "../context/ComplaintContext";

function AdminDashboard() {
  const {
    complaints,
    updateComplaintStatus,
  } = useComplaints();

  const [filter, setFilter] = useState("All");

  // ==========================================
  // FILTER
  // ==========================================

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter(
          (complaint) =>
            complaint.status === filter
        );

  // ==========================================
  // STATUS CHANGE
  // ==========================================

  const handleStatusChange = (
    id,
    status
  ) => {
    updateComplaintStatus(id, status);
  };

  // ==========================================
  // STATS
  // ==========================================

  const totalComplaints =
    complaints.length;

  const submittedComplaints =
    complaints.filter(
      (c) => c.status === "Submitted"
    ).length;

  const awaitingCollegeComplaints =
    complaints.filter(
      (c) =>
        c.status ===
        "Awaiting College Response"
    ).length;

  const inProgressComplaints =
    complaints.filter(
      (c) =>
        c.status === "In Progress"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (c) =>
        c.status === "Resolved"
    ).length;

  const collegeAcceptedComplaints =
    complaints.filter(
      (c) =>
        c.assignedType === "College" &&
        c.collegeAccepted === true
    ).length;

  return (
    <div className="admin-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">

        <div>

          <h1>
            🏢 Department Dashboard
          </h1>

          <p>
            Review complaints, monitor AI
            assignments, college collaboration
            and resolution progress.
          </p>

        </div>

      </div>

      {/* =====================================
          STATS
      ====================================== */}

      <div className="stats-grid">

        {/* TOTAL */}

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>

            <h3>
              {totalComplaints}
            </h3>

            <p>
              Total Complaints
            </p>

          </div>

        </div>

        {/* SUBMITTED */}

        <div className="stat-card">

          <div className="stat-icon">
            📝
          </div>

          <div>

            <h3>
              {submittedComplaints}
            </h3>

            <p>
              Submitted
            </p>

          </div>

        </div>

        {/* COLLEGE PENDING */}

        <div className="stat-card">

          <div className="stat-icon">
            🏫
          </div>

          <div>

            <h3>
              {awaitingCollegeComplaints}
            </h3>

            <p>
              College Pending
            </p>

          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="stat-card">

          <div className="stat-icon">
            🔄
          </div>

          <div>

            <h3>
              {inProgressComplaints}
            </h3>

            <p>
              In Progress
            </p>

          </div>

        </div>

        {/* RESOLVED */}

        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <h3>
              {resolvedComplaints}
            </h3>

            <p>
              Resolved
            </p>

          </div>

        </div>

        {/* COLLEGE ACCEPTED */}

        <div className="stat-card">

          <div className="stat-icon">
            🤝
          </div>

          <div>

            <h3>
              {collegeAcceptedComplaints}
            </h3>

            <p>
              College Accepted
            </p>

          </div>

        </div>

      </div>

      {/* =====================================
          FILTER
      ====================================== */}

      <div className="dashboard-card admin-filter-card">

        <div className="section-title-row">

          <h2>
            📂 Complaint Management
          </h2>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="admin-filter"
          >

            <option value="All">
              All Complaints
            </option>

            <option value="Submitted">
              Submitted
            </option>

            <option value="Awaiting College Response">
              Awaiting College Response
            </option>

            <option value="Under Review">
              Under Review
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Resolved">
              Resolved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>

      </div>

      {/* =====================================
          COMPLAINTS
      ====================================== */}

      {filteredComplaints.length === 0 ? (

        <div className="dashboard-card empty-state">

          <div className="empty-icon">
            📭
          </div>

          <h2>
            No Complaints Found
          </h2>

          <p>
            There are no complaints matching
            the selected filter.
          </p>

        </div>

      ) : (

        <div className="admin-complaints">

          {filteredComplaints
            .slice()
            .reverse()
            .map((complaint) => (

              <div
                className="dashboard-card admin-complaint-card"
                key={complaint.id}
              >

                {/* =================================
                    TOP
                ================================= */}

                <div className="complaint-top">

                  <div>

                    <h2>
                      {complaint.title ||
                        "Civic Problem"}
                    </h2>

                    <p className="complaint-id">
                      Complaint ID:{" "}
                      <strong>
                        {complaint.id}
                      </strong>
                    </p>

                  </div>

                  <span
                    className={`status-badge ${
                      complaint.status ===
                      "Resolved"
                        ? "status-resolved"
                        : complaint.status ===
                          "In Progress"
                        ? "status-progress"
                        : complaint.status ===
                          "Under Review"
                        ? "status-review"
                        : complaint.status ===
                          "Rejected"
                        ? "status-rejected"
                        : "status-submitted"
                    }`}
                  >
                    {complaint.status}
                  </span>

                </div>

                {/* =================================
                    CITIZEN
                ================================= */}

                <div className="admin-section">

                  <h3>
                    👤 Citizen Information
                  </h3>

                  <div className="admin-info-grid">

                    <div>

                      <span>
                        Name
                      </span>

                      <strong>
                        {complaint.fullName ||
                          complaint.name ||
                          "Not provided"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Mobile
                      </span>

                      <strong>
                        {complaint.userMobile ||
                          complaint.mobile ||
                          "Not provided"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Email
                      </span>

                      <strong>
                        {complaint.userEmail ||
                          complaint.email ||
                          "Not provided"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        City
                      </span>

                      <strong>
                        {complaint.city ||
                          "Not provided"}
                      </strong>

                    </div>

                  </div>

                </div>

                {/* =================================
                    PROBLEM
                ================================= */}

                <div className="admin-section">

                  <h3>
                    🚨 Problem Details
                  </h3>

                  <div className="admin-info-grid">

                    <div>

                      <span>
                        Category
                      </span>

                      <strong>
                        {complaint.category ||
                          "General"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Priority
                      </span>

                      <strong>
                        {complaint.priority ||
                          "Medium"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Location
                      </span>

                      <strong>
                        {complaint.exactLocation ||
                          complaint.location
                            ?.exactLocation ||
                          "Not provided"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Affected People
                      </span>

                      <strong>
                        {complaint.affectedPeople ||
                          "Not provided"}
                      </strong>

                    </div>

                  </div>

                  {complaint.description && (
                    <div className="admin-description">

                      <span>
                        Description
                      </span>

                      <p>
                        {complaint.description}
                      </p>

                    </div>
                  )}

                </div>

                {/* =================================
                    AI ASSIGNMENT
                ================================= */}

                <div className="admin-section ai-admin-section">

                  <h3>
                    🤖 AI Smart Assignment
                  </h3>

                  <div className="assignment-grid">

                    <div className="assignment-item">

                      <span>
                        Assigned Organization
                      </span>

                      <strong>
                        {complaint.assignedTo ||
                          "Manual Assignment"}
                      </strong>

                    </div>

                    <div className="assignment-item">

                      <span>
                        Organization Type
                      </span>

                      <strong>
                        {complaint.assignedType ||
                          "Authority"}
                      </strong>

                    </div>

                    <div className="assignment-item">

                      <span>
                        Recommended Service
                      </span>

                      <strong>
                        {complaint.service ||
                          "General Civic Service"}
                      </strong>

                    </div>

                    <div className="assignment-item">

                      <span>
                        Assigned Team
                      </span>

                      <strong>
                        {complaint.team ||
                          "Concerned Service Team"}
                      </strong>

                    </div>

                    <div className="assignment-item">

                      <span>
                        AI Match Score
                      </span>

                      <strong>
                        {complaint.assignmentScore ??
                          "N/A"}
                      </strong>

                    </div>

                    <div className="assignment-item">

                      <span>
                        Distance
                      </span>

                      <strong>
                        {complaint.distanceKm !=
                          null
                          ? `${Number(
                              complaint.distanceKm
                            ).toFixed(2)} km`
                          : "N/A"}
                      </strong>

                    </div>

                  </div>

                  {complaint.assignmentReason && (
                    <div className="assignment-reason">

                      💡{" "}

                      <strong>
                        AI Recommendation:
                      </strong>{" "}

                      {complaint.assignmentReason}

                    </div>
                  )}

                </div>

                {/* =================================
                    COLLEGE COLLABORATION
                ================================= */}

                {complaint.assignedType ===
                  "College" && (
                  <div className="admin-section college-admin-section">

                    <div className="section-title-row">

                      <h3>
                        🏫 College Collaboration
                      </h3>

                      <span
                        className={`college-status ${
                          complaint.collegeAccepted
                            ? "accepted"
                            : complaint
                                .collegeRequest
                                ?.status ===
                              "Rejected"
                            ? "rejected"
                            : "pending"
                        }`}
                      >
                        {complaint.collegeAccepted
                          ? "✅ Accepted"
                          : complaint
                              .collegeRequest
                              ?.status ===
                            "Rejected"
                          ? "❌ Rejected"
                          : "⏳ Waiting"}
                      </span>

                    </div>

                    <div className="college-admin-card">

                      {/* COLLEGE */}

                      <div className="admin-info-grid">

                        <div>

                          <span>
                            Assigned College
                          </span>

                          <strong>
                            {complaint.assignedTo ||
                              "Nearby College"}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Request Status
                          </span>

                          <strong>
                            {complaint
                              .collegeRequest
                              ?.status ||
                              "Pending"}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Student Team
                          </span>

                          <strong>
                            {complaint.team ||
                              "Civil Engineering Team"}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Service
                          </span>

                          <strong>
                            {complaint.service ||
                              "Civil / Technical Service"}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Distance
                          </span>

                          <strong>
                            {complaint.distanceKm !=
                              null
                              ? `${Number(
                                  complaint.distanceKm
                                ).toFixed(2)} km`
                              : "Nearby"}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Accepted By
                          </span>

                          <strong>
                            {complaint
                              .collegeRequest
                              ?.responseBy ||
                              "Waiting"}
                          </strong>

                        </div>

                      </div>

                      {/* REQUEST MESSAGE */}

                      {complaint
                        .collegeRequest
                        ?.message && (
                        <div className="college-request-message">

                          <span>
                            📩 Request Message
                          </span>

                          <p>
                            {
                              complaint
                                .collegeRequest
                                .message
                            }
                          </p>

                        </div>
                      )}

                      {/* PENDING */}

                      {!complaint.collegeAccepted &&
                        complaint
                          .collegeRequest
                          ?.status !==
                          "Rejected" && (

                        <div className="college-pending-message">

                          <strong>
                            ⏳ College Response Pending
                          </strong>

                          <p>
                            The problem request has
                            been sent to{" "}
                            <strong>
                              {complaint.assignedTo}
                            </strong>
                            .
                          </p>

                          <p>
                            Admin can monitor the
                            response from the College
                            Requests panel.
                          </p>

                        </div>
                      )}

                      {/* ACCEPTED */}

                      {complaint.collegeAccepted && (

                        <div className="college-success-message">

                          <strong>
                            ✅ College Accepted
                          </strong>

                          <p>
                            <strong>
                              {complaint.assignedTo}
                            </strong>{" "}
                            has accepted this problem.
                          </p>

                          <p>
                            👨‍🎓 Team:{" "}
                            <strong>
                              {complaint.team ||
                                "Civil Engineering Team"}
                            </strong>
                          </p>

                          <p>
                            🚀 Status:{" "}
                            <strong>
                              In Progress
                            </strong>
                          </p>

                          {complaint
                            .collegeRequest
                            ?.respondedAt && (
                            <small>
                              Accepted On:{" "}
                              {
                                complaint
                                  .collegeRequest
                                  .respondedAt
                              }
                            </small>
                          )}

                        </div>
                      )}

                      {/* REJECTED */}

                      {complaint
                        .collegeRequest
                        ?.status ===
                        "Rejected" && (

                        <div className="college-rejected-message">

                          <strong>
                            ❌ College Rejected
                          </strong>

                          <p>
                            <strong>
                              {complaint.assignedTo}
                            </strong>{" "}
                            could not accept this
                            problem.
                          </p>

                          {complaint
                            .collegeRequest
                            ?.rejectionReason && (
                            <p>
                              <strong>
                                Reason:
                              </strong>{" "}
                              {
                                complaint
                                  .collegeRequest
                                  .rejectionReason
                              }
                            </p>
                          )}

                          <p>
                            ⚠️ Admin reassignment is
                            required.
                          </p>

                        </div>
                      )}

                    </div>

                  </div>
                )}

                {/* =================================
                    GPS LOCATION
                ================================= */}

                {complaint.latitude != null &&
                  complaint.longitude != null && (

                  <div className="admin-location">

                    📍 GPS Location:{" "}

                    <strong>
                      {complaint.latitude},{" "}
                      {complaint.longitude}
                    </strong>

                  </div>
                )}

                {/* =================================
                    STATUS UPDATE
                ================================= */}

                <div className="admin-section">

                  <h3>
                    🔄 Update Complaint Status
                  </h3>

                  <div className="admin-status-buttons">

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        handleStatusChange(
                          complaint.id,
                          "Under Review"
                        )
                      }
                    >
                      🔍 Under Review
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        handleStatusChange(
                          complaint.id,
                          "In Progress"
                        )
                      }
                    >
                      🔄 In Progress
                    </button>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() =>
                        handleStatusChange(
                          complaint.id,
                          "Resolved"
                        )
                      }
                    >
                      ✅ Resolve
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        handleStatusChange(
                          complaint.id,
                          "Rejected"
                        )
                      }
                    >
                      ❌ Reject
                    </button>

                  </div>

                </div>

                {/* =================================
                    RESOLVED
                ================================= */}

                {complaint.status ===
                  "Resolved" && (

                  <div className="admin-resolved-box">

                    🎉{" "}
                    <strong>
                      Problem resolved successfully.
                    </strong>

                    <p>
                      🏫 Organization:{" "}
                      <strong>
                        {complaint.assignedTo ||
                          "Concerned Organization"}
                      </strong>
                    </p>

                    {complaint.assignedType ===
                      "College" && (
                      <p>
                        👨‍🎓 Team:{" "}
                        <strong>
                          {complaint.team ||
                            "College Student Team"}
                        </strong>
                      </p>
                    )}

                    <p>
                      ⭐ User earned +50 reward points.
                    </p>

                  </div>
                )}

              </div>
            ))}
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;