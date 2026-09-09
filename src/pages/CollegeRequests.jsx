
import React, { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useComplaints } from "../context/ComplaintContext";
import { useLanguage } from "../context/LanguageContext";

function CollegeRequests() {
  const { user } = useAuth();

  const {
    complaints,
    certificates,
    acceptCollegeRequest,
    rejectCollegeRequest,
    getCertificateByComplaint,
  } = useComplaints();

  const { t } = useLanguage();

  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  // ==========================================
  // GET COLLEGE REQUESTS
  // ==========================================

  const collegeRequests = useMemo(() => {
    return complaints.filter(
      (complaint) =>
        complaint.assignedType === "College" &&
        complaint.collegeRequest
    );
  }, [complaints]);

  // ==========================================
  // FILTER REQUESTS
  // ==========================================

  const filteredRequests = useMemo(() => {
    if (filter === "All") {
      return collegeRequests;
    }

    return collegeRequests.filter(
      (complaint) =>
        complaint.collegeRequest?.status === filter
    );
  }, [collegeRequests, filter]);

  // ==========================================
  // ACCEPT REQUEST
  // ==========================================

  const handleAccept = (complaint) => {
    const collegeName =
      complaint.assignedTo ||
      t("assignedCollege");

    const responseBy =
      user?.name ||
      t("collegeRepresentative");

    acceptCollegeRequest(
      complaint.id,
      collegeName,
      responseBy
    );

    setMessage(
      `✅ ${t("requestAcceptedSuccess")}`
    );

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  // ==========================================
  // REJECT REQUEST
  // ==========================================

  const handleReject = (complaint) => {
    const reason = window.prompt(
      t("enterRejectionReason")
    );

    if (reason === null) {
      return;
    }

    const finalReason =
      reason.trim() ||
      t("collegeUnableToHandle");

    const collegeName =
      complaint.assignedTo ||
      t("assignedCollege");

    const responseBy =
      user?.name ||
      t("collegeRepresentative");

    rejectCollegeRequest(
      complaint.id,
      collegeName,
      responseBy,
      finalReason
    );

    setMessage(
      `❌ ${t("requestRejectedSuccess")}`
    );

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  // ==========================================
  // COUNTS
  // ==========================================

  const totalCount =
    collegeRequests.length;

  const pendingCount =
    collegeRequests.filter(
      (item) =>
        item.collegeRequest?.status === "Pending"
    ).length;

  const acceptedCount =
    collegeRequests.filter(
      (item) =>
        item.collegeRequest?.status === "Accepted"
    ).length;

  const rejectedCount =
    collegeRequests.filter(
      (item) =>
        item.collegeRequest?.status === "Rejected"
    ).length;

  // ==========================================
  // STATUS LABEL
  // ==========================================

  const getStatusLabel = (status) => {
    switch (status) {
      case "Pending":
        return t("pending");

      case "Accepted":
        return t("accepted");

      case "Rejected":
        return t("rejected");

      default:
        return status;
    }
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "college-status accepted";

      case "Rejected":
        return "college-status rejected";

      default:
        return "college-status pending";
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="college-requests-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">

        <div>

          <span className="dashboard-mini-badge">
            🏫 COLLEGE COLLABORATION
          </span>

          <h1>
            🏫 {t("collegeProblemRequests")}
          </h1>

          <p>
            {t("collegeRequestsText")}
          </p>

        </div>

      </div>

      {/* =====================================
          SUCCESS MESSAGE
      ====================================== */}

      {message && (
        <div
          className="college-success-message"
          style={{
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {/* =====================================
          STATISTICS
      ====================================== */}

      <div className="dashboard-stats">

        {/* TOTAL */}

        <div className="stat-card">

          <div className="stat-icon">
            🏫
          </div>

          <div>

            <span>
              {t("totalRequests")}
            </span>

            <strong>
              {totalCount}
            </strong>

          </div>

        </div>

        {/* PENDING */}

        <div className="stat-card">

          <div className="stat-icon">
            ⏳
          </div>

          <div>

            <span>
              {t("pendingRequests")}
            </span>

            <strong>
              {pendingCount}
            </strong>

          </div>

        </div>

        {/* ACCEPTED */}

        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <span>
              {t("acceptedRequests")}
            </span>

            <strong>
              {acceptedCount}
            </strong>

          </div>

        </div>

        {/* REJECTED */}

        <div className="stat-card">

          <div className="stat-icon">
            ❌
          </div>

          <div>

            <span>
              {t("rejectedRequests")}
            </span>

            <strong>
              {rejectedCount}
            </strong>

          </div>

        </div>

      </div>

      {/* =====================================
          FILTER
      ====================================== */}

      <div className="dashboard-card">

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >

          <strong>
            {t("filterRequests")}:
          </strong>

          <button
            type="button"
            className={
              filter === "All"
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() => setFilter("All")}
          >
            {t("all")}
          </button>

          <button
            type="button"
            className={
              filter === "Pending"
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() => setFilter("Pending")}
          >
            ⏳ {t("pending")}
          </button>

          <button
            type="button"
            className={
              filter === "Accepted"
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() => setFilter("Accepted")}
          >
            ✅ {t("accepted")}
          </button>

          <button
            type="button"
            className={
              filter === "Rejected"
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() => setFilter("Rejected")}
          >
            ❌ {t("rejected")}
          </button>

        </div>

      </div>

      {/* =====================================
          NO REQUESTS
      ====================================== */}

      {filteredRequests.length === 0 && (

        <div className="dashboard-card">

          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
            }}
          >

            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              🏫
            </div>

            <h2>
              {t("noCollegeRequests")}
            </h2>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              {t("noCollegeRequestsText")}
            </p>

          </div>

        </div>

      )}

      {/* =====================================
          REQUEST CARDS
      ====================================== */}

      {filteredRequests.map((complaint) => {

        const requestStatus =
          complaint.collegeRequest?.status ||
          "Pending";

        const isPending =
          requestStatus === "Pending";

        const isAccepted =
          requestStatus === "Accepted";

        const isRejected =
          requestStatus === "Rejected";

        // ====================================
        // GET CERTIFICATE
        // ====================================

        const certificate =
          getCertificateByComplaint
            ? getCertificateByComplaint(
                complaint.id
              )
            : certificates?.find(
                (item) =>
                  item.complaintId ===
                  complaint.id
              );

        const certificateIssued =
          complaint.certificateIssued === true ||
          !!certificate;

        return (
          <div
            key={complaint.id}
            className="dashboard-card"
            style={{
              marginBottom: "20px",
            }}
          >

            {/* =================================
                TOP SECTION
            ================================= */}

            <div className="complaint-top">

              <div>

                <h2>
                  📝{" "}
                  {complaint.title ||
                    t("civicProblem")}
                </h2>

                <p className="complaint-id">
                  {t("complaintID")}:{" "}
                  <strong>
                    {complaint.id}
                  </strong>
                </p>

              </div>

              <span
                className={getStatusClass(
                  requestStatus
                )}
              >
                {getStatusLabel(
                  requestStatus
                )}
              </span>

            </div>

            {/* =================================
                COLLEGE DETAILS
            ================================= */}

            <div className="college-assignment-box">

              <h3>
                🏫{" "}
                {t("collegeCollaboration")}
              </h3>

              <div className="college-details">

                <div>

                  <span>
                    {t("assignedCollege")}
                  </span>

                  <strong>
                    {complaint.assignedTo ||
                      t("nearbyCollege")}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("problemCategory")}
                  </span>

                  <strong>
                    {complaint.assignedCategory ||
                      complaint.category ||
                      t("general")}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("service")}
                  </span>

                  <strong>
                    {complaint.service ||
                      t(
                        "civilTechnicalService"
                      )}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("studentTeam")}
                  </span>

                  <strong>
                    {complaint.team ||
                      t(
                        "civilStudentTeam"
                      )}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("distance")}
                  </span>

                  <strong>

                    {complaint.distanceKm !== null &&
                    complaint.distanceKm !== undefined
                      ? `${Number(
                          complaint.distanceKm
                        ).toFixed(2)} km`
                      : t("nearby")}

                  </strong>

                </div>

                <div>

                  <span>
                    {t("priority")}
                  </span>

                  <strong>
                    {complaint.priority ||
                      t("medium")}
                  </strong>

                </div>

              </div>

            </div>

            {/* =================================
                PROBLEM DESCRIPTION
            ================================= */}

            <div
              style={{
                marginTop: "20px",
              }}
            >

              <h3>
                📝{" "}
                {t("problemDescription")}
              </h3>

              <div
                className="description-box"
                style={{
                  marginTop: "10px",
                }}
              >

                <p>
                  {complaint.description ||
                    t("noDescription")}
                </p>

              </div>

            </div>

            {/* =================================
                LOCATION
            ================================= */}

            <div
              style={{
                marginTop: "20px",
              }}
            >

              <h3>
                📍 {t("location")}
              </h3>

              <div className="college-track-grid">

                <div>

                  <span>
                    {t("reportedLocation")}
                  </span>

                  <strong>
                    {complaint.exactLocation ||
                      complaint.location
                        ?.exactLocation ||
                      t("notProvided")}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("latitude")}
                  </span>

                  <strong>
                    {complaint.latitude ||
                      complaint.location
                        ?.latitude ||
                      t("notAvailable")}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("longitude")}
                  </span>

                  <strong>
                    {complaint.longitude ||
                      complaint.location
                        ?.longitude ||
                      t("notAvailable")}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("landmark")}
                  </span>

                  <strong>
                    {complaint.landmark ||
                      t("notProvided")}
                  </strong>

                </div>

              </div>

            </div>

            {/* =================================
                CITIZEN DETAILS
            ================================= */}

            <div
              style={{
                marginTop: "20px",
              }}
            >

              <h3>
                👤 {t("citizenDetails")}
              </h3>

              <div className="college-track-grid">

                <div>

                  <span>
                    {t("fullName")}
                  </span>

                  <strong>
                    {complaint.fullName ||
                      t("citizen")}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("mobile")}
                  </span>

                  <strong>
                    {complaint.mobile ||
                      complaint.userMobile ||
                      t("notAvailable")}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("email")}
                  </span>

                  <strong>
                    {complaint.email ||
                      complaint.userEmail ||
                      t("notAvailable")}
                  </strong>

                </div>

                <div>

                  <span>
                    {t("city")}
                  </span>

                  <strong>
                    {complaint.city ||
                      t("notAvailable")}
                  </strong>

                </div>

              </div>

            </div>

            {/* =================================
                REQUEST STATUS
            ================================= */}

            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "12px",

                background:
                  isAccepted
                    ? "#f0fdf4"
                    : isRejected
                    ? "#fff1f2"
                    : "#fffbeb",
              }}
            >

              <strong>
                {t("requestStatus")}:
              </strong>{" "}

              {getStatusLabel(
                requestStatus
              )}

              {complaint.collegeRequest
                ?.sentAt && (

                <p
                  style={{
                    margin:
                      "7px 0 0",
                    fontSize:
                      "13px",
                  }}
                >

                  📤{" "}
                  {t("requestSent")}:{" "}

                  {
                    complaint
                      .collegeRequest
                      .sentAt
                  }

                </p>

              )}

              {complaint.collegeRequest
                ?.respondedAt && (

                <p
                  style={{
                    margin:
                      "7px 0 0",
                    fontSize:
                      "13px",
                  }}
                >

                  📅{" "}

                  {isAccepted
                    ? t("acceptedOn")
                    : t("respondedOn")}:

                  {" "}

                  {
                    complaint
                      .collegeRequest
                      .respondedAt
                  }

                </p>

              )}

              {complaint.collegeRequest
                ?.responseBy && (

                <p
                  style={{
                    margin:
                      "7px 0 0",
                    fontSize:
                      "13px",
                  }}
                >

                  👤{" "}
                  {t("responseBy")}:{" "}

                  {
                    complaint
                      .collegeRequest
                      .responseBy
                  }

                </p>

              )}

              {isRejected &&
                complaint
                  .collegeRequest
                  ?.rejectionReason && (

                <p
                  style={{
                    margin:
                      "7px 0 0",
                    fontSize:
                      "13px",
                  }}
                >

                  ❌{" "}
                  <strong>
                    {t(
                      "rejectionReason"
                    )}
                    :
                  </strong>{" "}

                  {
                    complaint
                      .collegeRequest
                      .rejectionReason
                  }

                </p>

              )}

            </div>

            {/* =================================
                PENDING ACTIONS
            ================================= */}

            {isPending && (

              <div className="college-request-actions">

                <button
                  type="button"
                  className="success-btn"
                  onClick={() =>
                    handleAccept(
                      complaint
                    )
                  }
                >
                  ✅{" "}
                  {t("acceptProblem")}
                </button>

                <button
                  type="button"
                  className="danger-btn"
                  onClick={() =>
                    handleReject(
                      complaint
                    )
                  }
                >
                  ❌{" "}
                  {t("reject")}
                </button>

              </div>

            )}

            {/* =================================
                ACCEPTED
            ================================= */}

            {isAccepted && (

              <div
                className="college-success-message"
                style={{
                  marginTop:
                    "20px",
                }}
              >

                ✅{" "}
                <strong>
                  {t("requestAccepted")}
                </strong>

                <p>
                  {t(
                    "requestAcceptedText"
                  )}
                </p>

                <p>
                  👷{" "}
                  <strong>
                    {t("studentTeam")}:
                  </strong>{" "}
                  {complaint.team ||
                    t(
                      "civilStudentTeam"
                    )}
                </p>

                {/* IN PROGRESS */}

                {complaint.status ===
                  "In Progress" && (

                  <div
                    style={{
                      marginTop:
                        "12px",
                      padding:
                        "12px",
                      borderRadius:
                        "10px",
                      background:
                        "#eff6ff",
                    }}
                  >

                    🔄{" "}
                    <strong>
                      Problem Solving
                      in Progress
                    </strong>

                    <p
                      style={{
                        marginTop:
                          "5px",
                      }}
                    >
                      The college student
                      team is currently
                      working on this
                      community problem.
                    </p>

                  </div>

                )}

              </div>

            )}

            {/* =================================
                REJECTED
            ================================= */}

            {isRejected && (

              <div
                className="college-rejected-message"
                style={{
                  marginTop:
                    "20px",
                }}
              >

                ❌{" "}
                <strong>
                  {t("requestRejected")}
                </strong>

                <p>
                  {t(
                    "requestRejectedText"
                  )}
                </p>

                {complaint
                  .collegeRequest
                  ?.rejectionReason && (

                  <p>

                    <strong>
                      {t(
                        "rejectionReason"
                      )}
                      :
                    </strong>{" "}

                    {
                      complaint
                        .collegeRequest
                        .rejectionReason
                    }

                  </p>

                )}

              </div>

            )}

            {/* =================================
                CERTIFICATE PROVIDED
            ================================= */}

            {certificateIssued &&
              complaint.status ===
                "Resolved" && (

              <div
                className="college-certificate-card"
                style={{
                  marginTop:
                    "22px",
                }}
              >

                <div className="certificate-icon">
                  🎓
                </div>

                <div className="certificate-content">

                  <span className="certificate-label">
                    COMMUNITY CONTRIBUTION
                  </span>

                  <h3>
                    Certificate Provided
                  </h3>

                  <p>
                    Congratulations to the
                    college and student team
                    for successfully solving
                    this community problem.
                  </p>

                  <div className="certificate-details">

                    <div>

                      <span>
                        College
                      </span>

                      <strong>
                        {certificate
                          ?.collegeName ||
                          complaint.assignedTo}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Student Team
                      </span>

                      <strong>
                        {certificate
                          ?.studentTeam ||
                          complaint.team ||
                          t(
                            "civilStudentTeam"
                          )}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Certificate ID
                      </span>

                      <strong>
                        {certificate
                          ?.certificateId ||
                          complaint
                            .certificateId ||
                          "Generated"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Issued Date
                      </span>

                      <strong>
                        {certificate
                          ?.issuedDate ||
                          complaint
                            .certificateIssuedDate ||
                          "Completed"}
                      </strong>

                    </div>

                  </div>

                  <div className="certificate-success-badge">
                    ✅ Certificate Provided by
                    SamadhanSetu
                  </div>

                </div>

              </div>

            )}

          </div>
        );
      })}

    </div>
  );
}

export default CollegeRequests;

