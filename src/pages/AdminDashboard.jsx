import React, { useMemo, useState } from "react";
import { useComplaints } from "../context/ComplaintContext";

function AdminDashboard() {
  const {
    complaints = [],
    updateComplaintStatus,
    assignToCollege,
    assignToIndustry,
  } = useComplaints();

  const [filter, setFilter] = useState("All");

  const [assignmentType, setAssignmentType] = useState({});
  const [assignmentOrganization, setAssignmentOrganization] =
    useState({});

  const [search, setSearch] = useState("");

  /* =========================================================
     ORGANIZATIONS
  ========================================================= */

  const colleges = [
    "Karmala Engineering College",
    "KVG College of Engineering",
    "Solapur Engineering College",
  ];

  const industries = [
    "Samadhan Industry Partner",
    "TechNova Solutions",
    "GreenTech Industries",
  ];

  /* =========================================================
     FILTER + SEARCH
  ========================================================= */

  const filteredComplaints = useMemo(() => {
    let data =
      filter === "All"
        ? complaints
        : complaints.filter(
            (complaint) =>
              complaint.status === filter
          );

    if (search.trim()) {
      const keyword =
        search.trim().toLowerCase();

      data = data.filter((complaint) => {
        return (
          String(complaint.id || "")
            .toLowerCase()
            .includes(keyword) ||
          String(complaint.title || "")
            .toLowerCase()
            .includes(keyword) ||
          String(complaint.category || "")
            .toLowerCase()
            .includes(keyword) ||
          String(complaint.fullName || "")
            .toLowerCase()
            .includes(keyword) ||
          String(complaint.name || "")
            .toLowerCase()
            .includes(keyword) ||
          String(complaint.assignedTo || "")
            .toLowerCase()
            .includes(keyword)
        );
      });
    }

    return data;
  }, [complaints, filter, search]);

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = (
    id,
    status
  ) => {
    updateComplaintStatus(id, status);
  };

  /* =========================================================
     ASSIGNMENT TYPE
  ========================================================= */

  const handleAssignmentTypeChange = (
    complaintId,
    type
  ) => {
    setAssignmentType((prev) => ({
      ...prev,
      [complaintId]: type,
    }));

    setAssignmentOrganization((prev) => ({
      ...prev,
      [complaintId]: "",
    }));
  };

  /* =========================================================
     ORGANIZATION CHANGE
  ========================================================= */

  const handleOrganizationChange = (
    complaintId,
    organization
  ) => {
    setAssignmentOrganization((prev) => ({
      ...prev,
      [complaintId]: organization,
    }));
  };

  /* =========================================================
     ASSIGN PROBLEM
  ========================================================= */

  const handleAssign = (complaint) => {
    const type =
      assignmentType[complaint.id];

    const organization =
      assignmentOrganization[complaint.id];

    if (!type) {
      alert(
        "Please select College or Industry."
      );
      return;
    }

    if (!organization) {
      alert(
        "Please select an organization."
      );
      return;
    }

    const extraData = {
      service:
        complaint.service ||
        "Civic Problem Resolution",

      team:
        complaint.team ||
        (
          type === "College"
            ? "Civil Engineering Student Team"
            : "Technical Solutions Team"
        ),

      assignmentReason:
        `Assigned by Admin to ${organization}`,

      assignmentScore:
        complaint.assignmentScore ??
        95,

      distanceKm:
        complaint.distanceKm ??
        null,
    };

    let result;

    if (type === "College") {
      result = assignToCollege(
        complaint.id,
        organization,
        extraData
      );
    } else {
      result = assignToIndustry(
        complaint.id,
        organization,
        extraData
      );
    }

    if (result?.success) {
      alert(
        `${type} assignment successful!`
      );

      setAssignmentType((prev) => ({
        ...prev,
        [complaint.id]: "",
      }));

      setAssignmentOrganization(
        (prev) => ({
          ...prev,
          [complaint.id]: "",
        })
      );
    }
  };

  /* =========================================================
     STATS
  ========================================================= */

  const totalComplaints =
    complaints.length;

  const submittedComplaints =
    complaints.filter(
      (c) => c.status === "Submitted"
    ).length;

  const awaitingCollege =
    complaints.filter(
      (c) =>
        c.status ===
        "Awaiting College Response"
    ).length;

  const awaitingIndustry =
    complaints.filter(
      (c) =>
        c.status ===
        "Awaiting Industry Response"
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

  const collegeAccepted =
    complaints.filter(
      (c) =>
        c.assignedType === "College" &&
        c.collegeAccepted === true
    ).length;

  const industryAccepted =
    complaints.filter(
      (c) =>
        c.assignedType === "Industry" &&
        c.industryAccepted === true
    ).length;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="admin-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="dashboard-header">

        <div>
          <span className="dashboard-badge">
            🏢 ADMIN CONTROL CENTER
          </span>

          <h1>
            Department Dashboard
          </h1>

          <p>
            Manage citizen complaints, assign
            problems to colleges or industries,
            and monitor resolution progress.
          </p>
        </div>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="stats-grid">

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


        <div className="stat-card">
          <div className="stat-icon">
            🏫
          </div>

          <div>
            <h3>
              {awaitingCollege}
            </h3>

            <p>
              College Pending
            </p>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            🏭
          </div>

          <div>
            <h3>
              {awaitingIndustry}
            </h3>

            <p>
              Industry Pending
            </p>
          </div>
        </div>


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


        <div className="stat-card">
          <div className="stat-icon">
            🤝
          </div>

          <div>
            <h3>
              {collegeAccepted}
            </h3>

            <p>
              College Accepted
            </p>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            🏭
          </div>

          <div>
            <h3>
              {industryAccepted}
            </h3>

            <p>
              Industry Accepted
            </p>
          </div>
        </div>

      </div>


      {/* =====================================================
          FILTER + SEARCH
      ===================================================== */}

      <div className="dashboard-card admin-filter-card">

        <div className="section-title-row">

          <h2>
            📂 Complaint Management
          </h2>

          <div className="admin-filter-controls">

            <input
              type="text"
              placeholder="🔍 Search complaints..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="admin-search-input"
            />

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
                Awaiting College
              </option>

              <option value="Awaiting Industry Response">
                Awaiting Industry
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

      </div>


      {/* =====================================================
          COMPLAINTS
      ===================================================== */}

      {filteredComplaints.length === 0 ? (

        <div className="dashboard-card empty-state">

          <div className="empty-icon">
            📭
          </div>

          <h2>
            No Complaints Found
          </h2>

          <p>
            No complaints match the
            selected filter.
          </p>

        </div>

      ) : (

        <div className="admin-complaints">

          {filteredComplaints
            .slice()
            .reverse()
            .map((complaint) => {

              const selectedType =
                assignmentType[
                  complaint.id
                ] || "";

              const organizations =
                selectedType === "College"
                  ? colleges
                  : selectedType === "Industry"
                  ? industries
                  : [];

              return (

                <div
                  className="dashboard-card admin-complaint-card"
                  key={complaint.id}
                >

                  {/* =================================================
                      HEADER
                  ================================================= */}

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
                            "Rejected"
                          ? "status-rejected"
                          : complaint.status ===
                            "Under Review"
                          ? "status-review"
                          : "status-submitted"
                      }`}
                    >
                      {complaint.status}
                    </span>

                  </div>


                  {/* =================================================
                      CITIZEN INFO
                  ================================================= */}

                  <div className="admin-section">

                    <h3>
                      👤 Citizen Information
                    </h3>

                    <div className="admin-info-grid">

                      <div>
                        <span>Name</span>

                        <strong>
                          {complaint.fullName ||
                            complaint.name ||
                            "Not provided"}
                        </strong>
                      </div>

                      <div>
                        <span>Mobile</span>

                        <strong>
                          {complaint.userMobile ||
                            complaint.mobile ||
                            "Not provided"}
                        </strong>
                      </div>

                      <div>
                        <span>Email</span>

                        <strong>
                          {complaint.userEmail ||
                            complaint.email ||
                            "Not provided"}
                        </strong>
                      </div>

                      <div>
                        <span>City</span>

                        <strong>
                          {complaint.city ||
                            "Not provided"}
                        </strong>
                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      PROBLEM DETAILS
                  ================================================= */}

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


                  {/* =================================================
                      CURRENT ASSIGNMENT
                  ================================================= */}

                  <div className="admin-section">

                    <h3>
                      📌 Current Assignment
                    </h3>

                    <div className="assignment-grid">

                      <div className="assignment-item">

                        <span>
                          Organization
                        </span>

                        <strong>
                          {complaint.assignedTo ||
                            "Not Assigned"}
                        </strong>

                      </div>

                      <div className="assignment-item">

                        <span>
                          Type
                        </span>

                        <strong>
                          {complaint.assignedType ||
                            "Not Assigned"}
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
                          Team
                        </span>

                        <strong>
                          {complaint.team ||
                            "Concerned Team"}
                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      ADMIN ASSIGNMENT
                  ================================================= */}

                  <div className="admin-section admin-assignment-section">

                    <h3>
                      🎯 Assign Problem
                    </h3>

                    <p className="assignment-helper">
                      Select a partner organization
                      responsible for solving this problem.
                    </p>

                    <div className="admin-assignment-controls">

                      {/* Type */}

                      <select
                        value={
                          selectedType
                        }
                        onChange={(e) =>
                          handleAssignmentTypeChange(
                            complaint.id,
                            e.target.value
                          )
                        }
                        className="assignment-select"
                      >

                        <option value="">
                          Select Type
                        </option>

                        <option value="College">
                          🏫 College
                        </option>

                        <option value="Industry">
                          🏭 Industry
                        </option>

                      </select>


                      {/* Organization */}

                      <select
                        value={
                          assignmentOrganization[
                            complaint.id
                          ] || ""
                        }
                        onChange={(e) =>
                          handleOrganizationChange(
                            complaint.id,
                            e.target.value
                          )
                        }
                        className="assignment-select"
                        disabled={!selectedType}
                      >

                        <option value="">
                          Select Organization
                        </option>

                        {organizations.map(
                          (organization) => (
                            <option
                              key={organization}
                              value={organization}
                            >
                              {organization}
                            </option>
                          )
                        )}

                      </select>


                      {/* Assign */}

                      <button
                        type="button"
                        className="assign-problem-btn"
                        onClick={() =>
                          handleAssign(
                            complaint
                          )
                        }
                      >
                        📤 Assign Problem
                      </button>

                    </div>

                  </div>


                  {/* =================================================
                      COLLEGE STATUS
                  ================================================= */}

                  {complaint.assignedType ===
                    "College" && (

                    <div className="admin-section">

                      <h3>
                        🏫 College Collaboration
                      </h3>

                      <div className="college-admin-card">

                        <div className="admin-info-grid">

                          <div>
                            <span>
                              College
                            </span>

                            <strong>
                              {complaint.assignedTo ||
                                "Not Assigned"}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Request
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
                              Response By
                            </span>

                            <strong>
                              {complaint
                                .collegeRequest
                                ?.responseBy ||
                                "Waiting"}
                            </strong>
                          </div>

                          <div>
                            <span>
                              College Status
                            </span>

                            <strong>
                              {complaint
                                .collegeAccepted
                                ? "✅ Accepted"
                                : complaint
                                    .rejectedByCollege
                                ? "❌ Rejected"
                                : "⏳ Pending"}
                            </strong>
                          </div>

                        </div>

                      </div>

                    </div>
                  )}


                  {/* =================================================
                      INDUSTRY STATUS
                  ================================================= */}

                  {complaint.assignedType ===
                    "Industry" && (

                    <div className="admin-section">

                      <h3>
                        🏭 Industry Collaboration
                      </h3>

                      <div className="college-admin-card">

                        <div className="admin-info-grid">

                          <div>
                            <span>
                              Industry
                            </span>

                            <strong>
                              {complaint.assignedTo ||
                                "Not Assigned"}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Request
                            </span>

                            <strong>
                              {complaint
                                .industryRequest
                                ?.status ||
                                "Pending"}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Response By
                            </span>

                            <strong>
                              {complaint
                                .industryRequest
                                ?.responseBy ||
                                "Waiting"}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Industry Status
                            </span>

                            <strong>
                              {complaint
                                .industryAccepted
                                ? "✅ Accepted"
                                : complaint
                                    .rejectedByIndustry
                                ? "❌ Rejected"
                                : "⏳ Pending"}
                            </strong>
                          </div>

                        </div>

                      </div>

                    </div>
                  )}


                  {/* =================================================
                      STATUS UPDATE
                  ================================================= */}

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


                  {/* =================================================
                      RESOLVED
                  ================================================= */}

                  {complaint.status ===
                    "Resolved" && (

                    <div className="admin-resolved-box">

                      🎉{" "}
                      <strong>
                        Problem resolved successfully.
                      </strong>

                      <p>
                        Organization:{" "}
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
                        ⭐ Citizen reward:
                        +50 points
                      </p>

                    </div>
                  )}

                </div>
              );
            })}

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;