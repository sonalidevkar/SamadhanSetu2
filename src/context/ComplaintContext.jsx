
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

import {
  findBestAssignment,
  organizationDirectory,
} from "../data/assignmentRules";

const ComplaintContext = createContext(null);

/* =========================================================
   FIND NEAREST SUITABLE COLLEGE
========================================================= */

function findNearbyCollege(complaint) {
  const latitude =
    complaint?.latitude ??
    complaint?.location?.latitude ??
    null;

  const longitude =
    complaint?.longitude ??
    complaint?.location?.longitude ??
    null;

  if (
    latitude == null ||
    longitude == null ||
    latitude === "" ||
    longitude === ""
  ) {
    return null;
  }

  const numericLatitude = Number(latitude);
  const numericLongitude = Number(longitude);

  if (
    Number.isNaN(numericLatitude) ||
    Number.isNaN(numericLongitude)
  ) {
    return null;
  }

  const category = String(
    complaint?.category || ""
  ).toLowerCase();

  const civilKeywords = [
    "civil",
    "road",
    "infrastructure",
    "drainage",
    "building",
    "construction",
    "water",
  ];

  const isCivilProblem = civilKeywords.some(
    (word) => category.includes(word)
  );

  if (!isCivilProblem) {
    return null;
  }

  const colleges = organizationDirectory
    .filter(
      (org) =>
        org.type === "College" &&
        org.latitude != null &&
        org.longitude != null
    )
    .map((org) => {
      const distance = calculateDistanceKm(
        numericLatitude,
        numericLongitude,
        Number(org.latitude),
        Number(org.longitude)
      );

      const keywordMatch =
        org.keywords?.some(
          (keyword) =>
            category.includes(
              String(keyword).toLowerCase()
            )
        ) || false;

      return {
        ...org,
        distance,
        keywordMatch,
      };
    })
    .sort((a, b) => {
      if (
        a.keywordMatch &&
        !b.keywordMatch
      ) {
        return -1;
      }

      if (
        !a.keywordMatch &&
        b.keywordMatch
      ) {
        return 1;
      }

      return a.distance - b.distance;
    });

  return colleges[0] || null;
}

/* =========================================================
   DISTANCE
========================================================= */

function calculateDistanceKm(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(
      (lat1 * Math.PI) / 180
    ) *
      Math.cos(
        (lat2 * Math.PI) / 180
      ) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

/* =========================================================
   PROVIDER
========================================================= */

export function ComplaintProvider({
  children,
}) {
  const {
    user,
    addRewardPoints,
    resetRewards,
  } = useAuth();

  /* =======================================================
     COMPLAINT STATE
  ======================================================= */

  const [complaints, setComplaints] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "complaints"
        );

      try {
        return saved
          ? JSON.parse(saved)
          : [];
      } catch {
        return [];
      }
    });

  /* =======================================================
     NOTIFICATION STATE
  ======================================================= */

  const [
    notifications,
    setNotifications,
  ] = useState(() => {
    const saved =
      localStorage.getItem(
        "portalNotifications"
      );

    try {
      return saved
        ? JSON.parse(saved)
        : [];
    } catch {
      return [];
    }
  });

  /* =======================================================
     CERTIFICATE STATE
  ======================================================= */

  const [
    certificates,
    setCertificates,
  ] = useState(() => {
    const saved =
      localStorage.getItem(
        "collegeCertificates"
      );

    try {
      return saved
        ? JSON.parse(saved)
        : [];
    } catch {
      return [];
    }
  });

  /* =========================================================
     SIH DEMO COLLEGE REQUEST
  ========================================================= */

  useEffect(() => {
    const savedComplaints =
      JSON.parse(
        localStorage.getItem(
          "complaints"
        ) || "[]"
      );

    const demoExists =
      savedComplaints.some(
        (item) =>
          item.id ===
          "CMP-SIH-COLLEGE-001"
      );

    if (demoExists) {
      return;
    }

    const demoNow =
      new Date().toLocaleString();

    const demoComplaint = {
      id:
        "CMP-SIH-COLLEGE-001",

      isDemo: true,

      /* CITIZEN */

      fullName:
        "Rahul Patil",

      email:
        "rahul.demo@gmail.com",

      mobile:
        "9876543210",

      city:
        "Solapur",

      district:
        "Solapur",

      state:
        "Maharashtra",

      pincode:
        "413001",

      address:
        "Hotgi Road, Solapur, Maharashtra",

      /* PROBLEM */

      title:
        "Damaged Road Near College Gate",

      category:
        "Road & Infrastructure",

      subcategory:
        "Pothole / Damaged Road",

      description:
        "The road near the college gate has several large potholes. During rain, water collects in the potholes and creates difficulty for students, pedestrians and two-wheelers.",

      exactLocation:
        "Hotgi Road, Near Engineering College Gate, Solapur",

      landmark:
        "Near College Main Gate",

      ward:
        "Ward 12",

      problemDate:
        "2026-09-08",

      priority:
        "High",

      affectedPeople:
        "250",

      impact:
        "Students, faculty members and local residents face daily difficulty while travelling on this road.",

      previousComplaint:
        "No",

      previousComplaintId:
        "",

      /* LOCATION */

      latitude:
        "17.6599",

      longitude:
        "75.9064",

      location: {
        latitude:
          "17.6599",

        longitude:
          "75.9064",

        exactLocation:
          "Hotgi Road, Near Engineering College Gate, Solapur",
      },

      /* DEPARTMENT */

      department:
        "Public Works / Municipal Engineering",

      /* COLLEGE ASSIGNMENT */

      assignedTo:
        "Karmala Engineering College",

      assignedType:
        "College",

      assignedCategory:
        "Road & Infrastructure",

      assignmentScore:
        95,

      assignmentReason:
        "AI matched this road-related problem with a nearby engineering college having a Civil Engineering student team.",

      service:
        "Road Inspection & Civil Engineering Support",

      team:
        "Civil Engineering Student Team",

      distanceKm:
        1.8,

      assignedLatitude:
        "17.6710",

      assignedLongitude:
        "75.9100",

      organizationId:
        "college-demo-001",

      /* COLLEGE REQUEST */

      collegeRequest: {
        status:
          "Pending",

        collegeName:
          "Karmala Engineering College",

        collegeType:
          "College",

        sentAt:
          demoNow,

        respondedAt:
          null,

        responseBy:
          null,

        message:
          "A citizen has reported a road and infrastructure problem near the college. Can your college or student team support the solution?",
      },

      collegeAccepted:
        false,

      /* AI ANALYSIS */

      aiAnalysis: {
        analyzed:
          true,

        analyzedAt:
          demoNow,

        category:
          "Road & Infrastructure",

        recommendation:
          "Karmala Engineering College - Civil Engineering Student Team",
      },

      /* REWARD */

      rewardPointsEarned:
        0,

      /* CERTIFICATE */

      certificateIssued:
        false,

      certificateId:
        null,

      /* STATUS */

      status:
        "Awaiting College Response",

      createdAt:
        new Date().toLocaleDateString(),

      /* HISTORY */

      history: [
        {
          status:
            "Submitted",

          date:
            demoNow,
        },
      ],
    };

    const updatedComplaints = [
      demoComplaint,
      ...savedComplaints,
    ];

    setComplaints(
      updatedComplaints
    );

    localStorage.setItem(
      "complaints",
      JSON.stringify(
        updatedComplaints
      )
    );

    /* DEMO NOTIFICATION */

    const savedNotifications =
      JSON.parse(
        localStorage.getItem(
          "portalNotifications"
        ) || "[]"
      );

    const notificationExists =
      savedNotifications.some(
        (item) =>
          item.complaintId ===
          "CMP-SIH-COLLEGE-001"
      );

    if (!notificationExists) {
      const demoNotification = {
        id:
          `NOT-SIH-${Date.now()}`,

        type:
          "college-request",

        audience:
          "college",

        complaintId:
          "CMP-SIH-COLLEGE-001",

        collegeName:
          "Karmala Engineering College",

        title:
          "New Problem Solving Request 🏫",

        message:
          "A Road & Infrastructure problem has been assigned to Karmala Engineering College.",

        status:
          "Pending",

        date:
          demoNow,

        read:
          false,
      };

      const updatedNotifications = [
        demoNotification,
        ...savedNotifications,
      ];

      setNotifications(
        updatedNotifications
      );

      localStorage.setItem(
        "portalNotifications",
        JSON.stringify(
          updatedNotifications
        )
      );
    }
  }, []);

  /* =======================================================
     SYNC LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    const handleStorage = (
      event
    ) => {
      if (
        event.key ===
        "complaints"
      ) {
        try {
          setComplaints(
            event.newValue
              ? JSON.parse(
                  event.newValue
                )
              : []
          );
        } catch {
          setComplaints([]);
        }
      }

      if (
        event.key ===
        "portalNotifications"
      ) {
        try {
          setNotifications(
            event.newValue
              ? JSON.parse(
                  event.newValue
                )
              : []
          );
        } catch {
          setNotifications([]);
        }
      }

      if (
        event.key ===
        "collegeCertificates"
      ) {
        try {
          setCertificates(
            event.newValue
              ? JSON.parse(
                  event.newValue
                )
              : []
          );
        } catch {
          setCertificates([]);
        }
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  /* =========================================================
     SAVE NOTIFICATION
  ========================================================= */

  const saveNotification = (
    notification
  ) => {
    const saved =
      localStorage.getItem(
        "portalNotifications"
      );

    let oldNotifications =
      [];

    try {
      oldNotifications =
        saved
          ? JSON.parse(saved)
          : [];
    } catch {
      oldNotifications = [];
    }

    const updated = [
      notification,
      ...oldNotifications,
    ];

    setNotifications(
      updated
    );

    localStorage.setItem(
      "portalNotifications",
      JSON.stringify(
        updated
      )
    );
  };

  /* =========================================================
     DELETE SINGLE NOTIFICATION
     NEW FEATURE
  ========================================================= */

  const deleteNotification = (
    id
  ) => {
    const updatedNotifications =
      notifications.filter(
        (notification) =>
          notification.id !== id
      );

    setNotifications(
      updatedNotifications
    );

    localStorage.setItem(
      "portalNotifications",
      JSON.stringify(
        updatedNotifications
      )
    );
  };

  /* =========================================================
     CLEAR ALL NOTIFICATIONS
     NEW FEATURE
  ========================================================= */

  const clearAllNotifications = () => {
    setNotifications([]);

    localStorage.setItem(
      "portalNotifications",
      JSON.stringify([])
    );
  };

  /* =========================================================
     GENERATE COLLEGE CERTIFICATE
  ========================================================= */

  const generateCollegeCertificate = (
    complaint
  ) => {
    if (!complaint) {
      return null;
    }

    if (
      complaint.assignedType !==
      "College"
    ) {
      return null;
    }

    const existingCertificate =
      certificates.find(
        (certificate) =>
          certificate.complaintId ===
          complaint.id
      );

    if (existingCertificate) {
      return existingCertificate;
    }

    const now =
      new Date();

    const certificateId =
      `CERT-${Date.now()}`;

    const certificate = {
      id:
        certificateId,

      certificateId:
        certificateId,

      complaintId:
        complaint.id,

      certificateType:
        "Certificate of Community Contribution",

      title:
        "Certificate of Community Problem Solving",

      collegeName:
        complaint.assignedTo ||
        complaint.collegeRequest
          ?.collegeName ||
        "Participating College",

      studentTeam:
        complaint.team ||
        "Student Problem Solving Team",

      problemTitle:
        complaint.title ||
        "Community Problem",

      category:
        complaint.category ||
        "Civic Problem",

      problemLocation:
        complaint.exactLocation ||
        complaint.location
          ?.exactLocation ||
        "Location provided",

      department:
        complaint.department ||
        "Concerned Department",

      service:
        complaint.service ||
        "Community Problem Solving Service",

      issuedDate:
        now.toLocaleDateString(),

      issuedDateTime:
        now.toLocaleString(),

      status:
        "Certificate Provided",

      issuedBy:
        "SamadhanSetu",

      message:
        "This certificate recognizes the contribution of the college and student team in successfully solving a community problem.",

      verified:
        true,
    };

    const updatedCertificates = [
      certificate,
      ...certificates,
    ];

    setCertificates(
      updatedCertificates
    );

    localStorage.setItem(
      "collegeCertificates",
      JSON.stringify(
        updatedCertificates
      )
    );

    /* COLLEGE NOTIFICATION */

    saveNotification({
      id:
        `NOT-${Date.now()}-CERTIFICATE`,

      type:
        "certificate",

      audience:
        "college",

      complaintId:
        complaint.id,

      collegeName:
        certificate.collegeName,

      title:
        "Certificate Provided 🎓",

      message:
        `Congratulations! 🎉

🏫 College:
${certificate.collegeName}

👥 Student Team:
${certificate.studentTeam}

🔧 Problem Solved:
${certificate.problemTitle}

📍 Location:
${certificate.problemLocation}

📜 Certificate ID:
${certificate.certificateId}

✅ Status:
Certificate Provided

Thank you for helping the community through SamadhanSetu.`,

      status:
        "Certificate Provided",

      certificateId:
        certificate.certificateId,

      date:
        certificate.issuedDateTime,

      read:
        false,
    });

    /* ADMIN NOTIFICATION */

    saveNotification({
      id:
        `NOT-${Date.now()}-CERT-ADMIN`,

      type:
        "certificate-issued",

      audience:
        "admin",

      complaintId:
        complaint.id,

      title:
        "College Contribution Certificate Generated 🎓",

      message:
        `A certificate has been generated for the successful resolution of complaint ${complaint.id}.

🏫 College:
${certificate.collegeName}

👥 Student Team:
${certificate.studentTeam}

🔧 Problem:
${certificate.problemTitle}

📜 Certificate ID:
${certificate.certificateId}`,

      status:
        "Certificate Provided",

      certificateId:
        certificate.certificateId,

      date:
        certificate.issuedDateTime,

      read:
        false,
    });

    return certificate;
  };

  /* =========================================================
     ADD COMPLAINT
  ========================================================= */

  const addComplaint = (
    complaint
  ) => {
    const aiAssignment =
      findBestAssignment(
        complaint
      );

    const nearbyCollege =
      findNearbyCollege(
        complaint
      );

    const finalAssignment =
      nearbyCollege
        ? {
            ...aiAssignment,

            assignedTo:
              nearbyCollege.name,

            assignedType:
              "College",

            assignedCategory:
              nearbyCollege.category ||
              complaint.category ||
              "Civil / Infrastructure",

            assignmentScore:
              Math.max(
                aiAssignment
                  ?.assignmentScore ||
                  0,

                nearbyCollege.keywordMatch
                  ? 95
                  : 85
              ),

            assignmentReason:
              `Nearby college selected for ${
                complaint.category ||
                "Civil problem"
              } based on location and expertise.`,

            service:
              nearbyCollege.service ||
              "Civil / Technical Problem Solving",

            team:
              nearbyCollege.team ||
              "Civil Engineering Student Team",

            distanceKm:
              nearbyCollege.distance,

            assignedLatitude:
              nearbyCollege.latitude,

            assignedLongitude:
              nearbyCollege.longitude,

            organizationId:
              nearbyCollege.id,
          }
        : aiAssignment;

    const isCollegeAssignment =
      finalAssignment
        ?.assignedType ===
      "College";

    const now =
      new Date().toLocaleString();

    const newComplaint = {
      ...complaint,

      isDemo:
        false,

      id:
        `CMP-${Date.now()}`,

      status:
        isCollegeAssignment
          ? "Awaiting College Response"
          : "Submitted",

      createdAt:
        new Date().toLocaleDateString(),

      userMobile:
        complaint.mobile ||
        user?.mobile ||
        "Mobile number not available",

      userEmail:
        complaint.email ||
        user?.email ||
        "",

      assignedTo:
        finalAssignment
          ?.assignedTo ||
        "Concerned Department",

      assignedType:
        finalAssignment
          ?.assignedType ||
        "Government",

      assignedCategory:
        finalAssignment
          ?.assignedCategory ||
        complaint.category ||
        "General",

      assignmentScore:
        finalAssignment
          ?.assignmentScore ||
        0,

      assignmentReason:
        finalAssignment
          ?.assignmentReason ||
        "",

      service:
        finalAssignment
          ?.service ||
        "General Service",

      team:
        finalAssignment
          ?.team ||
        "Concerned Team",

      distanceKm:
        finalAssignment
          ?.distanceKm ??
        null,

      assignedLatitude:
        finalAssignment
          ?.assignedLatitude ??
        finalAssignment?.latitude ??
        null,

      assignedLongitude:
        finalAssignment
          ?.assignedLongitude ??
        finalAssignment?.longitude ??
        null,

      organizationId:
        finalAssignment
          ?.organizationId ??
        null,

      collegeRequest:
        isCollegeAssignment
          ? {
              status:
                "Pending",

              collegeName:
                finalAssignment.assignedTo,

              collegeType:
                "College",

              sentAt:
                now,

              respondedAt:
                null,

              responseBy:
                null,

              message:
                `A citizen has reported a ${
                  complaint.category ||
                  "Civil"
                } related problem near the college. Can your college/student team solve this problem?`,
            }
          : null,

      collegeAccepted:
        false,

      aiAnalysis: {
        analyzed:
          true,

        analyzedAt:
          now,

        category:
          complaint.category ||
          "General",

        recommendation:
          finalAssignment
            ?.assignedTo ||
          "Concerned Department",
      },

      rewardPointsEarned:
        10,

      certificateIssued:
        false,

      certificateId:
        null,

      history: [
        {
          status:
            "Submitted",

          date:
            now,
        },
      ],
    };

    const updatedComplaints = [
      ...complaints,
      newComplaint,
    ];

    setComplaints(
      updatedComplaints
    );

    localStorage.setItem(
      "complaints",
      JSON.stringify(
        updatedComplaints
      )
    );

    /* +10 REWARD */

    addRewardPoints(
      10,
      "Complaint submitted"
    );

    /* CITIZEN NOTIFICATION */

    saveNotification({
      id:
        `NOT-${Date.now()}-SUBMIT`,

      type:
        "submitted",

      complaintId:
        newComplaint.id,

      userMobile:
        newComplaint.userMobile,

      title:
        isCollegeAssignment
          ? "College Request Sent 🏫"
          : "Complaint Submitted Successfully ✅",

      message:
        isCollegeAssignment
          ? `Your complaint ${
              newComplaint.id
            } has been sent to ${
              newComplaint.assignedTo
            } for acceptance.

🏫 College:
${newComplaint.assignedTo}

🔧 Problem:
${newComplaint.category}

📍 Location:
${
  newComplaint.exactLocation ||
  newComplaint.location
    ?.exactLocation ||
  "Location provided"
}

⏳ Waiting for college response.
⭐ Reward: +10 points`
          : `Your complaint "${
              newComplaint.title ||
              "Civic Problem"
            }" has been submitted successfully.

🤖 AI Category:
${newComplaint.category}

🏢 Recommended Organization:
${newComplaint.assignedTo}

🔧 Service:
${newComplaint.service}

⭐ Reward: +10 points`,

      status:
        newComplaint.status,

      rewardPoints:
        10,

      assignedTo:
        newComplaint.assignedTo,

      date:
        now,

      read:
        false,
    });

    /* COLLEGE NOTIFICATION */

    if (isCollegeAssignment) {
      saveNotification({
        id:
          `NOT-${Date.now()}-COLLEGE`,

        type:
          "college-request",

        audience:
          "college",

        complaintId:
          newComplaint.id,

        collegeName:
          newComplaint.assignedTo,

        title:
          "New Problem Solving Request 🏫",

        message:
          `A new ${
            newComplaint.category ||
            "Civil"
          } problem has been assigned to your college.

Citizen Problem:
${
  newComplaint.title ||
  "Civic Problem"
}

Description:
${
  newComplaint.description ||
  "No description provided"
}

Location:
${
  newComplaint.exactLocation ||
  newComplaint.location
    ?.exactLocation ||
  "Location provided"
}

📍 Distance:
${
  newComplaint.distanceKm !=
  null
    ? `${Number(
        newComplaint.distanceKm
      ).toFixed(2)} km`
    : "Nearby"
}

Can your college/student team solve this problem?

Open College Requests to Accept or Reject.`,

        status:
          "Pending",

        date:
          now,

        read:
          false,
      });
    }

    return newComplaint;
  };

  /* =========================================================
     ACCEPT COLLEGE REQUEST
  ========================================================= */

  const acceptCollegeRequest = (
    complaintId,
    collegeName,
    responseBy =
      "College Representative"
  ) => {
    const existingComplaint =
      complaints.find(
        (complaint) =>
          complaint.id ===
          complaintId
      );

    if (!existingComplaint) {
      return {
        success:
          false,

        message:
          "Complaint not found.",
      };
    }

    const now =
      new Date().toLocaleString();

    const updatedComplaint = {
      ...existingComplaint,

      status:
        "In Progress",

      collegeAccepted:
        true,

      assignedTo:
        collegeName ||
        existingComplaint.assignedTo,

      collegeRequest: {
        ...(existingComplaint.collegeRequest ||
          {}),

        status:
          "Accepted",

        respondedAt:
          now,

        responseBy,

        collegeName:
          collegeName ||
          existingComplaint.assignedTo,
      },

      history: [
        ...(existingComplaint.history ||
          []),

        {
          status:
            "College Accepted",

          date:
            now,
        },

        {
          status:
            "In Progress",

          date:
            now,
        },
      ],
    };

    const updatedComplaints =
      complaints.map(
        (complaint) =>
          complaint.id ===
          complaintId
            ? updatedComplaint
            : complaint
      );

    setComplaints(
      updatedComplaints
    );

    localStorage.setItem(
      "complaints",
      JSON.stringify(
        updatedComplaints
      )
    );

    /* CITIZEN */

    saveNotification({
      id:
        `NOT-${Date.now()}-ACCEPT-CITIZEN`,

      type:
        "college-accepted",

      audience:
        "citizen",

      complaintId,

      title:
        "College Accepted Your Problem ✅",

      message:
        `${
          collegeName ||
          existingComplaint.assignedTo
        } has accepted your complaint.

🏫 College:
${
  collegeName ||
  existingComplaint.assignedTo
}

🔧 Problem:
${
  existingComplaint.title ||
  existingComplaint.category
}

🚀 Status:
In Progress

The college/student team will start working on the solution.`,

      status:
        "In Progress",

      assignedTo:
        collegeName ||
        existingComplaint.assignedTo,

      date:
        now,

      read:
        false,
    });

    /* ADMIN */

    saveNotification({
      id:
        `NOT-${Date.now()}-ACCEPT-ADMIN`,

      type:
        "admin-college-accepted",

      audience:
        "admin",

      complaintId,

      title:
        "College Accepted a Problem ✅",

      message:
        `${
          collegeName ||
          existingComplaint.assignedTo
        } has accepted complaint ${complaintId}.

🏫 Assigned College:
${
  collegeName ||
  existingComplaint.assignedTo
}

🔧 Category:
${existingComplaint.category}

📍 Location:
${
  existingComplaint.exactLocation ||
  existingComplaint.location
    ?.exactLocation ||
  "Location provided"
}

The college will work on solving the problem.`,

      status:
        "College Accepted",

      assignedTo:
        collegeName ||
        existingComplaint.assignedTo,

      date:
        now,

      read:
        false,
    });

    return {
      success:
        true,

      complaint:
        updatedComplaint,
    };
  };

  /* =========================================================
     REJECT COLLEGE REQUEST
  ========================================================= */

  const rejectCollegeRequest = (
    complaintId,
    collegeName,
    responseBy =
      "College Representative",
    reason =
      "College is unable to solve this problem."
  ) => {
    const existingComplaint =
      complaints.find(
        (complaint) =>
          complaint.id ===
          complaintId
      );

    if (!existingComplaint) {
      return {
        success:
          false,

        message:
          "Complaint not found.",
      };
    }

    const now =
      new Date().toLocaleString();

    const updatedComplaint = {
      ...existingComplaint,

      status:
        "Submitted",

      collegeAccepted:
        false,

      collegeRequest: {
        ...(existingComplaint.collegeRequest ||
          {}),

        status:
          "Rejected",

        respondedAt:
          now,

        responseBy,

        collegeName:
          collegeName ||
          existingComplaint.assignedTo,

        rejectionReason:
          reason,
      },

      history: [
        ...(existingComplaint.history ||
          []),

        {
          status:
            "College Rejected",

          date:
            now,
        },
      ],
    };

    const updatedComplaints =
      complaints.map(
        (complaint) =>
          complaint.id ===
          complaintId
            ? updatedComplaint
            : complaint
      );

    setComplaints(
      updatedComplaints
    );

    localStorage.setItem(
      "complaints",
      JSON.stringify(
        updatedComplaints
      )
    );

    /* ADMIN */

    saveNotification({
      id:
        `NOT-${Date.now()}-REJECT-ADMIN`,

      type:
        "college-rejected",

      audience:
        "admin",

      complaintId,

      title:
        "College Rejected Problem ⚠️",

      message:
        `${
          collegeName ||
          existingComplaint.assignedTo
        } rejected complaint ${complaintId}.

Reason:
${reason}

Admin action is required for reassignment.`,

      status:
        "College Rejected",

      assignedTo:
        collegeName ||
        existingComplaint.assignedTo,

      date:
        now,

      read:
        false,
    });

    /* CITIZEN */

    saveNotification({
      id:
        `NOT-${Date.now()}-REJECT-CITIZEN`,

      type:
        "college-rejected",

      audience:
        "citizen",

      complaintId,

      title:
        "College Could Not Accept Problem ⚠️",

      message:
        `${
          collegeName ||
          existingComplaint.assignedTo
        } could not accept your complaint.

Reason:
${reason}

The problem will require reassignment.`,

      status:
        "College Rejected",

      assignedTo:
        collegeName ||
        existingComplaint.assignedTo,

      date:
        now,

      read:
        false,
    });

    return {
      success:
        true,

      complaint:
        updatedComplaint,
    };
  };

  /* =========================================================
     UPDATE GENERAL STATUS
     + REWARD
     + CERTIFICATE
  ========================================================= */

  const updateComplaintStatus = (
    id,
    newStatus
  ) => {
    const existingComplaint =
      complaints.find(
        (complaint) =>
          complaint.id === id
      );

    if (!existingComplaint) {
      return;
    }

    const wasAlreadyResolved =
      existingComplaint.status ===
      "Resolved";

    const now =
      new Date().toLocaleString();

    const updatedComplaint = {
      ...existingComplaint,

      status:
        newStatus,

      history: [
        ...(existingComplaint.history ||
          []),

        {
          status:
            newStatus,

          date:
            now,
        },
      ],
    };

    let resolutionReward =
      0;

    /* RESOLUTION REWARD */

    if (
      newStatus ===
        "Resolved" &&
      !wasAlreadyResolved
    ) {
      resolutionReward =
        50;

      updatedComplaint.rewardPointsEarned =
        (
          existingComplaint.rewardPointsEarned ||
          0
        ) + 50;

      addRewardPoints(
        50,
        `Complaint ${id} resolved`
      );
    }

    /* COLLEGE CERTIFICATE */

    let generatedCertificate =
      null;

    if (
      newStatus ===
        "Resolved" &&
      !wasAlreadyResolved &&
      existingComplaint.assignedType ===
        "College"
    ) {
      generatedCertificate =
        generateCollegeCertificate(
          updatedComplaint
        );

      if (generatedCertificate) {
        updatedComplaint.certificateIssued =
          true;

        updatedComplaint.certificateId =
          generatedCertificate.certificateId;

        updatedComplaint.certificateStatus =
          "Certificate Provided";

        updatedComplaint.certificateIssuedDate =
          generatedCertificate.issuedDate;

        updatedComplaint.history = [
          ...(updatedComplaint.history ||
            []),

          {
            status:
              "Certificate Provided",

            date:
              now,

            certificateId:
              generatedCertificate.certificateId,
          },
        ];
      }
    }

    const updatedComplaints =
      complaints.map(
        (complaint) =>
          complaint.id === id
            ? updatedComplaint
            : complaint
      );

    setComplaints(
      updatedComplaints
    );

    localStorage.setItem(
      "complaints",
      JSON.stringify(
        updatedComplaints
      )
    );

    const mobile =
      existingComplaint.userMobile ||
      existingComplaint.mobile ||
      user?.mobile ||
      "Mobile number not available";

    /* STATUS NOTIFICATION */

    let notificationTitle =
      "Complaint Status Updated 📢";

    let notificationMessage =
      `Your complaint ${id} status is now ${newStatus}.`;

    if (
      newStatus ===
      "Resolved"
    ) {
      notificationTitle =
        "Problem Solved 🎉";

      notificationMessage =
        `Your complaint ${id} has been resolved successfully.

✅ Problem solved successfully
⭐ Reward earned: +50 points
🏫 Solved by:
${
  existingComplaint.assignedTo ||
  "Concerned Organization"
}
📱 Registered number:
${mobile}`;

      if (
        generatedCertificate
      ) {
        notificationMessage += `

🎓 College Contribution Certificate:
Certificate Provided

🏫 College:
${generatedCertificate.collegeName}

👥 Student Team:
${generatedCertificate.studentTeam}

📜 Certificate ID:
${generatedCertificate.certificateId}`;
      }
    } else if (
      newStatus ===
      "In Progress"
    ) {
      notificationTitle =
        "Complaint In Progress 🔄";

      notificationMessage =
        `Your complaint ${id} is now being processed.

🏢 Organization:
${
  existingComplaint.assignedTo ||
  "Concerned Department"
}

${
  existingComplaint.collegeAccepted
    ? "🏫 College has accepted this problem."
    : ""
}`;
    } else if (
      newStatus ===
      "Under Review"
    ) {
      notificationTitle =
        "Complaint Under Review 🔍";

      notificationMessage =
        `Your complaint ${id} is currently under review by:
${
  existingComplaint.assignedTo ||
  "Concerned Organization"
}`;
    }

    saveNotification({
      id:
        `NOT-${Date.now()}-${Math.random()}`,

      type:
        "status",

      complaintId:
        id,

      userMobile:
        mobile,

      title:
        notificationTitle,

      message:
        notificationMessage,

      status:
        newStatus,

      rewardPoints:
        resolutionReward,

      assignedTo:
        existingComplaint.assignedTo ||
        "",

      date:
        now,

      read:
        false,
    });

    /* CITIZEN CERTIFICATE NOTIFICATION */

    if (
      generatedCertificate
    ) {
      saveNotification({
        id:
          `NOT-${Date.now()}-CERT-CITIZEN`,

        type:
          "certificate",

        audience:
          "citizen",

        complaintId:
          id,

        title:
          "College Team Earned a Certificate 🎓",

        message:
          `The problem submitted by you was successfully solved by:

🏫 College:
${generatedCertificate.collegeName}

👥 Student Team:
${generatedCertificate.studentTeam}

🔧 Problem:
${generatedCertificate.problemTitle}

📜 Certificate ID:
${generatedCertificate.certificateId}

✅ Certificate Provided by SamadhanSetu.`,

        status:
          "Certificate Provided",

        assignedTo:
          generatedCertificate.collegeName,

        certificateId:
          generatedCertificate.certificateId,

        date:
          now,

        read:
          false,
      });
    }
  };

  /* =========================================================
     DELETE COMPLAINT
  ========================================================= */

  const deleteComplaint = (
    id
  ) => {
    const updated =
      complaints.filter(
        (complaint) =>
          complaint.id !== id
      );

    setComplaints(
      updated
    );

    localStorage.setItem(
      "complaints",
      JSON.stringify(
        updated
      )
    );

    const realUserComplaints =
      updated.filter(
        (complaint) =>
          !complaint.isDemo
      );

    if (
      realUserComplaints.length ===
      0
    ) {
      resetRewards();

      window.dispatchEvent(
        new Event(
          "rewardReset"
        )
      );
    }
  };

  /* =========================================================
     MARK NOTIFICATION READ
  ========================================================= */

  const markNotificationRead = (
    id
  ) => {
    const updatedNotifications =
      notifications.map(
        (notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true,
              }
            : notification
      );

    setNotifications(
      updatedNotifications
    );

    localStorage.setItem(
      "portalNotifications",
      JSON.stringify(
        updatedNotifications
      )
    );
  };

  /* =========================================================
     GET CERTIFICATE BY COMPLAINT
  ========================================================= */

  const getCertificateByComplaint = (
    complaintId
  ) => {
    return (
      certificates.find(
        (certificate) =>
          certificate.complaintId ===
          complaintId
      ) || null
    );
  };

  /* =========================================================
     GET COLLEGE CERTIFICATES
  ========================================================= */

  const getCollegeCertificates = (
    collegeName
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

  /* =========================================================
     PROVIDER
  ========================================================= */

  return (
    <ComplaintContext.Provider
      value={{
        complaints,

        notifications,

        certificates,

        addComplaint,

        updateComplaintStatus,

        acceptCollegeRequest,

        rejectCollegeRequest,

        deleteComplaint,

        markNotificationRead,

        // NEW NOTIFICATION FEATURES
        deleteNotification,

        clearAllNotifications,

        // CERTIFICATE FEATURES
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
    useContext(
      ComplaintContext
    );

  if (!context) {
    throw new Error(
      "useComplaints must be used inside ComplaintProvider"
    );
  }

  return context;
}

