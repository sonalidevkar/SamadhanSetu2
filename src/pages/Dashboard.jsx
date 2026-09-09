import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useComplaints } from "../context/ComplaintContext";
import { useLanguage } from "../context/LanguageContext";

function Dashboard() {
  const { user } = useAuth();
  const { complaints } = useComplaints();
  const { t } = useLanguage();

  // ==========================================
  // COMPLAINT STATS
  // ==========================================

  const totalComplaints = complaints.length;

  const submitted = complaints.filter(
    (c) => c.status === "Submitted"
  ).length;

  const awaitingCollege = complaints.filter(
    (c) => c.status === "Awaiting College Response"
  ).length;

  const underReview = complaints.filter(
    (c) => c.status === "Under Review"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  // ==========================================
  // REWARD SYSTEM
  // ==========================================

  const points = user?.rewardPoints || 0;
  const lastReward = user?.lastReward || null;

  let rewardLevel = "Citizen Contributor";
  let nextReward = 100;
  let badgeIcon = "🌱";

  if (points >= 500) {
    rewardLevel = "Samadhan Star";
    nextReward = 500;
    badgeIcon = "👑";
  } else if (points >= 250) {
    rewardLevel = "Community Champion";
    nextReward = 500;
    badgeIcon = "🏆";
  } else if (points >= 100) {
    rewardLevel = "Civic Hero";
    nextReward = 250;
    badgeIcon = "🥇";
  }

  const progress =
    points >= 500
      ? 100
      : Math.min(100, (points / nextReward) * 100);

  const pointsToNext =
    points >= 500
      ? 0
      : nextReward - points;

  // ==========================================
  // RESOLVED COMPLAINTS
  // ==========================================

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  );

  const totalEarnedFromComplaints =
    complaints.reduce(
      (total, complaint) =>
        total + (complaint.rewardPointsEarned || 0),
      0
    );

  // ==========================================
  // LATEST COMPLAINT
  // ==========================================

  const latestComplaint =
    complaints.length > 0
      ? complaints[complaints.length - 1]
      : null;

  // ==========================================
  // COLLEGE ASSIGNMENT STATUS
  // ==========================================

  const isCollegeAssignment =
    latestComplaint?.assignedType === "College";

  const collegeAccepted =
    latestComplaint?.collegeAccepted === true;

  const collegeRequestStatus =
    latestComplaint?.collegeRequest?.status ||
    "Pending";

  return (
    <div className="dashboard-page">

      {/* =====================================================
          DASHBOARD HEADER
      ====================================================== */}

      <div className="dashboard-header">

        <div className="dashboard-header-content">

          <span className="dashboard-mini-badge">
            🇮🇳 SAMADHANSETU • PEOPLE HELPER
          </span>

          <h1>
            Welcome back,{" "}
            {user?.name || "Citizen"}! 👋
          </h1>

          <h2>
            Together, We Solve
            <span> Community Problems.</span>
          </h2>

          <p>
            Report civic problems, connect with the right
            organization, track progress and help make
            your community better.
          </p>

          <div className="dashboard-hero-actions">

            <Link
              to="/submit-problem"
              className="primary-button dashboard-main-button"
            >
              📝 Report a Problem
            </Link>

            <Link
              to="/track-status"
              className="secondary-button dashboard-track-button"
            >
              📍 Track Problem
            </Link>

          </div>

        </div>

      </div>

      {/* =====================================================
          PEOPLE HELPER IMAGE BANNER
      ====================================================== */}

      <div className="people-helper-banner">

        <div className="people-helper-content">

          <span className="people-helper-label">
            💙 PEOPLE HELP PEOPLE
          </span>

          <h2>
            Real Problems.
            <br />
            <span>Real Solutions.</span>
          </h2>

          <p>
            Your small report can create a big change.
            Together, citizens, colleges and authorities
            can solve local problems faster.
          </p>

          <Link
            to="/submit-problem"
            className="people-helper-button"
          >
            📝 Submit a Problem →
          </Link>

        </div>

        {/* IMAGE */}

        <div className="people-helper-image-wrapper">

          <img
            src="/people-helper.png"
            alt="People helping to solve community problems"
            className="people-helper-image"
          />

          <div className="image-floating-card image-card-one">
            ✅ Problem Solved
          </div>

          <div className="image-floating-card image-card-two">
            🤝 Community Helping
          </div>

        </div>

      </div>

      {/* =====================================================
          COMPLAINT STATS
      ====================================================== */}

      <div className="stats-grid">

        {/* TOTAL */}

        <div className="stat-card dashboard-stat-total">

          <div className="stat-icon">
            📋
          </div>

          <div>

            <h3>
              {totalComplaints}
            </h3>

            <p>
              {t("totalComplaints")}
            </p>

            <small>
              All reported problems
            </small>

          </div>

        </div>

        {/* PENDING */}

        <div className="stat-card dashboard-stat-pending">

          <div className="stat-icon">
            📝
          </div>

          <div>

            <h3>
              {submitted + awaitingCollege}
            </h3>

            <p>
              {t("pending")}
            </p>

            <small>
              Awaiting action
            </small>

          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="stat-card dashboard-stat-progress">

          <div className="stat-icon">
            🔄
          </div>

          <div>

            <h3>
              {inProgress + underReview}
            </h3>

            <p>
              {t("inProgress")}
            </p>

            <small>
              Being worked on
            </small>

          </div>

        </div>

        {/* RESOLVED */}

        <div className="stat-card dashboard-stat-resolved">

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <h3>
              {resolved}
            </h3>

            <p>
              {t("resolved")}
            </p>

            <small>
              Successfully resolved
            </small>

          </div>

        </div>

      </div>

      {/* =====================================================
          COLLEGE ASSIGNMENT
      ====================================================== */}

      {latestComplaint &&
        isCollegeAssignment && (

        <div className="dashboard-card college-assignment-box">

          <div className="section-title-row">

            <div>

              <span className="dashboard-section-label">
                SMART LOCAL COLLABORATION
              </span>

              <h2>
                🏫 {t("collegeCollaboration")}
              </h2>

              <p>
                {t("smartLocalAssignmentText")}
              </p>

            </div>

            <div>

              {collegeAccepted ? (

                <span className="college-status accepted">
                  ✅ {t("accepted")}
                </span>

              ) : collegeRequestStatus ===
                "Rejected" ? (

                <span className="college-status rejected">
                  ❌ {t("rejected")}
                </span>

              ) : (

                <span className="college-status pending">
                  ⏳ {t("waitingForCollege")}
                </span>

              )}

            </div>

          </div>

          {/* COLLEGE INFO */}

          <div className="college-assignment-main">

            <div className="college-logo-box">
              🏫
            </div>

            <div className="college-assignment-info">

              <h3>
                {latestComplaint.assignedTo ||
                  t("college")}
              </h3>

              <p>
                <strong>
                  {t("complaint")}:
                </strong>{" "}
                {latestComplaint.title ||
                  latestComplaint.category ||
                  "Civic Problem"}
              </p>

              <p>
                <strong>
                  {t("category")}:
                </strong>{" "}
                {latestComplaint.category ||
                  t("category")}
              </p>

              <p>
                <strong>
                  {t("studentTeam")}:
                </strong>{" "}
                {latestComplaint.team ||
                  "Civil Engineering Student Team"}
              </p>

            </div>

          </div>

          {/* COLLEGE DETAILS */}

          <div className="college-details">

            <div>

              <span>
                {t("college")}
              </span>

              <strong>
                {latestComplaint.assignedTo ||
                  "Not assigned"}
              </strong>

            </div>

            <div>

              <span>
                {t("requestStatus")}
              </span>

              <strong>
                {collegeRequestStatus}
              </strong>

            </div>

            <div>

              <span>
                {t("service")}
              </span>

              <strong>
                {latestComplaint.service ||
                  "Civil / Technical Service"}
              </strong>

            </div>

            <div>

              <span>
                {t("distance")}
              </span>

              <strong>
                {latestComplaint.distanceKm != null
                  ? `${latestComplaint.distanceKm.toFixed(
                      2
                    )} km`
                  : "Nearby"}
              </strong>

            </div>

          </div>

          {/* ACCEPTED MESSAGE */}

          {collegeAccepted && (

            <div className="college-success-message">

              <strong>
                ✅ {t("collegeAccepted")}
              </strong>

              <p>
                {latestComplaint.assignedTo}{" "}
                {t("collegeAcceptedText")}
              </p>

              <p>
                🚀 {t("inProgress")}:{" "}
                <strong>
                  {t("inProgress")}
                </strong>
              </p>

            </div>

          )}

          {/* PENDING MESSAGE */}

          {!collegeAccepted &&
            collegeRequestStatus !==
              "Rejected" && (

            <div className="college-pending-message">

              <strong>
                ⏳ {t("waitingForCollege")}
              </strong>

              <p>
                {t("waitingCollegeText")}
              </p>

              <p>
                <strong>
                  {latestComplaint.assignedTo}
                </strong>
              </p>

            </div>

          )}

          {/* REJECTED MESSAGE */}

          {collegeRequestStatus ===
            "Rejected" && (

            <div className="college-rejected-message">

              <strong>
                ❌ {t("requestRejected")}
              </strong>

              <p>
                {t("adminReassignment")}
              </p>

              {latestComplaint
                .collegeRequest
                ?.rejectionReason && (

                <p>

                  <strong>
                    {t("rejectionReason")}:
                  </strong>{" "}

                  {
                    latestComplaint
                      .collegeRequest
                      .rejectionReason
                  }

                </p>

              )}

            </div>

          )}

          <Link
            to="/track-status"
            className="secondary-button"
            style={{
              marginTop: "15px",
            }}
          >
            📍 {t("trackProgress")}
          </Link>

        </div>

      )}

      {/* =====================================================
          COMMUNITY REWARDS
      ====================================================== */}

      <div className="dashboard-card reward-card">

        <div className="reward-header">

          <div>

            <span className="dashboard-section-label">
              COMMUNITY IMPACT
            </span>

            <h2>
              🏆 {t("communityRewards")}
            </h2>

            <p>
              {t("rewardText")}
            </p>

          </div>

          <div className="reward-points">

            ⭐ {points}

            <span>
              {t("totalPoints")}
            </span>

          </div>

        </div>

        <div className="reward-level">

          <div>

            <strong>
              {badgeIcon} {rewardLevel}
            </strong>

            <span>

              {points >= 500
                ? t("maximumLevel")
                : `${pointsToNext} ${t(
                    "pointsToNext"
                  )}`}

            </span>

          </div>

          <div className="reward-progress">

            <div
              className="reward-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        <div className="reward-rules">

          <div>

            <span>
              📝
            </span>

            <strong>
              +10
            </strong>

            <p>
              {t("problemSubmittedReward")}
            </p>

          </div>

          <div>

            <span>
              🔄
            </span>

            <strong>
              +10
            </strong>

            <p>
              {t("progressUpdate")}
            </p>

          </div>

          <div>

            <span>
              ✅
            </span>

            <strong>
              +50
            </strong>

            <p>
              {t("problemResolved")}
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          REWARD SUMMARY + AI ASSIGNMENT
      ====================================================== */}

      <div className="dashboard-grid">

        {/* REWARD SUMMARY */}

        <div className="dashboard-card">

          <span className="dashboard-section-label">
            YOUR CONTRIBUTION
          </span>

          <h2>
            ⭐ {t("rewardSummary")}
          </h2>

          <div className="reward-summary-list">

            <div>

              <span>
                {t("currentPoints")}
              </span>

              <strong>
                ⭐ {points}
              </strong>

            </div>

            <div>

              <span>
                {t("problemsReported")}
              </span>

              <strong>
                {totalComplaints}
              </strong>

            </div>

            <div>

              <span>
                {t("problemsResolved")}
              </span>

              <strong>
                {resolvedComplaints.length}
              </strong>

            </div>

            <div>

              <span>
                {t("pointsFromComplaints")}
              </span>

              <strong>
                ⭐ {totalEarnedFromComplaints}
              </strong>

            </div>

            <div>

              <span>
                {t("currentBadge")}
              </span>

              <strong>
                {badgeIcon} {rewardLevel}
              </strong>

            </div>

          </div>

        </div>

        {/* AI ASSIGNMENT */}

        <div className="dashboard-card">

          <span className="dashboard-section-label">
            SMART TECHNOLOGY
          </span>

          <h2>
            🤖 {t("latestAI")}
          </h2>

          {latestComplaint ? (

            <div>

              <div
                className="assignment-item"
                style={{
                  marginBottom: "10px",
                }}
              >

                <span>
                  {t("complaint")}
                </span>

                <strong>
                  {latestComplaint.title ||
                    "Civic Problem"}
                </strong>

              </div>

              <div
                className="assignment-item"
                style={{
                  marginBottom: "10px",
                }}
              >

                <span>
                  {t("category")}
                </span>

                <strong>
                  {latestComplaint.assignedCategory ||
                    latestComplaint.category ||
                    "General"}
                </strong>

              </div>

              <div
                className="assignment-item"
                style={{
                  marginBottom: "10px",
                }}
              >

                <span>
                  {t("assignedOrganization")}
                </span>

                <strong>
                  {latestComplaint.assignedTo ||
                    "Concerned Authority"}
                </strong>

              </div>

              <div
                className="assignment-item"
                style={{
                  marginBottom: "10px",
                }}
              >

                <span>
                  {t("assignedType")}
                </span>

                <strong>
                  {latestComplaint.assignedType ||
                    "Government"}
                </strong>

              </div>

              <div
                className="assignment-item"
                style={{
                  marginBottom: "10px",
                }}
              >

                <span>
                  {t("assignedTeam")}
                </span>

                <strong>
                  {latestComplaint.team ||
                    "Concerned Service Team"}
                </strong>

              </div>

              <div
                className="assignment-item"
                style={{
                  marginBottom: "10px",
                }}
              >

                <span>
                  {t("service")}
                </span>

                <strong>
                  {latestComplaint.service ||
                    "General Civic Service"}
                </strong>

              </div>

              {latestComplaint.distanceKm != null && (

                <div
                  className="assignment-item"
                  style={{
                    marginBottom: "10px",
                  }}
                >

                  <span>
                    {t("distance")}
                  </span>

                  <strong>
                    📍{" "}
                    {latestComplaint.distanceKm.toFixed(
                      2
                    )}{" "}
                    km
                  </strong>

                </div>

              )}

              {/* COLLEGE STATUS */}

              {latestComplaint.assignedType ===
                "College" && (

                <div
                  className="college-mini-status"
                  style={{
                    marginTop: "15px",
                  }}
                >

                  {collegeAccepted ? (

                    <>
                      <strong>
                        ✅ {t("collegeAccepted")}
                      </strong>

                      <p>
                        {
                          latestComplaint
                            .assignedTo
                        }{" "}
                        {t(
                          "collegeAcceptedText"
                        )}
                      </p>
                    </>

                  ) : collegeRequestStatus ===
                    "Rejected" ? (

                    <>
                      <strong>
                        ❌ {t("requestRejected")}
                      </strong>

                      <p>
                        {t(
                          "adminReassignment"
                        )}
                      </p>
                    </>

                  ) : (

                    <>
                      <strong>
                        ⏳{" "}
                        {t(
                          "waitingForCollege"
                        )}
                      </strong>

                      <p>
                        {t(
                          "waitingCollegeText"
                        )}
                      </p>
                    </>

                  )}

                </div>

              )}

              <div
                style={{
                  marginTop: "12px",
                }}
              >

                <span className="status-badge">
                  {latestComplaint.status ||
                    t("submitted")}
                </span>

              </div>

              <Link
                to="/track-status"
                className="secondary-button"
                style={{
                  marginTop: "15px",
                }}
              >
                📍 {t("trackProgress")}
              </Link>

            </div>

          ) : (

            <div className="empty-state">

              <div className="empty-icon">
                🤖
              </div>

              <p>
                {t("startReporting")}
              </p>

              <Link
                to="/submit-problem"
                className="primary-button"
              >
                {t("submitFirstProblem")}
              </Link>

            </div>

          )}

        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <div className="dashboard-card">

        <div className="section-title-row">

          <div>

            <span className="dashboard-section-label">
              QUICK ACCESS
            </span>

            <h2>
              🚀 {t("quickActions")}
            </h2>

          </div>

        </div>

        <div className="quick-actions">

          <Link
            to="/submit-problem"
            className="quick-action"
          >

            <span>
              📝
            </span>

            <div>

              <strong>
                {t("submitProblem")}
              </strong>

              <p>
                {t("submitNewProblem")}
              </p>

            </div>

          </Link>

          <Link
            to="/my-complaints"
            className="quick-action"
          >

            <span>
              📂
            </span>

            <div>

              <strong>
                {t("myComplaints")}
              </strong>

              <p>
                {t("viewComplaints")}
              </p>

            </div>

          </Link>

          <Link
            to="/track-status"
            className="quick-action"
          >

            <span>
              📍
            </span>

            <div>

              <strong>
                {t("trackStatus")}
              </strong>

              <p>
                {t("trackProblemProgress")}
              </p>

            </div>

          </Link>

          <Link
            to="/ai-assistant"
            className="quick-action"
          >

            <span>
              🤖
            </span>

            <div>

              <strong>
                {t("aiAssistant")}
              </strong>

              <p>
                {t("smartGuidance")}
              </p>

            </div>

          </Link>

        </div>

      </div>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <div className="dashboard-card">

        <div className="section-title-row">

          <div>

            <span className="dashboard-section-label">
              SIMPLE • SMART • TRANSPARENT
            </span>

            <h2>
              💡 {t("howWorks")}
            </h2>

          </div>

        </div>

        <div className="workflow">

          <div className="workflow-step">

            <span>
              1
            </span>

            <div>

              <strong>
                {t("citizenReports")}
              </strong>

              <p>
                {t("citizenReportsText")}
              </p>

            </div>

          </div>

          <div className="workflow-step">

            <span>
              2
            </span>

            <div>

              <strong>
                {t("aiAnalysis")}
              </strong>

              <p>
                {t("aiAnalysisText")}
              </p>

            </div>

          </div>

          <div className="workflow-step">

            <span>
              3
            </span>

            <div>

              <strong>
                {t("smartLocalAssignment")}
              </strong>

              <p>
                {t("smartLocalAssignmentText")}
              </p>

            </div>

          </div>

          <div className="workflow-step">

            <span>
              4
            </span>

            <div>

              <strong>
                {t("collegeAccepts")}
              </strong>

              <p>
                {t("collegeAcceptsText")}
              </p>

            </div>

          </div>

          <div className="workflow-step">

            <span>
              5
            </span>

            <div>

              <strong>
                {t("resolutionReward")}
              </strong>

              <p>
                {t("resolutionRewardText")}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT COMPLAINTS
      ====================================================== */}

      <div className="dashboard-card recent-card">

        <div className="section-title-row">

          <div>

            <span className="dashboard-section-label">
              COMMUNITY ACTIVITY
            </span>

            <h2>
              📌 {t("recentComplaints")}
            </h2>

          </div>

          <Link
            to="/my-complaints"
            className="view-all-link"
          >
            {t("viewAll")} →
          </Link>

        </div>

        {complaints.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📭
            </div>

            <h3>
              {t("noComplaints")}
            </h3>

            <p>
              {t("startReporting")}
            </p>

            <Link
              to="/submit-problem"
              className="primary-button"
            >
              {t("submitFirstProblem")}
            </Link>

          </div>

        ) : (

          <div className="recent-list">

            {complaints
              .slice()
              .reverse()
              .slice(0, 5)
              .map((complaint) => (

                <div
                  className="recent-item"
                  key={complaint.id}
                >

                  <div>

                    <h3>
                      {complaint.title ||
                        "Civic Complaint"}
                    </h3>

                    <p>
                      {complaint.category ||
                        t("category")}{" "}
                      •{" "}
                      {complaint.createdAt ||
                        "Recently"}
                    </p>

                    {complaint.assignedType ===
                      "College" && (

                      <small
                        style={{
                          display: "block",
                          marginTop: "5px",
                        }}
                      >

                        🏫{" "}
                        {complaint.assignedTo ||
                          t("college")}{" "}

                        {" • "}

                        {complaint.collegeAccepted
                          ? `✅ ${t("accepted")}`
                          : `⏳ ${t("pending")}`}

                      </small>

                    )}

                  </div>

                  <span className="status-badge">

                    {complaint.status ||
                      t("submitted")}

                  </span>

                </div>

              ))}

          </div>

        )}

      </div>

      {/* =====================================================
          LAST REWARD
      ====================================================== */}

      {lastReward && (

        <div className="dashboard-card">

          <span className="dashboard-section-label">
            RECENT ACHIEVEMENT
          </span>

          <h2>
            🎁 {t("latestReward")}
          </h2>

          <div className="reward-last-activity">

            <div className="reward-activity-icon">
              ⭐
            </div>

            <div>

              <strong>
                +{lastReward.points}{" "}
                {t("points")}
              </strong>

              <p>
                {lastReward.reason}
              </p>

              <small>
                {lastReward.date}
              </small>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;