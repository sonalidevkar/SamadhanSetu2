import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const ComplaintContext = createContext(null);

/* =========================================================
   HELPERS
========================================================= */

const createId = (prefix = "ID") =>
  `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const getStoredArray = (key, fallback = []) => {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) return fallback;

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
};

const saveArray = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

const getLocationText = (location) => {
  if (!location) return "";

  if (typeof location === "string") {
    return location;
  }

  if (typeof location === "object") {
    return (
      location.exactLocation ||
      (location.latitude != null &&
      location.longitude != null
        ? `${location.latitude}, ${location.longitude}`
        : "")
    );
  }

  return "";
};

/* =========================================================
   PROVIDER
========================================================= */

export function ComplaintProvider({ children }) {
  const { user, addRewardPoints } = useAuth();

  const [complaints, setComplaints] = useState(() =>
    getStoredArray("complaints", [])
  );

  const [notifications, setNotifications] = useState(() =>
    getStoredArray("portalNotifications", [])
  );

  const [certificates, setCertificates] = useState(() =>
    getStoredArray("collegeCertificates", [])
  );

  /* =======================================================
     SAVE DATA
  ======================================================= */

  useEffect(() => {
    saveArray("complaints", complaints);
  }, [complaints]);

  useEffect(() => {
    saveArray("portalNotifications", notifications);
  }, [notifications]);

  useEffect(() => {
    saveArray("collegeCertificates", certificates);
  }, [certificates]);

  /* =======================================================
     NOTIFICATION
  ======================================================= */

  const addNotification = ({
    title,
    message,
    type = "info",
    audience = "citizen",
    complaintId = null,
    mobile = "",
  }) => {
    const notification = {
      id: createId("NOT"),
      title,
      message,
      type,
      audience,
      complaintId,
      mobile,
      read: false,
      date: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [
      notification,
      ...prev,
    ]);

    return notification;
  };

  /* =======================================================
     ADD COMPLAINT
  ======================================================= */

  const addComplaint = (complaintData = {}) => {
    const complaint = {
      id:
        complaintData.id ||
        createId("CMP"),

      ...complaintData,

      status:
        complaintData.status ||
        "Submitted",

      createdAt:
        complaintData.createdAt ||
        new Date().toLocaleString(),

      assignedTo:
        complaintData.assignedTo || null,

      assignedType:
        complaintData.assignedType || null,

      assignedAt:
        complaintData.assignedAt || null,

      assignmentReason:
        complaintData.assignmentReason || "",

      assignmentScore:
        complaintData.assignmentScore ?? null,

      distanceKm:
        complaintData.distanceKm ?? null,

      collegeAccepted: false,
      industryAccepted: false,

      rejectedByCollege: false,
      rejectedByIndustry: false,

      collegeStatus:
        complaintData.collegeStatus || null,

      industryStatus:
        complaintData.industryStatus || null,

      collegeRequest:
        complaintData.collegeRequest || null,

      industryRequest:
        complaintData.industryRequest || null,

      history: [
        {
          status:
            complaintData.status ||
            "Submitted",

          date:
            new Date().toLocaleString(),
        },
      ],

      certificateIssued: false,
      certificateId: null,
      certificateStatus: null,
      certificateIssuedDate: null,
    };

    setComplaints((prev) => [
      ...prev,
      complaint,
    ]);

    addNotification({
      title:
        "Complaint Submitted Successfully ✅",

      message:
        `Your complaint "${
          complaint.title ||
          complaint.description ||
          "Civic problem"
        }" has been submitted successfully.`,

      type: "success",
      audience: "citizen",

      complaintId: complaint.id,

      mobile:
        complaint.userMobile ||
        complaint.mobile ||
        "",
    });

    return complaint;
  };

  /* =======================================================
     UPDATE COMPLAINT
  ======================================================= */

  const updateComplaint = (
    complaintId,
    updates
  ) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              ...updates,
            }
          : complaint
      )
    );
  };

  /* =======================================================
     CERTIFICATE
  ======================================================= */

  const generateCollegeCertificate = (
    complaint
  ) => {
    if (!complaint) return null;

    const existing =
      getStoredArray(
        "collegeCertificates",
        []
      ).find(
        (cert) =>
          cert.complaintId ===
          complaint.id
      );

    if (existing) {
      return existing;
    }

    const certificate = {
      certificateId:
        createId("CERT"),

      complaintId:
        complaint.id,

      collegeName:
        complaint.assignedTo ||
        complaint.collegeName ||
        "College Partner",

      studentTeam:
        complaint.team ||
        "Civil Engineering Student Team",

      problemTitle:
        complaint.title ||
        complaint.problemTitle ||
        "Community Problem",

      category:
        complaint.category ||
        "General",

      problemLocation:
        getLocationText(
          complaint.location
        ) ||
        complaint.exactLocation ||
        "Location not available",

      department:
        complaint.department ||
        "Civil Engineering Department",

      service:
        complaint.service ||
        "Civil / Technical Service",

      issuedDate:
        new Date().toLocaleDateString(),

      issuedDateTime:
        new Date().toLocaleString(),

      status:
        "Certificate Provided",

      issuedBy:
        "SamadhanSetu",

      verified: true,
    };

    setCertificates((prev) => [
      ...prev,
      certificate,
    ]);

    return certificate;
  };

  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  const updateComplaintStatus = (
    complaintId,
    newStatus
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }

    const history = Array.isArray(
      complaint.history
    )
      ? complaint.history
      : [];

    const updatedComplaint = {
      ...complaint,

      status: newStatus,

      updatedAt:
        new Date().toLocaleString(),

      history: [
        ...history,
        {
          status: newStatus,
          date:
            new Date().toLocaleString(),
        },
      ],
    };

    setComplaints((prev) =>
      prev.map((item) =>
        item.id === complaintId
          ? updatedComplaint
          : item
      )
    );

    if (newStatus === "Resolved") {
      let certificate = null;

      if (
        complaint.assignedType ===
        "College"
      ) {
        certificate =
          generateCollegeCertificate(
            updatedComplaint
          );
      }

      setComplaints((prev) =>
        prev.map((item) =>
          item.id === complaintId
            ? {
                ...item,

                certificateIssued:
                  !!certificate,

                certificateId:
                  certificate?.certificateId ||
                  item.certificateId ||
                  null,

                certificateStatus:
                  certificate
                    ? "Certificate Provided"
                    : item.certificateStatus,

                certificateIssuedDate:
                  certificate?.issuedDate ||
                  item.certificateIssuedDate,

                history: certificate
                  ? [
                      ...(item.history || []),
                      {
                        status:
                          "Certificate Provided",
                        date:
                          new Date().toLocaleString(),
                      },
                    ]
                  : item.history,
              }
            : item
        )
      );

      addNotification({
        title:
          "Problem Solved 🎉",

        message:
          `Your complaint ${complaintId} has been resolved successfully.`,

        type: "success",

        audience: "citizen",

        complaintId,

        mobile:
          complaint.userMobile ||
          complaint.mobile ||
          "",
      });

      if (
        complaint.assignedType ===
        "College"
      ) {
        addNotification({
          title:
            "College Contribution Certificate Generated 🎓",

          message:
            `Certificate generated for ${complaint.assignedTo || "College"} for complaint ${complaintId}. Certificate ID: ${
              certificate?.certificateId ||
              "Generated"
            }`,

          type: "college",

          audience: "college",

          complaintId,
        });

        addNotification({
          title:
            "Certificate Provided 🎓",

          message:
            `The problem submitted by you was successfully solved by ${
              complaint.assignedTo ||
              "College Partner"
            }. Certificate has been provided by SamadhanSetu.`,

          type: "success",

          audience: "citizen",

          complaintId,
        });
      }

      if (
        user &&
        typeof addRewardPoints ===
          "function"
      ) {
        addRewardPoints(
          50,
          `Complaint ${complaintId} resolved`
        );
      }
    }

    if (
      newStatus === "In Progress"
    ) {
      addNotification({
        title:
          "Problem Work Started 🔧",

        message:
          `Your complaint ${complaintId} is now in progress.`,

        type: "info",

        audience: "citizen",

        complaintId,

        mobile:
          complaint.userMobile ||
          complaint.mobile ||
          "",
      });
    }

    return true;
  };

  /* =======================================================
     ASSIGN PROBLEM
  ======================================================= */

  const assignProblem = (
    complaintId,
    assignmentData = {}
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return {
        success: false,
        message:
          "Complaint not found",
      };
    }

    const {
      assignedTo,
      assignedType,
      service = "",
      team = "",
      assignmentReason = "",
      assignmentScore = null,
      distanceKm = null,
    } = assignmentData;

    if (
      !assignedTo ||
      !assignedType
    ) {
      return {
        success: false,
        message:
          "Organization and type are required",
      };
    }

    const now =
      new Date().toLocaleString();

    const updates = {
      assignedTo,
      assignedType,

      assignedAt: now,

      service,
      team,

      assignmentReason,
      assignmentScore,
      distanceKm,

      status:
        assignedType === "College"
          ? "Awaiting College Response"
          : "Awaiting Industry Response",
    };

    /* =====================================================
       COLLEGE
    ===================================================== */

    if (
      assignedType ===
      "College"
    ) {
      updates.collegeAccepted =
        false;

      updates.rejectedByCollege =
        false;

      updates.collegeStatus =
        "Pending";

      updates.collegeRequest = {
        status: "Pending",

        collegeName:
          assignedTo,

        message:
          `A new problem has been assigned to ${assignedTo}.`,

        sentAt: now,

        requestedAt: now,

        respondedAt: null,

        responseBy: null,

        rejectionReason: null,
      };
    }

    /* =====================================================
       INDUSTRY
    ===================================================== */

    if (
      assignedType ===
      "Industry"
    ) {
      updates.industryAccepted =
        false;

      updates.rejectedByIndustry =
        false;

      updates.industryStatus =
        "Pending";

      updates.industryRequest = {
        status: "Pending",

        industryName:
          assignedTo,

        message:
          `A new problem has been assigned to ${assignedTo}.`,

        sentAt: now,

        requestedAt: now,

        respondedAt: null,

        responseBy: null,

        rejectionReason: null,
      };
    }

    updateComplaint(
      complaintId,
      updates
    );

    /* Partner notification */

    addNotification({
      title:
        assignedType === "College"
          ? "New Problem Solving Request 🏫"
          : "New Problem Solving Request 🏭",

      message:
        `A new ${
          complaint.category ||
          "civic"
        } problem has been assigned to ${assignedTo}.`,

      type:
        assignedType === "College"
          ? "college"
          : "admin",

      audience:
        assignedType === "College"
          ? "college"
          : "industry",

      complaintId,
    });

    /* Citizen notification */

    addNotification({
      title:
        "Problem Assigned 📤",

      message:
        `Your complaint ${complaintId} has been assigned to ${assignedTo} for solving.`,

      type: "info",

      audience: "citizen",

      complaintId,

      mobile:
        complaint.userMobile ||
        complaint.mobile ||
        "",
    });

    return {
      success: true,

      message:
        `Problem assigned to ${assignedTo}`,
    };
  };

  /* =======================================================
     ASSIGN COLLEGE
  ======================================================= */

  const assignToCollege = (
    complaintId,
    collegeName,
    extraData = {}
  ) => {
    return assignProblem(
      complaintId,
      {
        ...extraData,

        assignedTo:
          collegeName,

        assignedType:
          "College",
      }
    );
  };

  /* =======================================================
     ASSIGN INDUSTRY
  ======================================================= */

  const assignToIndustry = (
    complaintId,
    industryName,
    extraData = {}
  ) => {
    return assignProblem(
      complaintId,
      {
        ...extraData,

        assignedTo:
          industryName,

        assignedType:
          "Industry",
      }
    );
  };

  /* =======================================================
     ACCEPT COLLEGE REQUEST
     FIXED: accepts optional collegeName + responseBy
  ======================================================= */

  const acceptCollegeRequest = (
    complaintId,
    collegeName = "",
    responseBy = ""
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }

    const now =
      new Date().toLocaleString();

    const finalCollegeName =
      collegeName ||
      complaint.assignedTo ||
      complaint.collegeRequest
        ?.collegeName ||
      "College Partner";

    const finalResponseBy =
      responseBy ||
      user?.name ||
      finalCollegeName;

    const updatedRequest = {
      ...(complaint.collegeRequest ||
        {}),

      status: "Accepted",

      collegeName:
        finalCollegeName,

      respondedAt: now,

      responseBy:
        finalResponseBy,

      rejectionReason: null,
    };

    updateComplaint(
      complaintId,
      {
        collegeAccepted:
          true,

        rejectedByCollege:
          false,

        collegeStatus:
          "Accepted",

        collegeRequest:
          updatedRequest,

        status:
          "In Progress",

        acceptedBy:
          finalResponseBy,

        acceptedAt: now,
      }
    );

    addNotification({
      title:
        "College Accepted a Problem ✅",

      message:
        `${finalCollegeName} has accepted complaint ${complaint.id}. The problem is now in progress.`,

      type: "college",

      audience: "admin",

      complaintId:
        complaint.id,
    });

    addNotification({
      title:
        "College Accepted Your Problem ✅",

      message:
        `${finalCollegeName} has accepted your complaint. Status: In Progress.`,

      type: "success",

      audience: "citizen",

      complaintId:
        complaint.id,

      mobile:
        complaint.userMobile ||
        complaint.mobile ||
        "",
    });

    return true;
  };

  /* =======================================================
     REJECT COLLEGE REQUEST
     FIXED: accepts optional collegeName + responseBy
  ======================================================= */

  const rejectCollegeRequest = (
    complaintId,
    collegeName = "",
    responseBy = "",
    reason = "College unable to handle the problem"
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }

    const now =
      new Date().toLocaleString();

    const finalCollegeName =
      collegeName ||
      complaint.assignedTo ||
      complaint.collegeRequest
        ?.collegeName ||
      "College Partner";

    const finalResponseBy =
      responseBy ||
      user?.name ||
      finalCollegeName;

    const finalReason =
      reason ||
      "College unable to handle the problem";

    const updatedRequest = {
      ...(complaint.collegeRequest ||
        {}),

      status: "Rejected",

      collegeName:
        finalCollegeName,

      respondedAt: now,

      responseBy:
        finalResponseBy,

      rejectionReason:
        finalReason,
    };

    updateComplaint(
      complaintId,
      {
        collegeAccepted:
          false,

        rejectedByCollege:
          true,

        collegeStatus:
          "Rejected",

        collegeRequest:
          updatedRequest,

        status:
          "Rejected",
      }
    );

    addNotification({
      title:
        "College Rejected Problem ❌",

      message:
        `${finalCollegeName} rejected complaint ${complaint.id}. Reason: ${finalReason}`,

      type: "warning",

      audience: "admin",

      complaintId:
        complaint.id,
    });

    addNotification({
      title:
        "College Could Not Accept Problem ⚠️",

      message:
        `${finalCollegeName} could not accept your complaint. Admin will review the assignment.`,

      type: "warning",

      audience: "citizen",

      complaintId:
        complaint.id,

      mobile:
        complaint.userMobile ||
        complaint.mobile ||
        "",
    });

    return true;
  };

  /* =======================================================
     ACCEPT INDUSTRY
  ======================================================= */

  const acceptIndustryRequest = (
    complaintId,
    industryName = "",
    responseBy = ""
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }

    const now =
      new Date().toLocaleString();

    const finalIndustryName =
      industryName ||
      complaint.assignedTo ||
      complaint.industryRequest
        ?.industryName ||
      "Industry Partner";

    const finalResponseBy =
      responseBy ||
      user?.name ||
      finalIndustryName;

    const updatedRequest = {
      ...(complaint.industryRequest ||
        {}),

      status: "Accepted",

      industryName:
        finalIndustryName,

      respondedAt: now,

      responseBy:
        finalResponseBy,

      rejectionReason: null,
    };

    updateComplaint(
      complaintId,
      {
        industryAccepted:
          true,

        rejectedByIndustry:
          false,

        industryStatus:
          "Accepted",

        industryRequest:
          updatedRequest,

        status:
          "In Progress",

        acceptedBy:
          finalResponseBy,

        acceptedAt: now,
      }
    );

    addNotification({
      title:
        "Industry Accepted a Problem ✅",

      message:
        `${finalIndustryName} has accepted complaint ${complaint.id}. The problem is now in progress.`,

      type: "success",

      audience: "admin",

      complaintId:
        complaint.id,
    });

    addNotification({
      title:
        "Industry Accepted Your Problem ✅",

      message:
        `${finalIndustryName} has accepted your complaint. Status: In Progress.`,

      type: "success",

      audience: "citizen",

      complaintId:
        complaint.id,

      mobile:
        complaint.userMobile ||
        complaint.mobile ||
        "",
    });

    return true;
  };

  /* =======================================================
     REJECT INDUSTRY
  ======================================================= */

  const rejectIndustryRequest = (
    complaintId,
    industryName = "",
    responseBy = "",
    reason = "Industry unable to handle the problem"
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }

    const now =
      new Date().toLocaleString();

    const finalIndustryName =
      industryName ||
      complaint.assignedTo ||
      complaint.industryRequest
        ?.industryName ||
      "Industry Partner";

    const finalResponseBy =
      responseBy ||
      user?.name ||
      finalIndustryName;

    const finalReason =
      reason ||
      "Industry unable to handle the problem";

    const updatedRequest = {
      ...(complaint.industryRequest ||
        {}),

      status: "Rejected",

      industryName:
        finalIndustryName,

      respondedAt: now,

      responseBy:
        finalResponseBy,

      rejectionReason:
        finalReason,
    };

    updateComplaint(
      complaintId,
      {
        industryAccepted:
          false,

        rejectedByIndustry:
          true,

        industryStatus:
          "Rejected",

        industryRequest:
          updatedRequest,

        status:
          "Rejected",
      }
    );

    addNotification({
      title:
        "Industry Rejected Problem ❌",

      message:
        `${finalIndustryName} rejected complaint ${complaint.id}. Reason: ${finalReason}`,

      type: "warning",

      audience: "admin",

      complaintId:
        complaint.id,
    });

    addNotification({
      title:
        "Industry Could Not Accept Problem ⚠️",

      message:
        `${finalIndustryName} could not accept your complaint. Admin will review the assignment.`,

      type: "warning",

      audience: "citizen",

      complaintId:
        complaint.id,

      mobile:
        complaint.userMobile ||
        complaint.mobile ||
        "",
    });

    return true;
  };

  /* =======================================================
     DELETE COMPLAINT
  ======================================================= */

  const deleteComplaint = (
    complaintId
  ) => {
    setComplaints((prev) =>
      prev.filter(
        (complaint) =>
          complaint.id !== complaintId
      )
    );

    return true;
  };

  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  const markNotificationRead = (
    notificationId
  ) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id ===
        notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  const deleteNotification = (
    notificationId
  ) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.id !==
          notificationId
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  /* =======================================================
     CERTIFICATE GETTERS
  ======================================================= */

  const getCertificateByComplaint = (
    complaintId
  ) => {
    return certificates.find(
      (certificate) =>
        certificate.complaintId ===
        complaintId
    );
  };

  const getCollegeCertificates = (
    collegeName = null
  ) => {
    if (!collegeName) {
      return certificates;
    }

    return certificates.filter(
      (certificate) =>
        certificate.collegeName ===
        collegeName
    );
  };

  /* =======================================================
     PROVIDER
  ======================================================= */

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        notifications,
        certificates,

        addComplaint,
        updateComplaint,
        updateComplaintStatus,

        assignProblem,
        assignToCollege,
        assignToIndustry,

        acceptCollegeRequest,
        rejectCollegeRequest,

        acceptIndustryRequest,
        rejectIndustryRequest,

        deleteComplaint,

        markNotificationRead,
        deleteNotification,
        clearAllNotifications,

        generateCollegeCertificate,

        getCertificateByComplaint,
        getCollegeCertificates,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useComplaints() {
  const context =
    useContext(ComplaintContext);

  if (!context) {
    throw new Error(
      "useComplaints must be used inside ComplaintProvider"
    );
  }

  return context;
}

export default ComplaintContext;