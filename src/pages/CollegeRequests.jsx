import React, {
  useMemo,
  useState,
} from "react";

import { useAuth } from "../context/AuthContext";
import {
  useComplaints,
} from "../context/ComplaintContext";
import {
  useLanguage,
} from "../context/LanguageContext";

function CollegeRequests() {
  const { user } = useAuth();

  const {
    complaints = [],
    certificates = [],
    acceptCollegeRequest,
    rejectCollegeRequest,
    getCertificateByComplaint,
  } = useComplaints();

  const { t } = useLanguage();

  const [filter, setFilter] =
    useState("All");

  const [message, setMessage] =
    useState("");

  /* ======================================================
     GET COLLEGE REQUESTS
  ====================================================== */

  const collegeRequests = useMemo(() => {
    return complaints.filter(
      (complaint) =>
        complaint.assignedType ===
          "College" &&
        complaint.collegeRequest
    );
  }, [complaints]);

  /* ======================================================
     FILTER
  ====================================================== */

  const filteredRequests = useMemo(() => {
    if (filter === "All") {
      return collegeRequests;
    }

    return collegeRequests.filter(
      (complaint) =>
        complaint.collegeRequest
          ?.status === filter
    );
  }, [
    collegeRequests,
    filter,
  ]);

  /* ======================================================
     ACCEPT
  ====================================================== */

  const handleAccept = (complaint) => {
    const success =
      acceptCollegeRequest(
        complaint.id
      );

    if (!success) {
      setMessage(
        "❌ Unable to accept this request."
      );

      return;
    }

    setMessage(
      `✅ ${
        t("requestAcceptedSuccess") ||
        "College request accepted successfully."
      }`
    );

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  /* ======================================================
     REJECT
  ====================================================== */

  const handleReject = (complaint) => {
    const reason = window.prompt(
      t("enterRejectionReason") ||
        "Enter rejection reason:"
    );

    if (reason === null) {
      return;
    }

    const finalReason =
      reason.trim() ||
      t("collegeUnableToHandle") ||
      "College unable to handle the problem";

    const success =
      rejectCollegeRequest(
        complaint.id,
        finalReason
      );

    if (!success) {
      setMessage(
        "❌ Unable to reject this request."
      );

      return;
    }

    setMessage(
      `❌ ${
        t("requestRejectedSuccess") ||
        "College request rejected."
      }`
    );

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  /* ======================================================
     COUNTS
  ====================================================== */

  const totalCount =
    collegeRequests.length;

  const pendingCount =
    collegeRequests.filter(
      (item) =>
        item.collegeRequest
          ?.status === "Pending"
    ).length;

  const acceptedCount =
    collegeRequests.filter(
      (item) =>
        item.collegeRequest
          ?.status === "Accepted"
    ).length;

  const rejectedCount =
    collegeRequests.filter(
      (item) =>
        item.collegeRequest
          ?.status === "Rejected"
    ).length;

  /* ======================================================
     STATUS
  ====================================================== */

  const getStatusLabel = (
    status
  ) => {
    switch (status) {
      case "Pending":
        return t("pending") || "Pending";

      case "Accepted":
        return (
          t("accepted") || "Accepted"
        );

      case "Rejected":
        return (
          t("rejected") || "Rejected"
        );

      default:
        return status;
    }
  };

  const getStatusClass = (
    status
  ) => {
    switch (status) {
      case "Accepted":
        return "college-status accepted";

      case "Rejected":
        return "college-status rejected";

      default:
        return "college-status pending";
    }
  };

  /* ======================================================
     PAGE
  ====================================================== */

  return (
    <div className="college-requests-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <span className="dashboard-mini-badge">
            🏫 COLLEGE COLLABORATION
          </span>

          <h1>
            🏫{" "}
            {t("collegeProblemRequests") ||
              "College Problem Requests"}
          </h1>

          <p>
            {t("collegeRequestsText") ||
              "Review community problems assigned to your college and respond to requests."}
          </p>

        </div>

      </div>

      {/* MESSAGE */}

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

      {/* STATISTICS */}

      <div className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            🏫
          </div>

          <div>
            <span>
              {t("totalRequests") ||
                "Total Requests"}
            </span>

            <strong>
              {totalCount}
            </strong>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            ⏳
          </div>

          <div>
            <span>
              {t("pendingRequests") ||
                "Pending Requests"}
            </span>

            <strong>
              {pendingCount}
            </strong>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>
            <span>
              {t("acceptedRequests") ||
                "Accepted Requests"}
            </span>

            <strong>
              {acceptedCount}
            </strong>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            ❌
          </div>

          <div>
            <span>
              {t("rejectedRequests") ||
                "Rejected Requests"}
            </span>

            <strong>
              {rejectedCount}
            </strong>
          </div>

        </div>

      </div>

      {/* FILTER */}

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
            {t("filterRequests") ||
              "Filter Requests"}:
          </strong>

          <button
            type="button"
            className={
              filter === "All"
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() =>
              setFilter("All")
            }
          >
            {t("all") || "All"}
          </button>

          <button
            type="button"
            className={
              filter === "Pending"
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() =>
              setFilter("Pending")
            }
          >
            ⏳{" "}
            {t("pending") || "Pending"}
          </button>

          <button
            type="button"
            className={
              filter === "Accepted"
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() =>
              setFilter("Accepted")
            }
          >
            ✅{" "}
            {t("accepted") || "Accepted"}
          </button>

          <button
            type="button"
            className={
              filter === "Rejected"
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() =>
              setFilter("Rejected")
            }
          >
            ❌{" "}
            {t("rejected") || "Rejected"}
          </button>

        </div>

      </div>

      {/* NO REQUESTS */}

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
              {t("noCollegeRequests") ||
                "No College Requests"}
            </h2>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              {t("noCollegeRequestsText") ||
                "No problems have been assigned to your college yet."}
            </p>

          </div>

        </div>
      )}

      {/* REQUESTS */}

      {filteredRequests.map(
        (complaint) => {

          const requestStatus =
            complaint.collegeRequest
              ?.status || "Pending";

          const isPending =
            requestStatus === "Pending";

          const isAccepted =
            requestStatus === "Accepted";

          const isRejected =
            requestStatus === "Rejected";

          const certificate =
            getCertificateByComplaint
              ? getCertificateByComplaint(
                  complaint.id
                )
              : certificates.find(
                  (item) =>
                    item.complaintId ===
                    complaint.id
                );

          const certificateIssued =
            complaint.certificateIssued ===
              true || !!certificate;

          return (
            <div
              key={complaint.id}
              className="dashboard-card"
              style={{
                marginBottom: "20px",
              }}
            >

              {/* TOP */}

              <div className="complaint-top">

                <div>

                  <h2>
                    📝{" "}
                    {complaint.title ||
                      t("civicProblem") ||
                      "Civic Problem"}
                  </h2>

                  <p className="complaint-id">
                    {t("complaintID") ||
                      "Complaint ID"}:{" "}
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

              {/* COLLEGE DETAILS */}

              <div className="college-assignment-box">

                <h3>
                  🏫{" "}
                  {t(
                    "collegeCollaboration"
                  ) ||
                    "College Collaboration"}
                </h3>

                <div className="college-details">

                  <div>
                    <span>
                      {t(
                        "assignedCollege"
                      ) ||
                        "Assigned College"}
                    </span>

                    <strong>
                      {complaint.assignedTo ||
                        "College Partner"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t(
                        "problemCategory"
                      ) ||
                        "Problem Category"}
                    </span>

                    <strong>
                      {complaint.assignedCategory ||
                        complaint.category ||
                        "General"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t("service") ||
                        "Service"}
                    </span>

                    <strong>
                      {complaint.service ||
                        "Civil / Technical Service"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t("studentTeam") ||
                        "Student Team"}
                    </span>

                    <strong>
                      {complaint.team ||
                        "Civil Engineering Student Team"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t("distance") ||
                        "Distance"}
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

                  <div>
                    <span>
                      {t("priority") ||
                        "Priority"}
                    </span>

                    <strong>
                      {complaint.priority ||
                        "Medium"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div
                style={{
                  marginTop: "20px",
                }}
              >

                <h3>
                  📝{" "}
                  {t(
                    "problemDescription"
                  ) ||
                    "Problem Description"}
                </h3>

                <div
                  className="description-box"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <p>
                    {complaint.description ||
                      "No description available."}
                  </p>
                </div>

              </div>

              {/* LOCATION */}

              <div
                style={{
                  marginTop: "20px",
                }}
              >

                <h3>
                  📍{" "}
                  {t("location") ||
                    "Location"}
                </h3>

                <div className="college-track-grid">

                  <div>
                    <span>
                      {t(
                        "reportedLocation"
                      ) ||
                        "Reported Location"}
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
                      {t("latitude") ||
                        "Latitude"}
                    </span>

                    <strong>
                      {complaint.latitude ||
                        complaint.location
                          ?.latitude ||
                        "Not available"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t("longitude") ||
                        "Longitude"}
                    </span>

                    <strong>
                      {complaint.longitude ||
                        complaint.location
                          ?.longitude ||
                        "Not available"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t("landmark") ||
                        "Landmark"}
                    </span>

                    <strong>
                      {complaint.landmark ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* CITIZEN */}

              <div
                style={{
                  marginTop: "20px",
                }}
              >

                <h3>
                  👤{" "}
                  {t(
                    "citizenDetails"
                  ) ||
                    "Citizen Details"}
                </h3>

                <div className="college-track-grid">

                  <div>
                    <span>
                      {t("fullName") ||
                        "Full Name"}
                    </span>

                    <strong>
                      {complaint.fullName ||
                        "Citizen"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t("mobile") ||
                        "Mobile"}
                    </span>

                    <strong>
                      {complaint.mobile ||
                        complaint.userMobile ||
                        "Not available"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t("email") ||
                        "Email"}
                    </span>

                    <strong>
                      {complaint.email ||
                        complaint.userEmail ||
                        "Not available"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {t("city") ||
                        "City"}
                    </span>

                    <strong>
                      {complaint.city ||
                        "Not available"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* REQUEST STATUS */}

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
                  {t("requestStatus") ||
                    "Request Status"}:
                </strong>{" "}

                {getStatusLabel(
                  requestStatus
                )}

                {complaint.collegeRequest
                  ?.requestedAt && (
                  <p
                    style={{
                      margin:
                        "7px 0 0",
                      fontSize: "13px",
                    }}
                  >
                    📤 Request sent:{" "}
                    {
                      complaint
                        .collegeRequest
                        .requestedAt
                    }
                  </p>
                )}

                {complaint.collegeRequest
                  ?.respondedAt && (
                  <p
                    style={{
                      margin:
                        "7px 0 0",
                      fontSize: "13px",
                    }}
                  >
                    📅 Responded:{" "}
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
                      fontSize: "13px",
                    }}
                  >
                    👤 Response by:{" "}
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
                        fontSize: "13px",
                      }}
                    >
                      ❌{" "}
                      <strong>
                        Rejection Reason:
                      </strong>{" "}
                      {
                        complaint
                          .collegeRequest
                          .rejectionReason
                      }
                    </p>
                  )}

              </div>

              {/* PENDING */}

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
                    ✅ Accept Problem
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
                    ❌ Reject
                  </button>

                </div>
              )}

              {/* ACCEPTED */}

              {isAccepted && (
                <div
                  className="college-success-message"
                  style={{
                    marginTop: "20px",
                  }}
                >

                  ✅{" "}
                  <strong>
                    Request Accepted
                  </strong>

                  <p>
                    The college has accepted
                    this community problem.
                  </p>

                  <p>
                    👷{" "}
                    <strong>
                      Student Team:
                    </strong>{" "}
                    {complaint.team ||
                      "Civil Engineering Student Team"}
                  </p>

                  {complaint.status ===
                    "In Progress" && (
                    <div
                      style={{
                        marginTop:
                          "12px",
                        padding: "12px",
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

              {/* REJECTED */}

              {isRejected && (
                <div
                  className="college-rejected-message"
                  style={{
                    marginTop: "20px",
                  }}
                >

                  ❌{" "}
                  <strong>
                    Request Rejected
                  </strong>

                  <p>
                    The college could not
                    accept this problem.
                  </p>

                  {complaint
                    .collegeRequest
                    ?.rejectionReason && (
                    <p>
                      <strong>
                        Rejection Reason:
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

              {/* CERTIFICATE */}

              {certificateIssued &&
                complaint.status ===
                  "Resolved" && (
                  <div
                    className="college-certificate-card"
                    style={{
                      marginTop: "22px",
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
                              "Student Team"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Certificate ID
                          </span>

                          <strong>
                            {certificate
                              ?.certificateId ||
                              complaint.certificateId ||
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
                              complaint.certificateIssuedDate ||
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
        }
      )}

    </div>
  );
}

export default CollegeRequests;