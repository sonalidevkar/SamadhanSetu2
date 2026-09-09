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
     SAVE COMPLAINTS
  ======================================================= */

  useEffect(() => {
    saveArray("complaints", complaints);
  }, [complaints]);


  /* =======================================================
     SAVE NOTIFICATIONS
  ======================================================= */

  useEffect(() => {
    saveArray(
      "portalNotifications",
      notifications
    );
  }, [notifications]);


  /* =======================================================
     SAVE CERTIFICATES
  ======================================================= */

  useEffect(() => {
    saveArray(
      "collegeCertificates",
      certificates
    );
  }, [certificates]);


  /* =======================================================
     ADD NOTIFICATION
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

  const addComplaint = (complaintData) => {
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
        complaintData.assignedTo ||
        null,

      assignedType:
        complaintData.assignedType ||
        null,

      assignedAt:
        complaintData.assignedAt ||
        null,

      assignmentReason:
        complaintData.assignmentReason ||
        "",

      assignmentScore:
        complaintData.assignmentScore ??
        null,

      distanceKm:
        complaintData.distanceKm ??
        null,

      collegeAccepted:
        false,

      industryAccepted:
        false,

      rejectedByCollege:
        false,

      rejectedByIndustry:
        false,

      collegeStatus:
        complaintData.collegeStatus ||
        null,

      industryStatus:
        complaintData.industryStatus ||
        null,

      collegeRequest:
        null,

      industryRequest:
        null,

      history: [
        {
          status:
            complaintData.status ||
            "Submitted",
          date: new Date().toLocaleString(),
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


    /* Citizen notification */

    addNotification({
      title: "Complaint Submitted Successfully ✅",
      message: `Your complaint "${
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
     GENERATE COLLEGE CERTIFICATE
  ======================================================= */

  const generateCollegeCertificate = (
    complaint
  ) => {
    if (!complaint) return null;

    const existing = certificates.find(
      (cert) =>
        cert.complaintId === complaint.id
    );

    if (existing) {
      return existing;
    }

    const certificate = {
      certificateId: createId("CERT"),

      complaintId: complaint.id,

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
     UPDATE COMPLAINT STATUS
  ======================================================= */

  const updateComplaintStatus = (
    complaintId,
    newStatus
  ) => {
    let resolvedComplaint = null;
    let generatedCertificate = null;

    setComplaints((prev) =>
      prev.map((complaint) => {
        if (complaint.id !== complaintId) {
          return complaint;
        }

        const previousStatus =
          complaint.status;

        const history = Array.isArray(
          complaint.history
        )
          ? complaint.history
          : [];

        const updatedHistory = [
          ...history,
          {
            status: newStatus,
            date: new Date().toLocaleString(),
          },
        ];

        const updatedComplaint = {
          ...complaint,

          status: newStatus,

          updatedAt:
            new Date().toLocaleString(),

          history:
            updatedHistory,
        };


        /* =================================================
           RESOLVED
        ================================================= */

        if (
          newStatus === "Resolved" &&
          previousStatus !== "Resolved"
        ) {
          resolvedComplaint =
            updatedComplaint;

          /* College certificate */

          if (
            complaint.assignedType ===
            "College"
          ) {
            generatedCertificate =
              generateCollegeCertificate(
                updatedComplaint
              );

            if (
              generatedCertificate
            ) {
              updatedComplaint.certificateIssued =
                true;

              updatedComplaint.certificateId =
                generatedCertificate.certificateId;

              updatedComplaint.certificateStatus =
                "Certificate Provided";

              updatedComplaint.certificateIssuedDate =
                generatedCertificate.issuedDate;

              updatedComplaint.history = [
                ...updatedComplaint.history,
                {
                  status:
                    "Certificate Provided",
                  date:
                    new Date().toLocaleString(),
                },
              ];
            }
          }
        }

        return updatedComplaint;
      })
    );


    /* =====================================================
       CITIZEN RESOLVED NOTIFICATION
    ===================================================== */

    if (newStatus === "Resolved") {
      setTimeout(() => {
        const currentComplaint =
          complaints.find(
            (c) => c.id === complaintId
          );

        if (!currentComplaint) {
          return;
        }

        addNotification({
          title:
            "Problem Solved 🎉",

          message:
            `Your complaint ${complaintId} has been resolved successfully. ✅ Problem solved successfully`,

          type: "success",

          audience: "citizen",

          complaintId,

          mobile:
            currentComplaint.userMobile ||
            currentComplaint.mobile ||
            "",
        });


        /* =================================================
           COLLEGE NOTIFICATIONS
        ================================================= */

        if (
          currentComplaint.assignedType ===
          "College"
        ) {
          addNotification({
            title:
              "College Contribution Certificate Generated 🎓",

            message:
              `A certificate has been generated for successful resolution of complaint ${complaintId}. 🏫 College: ${
                currentComplaint.assignedTo ||
                "College"
              } 👥 Student Team: ${
                currentComplaint.team ||
                "Civil Engineering Student Team"
              } 📜 Certificate ID: ${
                generatedCertificate?.certificateId ||
                currentComplaint.certificateId ||
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
              `Congratulations! 🎉 The problem submitted by you was successfully solved by ${
                currentComplaint.assignedTo ||
                "College Partner"
              }. 📜 Certificate has been provided by SamadhanSetu.`,

            type: "success",

            audience: "citizen",

            complaintId,
          });
        }
      }, 0);


      /* Citizen reward */

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


    /* =====================================================
       IN PROGRESS NOTIFICATION
    ===================================================== */

    if (newStatus === "In Progress") {
      setTimeout(() => {
        const currentComplaint =
          complaints.find(
            (c) => c.id === complaintId
          );

        if (!currentComplaint) return;

        addNotification({
          title:
            "Problem Work Started 🔧",

          message:
            `Your complaint ${complaintId} is now in progress.`,

          type: "info",

          audience: "citizen",

          complaintId,

          mobile:
            currentComplaint.userMobile ||
            currentComplaint.mobile ||
            "",
        });
      }, 0);
    }


    return true;
  };


  /* =======================================================
     ASSIGN PROBLEM
  ======================================================= */

  const assignProblem = (
    complaintId,
    assignmentData
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return {
        success: false,
        message: "Complaint not found",
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


    if (!assignedTo || !assignedType) {
      return {
        success: false,
        message:
          "Organization and type are required",
      };
    }


    const requestStatus = "Pending";

    const updates = {
      assignedTo,

      assignedType,

      assignedAt:
        new Date().toLocaleString(),

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


    if (assignedType === "College") {
      updates.collegeAccepted = false;

      updates.rejectedByCollege =
        false;

      updates.collegeStatus =
        "Pending";

      updates.collegeRequest = {
        status: requestStatus,

        collegeName: assignedTo,

        message:
          `A new problem has been assigned to ${assignedTo}.`,

        requestedAt:
          new Date().toLocaleString(),

        respondedAt: null,

        responseBy: null,

        rejectionReason: null,
      };
    }


    if (assignedType === "Industry") {
      updates.industryAccepted = false;

      updates.rejectedByIndustry =
        false;

      updates.industryStatus =
        "Pending";

      updates.industryRequest = {
        status: requestStatus,

        industryName: assignedTo,

        message:
          `A new problem has been assigned to ${assignedTo}.`,

        requestedAt:
          new Date().toLocaleString(),

        respondedAt: null,

        responseBy: null,

        rejectionReason: null,
      };
    }


    updateComplaint(
      complaintId,
      updates
    );


    /* =================================================
       PARTNER NOTIFICATION
    ================================================= */

    addNotification({
      title:
        assignedType === "College"
          ? "New Problem Solving Request 🏫"
          : "New Problem Solving Request 🏭",

      message:
        `A new ${complaint.category || "civic"} problem has been assigned to ${assignedTo}.`,

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


    /* =================================================
       CITIZEN NOTIFICATION
    ================================================= */

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
     ASSIGN TO COLLEGE
  ======================================================= */

  const assignToCollege = (
    complaintId,
    collegeName,
    extraData = {}
  ) => {
    return assignProblem(
      complaintId,
      {
        assignedTo: collegeName,

        assignedType: "College",

        ...extraData,
      }
    );
  };


  /* =======================================================
     ASSIGN TO INDUSTRY
  ======================================================= */

  const assignToIndustry = (
    complaintId,
    industryName,
    extraData = {}
  ) => {
    return assignProblem(
      complaintId,
      {
        assignedTo: industryName,

        assignedType: "Industry",

        ...extraData,
      }
    );
  };


  /* =======================================================
     COLLEGE ACCEPT
  ======================================================= */

  const acceptCollegeRequest = (
    complaintId
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }


    const updatedRequest = {
      ...(complaint.collegeRequest || {}),

      status: "Accepted",

      respondedAt:
        new Date().toLocaleString(),

      responseBy:
        user?.name ||
        complaint.assignedTo ||
        "College Partner",
    };


    updateComplaint(
      complaintId,
      {
        collegeAccepted: true,

        rejectedByCollege: false,

        collegeStatus: "Accepted",

        collegeRequest:
          updatedRequest,

        status: "In Progress",

        acceptedBy:
          user?.name ||
          complaint.assignedTo ||
          "College Partner",

        acceptedAt:
          new Date().toLocaleString(),
      }
    );


    /* Admin notification */

    addNotification({
      title:
        "College Accepted a Problem ✅",

      message:
        `${complaint.assignedTo || "College"} has accepted complaint ${complaint.id}. The problem is now in progress.`,

      type: "college",

      audience: "admin",

      complaintId:
        complaint.id,
    });


    /* Citizen notification */

    addNotification({
      title:
        "College Accepted Your Problem ✅",

      message:
        `${complaint.assignedTo || "College"} has accepted your complaint. Status: In Progress.`,

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
     COLLEGE REJECT
  ======================================================= */

  const rejectCollegeRequest = (
    complaintId,
    reason = "College unable to handle the problem"
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }


    const updatedRequest = {
      ...(complaint.collegeRequest || {}),

      status: "Rejected",

      respondedAt:
        new Date().toLocaleString(),

      responseBy:
        user?.name ||
        complaint.assignedTo ||
        "College Partner",

      rejectionReason: reason,
    };


    updateComplaint(
      complaintId,
      {
        collegeAccepted: false,

        rejectedByCollege: true,

        collegeStatus: "Rejected",

        collegeRequest:
          updatedRequest,

        status: "Rejected",
      }
    );


    /* Admin */

    addNotification({
      title:
        "College Rejected Problem ❌",

      message:
        `${complaint.assignedTo || "College"} rejected complaint ${complaint.id}. Reason: ${reason}`,

      type: "warning",

      audience: "admin",

      complaintId:
        complaint.id,
    });


    /* Citizen */

    addNotification({
      title:
        "College Could Not Accept Problem ⚠️",

      message:
        `${complaint.assignedTo || "College"} could not accept your complaint. Admin will review the assignment.`,

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
     INDUSTRY ACCEPT
  ======================================================= */

  const acceptIndustryRequest = (
    complaintId
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }


    const updatedRequest = {
      ...(complaint.industryRequest || {}),

      status: "Accepted",

      respondedAt:
        new Date().toLocaleString(),

      responseBy:
        user?.name ||
        complaint.assignedTo ||
        "Industry Partner",
    };


    updateComplaint(
      complaintId,
      {
        industryAccepted: true,

        rejectedByIndustry: false,

        industryStatus: "Accepted",

        industryRequest:
          updatedRequest,

        status: "In Progress",

        acceptedBy:
          user?.name ||
          complaint.assignedTo ||
          "Industry Partner",

        acceptedAt:
          new Date().toLocaleString(),
      }
    );


    /* Admin */

    addNotification({
      title:
        "Industry Accepted a Problem ✅",

      message:
        `${complaint.assignedTo || "Industry"} has accepted complaint ${complaint.id}. The problem is now in progress.`,

      type: "success",

      audience: "admin",

      complaintId:
        complaint.id,
    });


    /* Citizen */

    addNotification({
      title:
        "Industry Accepted Your Problem ✅",

      message:
        `${complaint.assignedTo || "Industry"} has accepted your complaint. Status: In Progress.`,

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
     INDUSTRY REJECT
  ======================================================= */

  const rejectIndustryRequest = (
    complaintId,
    reason = "Industry unable to handle the problem"
  ) => {
    const complaint =
      complaints.find(
        (c) => c.id === complaintId
      );

    if (!complaint) {
      return false;
    }


    const updatedRequest = {
      ...(complaint.industryRequest || {}),

      status: "Rejected",

      respondedAt:
        new Date().toLocaleString(),

      responseBy:
        user?.name ||
        complaint.assignedTo ||
        "Industry Partner",

      rejectionReason: reason,
    };


    updateComplaint(
      complaintId,
      {
        industryAccepted: false,

        rejectedByIndustry: true,

        industryStatus: "Rejected",

        industryRequest:
          updatedRequest,

        status: "Rejected",
      }
    );


    /* Admin */

    addNotification({
      title:
        "Industry Rejected Problem ❌",

      message:
        `${complaint.assignedTo || "Industry"} rejected complaint ${complaint.id}. Reason: ${reason}`,

      type: "warning",

      audience: "admin",

      complaintId:
        complaint.id,
    });


    /* Citizen */

    addNotification({
      title:
        "Industry Could Not Accept Problem ⚠️",

      message:
        `${complaint.assignedTo || "Industry"} could not accept your complaint. Admin will review the assignment.`,

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
    const updated =
      complaints.filter(
        (complaint) =>
          complaint.id !== complaintId
      );

    setComplaints(updated);

    return true;
  };


  /* =======================================================
     MARK NOTIFICATION READ
  ======================================================= */

  const markNotificationRead = (
    notificationId
  ) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };


  /* =======================================================
     DELETE NOTIFICATION
  ======================================================= */

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


  /* =======================================================
     CLEAR NOTIFICATIONS
  ======================================================= */

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