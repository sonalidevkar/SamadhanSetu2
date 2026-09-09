import React, { useState } from "react";
import { useComplaints } from "../context/ComplaintContext";

function TrackStatus() {
  const { complaints } = useComplaints();

  const [searchId, setSearchId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // SEARCH COMPLAINT
  // ==========================================

  const handleSearch = (e) => {
    e.preventDefault();

    const id = searchId.trim().toUpperCase();

    if (!id) {
      setError("Please enter your Complaint ID.");
      setComplaint(null);
      return;
    }

    const found = complaints.find(
      (item) =>
        item.id &&
        item.id.toUpperCase() === id
    );

    if (!found) {
      setError(
        "Complaint not found. Please check your Complaint ID."
      );
      setComplaint(null);
      return;
    }

    setComplaint(found);
    setError("");
  };

  // ==========================================
  // STATUS ORDER
  // ==========================================

  const statusOrder = [
    "Submitted",
    "Awaiting College Response",
    "Under Review",
    "In Progress",
    "Resolved",
  ];

  const getStatusIndex = (status) => {
    const index = statusOrder.indexOf(status);

    return index === -1 ? 0 : index;
  };

  // ==========================================
  // STEP COMPLETED
  // ==========================================

  const isStepCompleted = (
    step,
    status
  ) => {
    return (
      getStatusIndex(step) <=
      getStatusIndex(status)
    );
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Resolved":
        return "status-resolved";

      case "In Progress":
        return "status-progress";

      case "Under Review":
        return "status-review";

      case "Awaiting College Response":
        return "status-review";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-submitted";
    }
  };

  // ==========================================
  // HISTORY DATE
  // ==========================================

  const findHistoryDate = (status) => {
    return complaint?.history?.find(
      (item) => item.status === status
    )?.date;
  };

  // ==========================================
  // COLLEGE REQUEST STATUS
  // ==========================================

  const collegeRequestStatus =
    complaint?.collegeRequest?.status ||
    null;

  const isCollege =
    complaint?.assignedType === "College";

  const collegeAccepted =
    complaint?.collegeAccepted === true;

  return (
    <div className="track-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">

        <div>
          <h1>
            📍 Track Complaint
          </h1>

          <p>
            Track AI assignment, college response,
            team, progress and final resolution.
          </p>
        </div>

      </div>

      {/* =====================================
          SEARCH
      ====================================== */}

      <div className="dashboard-card track-search-card">

        <form
          onSubmit={handleSearch}
          className="track-form"
        >

          <label>
            Complaint ID
          </label>

          <div className="track-input-row">

            <input
              type="text"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Example: CMP-123456789"
            />

            <button
              type="submit"
              className="primary-button"
            >
              🔍 Track
            </button>

          </div>

        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

      </div>

      {/* =====================================
          RESULT
      ====================================== */}

      {complaint && (
        <div>

          {/* =================================
              BASIC INFORMATION
          ================================= */}

          <div className="dashboard-card">

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
                className={`status-badge ${getStatusClass(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>

            </div>

            <div className="track-details">

              <div className="detail-box">

                <span>
                  Category
                </span>

                <strong>
                  {complaint.category ||
                    "General"}
                </strong>

              </div>

              <div className="detail-box">

                <span>
                  Priority
                </span>

                <strong>
                  {complaint.priority ||
                    "Medium"}
                </strong>

              </div>

              <div className="detail-box">

                <span>
                  Submitted
                </span>

                <strong>
                  {complaint.createdAt ||
                    "Recently"}
                </strong>

              </div>

              <div className="detail-box">

                <span>
                  Reward
                </span>

                <strong>
                  ⭐{" "}
                  {complaint.rewardPointsEarned ||
                    0}{" "}
                  Points
                </strong>

              </div>

            </div>

          </div>

          {/* =================================
              COLLEGE COLLABORATION
          ================================= */}

          {isCollege && (
            <div className="dashboard-card college-tracking-card">

              <div className="section-title-row">

                <div>
                  <h2>
                    🏫 College Collaboration
                  </h2>

                  <p>
                    Your problem has been matched
                    with a nearby college based on
                    location and problem category.
                  </p>
                </div>

                <span
                  className={`status-badge ${
                    collegeAccepted
                      ? "status-progress"
                      : collegeRequestStatus ===
                        "Rejected"
                      ? "status-rejected"
                      : "status-review"
                  }`}
                >
                  {collegeAccepted
                    ? "✅ Accepted"
                    : collegeRequestStatus ===
                      "Rejected"
                    ? "❌ Rejected"
                    : "⏳ Pending"}
                </span>

              </div>

              {/* COLLEGE DETAILS */}

              <div className="college-track-grid">

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
                    College Request
                  </span>

                  <strong>
                    {collegeRequestStatus ||
                      "Pending"}
                  </strong>

                </div>

                <div>

                  <span>
                    Problem Category
                  </span>

                  <strong>
                    {complaint.assignedCategory ||
                      complaint.category ||
                      "General"}
                  </strong>

                </div>

                <div>

                  <span>
                    Student Team
                  </span>

                  <strong>
                    {complaint.team ||
                      "Civil Engineering Student Team"}
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
                    {complaint.distanceKm !==
                      null &&
                    complaint.distanceKm !==
                      undefined
                      ? `${Number(
                          complaint.distanceKm
                        ).toFixed(2)} km`
                      : "Nearby"}
                  </strong>

                </div>

              </div>

              {/* =================================
                  PENDING REQUEST
              ================================= */}

              {!collegeAccepted &&
                collegeRequestStatus !==
                  "Rejected" && (
                  <div className="college-pending-message">

                    <strong>
                      ⏳ Waiting for College Response
                    </strong>

                    <p>
                      Your problem request has been
                      sent to{" "}
                      <strong>
                        {complaint.assignedTo}
                      </strong>
                      .
                    </p>

                    <p>
                      The college will review the
                      problem and decide whether its
                      student/faculty team can solve it.
                    </p>

                    {complaint.collegeRequest
                      ?.sentAt && (
                      <small>
                        Request Sent:{" "}
                        {
                          complaint.collegeRequest
                            .sentAt
                        }
                      </small>
                    )}

                  </div>
                )}

              {/* =================================
                  ACCEPTED REQUEST
              ================================= */}

              {collegeAccepted && (
                <div className="college-success-message">

                  <strong>
                    ✅ College Accepted Your Problem
                  </strong>

                  <p>
                    <strong>
                      {complaint.assignedTo}
                    </strong>{" "}
                    has accepted the problem.
                  </p>

                  <p>
                    🚀 The assigned team has started
                    working on the solution.
                  </p>

                  <p>
                    <strong>
                      Team:
                    </strong>{" "}
                    {complaint.team ||
                      "Civil Engineering Student Team"}
                  </p>

                  {complaint.collegeRequest
                    ?.respondedAt && (
                    <small>
                      Accepted On:{" "}
                      {
                        complaint.collegeRequest
                          .respondedAt
                      }
                    </small>
                  )}

                </div>
              )}

              {/* =================================
                  REJECTED REQUEST
              ================================= */}

              {collegeRequestStatus ===
                "Rejected" && (
                <div className="college-rejected-message">

                  <strong>
                    ❌ College Could Not Accept
                  </strong>

                  <p>
                    The assigned college could not
                    take this problem.
                  </p>

                  {complaint.collegeRequest
                    ?.rejectionReason && (
                    <p>
                      <strong>
                        Reason:
                      </strong>{" "}
                      {
                        complaint.collegeRequest
                          .rejectionReason
                      }
                    </p>
                  )}

                  <p>
                    ⚠️ Admin reassignment is required.
                  </p>

                </div>
              )}

            </div>
          )}

          {/* =================================
              AI ASSIGNMENT
          ================================= */}

          <div className="dashboard-card ai-assignment-box">

            <div className="ai-assignment-header">

              <span>
                🤖
              </span>

              <div>

                <h3>
                  AI Smart Assignment
                </h3>

                <p>
                  Your problem has been matched
                  with the most relevant nearby
                  organization.
                </p>

              </div>

            </div>

            <div className="assignment-grid">

              <div className="assignment-item">

                <span>
                  Problem Type
                </span>

                <strong>
                  {complaint.assignedCategory ||
                    complaint.category ||
                    "General"}
                </strong>

              </div>

              <div className="assignment-item">

                <span>
                  Assigned Organization
                </span>

                <strong>
                  {complaint.assignedTo ||
                    "Concerned Authority"}
                </strong>

              </div>

              <div className="assignment-item">

                <span>
                  Organization Type
                </span>

                <strong>
                  {complaint.assignedType ||
                    "Government Service"}
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
                  Service
                </span>

                <strong>
                  {complaint.service ||
                    "General Civic Service"}
                </strong>

              </div>

              <div className="assignment-item">

                <span>
                  Distance
                </span>

                <strong>
                  {complaint.distanceKm !==
                    null &&
                  complaint.distanceKm !==
                    undefined
                    ? `${Number(
                        complaint.distanceKm
                      ).toFixed(2)} km`
                    : "Unavailable"}
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
              LOCATION
          ================================= */}

          <div className="dashboard-card">

            <h2>
              📍 Location
            </h2>

            <div className="track-details">

              <div className="detail-box">

                <span>
                  Reported Location
                </span>

                <strong>
                  {complaint.exactLocation ||
                    complaint.location
                      ?.exactLocation ||
                    "Not provided"}
                </strong>

              </div>

              <div className="detail-box">

                <span>
                  Your Latitude
                </span>

                <strong>
                  {complaint.latitude ||
                    complaint.location
                      ?.latitude ||
                    "Not available"}
                </strong>

              </div>

              <div className="detail-box">

                <span>
                  Your Longitude
                </span>

                <strong>
                  {complaint.longitude ||
                    complaint.location
                      ?.longitude ||
                    "Not available"}
                </strong>

              </div>

              <div className="detail-box">

                <span>
                  Assigned Center
                </span>

                <strong>
                  {complaint.assignedTo ||
                    "Not assigned"}
                </strong>

              </div>

            </div>

          </div>

          {/* =================================
              PROBLEM DESCRIPTION
          ================================= */}

          {complaint.description && (
            <div className="dashboard-card">

              <h2>
                📝 Problem Description
              </h2>

              <div className="description-box">

                <p>
                  {complaint.description}
                </p>

              </div>

            </div>
          )}

          {/* =================================
              STATUS TIMELINE
          ================================= */}

          <div className="dashboard-card">

            <div className="section-title-row">

              <h2>
                📊 Step-by-Step Progress
              </h2>

              <span
                className={`status-badge ${getStatusClass(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>

            </div>

            <div className="status-timeline">

              {/* =================================
                  STEP 1
              ================================= */}

              <div
                className={
                  isStepCompleted(
                    "Submitted",
                    complaint.status
                  )
                    ? "timeline-step active"
                    : "timeline-step"
                }
              >

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    Complaint Submitted
                  </strong>

                  <p>
                    Complaint successfully
                    registered by the citizen.
                  </p>

                  {findHistoryDate(
                    "Submitted"
                  ) && (
                    <small>
                      {findHistoryDate(
                        "Submitted"
                      )}
                    </small>
                  )}

                </div>

              </div>

              {/* =================================
                  STEP 2 - COLLEGE REQUEST
              ================================= */}

              {isCollege && (
                <div
                  className={
                    complaint.status ===
                      "Awaiting College Response" ||
                    collegeAccepted ||
                    collegeRequestStatus ===
                      "Rejected"
                      ? "timeline-step active"
                      : "timeline-step"
                  }
                >

                  <span>
                    ✓
                  </span>

                  <div>

                    <strong>
                      🏫 College Request Sent
                    </strong>

                    <p>
                      Problem sent to{" "}
                      <strong>
                        {complaint.assignedTo}
                      </strong>{" "}
                      for acceptance.
                    </p>

                    {complaint.collegeRequest
                      ?.sentAt && (
                      <small>
                        Sent:{" "}
                        {
                          complaint.collegeRequest
                            .sentAt
                        }
                      </small>
                    )}

                    {!collegeAccepted &&
                      collegeRequestStatus !==
                        "Rejected" && (
                        <small
                          style={{
                            display: "block",
                            marginTop: "5px",
                          }}
                        >
                          ⏳ Waiting for college
                          response
                        </small>
                      )}

                  </div>

                </div>
              )}

              {/* =================================
                  STEP 3 - COLLEGE ACCEPTED / REVIEW
              ================================= */}

              {isCollege ? (

                <div
                  className={
                    collegeAccepted
                      ? "timeline-step active"
                      : "timeline-step"
                  }
                >

                  <span>
                    {collegeAccepted
                      ? "✓"
                      : "3"}
                  </span>

                  <div>

                    <strong>
                      🏫 College Accepted & Team Assigned
                    </strong>

                    <p>
                      {collegeAccepted
                        ? `${
                            complaint.assignedTo
                          } accepted the problem. ${
                            complaint.team ||
                            "Assigned student team"
                          } is working on it.`
                        : "This step will be completed when the college accepts the problem."}
                    </p>

                    {findHistoryDate(
                      "College Accepted"
                    ) && (
                      <small>
                        {findHistoryDate(
                          "College Accepted"
                        )}
                      </small>
                    )}

                  </div>

                </div>

              ) : (

                <div
                  className={
                    isStepCompleted(
                      "Under Review",
                      complaint.status
                    )
                      ? "timeline-step active"
                      : "timeline-step"
                  }
                >

                  <span>
                    ✓
                  </span>

                  <div>

                    <strong>
                      AI Assignment & Review
                    </strong>

                    <p>
                      The complaint is analyzed
                      and assigned to the relevant
                      nearby team.
                    </p>

                    {findHistoryDate(
                      "Under Review"
                    ) && (
                      <small>
                        {findHistoryDate(
                          "Under Review"
                        )}
                      </small>
                    )}

                  </div>

                </div>
              )}

              {/* =================================
                  STEP 4 - IN PROGRESS
              ================================= */}

              <div
                className={
                  isStepCompleted(
                    "In Progress",
                    complaint.status
                  )
                    ? "timeline-step active"
                    : "timeline-step"
                }
              >

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    🚀 Work In Progress
                  </strong>

                  <p>

                    {collegeAccepted
                      ? `${
                          complaint.team ||
                          "Assigned college team"
                        } is working on the problem.`
                      : `${complaint.team ||
                          "Assigned team"} will work on the problem after acceptance.`}

                  </p>

                  {findHistoryDate(
                    "In Progress"
                  ) && (
                    <small>
                      {findHistoryDate(
                        "In Progress"
                      )}
                    </small>
                  )}

                </div>

              </div>

              {/* =================================
                  STEP 5 - RESOLVED
              ================================= */}

              <div
                className={
                  isStepCompleted(
                    "Resolved",
                    complaint.status
                  )
                    ? "timeline-step active"
                    : "timeline-step"
                }
              >

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    ✅ Problem Resolved
                  </strong>

                  <p>
                    The assigned team has
                    completed the problem.
                  </p>

                  {findHistoryDate(
                    "Resolved"
                  ) && (
                    <small>
                      {findHistoryDate(
                        "Resolved"
                      )}
                    </small>
                  )}

                </div>

              </div>

            </div>

            {/* =================================
                RESOLVED REWARD
            ================================= */}

            {complaint.status ===
              "Resolved" && (
              <div
                className="admin-resolved-box"
                style={{
                  marginTop: "20px",
                }}
              >

                🎉{" "}
                <strong>
                  Problem solved successfully!
                </strong>

                <br />

                🏫 Solved by:{" "}
                <strong>
                  {complaint.assignedTo ||
                    "Assigned Organization"}
                </strong>

                <br />

                ⭐ You earned an additional
                +50 reward points.

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default TrackStatus;