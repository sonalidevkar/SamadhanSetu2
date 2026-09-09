import React from "react";
import { useComplaints } from "../context/ComplaintContext";
import { useAuth } from "../context/AuthContext";

/* =========================================================
   LOCATION HELPER
========================================================= */

const getLocationText = (location) => {
  if (!location) {
    return "Location not available";
  }

  if (typeof location === "string") {
    return location;
  }

  if (typeof location === "object") {
    if (location.exactLocation) {
      return location.exactLocation;
    }

    if (
      location.latitude !== undefined &&
      location.longitude !== undefined
    ) {
      return `${location.latitude}, ${location.longitude}`;
    }

    return "Location not available";
  }

  return "Location not available";
};

/* =========================================================
   COLLEGE DASHBOARD
========================================================= */

function CollegeDashboard() {
  const {
    complaints = [],
    acceptCollegeRequest,
    rejectCollegeRequest,
    updateComplaintStatus,
  } = useComplaints();

  const { user } = useAuth();

  console.log("COLLEGE DASHBOARD LOADED");
  console.log("CURRENT USER:", user);
  console.log("COMPLAINTS:", complaints);

  /* =========================================================
     COLLEGE NAME
  ========================================================= */

  const collegeName =
    user?.organizationName ||
    user?.name ||
    "Karmala Engineering College";

  /* =========================================================
     ASSIGNED PROBLEMS
  ========================================================= */

  const assignedProblems = complaints.filter((complaint) => {
    const assignedCollege =
      complaint.assignedCollege ||
      complaint.assignedToCollege ||
      complaint.collegeName ||
      complaint.assignedTo;

    return (
      user?.role === "college" &&
      (
        assignedCollege === collegeName ||
        assignedCollege === user?.name ||
        assignedCollege === user?.organizationName ||
        assignedCollege === "Karmala Engineering College"
      )
    );
  });

  /* =========================================================
     PENDING PROBLEMS
  ========================================================= */

  const pendingProblems = assignedProblems.filter((problem) => {
    const isRejected =
      problem.rejectedByCollege === true ||
      problem.collegeStatus === "Rejected" ||
      problem.status === "Rejected";

    const isAccepted =
      problem.acceptedByCollege === true ||
      problem.collegeStatus === "Accepted" ||
      problem.status === "In Progress" ||
      problem.status === "Resolved";

    return !isRejected && !isAccepted;
  });

  /* =========================================================
     ACCEPTED / WORKING PROBLEMS
  ========================================================= */

  const acceptedProblems = assignedProblems.filter((problem) => {
    return (
      problem.acceptedByCollege === true ||
      problem.collegeStatus === "Accepted" ||
      problem.status === "In Progress" ||
      problem.status === "Resolved"
    );
  });

  /* =========================================================
     RESOLVED PROBLEMS
  ========================================================= */

  const resolvedProblems = assignedProblems.filter(
    (problem) => problem.status === "Resolved"
  );

  /* =========================================================
     ACCEPT PROBLEM
  ========================================================= */

  const handleAccept = (complaint) => {
    if (
      typeof acceptCollegeRequest !== "function"
    ) {
      console.error(
        "acceptCollegeRequest is missing from ComplaintContext"
      );
      return;
    }

    acceptCollegeRequest(complaint.id);
  };

  /* =========================================================
     REJECT PROBLEM
  ========================================================= */

  const handleReject = (complaint) => {
    const reason = window.prompt(
      "Enter reason for rejecting this problem:"
    );

    if (!reason || !reason.trim()) {
      return;
    }

    if (
      typeof rejectCollegeRequest !== "function"
    ) {
      console.error(
        "rejectCollegeRequest is missing from ComplaintContext"
      );
      return;
    }

    rejectCollegeRequest(
      complaint.id,
      reason.trim()
    );
  };

  /* =========================================================
     START WORK
  ========================================================= */

  const handleStartWork = (complaint) => {
    if (
      typeof updateComplaintStatus !== "function"
    ) {
      console.error(
        "updateComplaintStatus is missing from ComplaintContext"
      );
      return;
    }

    updateComplaintStatus(
      complaint.id,
      "In Progress"
    );
  };

  /* =========================================================
     RESOLVE
  ========================================================= */

  const handleResolve = (complaint) => {
    const confirmed = window.confirm(
      "Are you sure this problem has been successfully solved?"
    );

    if (!confirmed) {
      return;
    }

    if (
      typeof updateComplaintStatus !== "function"
    ) {
      console.error(
        "updateComplaintStatus is missing from ComplaintContext"
      );
      return;
    }

    updateComplaintStatus(
      complaint.id,
      "Resolved"
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="college-dashboard">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="college-dashboard-header">

        <div>
          <span className="dashboard-badge">
            🏫 COLLEGE PARTNER
          </span>

          <h1>
            {collegeName}
          </h1>

          <p>
            Manage assigned community problems,
            accept tasks and track solutions.
          </p>
        </div>

        <div className="college-header-icon">
          🏫
        </div>

      </div>


      {/* =====================================================
          USER INFORMATION
      ===================================================== */}

      <div className="college-role-info">

        <div>
          <strong>👤 Logged in as:</strong>{" "}
          {user?.name || "College User"}
        </div>

        <div>
          <strong>📧 Email:</strong>{" "}
          {user?.email || "Not available"}
        </div>

        <div>
          <strong>🏫 College:</strong>{" "}
          {collegeName}
        </div>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="college-stats-grid">

        <div className="college-stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>
            <h3>
              {assignedProblems.length}
            </h3>

            <p>
              Total Assigned
            </p>
          </div>

        </div>


        <div className="college-stat-card pending">

          <div className="stat-icon">
            ⏳
          </div>

          <div>
            <h3>
              {pendingProblems.length}
            </h3>

            <p>
              Pending
            </p>
          </div>

        </div>


        <div className="college-stat-card progress">

          <div className="stat-icon">
            🔧
          </div>

          <div>
            <h3>
              {acceptedProblems.length}
            </h3>

            <p>
              Accepted / Working
            </p>
          </div>

        </div>


        <div className="college-stat-card solved">

          <div className="stat-icon">
            ✅
          </div>

          <div>
            <h3>
              {resolvedProblems.length}
            </h3>

            <p>
              Resolved
            </p>
          </div>

        </div>

      </div>


      {/* =====================================================
          ASSIGNED PROBLEMS
      ===================================================== */}

      <section className="college-section">

        <div className="section-heading">

          <div>
            <h2>
              📩 Assigned Problems
            </h2>

            <p>
              Review the problems assigned
              to your college.
            </p>
          </div>

        </div>


        {pendingProblems.length === 0 ? (

          <div className="college-empty-state">

            <div>
              📭
            </div>

            <h3>
              No pending problems
            </h3>

            <p>
              New problems assigned by the
              admin will appear here.
            </p>

          </div>

        ) : (

          <div className="college-problem-list">

            {pendingProblems.map((problem) => (

              <div
                className="college-problem-card"
                key={problem.id}
              >

                {/* Problem Header */}

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

                  <span className="status pending-status">
                    Pending
                  </span>

                </div>


                {/* Problem Details */}

                <div className="problem-details">

                  <div>

                    <strong>
                      🔧 Category
                    </strong>

                    <span>
                      {problem.category ||
                        "General"}
                    </span>

                  </div>


                  <div>

                    <strong>
                      📍 Location
                    </strong>

                    <span>
                      {getLocationText(
                        problem.location
                      ) ||
                        problem.address ||
                        "Location not available"}
                    </span>

                  </div>


                  <div>

                    <strong>
                      👤 Citizen
                    </strong>

                    <span>
                      {problem.userName ||
                        problem.citizenName ||
                        problem.user?.name ||
                        "Citizen"}
                    </span>

                  </div>

                </div>


                {/* Description */}

                <p className="problem-description">

                  {problem.description ||
                    problem.title ||
                    problem.problemTitle ||
                    "No description available."}

                </p>


                {/* Additional Information */}

                <div className="college-problem-extra">

                  <span>
                    📱 Mobile:{" "}
                    {problem.mobile ||
                      problem.userMobile ||
                      "Not available"}
                  </span>

                  <span>
                    🕐 Submitted:{" "}
                    {problem.createdAt ||
                      problem.date ||
                      "Not available"}
                  </span>

                </div>


                {/* Actions */}

                <div className="college-action-buttons">

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


      {/* =====================================================
          ACCEPTED / WORKING PROBLEMS
      ===================================================== */}

      <section className="college-section">

        <div className="section-heading">

          <div>

            <h2>
              🔧 Problems Under Work
            </h2>

            <p>
              Track and update the progress
              of accepted problems.
            </p>

          </div>

        </div>


        {acceptedProblems.length === 0 ? (

          <div className="college-empty-state">

            <div>
              📭
            </div>

            <h3>
              No active problems
            </h3>

            <p>
              Accepted problems will appear here.
            </p>

          </div>

        ) : (

          <div className="college-problem-list">

            {acceptedProblems.map((problem) => (

              <div
                className="college-problem-card active-card"
                key={problem.id}
              >

                {/* Header */}

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


                  <span
                    className={`status ${
                      problem.status === "Resolved"
                        ? "resolved-status"
                        : "progress-status"
                    }`}
                  >
                    {problem.status === "Resolved"
                      ? "Resolved"
                      : "In Progress"}
                  </span>

                </div>


                {/* Details */}

                <div className="problem-details">

                  <div>

                    <strong>
                      📍 Location
                    </strong>

                    <span>
                      {getLocationText(
                        problem.location
                      ) ||
                        problem.address ||
                        "Location not available"}
                    </span>

                  </div>


                  <div>

                    <strong>
                      🔧 Category
                    </strong>

                    <span>
                      {problem.category ||
                        "General"}
                    </span>

                  </div>


                  <div>

                    <strong>
                      👤 Reported By
                    </strong>

                    <span>
                      {problem.userName ||
                        problem.citizenName ||
                        problem.user?.name ||
                        "Citizen"}
                    </span>

                  </div>

                </div>


                {/* Description */}

                <p className="problem-description">

                  {problem.description ||
                    problem.title ||
                    "No description available."}

                </p>


                {/* Tracking */}

                <div className="tracking-box">

                  <div className="tracking-step completed">

                    <span>
                      1
                    </span>

                    <p>
                      Problem Assigned
                    </p>

                  </div>


                  <div className="tracking-line"></div>


                  <div className="tracking-step completed">

                    <span>
                      2
                    </span>

                    <p>
                      College Accepted
                    </p>

                  </div>


                  <div className="tracking-line"></div>


                  <div
                    className={`tracking-step ${
                      problem.status === "Resolved"
                        ? "completed"
                        : "current"
                    }`}
                  >

                    <span>
                      3
                    </span>

                    <p>
                      Work in Progress
                    </p>

                  </div>


                  <div className="tracking-line"></div>


                  <div
                    className={`tracking-step ${
                      problem.status === "Resolved"
                        ? "completed"
                        : ""
                    }`}
                  >

                    <span>
                      4
                    </span>

                    <p>
                      Resolved
                    </p>

                  </div>

                </div>


                {/* Work Actions */}

                {problem.status !== "Resolved" && (

                  <div className="college-work-actions">

                    <button
                      type="button"
                      className="start-work-btn"
                      onClick={() =>
                        handleStartWork(problem)
                      }
                      disabled={
                        problem.status === "In Progress"
                      }
                    >
                      {problem.status === "In Progress"
                        ? "🔧 Work In Progress"
                        : "🔧 Start Work"}
                    </button>


                    <button
                      type="button"
                      className="resolve-problem-btn"
                      onClick={() =>
                        handleResolve(problem)
                      }
                    >
                      ✅ Mark Problem as Resolved
                    </button>

                  </div>

                )}


                {/* Resolved */}

                {problem.status === "Resolved" && (

                  <div className="resolved-message">
                    ✅ This problem has been
                    successfully resolved.
                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </section>


      {/* =====================================================
          DEVELOPMENT INFORMATION
      ===================================================== */}

      <div className="college-debug-box">

        <strong>
          Development Information
        </strong>

        <p>
          Role: {user?.role || "No role"}
        </p>

        <p>
          College: {collegeName}
        </p>

        <p>
          Total complaints: {complaints.length}
        </p>

        <p>
          Assigned complaints: {assignedProblems.length}
        </p>

      </div>

    </div>
  );
}

export default CollegeDashboard;