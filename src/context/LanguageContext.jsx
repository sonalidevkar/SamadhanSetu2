import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

// =========================================================
// TRANSLATIONS
// =========================================================

const translations = {
  // =======================================================
  // ENGLISH
  // =======================================================

  en: {
    // -----------------------------------------------------
    // Navbar / Sidebar
    // -----------------------------------------------------

    dashboard: "Dashboard",
    submitProblem: "Submit Problem",
    myComplaints: "My Complaints",
    trackStatus: "Track Status",
    aiAssistant: "AI Assistant",
    notifications: "Notifications",
    helpSupport: "Help & Support",
    feedback: "Feedback",
    profile: "My Profile",
    departmentPanel: "Department Panel",
    collegeRequests: "College Requests",

    // -----------------------------------------------------
    // Dashboard
    // -----------------------------------------------------

    communityDashboard:
      "Community Problem Dashboard",

    dashboardText:
      "Report issues, track solutions, and make your community better.",

    reportProblem:
      "Report Problem",

    totalComplaints:
      "Total Complaints",

    pending:
      "Pending",

    inProgress:
      "In Progress",

    resolved:
      "Resolved",

    submitted:
      "Submitted",

    // -----------------------------------------------------
    // Rewards
    // -----------------------------------------------------

    communityRewards:
      "Community Rewards",

    rewardText:
      "Earn points by reporting civic problems and helping your community.",

    totalPoints:
      "Total Points",

    pointsToNext:
      "points to next level",

    maximumLevel:
      "Maximum reward level reached!",

    problemSubmittedReward:
      "Problem Submitted",

    progressUpdate:
      "Progress Update",

    problemResolved:
      "Problem Resolved",

    rewardSummary:
      "Reward Summary",

    currentPoints:
      "Current Points",

    problemsReported:
      "Problems Reported",

    problemsResolved:
      "Problems Resolved",

    pointsFromComplaints:
      "Points From Complaints",

    currentBadge:
      "Current Badge",

    latestReward:
      "Latest Reward Activity",

    points:
      "Points",

    // -----------------------------------------------------
    // AI Assignment
    // -----------------------------------------------------

    latestAI:
      "Latest AI Assignment",

    complaint:
      "Complaint",

    category:
      "Category",

    assignedOrganization:
      "Assigned Organization",

    assignedType:
      "Assigned Type",

    assignedTeam:
      "Assigned Team",

    service:
      "Service",

    distance:
      "Distance",

    trackProgress:
      "Track Progress",

    collegeCollaboration:
      "College Collaboration",

    college:
      "College",

    collegeRequest:
      "College Request",

    accepted:
      "Accepted",

    rejected:
      "Rejected",

    waitingForCollege:
      "Waiting for College",

    collegeAccepted:
      "College Accepted",

    collegeAcceptedText:
      "has accepted this problem and will work on the solution.",

    waitingCollegeText:
      "A problem-solving request has been sent to the college.",

    studentTeam:
      "Student Team",

    // -----------------------------------------------------
    // Workflow
    // -----------------------------------------------------

    quickActions:
      "Quick Actions",

    smartGuidance:
      "Get smart guidance",

    submitNewProblem:
      "Report a new civic issue",

    viewComplaints:
      "View your complaints",

    trackProblemProgress:
      "Track problem progress",

    howWorks:
      "How SamadhanSetu Works",

    citizenReports:
      "Citizen Reports",

    citizenReportsText:
      "Submit the problem with description, evidence and live location.",

    aiAnalysis:
      "AI Analysis",

    aiAnalysisText:
      "AI identifies the problem category and requirements.",

    smartLocalAssignment:
      "Smart Local Assignment",

    smartLocalAssignmentText:
      "A nearby relevant municipality, college or service team is recommended.",

    collegeAccepts:
      "College Accepts",

    collegeAcceptsText:
      "The nearby college reviews the problem and accepts it if its team can solve it.",

    resolutionReward:
      "Resolution & Reward",

    resolutionRewardText:
      "Track every step and earn reward points when the problem is resolved.",

    // -----------------------------------------------------
    // Recent Complaints
    // -----------------------------------------------------

    recentComplaints:
      "Recent Complaints",

    viewAll:
      "View All",

    noComplaints:
      "No complaints yet",

    startReporting:
      "Start by reporting a civic problem.",

    submitFirstProblem:
      "Submit First Problem",

    // -----------------------------------------------------
    // Submit Problem
    // -----------------------------------------------------

    userDetails:
      "User Details",

    fullName:
      "Full Name",

    mobile:
      "Mobile Number",

    email:
      "Email Address",

    city:
      "City",

    district:
      "District",

    state:
      "State",

    pincode:
      "Pincode",

    address:
      "Address",

    enterDistrict:
      "Enter district",

    enterState:
      "Enter state",

    enterPincode:
      "Enter pincode",

    completeAddress:
      "Enter your complete address",

    problemDetails:
      "Problem Details",

    problemDetailsText:
      "Explain your community problem.",

    problemTitle:
      "Problem Title",

    problemTitlePlaceholder:
      "Example: Garbage not collected for 5 days",

    problemCategory:
      "Problem Category",

    selectCategory:
      "Select category",

    roadInfrastructure:
      "Road & Infrastructure",

    waterSupply:
      "Water Supply",

    wasteManagement:
      "Waste Management",

    electricity:
      "Electricity",

    drainage:
      "Drainage",

    agriculture:
      "Agriculture",

    medicalPublicHealth:
      "Medical & Public Health",

    education:
      "Education",

    publicSafety:
      "Public Safety",

    other:
      "Other",

    subcategory:
      "Subcategory",

    subcategoryPlaceholder:
      "Example: Pothole / Garbage",

    problemDate:
      "Problem Date",

    priority:
      "Priority",

    low:
      "Low",

    medium:
      "Medium",

    high:
      "High",

    critical:
      "Critical",

    detailedDescription:
      "Detailed Description",

    descriptionPlaceholder:
      "Describe your problem or use the microphone...",

    useMyLocation:
      "Use My Location",

    liveLocation:
      "Live Location",

    nearbyCenters:
      "Nearby Centers",

    liveLocationNearby:
      "Live Location & Nearby Services",

    liveLocationText:
      "Your live location helps the AI find nearby colleges, municipalities and relevant government services.",

    detecting:
      "Detecting...",

    useMyLiveLocation:
      "Use My Live Location",

    selectedGPSLocation:
      "Selected GPS Location",

    latitude:
      "Latitude",

    longitude:
      "Longitude",

    exactLocation:
      "Exact Location",

    exactLocationPlaceholder:
      "Use live location or enter manually",

    nearestLandmark:
      "Nearest Landmark",

    landmark:
      "Landmark",

    landmarkPlaceholder:
      "Example: Near bus stand",

    wardArea:
      "Ward / Area",

    wardPlaceholder:
      "Enter ward or area",

    communityImpact:
      "Community Impact",

    communityImpactText:
      "Tell us how the problem affects local citizens.",

    affectedPeople:
      "Approx. Affected People",

    affectedPeoplePlaceholder:
      "Example: 100",

    reportedBefore:
      "Was this reported before?",

    previousComplaintID:
      "Previous Complaint ID",

    previousComplaintPlaceholder:
      "Enter complaint ID",

    impactOnCitizens:
      "Impact on Citizens",

    impactPlaceholder:
      "Explain how this problem affects people...",

    evidence:
      "Evidence",

    evidenceText:
      "Upload photo or supporting document.",

    uploadEvidence:
      "Upload Evidence",

    selected:
      "Selected",

    speak:
      "Speak",

    listening:
      "Listening...",

    voiceNotSupported:
      "❌ Voice-to-text is not supported. Please use Google Chrome.",

    voiceListening:
      "🎤 Listening... Please speak your problem.",

    voiceSuccess:
      "✅ Voice converted to text successfully.",

    microphoneDenied:
      "❌ Microphone permission denied. Please allow microphone access.",

    voiceRecognitionError:
      "❌ Unable to recognize voice. Please try again.",

    geolocationNotSupported:
      "❌ Geolocation is not supported by this browser.",

    gettingLiveLocation:
      "📍 Getting your live location...",

    locationDetected:
      "✅ Location detected. Accuracy: approximately",

    meters:
      "meters",

    locationPermissionDenied:
      "❌ Location permission denied. Please allow location access.",

    locationUnavailable:
      "❌ Your current location is unavailable.",

    locationTimeout:
      "❌ Location request timed out. Please try again.",

    locationError:
      "❌ Unable to get your current location.",

    mapLocationSelected:
      "✅ Map location selected. Accuracy: approximately",

    samadhanAI:
      "Samadhan AI",

    samadhanAIText:
      "Your problem description, category and live location will be analyzed to recommend a nearby relevant municipality, college or government service team.",

    rewardParticipation:
      "You will earn reward points for meaningful participation.",

    submitComplaint:
      "Submit Complaint",

    complaintSubmittedSuccess:
      "Complaint Submitted Successfully!",

    complaintRegisteredSuccess:
      "Your complaint has been registered successfully.",

    yourComplaintID:
      "Your Complaint ID",

    aiAnalysisCompleted:
      "AI analysis has been completed.",

    locationUsedMatching:
      "Your location was used for local organization matching.",

    earnedReward:
      "You earned reward points for meaningful participation.",

    submitAnother:
      "Submit Another",

    // -----------------------------------------------------
    // Track Status
    // -----------------------------------------------------

    trackComplaint:
      "Track Complaint",

    trackText:
      "Track AI assignment, college response, team, progress and final resolution.",

    complaintID:
      "Complaint ID",

    track:
      "Track",

    problemType:
      "Problem Type",

    organizationType:
      "Organization Type",

    reportedLocation:
      "Reported Location",

    yourLatitude:
      "Your Latitude",

    yourLongitude:
      "Your Longitude",

    assignedCenter:
      "Assigned Center",

    problemDescription:
      "Problem Description",

    stepByStep:
      "Step-by-Step Progress",

    complaintSubmitted:
      "Complaint Submitted",

    complaintSubmittedText:
      "Complaint successfully registered by the citizen.",

    collegeRequestSent:
      "College Request Sent",

    collegeRequestSentText:
      "Problem sent to the assigned college for acceptance.",

    collegeAcceptedTeam:
      "College Accepted & Team Assigned",

    workInProgress:
      "Work In Progress",

    workInProgressText:
      "The assigned team is working on the problem.",

    problemResolvedText:
      "The assigned team has completed the problem.",

    aiRecommendation:
      "AI Recommendation",

    enterComplaintId:
      "Please enter your Complaint ID.",

    complaintNotFound:
      "Complaint not found. Please check your Complaint ID.",

    awaitingCollegeResponse:
      "Awaiting College Response",

    underReview:
      "Under Review",

    civicProblem:
      "Civic Problem",

    general:
      "General",

    recently:
      "Recently",

    assignedCollege:
      "Assigned College",

    nearbyCollege:
      "Nearby College",

    collegeCollaborationText:
      "Your problem has been matched with a nearby college based on location and problem category.",

    collegeRequestSentTo:
      "Your problem request has been sent to",

    collegeReviewText:
      "The college will review the problem and decide whether its student or faculty team can solve it.",

    requestSent:
      "Request Sent",

    collegeAcceptedProblem:
      "has accepted the problem.",

    teamWorkingText:
      "The assigned team has started working on the solution.",

    acceptedOn:
      "Accepted On",

    collegeCouldNotAccept:
      "College Could Not Accept",

    collegeRejectedText:
      "The assigned college could not take this problem.",

    aiAssignmentText:
      "Your problem has been matched with the most relevant nearby organization.",

    concernedAuthority:
      "Concerned Authority",

    governmentService:
      "Government Service",

    concernedServiceTeam:
      "Concerned Service Team",

    generalCivicService:
      "General Civic Service",

    unavailable:
      "Unavailable",

    notProvided:
      "Not provided",

    notAvailable:
      "Not available",

    notAssigned:
      "Not assigned",

    team:
      "Team",

    assignedCollegeTeam:
      "Assigned college team",

    workingProblem:
      "is working on the problem.",

    workAfterAcceptance:
      "will work on the problem after acceptance.",

    problemSolvedSuccessfully:
      "Problem solved successfully!",

    solvedBy:
      "Solved by",

    additionalReward:
      "You earned an additional +50 reward points.",

    problemSentTo:
      "Problem sent to",

    forAcceptance:
      "for acceptance.",

    sent:
      "Sent",

    waitingCollegeResponse:
      "Waiting for college response",

    acceptedProblem:
      "accepted the problem.",

    assignedStudentTeam:
      "Assigned student team",

    workingOnIt:
      "is working on it.",

    collegeAcceptStep:
      "This step will be completed when the college accepts the problem.",

    aiAssignmentReview:
      "AI Assignment & Review",

    aiAssignmentReviewText:
      "The complaint is analyzed and assigned to the relevant nearby team.",

    // -----------------------------------------------------
    // College Requests
    // -----------------------------------------------------

    collegeProblemRequests:
      "College Problem Requests",

    collegeRequestsText:
      "Review nearby community problems and accept the problems your college can solve.",

    loggedInAs:
      "Logged in as",

    noCollegeRequests:
      "No College Requests",

    noCollegeRequestsText:
      "New Civil, infrastructure and technical problems assigned to your college will appear here.",

    acceptProblem:
      "Accept Problem",

    reject:
      "Reject",

    requestStatus:
      "Request Status",

    requestMessage:
      "Request Message",

    requestAccepted:
      "Problem Accepted",

    requestAcceptedText:
      "Your college will work on solving this problem.",

    requestRejected:
      "Request Rejected",

    rejectionReason:
      "Reason",

    totalRequests:
      "Total Requests",

    pendingRequests:
      "Pending Requests",

    acceptedRequests:
      "Accepted Requests",

    rejectedRequests:
      "Rejected Requests",

    filterRequests:
      "Filter Requests",

    all:
      "All",

    noDescription:
      "No description provided.",

    citizen:
      "Citizen",

    collegeRepresentative:
      "College Representative",

    requestAcceptedSuccess:
      "College request accepted successfully.",

    requestRejectedSuccess:
      "College request rejected successfully.",

    enterRejectionReason:
      "Please enter the reason for rejecting this problem:",

    collegeUnableToHandle:
      "College team is unable to handle this problem.",

    respondedOn:
      "Responded On",

    responseBy:
      "Response By",

    requestRejectedText:
      "This request was rejected by the college. Admin reassignment may be required.",

    // -----------------------------------------------------
    // Admin
    // -----------------------------------------------------

    departmentDashboard:
      "Department Dashboard",

    departmentText:
      "Review complaints, monitor AI assignments, college collaboration and resolution progress.",

    complaintManagement:
      "Complaint Management",

    allComplaints:
      "All Complaints",

    collegePending:
      "College Pending",

    collegeAcceptedCount:
      "College Accepted",

    gpsLocation:
      "GPS Location",

    updateStatus:
      "Update Complaint Status",

    resolve:
      "Resolve",

    adminReassignment:
      "Admin reassignment is required.",

    // -----------------------------------------------------
    // Notifications
    // -----------------------------------------------------

    notificationsTitle:
      "Notifications",

    noNotifications:
      "No notifications yet.",

    // -----------------------------------------------------
    // Feedback
    // -----------------------------------------------------

    feedbackTitle:
      "Feedback & Suggestions",

    feedbackSubtitle:
      "Your feedback helps us make SamadhanSetu simpler, faster and better for every citizen.",

    shareYourExperience:
      "Share Your Experience",

    feedbackIntroText:
      "Tell us about your experience using the SamadhanSetu portal.",

    ratingQuestion:
      "How would you rate the SamadhanSetu portal?",

    ratingInstruction:
      "Please select a rating",

    satisfactionQuestion:
      "How satisfied are you with the portal?",

    easeQuestion:
      "How easy was it to submit a complaint?",

    responseTimeQuestion:
      "How would you rate the response time of the portal?",

    recommendationQuestion:
      "Would you recommend SamadhanSetu to others?",

    overallExperienceQuestion:
      "How was your overall experience?",

    suggestionQuestion:
      "Do you have any suggestions for us?",

    suggestionPlaceholder:
      "Share your suggestions or tell us how we can improve...",

    feedbackNote:
      "Your feedback helps improve citizen services.",

    submitFeedback:
      "Submit Feedback",

    feedbackSubmitted:
      "Feedback Submitted Successfully!",

    feedbackThankYou:
      "Thank you for helping us improve SamadhanSetu.",

    communityFeedback:
      "Community Feedback",

    responses:
      "Responses",

    noFeedbackYet:
      "No feedback yet",

    noFeedbackText:
      "Be the first citizen to share your experience.",

    pleaseSelectRating:
      "Please select a rating first.",

    verySatisfied:
      "Very Satisfied",

    satisfied:
      "Satisfied",

    neutral:
      "Neutral",

    dissatisfied:
      "Dissatisfied",

    veryDissatisfied:
      "Very Dissatisfied",

    veryEasy:
      "Very Easy",

    easy:
      "Easy",

    moderate:
      "Moderate",

    difficult:
      "Difficult",

    veryDifficult:
      "Very Difficult",

    excellent:
      "Excellent",

    good:
      "Good",

    average:
      "Average",

    poor:
      "Poor",

    veryPoor:
      "Very Poor",

    definitelyYes:
      "Definitely Yes",

    probablyYes:
      "Probably Yes",

    notSure:
      "Not Sure",

    probablyNo:
      "Probably No",

    definitelyNo:
      "Definitely No",

    stars:
      "stars",

    // -----------------------------------------------------
    // General
    // -----------------------------------------------------

    saveChanges:
      "Save Changes",

    yes:
      "Yes",

    no:
      "No",

    success:
      "Success",

    error:
      "Error",
  },

  // =======================================================
  // MARATHI
  // =======================================================

  mr: {
    // Navbar / Sidebar
    dashboard: "डॅशबोर्ड",
    submitProblem: "समस्या नोंदवा",
    myComplaints: "माझ्या तक्रारी",
    trackStatus: "स्थिती तपासा",
    aiAssistant: "AI सहाय्यक",
    notifications: "सूचना",
    helpSupport: "मदत आणि समर्थन",
    feedback: "अभिप्राय",
    profile: "माझे प्रोफाइल",
    departmentPanel: "विभाग पॅनेल",
    collegeRequests: "महाविद्यालयीन विनंत्या",

    // Dashboard
    communityDashboard:
      "समुदाय समस्या डॅशबोर्ड",

    dashboardText:
      "समस्या नोंदवा, उपायांचा मागोवा घ्या आणि तुमचा समुदाय अधिक चांगला बनवा.",

    reportProblem:
      "समस्या नोंदवा",

    totalComplaints:
      "एकूण तक्रारी",

    pending:
      "प्रलंबित",

    inProgress:
      "प्रगतीपथावर",

    resolved:
      "निराकरण झालेल्या",

    submitted:
      "नोंदवलेल्या",

    // Rewards
    communityRewards:
      "समुदाय पुरस्कार",

    rewardText:
      "नागरी समस्या नोंदवून आणि समुदायाला मदत करून गुण मिळवा.",

    totalPoints:
      "एकूण गुण",

    pointsToNext:
      "पुढील स्तरासाठी गुण",

    maximumLevel:
      "कमाल पुरस्कार स्तर गाठला!",

    problemSubmittedReward:
      "समस्या नोंदवली",

    progressUpdate:
      "प्रगती अपडेट",

    problemResolved:
      "समस्या निराकरण",

    rewardSummary:
      "पुरस्कार सारांश",

    currentPoints:
      "सध्याचे गुण",

    problemsReported:
      "नोंदवलेल्या समस्या",

    problemsResolved:
      "निराकरण झालेल्या समस्या",

    pointsFromComplaints:
      "तक्रारींमधून मिळालेले गुण",

    currentBadge:
      "सध्याचे बॅज",

    latestReward:
      "अलीकडील पुरस्कार",

    points:
      "गुण",

    // AI
    latestAI:
      "अलीकडील AI नियुक्ती",

    complaint:
      "तक्रार",

    category:
      "श्रेणी",

    assignedOrganization:
      "नियुक्त संस्था",

    assignedType:
      "संस्थेचा प्रकार",

    assignedTeam:
      "नियुक्त टीम",

    service:
      "सेवा",

    distance:
      "अंतर",

    trackProgress:
      "प्रगतीचा मागोवा",

    collegeCollaboration:
      "महाविद्यालयीन सहकार्य",

    college:
      "महाविद्यालय",

    collegeRequest:
      "महाविद्यालयीन विनंती",

    accepted:
      "स्वीकारले",

    rejected:
      "नाकारले",

    waitingForCollege:
      "महाविद्यालयाच्या प्रतिसादाची प्रतीक्षा",

    collegeAccepted:
      "महाविद्यालयाने स्वीकारले",

    collegeAcceptedText:
      "या समस्येचा स्वीकार केला असून त्यावर काम करणार आहे.",

    waitingCollegeText:
      "समस्या सोडवण्यासाठी महाविद्यालयाकडे विनंती पाठवली आहे.",

    studentTeam:
      "विद्यार्थी टीम",

    // Workflow
    quickActions:
      "जलद कृती",

    smartGuidance:
      "स्मार्ट मार्गदर्शन मिळवा",

    submitNewProblem:
      "नवीन नागरी समस्या नोंदवा",

    viewComplaints:
      "तुमच्या तक्रारी पहा",

    trackProblemProgress:
      "समस्येची प्रगती पहा",

    howWorks:
      "SamadhanSetu कसे कार्य करते",

    citizenReports:
      "नागरिक समस्या नोंदवतो",

    citizenReportsText:
      "वर्णन, पुरावे आणि लाईव्ह लोकेशनसह समस्या नोंदवा.",

    aiAnalysis:
      "AI विश्लेषण",

    aiAnalysisText:
      "AI समस्येची श्रेणी आणि गरजा ओळखतो.",

    smartLocalAssignment:
      "स्मार्ट स्थानिक नियुक्ती",

    smartLocalAssignmentText:
      "जवळच्या योग्य नगरपालिका, महाविद्यालय किंवा सेवा टीमची शिफारस केली जाते.",

    collegeAccepts:
      "महाविद्यालय स्वीकारते",

    collegeAcceptsText:
      "महाविद्यालय समस्या तपासते आणि टीम सोडवू शकत असल्यास स्वीकारते.",

    resolutionReward:
      "निराकरण आणि पुरस्कार",

    resolutionRewardText:
      "प्रत्येक टप्प्याचा मागोवा घ्या आणि समस्या सुटल्यावर गुण मिळवा.",

    // Recent
    recentComplaints:
      "अलीकडील तक्रारी",

    viewAll:
      "सर्व पहा",

    noComplaints:
      "अजून कोणतीही तक्रार नाही",

    startReporting:
      "नागरी समस्या नोंदवून सुरुवात करा.",

    submitFirstProblem:
      "पहिली समस्या नोंदवा",

    // Submit
    userDetails:
      "नागरिक माहिती",

    fullName:
      "पूर्ण नाव",

    mobile:
      "मोबाईल क्रमांक",

    email:
      "ईमेल",

    city:
      "शहर",

    district:
      "जिल्हा",

    state:
      "राज्य",

    pincode:
      "पिनकोड",

    address:
      "पत्ता",

    enterDistrict:
      "जिल्हा प्रविष्ट करा",

    enterState:
      "राज्य प्रविष्ट करा",

    enterPincode:
      "पिनकोड प्रविष्ट करा",

    completeAddress:
      "तुमचा संपूर्ण पत्ता प्रविष्ट करा",

    problemDetails:
      "समस्येची माहिती",

    problemDetailsText:
      "तुमची सामुदायिक समस्या स्पष्ट करा.",

    problemTitle:
      "समस्येचे शीर्षक",

    problemTitlePlaceholder:
      "उदा. 5 दिवसांपासून कचरा उचलला जात नाही",

    problemCategory:
      "समस्या श्रेणी",

    selectCategory:
      "समस्या श्रेणी निवडा",

    roadInfrastructure:
      "रस्ता आणि पायाभूत सुविधा",

    waterSupply:
      "पाणीपुरवठा",

    wasteManagement:
      "कचरा व्यवस्थापन",

    electricity:
      "वीज",

    drainage:
      "ड्रेनेज",

    agriculture:
      "कृषी",

    medicalPublicHealth:
      "वैद्यकीय आणि सार्वजनिक आरोग्य",

    education:
      "शिक्षण",

    publicSafety:
      "सार्वजनिक सुरक्षा",

    other:
      "इतर",

    subcategory:
      "उप-श्रेणी",

    subcategoryPlaceholder:
      "उदा. खड्डा / कचरा",

    problemDate:
      "समस्या दिनांक",

    priority:
      "प्राधान्य",

    low:
      "कमी",

    medium:
      "मध्यम",

    high:
      "जास्त",

    critical:
      "गंभीर",

    detailedDescription:
      "सविस्तर वर्णन",

    descriptionPlaceholder:
      "तुमची समस्या लिहा किंवा मायक्रोफोन वापरा...",

    useMyLocation:
      "माझे लोकेशन वापरा",

    liveLocation:
      "लाईव्ह लोकेशन",

    nearbyCenters:
      "जवळची केंद्रे",

    liveLocationNearby:
      "लाईव्ह लोकेशन आणि जवळील सेवा",

    liveLocationText:
      "तुमचे लाईव्ह लोकेशन AI ला जवळील महाविद्यालये, नगरपालिका आणि संबंधित सरकारी सेवा शोधण्यात मदत करते.",

    detecting:
      "शोधत आहे...",

    useMyLiveLocation:
      "माझे लाईव्ह लोकेशन वापरा",

    selectedGPSLocation:
      "निवडलेले GPS लोकेशन",

    latitude:
      "अक्षांश",

    longitude:
      "रेखांश",

    exactLocation:
      "अचूक लोकेशन",

    exactLocationPlaceholder:
      "लाईव्ह लोकेशन वापरा किंवा स्वतः प्रविष्ट करा",

    nearestLandmark:
      "जवळची खूण",

    landmark:
      "जवळची खूण",

    landmarkPlaceholder:
      "उदा. बस स्थानकाजवळ",

    wardArea:
      "वॉर्ड / परिसर",

    wardPlaceholder:
      "वॉर्ड किंवा परिसर प्रविष्ट करा",

    communityImpact:
      "समुदायावरील परिणाम",

    communityImpactText:
      "ही समस्या स्थानिक नागरिकांना कशी प्रभावित करते ते सांगा.",

    affectedPeople:
      "अंदाजे प्रभावित लोक",

    affectedPeoplePlaceholder:
      "उदा. 100",

    reportedBefore:
      "ही समस्या यापूर्वी नोंदवली होती का?",

    previousComplaintID:
      "मागील तक्रार क्रमांक",

    previousComplaintPlaceholder:
      "तक्रार क्रमांक प्रविष्ट करा",

    impactOnCitizens:
      "नागरिकांवरील परिणाम",

    impactPlaceholder:
      "ही समस्या लोकांना कशी प्रभावित करते ते स्पष्ट करा...",

    evidence:
      "पुरावा",

    evidenceText:
      "फोटो किंवा संबंधित दस्तऐवज अपलोड करा.",

    uploadEvidence:
      "पुरावा अपलोड करा",

    selected:
      "निवडलेले",

    speak:
      "बोला",

    listening:
      "ऐकत आहे...",

    voiceNotSupported:
      "❌ व्हॉइस-टू-टेक्स्ट समर्थित नाही. कृपया Google Chrome वापरा.",

    voiceListening:
      "🎤 ऐकत आहे... कृपया तुमची समस्या बोला.",

    voiceSuccess:
      "✅ आवाज यशस्वीपणे मजकुरात बदलला.",

    microphoneDenied:
      "❌ मायक्रोफोनची परवानगी नाकारली आहे. कृपया परवानगी द्या.",

    voiceRecognitionError:
      "❌ आवाज ओळखता आला नाही. पुन्हा प्रयत्न करा.",

    geolocationNotSupported:
      "❌ या ब्राउझरमध्ये जिओलोकेशन समर्थित नाही.",

    gettingLiveLocation:
      "📍 तुमचे लाईव्ह लोकेशन मिळवत आहे...",

    locationDetected:
      "✅ लोकेशन मिळाले. अंदाजे अचूकता",

    meters:
      "मीटर",

    locationPermissionDenied:
      "❌ लोकेशनची परवानगी नाकारली आहे.",

    locationUnavailable:
      "❌ सध्याचे लोकेशन उपलब्ध नाही.",

    locationTimeout:
      "❌ लोकेशन मिळवण्याची वेळ संपली. पुन्हा प्रयत्न करा.",

    locationError:
      "❌ सध्याचे लोकेशन मिळू शकले नाही.",

    mapLocationSelected:
      "✅ नकाशावरील लोकेशन निवडले. अंदाजे अचूकता",

    samadhanAI:
      "समाधान AI",

    samadhanAIText:
      "तुमच्या समस्येचे वर्णन, समस्या प्रकार आणि लाईव्ह लोकेशनचे विश्लेषण करून जवळील योग्य नगरपालिका, महाविद्यालय किंवा सरकारी सेवा टीमची शिफारस केली जाईल.",

    rewardParticipation:
      "उपयुक्त सहभागासाठी तुम्हाला रिवॉर्ड पॉइंट्स मिळतील.",

    submitComplaint:
      "तक्रार सबमिट करा",

    complaintSubmittedSuccess:
      "तक्रार यशस्वीपणे सबमिट झाली!",

    complaintRegisteredSuccess:
      "तुमची तक्रार यशस्वीपणे नोंदवली गेली आहे.",

    yourComplaintID:
      "तुमचा तक्रार क्रमांक",

    aiAnalysisCompleted:
      "AI विश्लेषण पूर्ण झाले आहे.",

    locationUsedMatching:
      "जवळील संस्थेशी जुळवणी करण्यासाठी तुमचे स्थान वापरण्यात आले.",

    earnedReward:
      "उपयुक्त सहभागासाठी तुम्हाला रिवॉर्ड पॉइंट्स मिळाले.",

    submitAnother:
      "दुसरी तक्रार सबमिट करा",

    // Track
    trackComplaint:
      "तक्रारीचा मागोवा",

    trackText:
      "AI नियुक्ती, महाविद्यालयाचा प्रतिसाद, टीम, प्रगती आणि अंतिम निराकरणाचा मागोवा घ्या.",

    complaintID:
      "तक्रार क्रमांक",

    track:
      "मागोवा घ्या",

    problemType:
      "समस्येचा प्रकार",

    organizationType:
      "संस्थेचा प्रकार",

    reportedLocation:
      "नोंदवलेले ठिकाण",

    yourLatitude:
      "तुमचे अक्षांश",

    yourLongitude:
      "तुमचे रेखांश",

    assignedCenter:
      "नियुक्त केंद्र",

    problemDescription:
      "समस्येचे वर्णन",

    stepByStep:
      "टप्प्याटप्प्याने प्रगती",

    complaintSubmitted:
      "तक्रार नोंदवली",

    complaintSubmittedText:
      "नागरिकाची तक्रार यशस्वीरित्या नोंदवली.",

    collegeRequestSent:
      "महाविद्यालयाकडे विनंती पाठवली",

    collegeRequestSentText:
      "समस्या नियुक्त महाविद्यालयाकडे स्वीकारण्यासाठी पाठवली आहे.",

    collegeAcceptedTeam:
      "महाविद्यालयाने स्वीकारले आणि टीम नियुक्त केली",

    workInProgress:
      "काम सुरू आहे",

    workInProgressText:
      "नियुक्त टीम समस्येवर काम करत आहे.",

    problemResolvedText:
      "नियुक्त टीमने समस्या पूर्णपणे सोडवली आहे.",

    aiRecommendation:
      "AI शिफारस",

    enterComplaintId:
      "कृपया तुमचा तक्रार क्रमांक प्रविष्ट करा.",

    complaintNotFound:
      "तक्रार सापडली नाही. कृपया तक्रार क्रमांक तपासा.",

    awaitingCollegeResponse:
      "महाविद्यालयाच्या प्रतिसादाची प्रतीक्षा",

    underReview:
      "तपासणी सुरू",

    civicProblem:
      "नागरी समस्या",

    general:
      "सामान्य",

    recently:
      "अलीकडे",

    assignedCollege:
      "नियुक्त महाविद्यालय",

    nearbyCollege:
      "जवळील महाविद्यालय",

    collegeCollaborationText:
      "स्थान आणि समस्या प्रकाराच्या आधारावर तुमची समस्या जवळील महाविद्यालयाशी जोडण्यात आली आहे.",

    collegeRequestSentTo:
      "तुमची समस्या विनंती येथे पाठवली आहे",

    collegeReviewText:
      "महाविद्यालय समस्या तपासून विद्यार्थी किंवा शिक्षकांची टीम ती सोडवू शकते का ते ठरवेल.",

    requestSent:
      "विनंती पाठवली",

    collegeAcceptedProblem:
      "ने समस्या स्वीकारली आहे.",

    teamWorkingText:
      "नियुक्त टीमने समस्येच्या निराकरणावर काम सुरू केले आहे.",

    acceptedOn:
      "स्वीकारल्याची तारीख",

    collegeCouldNotAccept:
      "महाविद्यालय समस्या स्वीकारू शकले नाही",

    collegeRejectedText:
      "नियुक्त महाविद्यालय ही समस्या स्वीकारू शकले नाही.",

    aiAssignmentText:
      "तुमची समस्या सर्वात योग्य जवळील संस्थेशी जोडण्यात आली आहे.",

    concernedAuthority:
      "संबंधित प्राधिकरण",

    governmentService:
      "सरकारी सेवा",

    concernedServiceTeam:
      "संबंधित सेवा टीम",

    generalCivicService:
      "सामान्य नागरी सेवा",

    unavailable:
      "उपलब्ध नाही",

    notProvided:
      "दिलेले नाही",

    notAvailable:
      "उपलब्ध नाही",

    notAssigned:
      "नियुक्त केलेले नाही",

    team:
      "टीम",

    assignedCollegeTeam:
      "नियुक्त महाविद्यालयीन टीम",

    workingProblem:
      "समस्येवर काम करत आहे.",

    workAfterAcceptance:
      "स्वीकारल्यानंतर समस्येवर काम करेल.",

    problemSolvedSuccessfully:
      "समस्या यशस्वीपणे सोडवली!",

    solvedBy:
      "समस्या सोडवणारे",

    additionalReward:
      "तुम्हाला अतिरिक्त +50 रिवॉर्ड पॉइंट्स मिळाले.",

    problemSentTo:
      "समस्या येथे पाठवली आहे",

    forAcceptance:
      "स्वीकारण्यासाठी.",

    sent:
      "पाठवले",

    waitingCollegeResponse:
      "महाविद्यालयाच्या प्रतिसादाची प्रतीक्षा",

    acceptedProblem:
      "ने समस्या स्वीकारली.",

    assignedStudentTeam:
      "नियुक्त विद्यार्थी टीम",

    workingOnIt:
      "समस्येवर काम करत आहे.",

    collegeAcceptStep:
      "महाविद्यालयाने समस्या स्वीकारल्यानंतर हा टप्पा पूर्ण होईल.",

    aiAssignmentReview:
      "AI नियुक्ती आणि तपासणी",

    aiAssignmentReviewText:
      "तक्रारीचे विश्लेषण करून योग्य जवळील टीमकडे नियुक्ती केली जाते.",

    // College
    collegeProblemRequests:
      "महाविद्यालयीन समस्या विनंत्या",

    collegeRequestsText:
      "जवळच्या समुदायाच्या समस्या तपासा आणि तुमचे महाविद्यालय सोडवू शकणाऱ्या समस्या स्वीकारा.",

    loggedInAs:
      "लॉगिन केलेले",

    noCollegeRequests:
      "महाविद्यालयीन विनंती नाही",

    noCollegeRequestsText:
      "तुमच्या महाविद्यालयाला नियुक्त केलेल्या नवीन नागरी, पायाभूत आणि तांत्रिक समस्या येथे दिसतील.",

    acceptProblem:
      "समस्या स्वीकारा",

    reject:
      "नकार द्या",

    requestStatus:
      "विनंती स्थिती",

    requestMessage:
      "विनंती संदेश",

    requestAccepted:
      "समस्या स्वीकारली",

    requestAcceptedText:
      "तुमचे महाविद्यालय ही समस्या सोडवण्यासाठी काम करेल.",

    requestRejected:
      "विनंती नाकारली",

    rejectionReason:
      "कारण",

    totalRequests:
      "एकूण विनंत्या",

    pendingRequests:
      "प्रलंबित विनंत्या",

    acceptedRequests:
      "स्वीकारलेल्या विनंत्या",

    rejectedRequests:
      "नाकारलेल्या विनंत्या",

    filterRequests:
      "विनंत्या फिल्टर करा",

    all:
      "सर्व",

    noDescription:
      "समस्येचे वर्णन दिलेले नाही.",

    citizen:
      "नागरिक",

    collegeRepresentative:
      "महाविद्यालयीन प्रतिनिधी",

    requestAcceptedSuccess:
      "महाविद्यालयीन विनंती यशस्वीपणे स्वीकारली.",

    requestRejectedSuccess:
      "महाविद्यालयीन विनंती नाकारली.",

    enterRejectionReason:
      "ही समस्या नाकारण्याचे कारण प्रविष्ट करा:",

    collegeUnableToHandle:
      "महाविद्यालयीन टीम ही समस्या हाताळू शकत नाही.",

    respondedOn:
      "प्रतिसाद दिनांक",

    responseBy:
      "प्रतिसाद देणारे",

    requestRejectedText:
      "ही विनंती महाविद्यालयाने नाकारली आहे. Admin कडून पुन्हा नियुक्ती आवश्यक असू शकते.",

    // Admin
    departmentDashboard:
      "विभाग डॅशबोर्ड",

    departmentText:
      "तक्रारी तपासा, AI नियुक्ती, महाविद्यालयीन सहकार्य आणि निराकरणाची प्रगती पहा.",

    complaintManagement:
      "तक्रार व्यवस्थापन",

    allComplaints:
      "सर्व तक्रारी",

    collegePending:
      "महाविद्यालय प्रलंबित",

    collegeAcceptedCount:
      "महाविद्यालयाने स्वीकारलेल्या",

    gpsLocation:
      "GPS लोकेशन",

    updateStatus:
      "तक्रारीची स्थिती अपडेट करा",

    resolve:
      "निराकरण करा",

    adminReassignment:
      "Admin कडून पुन्हा नियुक्ती आवश्यक आहे.",

    // Notifications
    notificationsTitle:
      "सूचना",

    noNotifications:
      "अजून कोणत्याही सूचना नाहीत.",

    // Feedback
    feedbackTitle:
      "अभिप्राय आणि सूचना",

    feedbackSubtitle:
      "तुमचा अभिप्राय SamadhanSetu अधिक सोपा, जलद आणि नागरिकांसाठी चांगला बनवण्यास मदत करतो.",

    shareYourExperience:
      "तुमचा अनुभव शेअर करा",

    feedbackIntroText:
      "SamadhanSetu पोर्टल वापरताना तुमचा अनुभव आम्हाला सांगा.",

    ratingQuestion:
      "तुम्ही SamadhanSetu पोर्टलला किती रेटिंग द्याल?",

    ratingInstruction:
      "कृपया रेटिंग निवडा",

    satisfactionQuestion:
      "तुम्ही पोर्टलबद्दल किती समाधानी आहात?",

    easeQuestion:
      "तक्रार सबमिट करणे किती सोपे होते?",

    responseTimeQuestion:
      "पोर्टलच्या प्रतिसादाच्या वेळेला तुम्ही कसे रेट कराल?",

    recommendationQuestion:
      "तुम्ही SamadhanSetu इतरांना सुचवाल का?",

    overallExperienceQuestion:
      "तुमचा एकूण अनुभव कसा होता?",

    suggestionQuestion:
      "तुमच्याकडे आमच्यासाठी काही सूचना आहेत का?",

    suggestionPlaceholder:
      "तुमच्या सूचना लिहा किंवा आम्ही काय सुधारू शकतो ते सांगा...",

    feedbackNote:
      "तुमचा अभिप्राय नागरिक सेवा सुधारण्यास मदत करतो.",

    submitFeedback:
      "अभिप्राय सबमिट करा",

    feedbackSubmitted:
      "अभिप्राय यशस्वीपणे सबमिट झाला!",

    feedbackThankYou:
      "SamadhanSetu सुधारण्यासाठी मदत केल्याबद्दल धन्यवाद.",

    communityFeedback:
      "समुदायाचा अभिप्राय",

    responses:
      "प्रतिसाद",

    noFeedbackYet:
      "अजून अभिप्राय नाही",

    noFeedbackText:
      "तुमचा अनुभव शेअर करणारे पहिले नागरिक बना.",

    pleaseSelectRating:
      "कृपया प्रथम रेटिंग निवडा.",

    verySatisfied:
      "खूप समाधानी",

    satisfied:
      "समाधानी",

    neutral:
      "तटस्थ",

    dissatisfied:
      "असमाधानी",

    veryDissatisfied:
      "खूप असमाधानी",

    veryEasy:
      "खूप सोपे",

    easy:
      "सोपे",

    moderate:
      "मध्यम",

    difficult:
      "कठीण",

    veryDifficult:
      "खूप कठीण",

    excellent:
      "उत्कृष्ट",

    good:
      "चांगले",

    average:
      "सरासरी",

    poor:
      "खराब",

    veryPoor:
      "खूप खराब",

    definitelyYes:
      "नक्कीच होय",

    probablyYes:
      "बहुधा होय",

    notSure:
      "खात्री नाही",

    probablyNo:
      "बहुधा नाही",

    definitelyNo:
      "नक्कीच नाही",

    stars:
      "तारे",

    // General
    saveChanges:
      "बदल जतन करा",

    yes:
      "होय",

    no:
      "नाही",

    success:
      "यशस्वी",

    error:
      "त्रुटी",
  },

  // =======================================================
  // HINDI
  // =======================================================

  hi: {
    // Navbar / Sidebar
    dashboard:
      "डैशबोर्ड",

    submitProblem:
      "समस्या दर्ज करें",

    myComplaints:
      "मेरी शिकायतें",

    trackStatus:
      "स्थिति देखें",

    aiAssistant:
      "AI सहायक",

    notifications:
      "सूचनाएँ",

    helpSupport:
      "मदद और सहायता",

    feedback:
      "प्रतिक्रिया",

    profile:
      "मेरी प्रोफ़ाइल",

    departmentPanel:
      "विभाग पैनल",

    collegeRequests:
      "कॉलेज अनुरोध",

    // Dashboard
    communityDashboard:
      "सामुदायिक समस्या डैशबोर्ड",

    dashboardText:
      "समस्याएँ दर्ज करें, समाधान की प्रगति देखें और अपने समुदाय को बेहतर बनाएँ।",

    reportProblem:
      "समस्या दर्ज करें",

    totalComplaints:
      "कुल शिकायतें",

    pending:
      "लंबित",

    inProgress:
      "प्रगति पर",

    resolved:
      "समाधान",

    submitted:
      "दर्ज की गई",

    // Rewards
    communityRewards:
      "सामुदायिक पुरस्कार",

    rewardText:
      "नागरिक समस्याएँ दर्ज करके और समुदाय की मदद करके अंक प्राप्त करें।",

    totalPoints:
      "कुल अंक",

    pointsToNext:
      "अगले स्तर के लिए अंक",

    maximumLevel:
      "अधिकतम पुरस्कार स्तर प्राप्त!",

    problemSubmittedReward:
      "समस्या दर्ज",

    progressUpdate:
      "प्रगति अपडेट",

    problemResolved:
      "समस्या का समाधान",

    rewardSummary:
      "पुरस्कार सारांश",

    currentPoints:
      "वर्तमान अंक",

    problemsReported:
      "दर्ज समस्याएँ",

    problemsResolved:
      "समाधान की गई समस्याएँ",

    pointsFromComplaints:
      "शिकायतों से अंक",

    currentBadge:
      "वर्तमान बैज",

    latestReward:
      "हाल का पुरस्कार",

    points:
      "अंक",

    // AI
    latestAI:
      "नवीनतम AI असाइनमेंट",

    complaint:
      "शिकायत",

    category:
      "श्रेणी",

    assignedOrganization:
      "असाइन की गई संस्था",

    assignedType:
      "संस्था का प्रकार",

    assignedTeam:
      "असाइन की गई टीम",

    service:
      "सेवा",

    distance:
      "दूरी",

    trackProgress:
      "प्रगति देखें",

    collegeCollaboration:
      "कॉलेज सहयोग",

    college:
      "कॉलेज",

    collegeRequest:
      "कॉलेज अनुरोध",

    accepted:
      "स्वीकार किया गया",

    rejected:
      "अस्वीकार किया गया",

    waitingForCollege:
      "कॉलेज के जवाब की प्रतीक्षा",

    collegeAccepted:
      "कॉलेज ने स्वीकार किया",

    collegeAcceptedText:
      "ने इस समस्या को स्वीकार कर लिया है और इसे हल करने पर काम करेगा।",

    waitingCollegeText:
      "समस्या हल करने के लिए कॉलेज को अनुरोध भेजा गया है।",

    studentTeam:
      "छात्र टीम",

    // Workflow
    quickActions:
      "त्वरित कार्य",

    smartGuidance:
      "स्मार्ट मार्गदर्शन प्राप्त करें",

    submitNewProblem:
      "नई नागरिक समस्या दर्ज करें",

    viewComplaints:
      "अपनी शिकायतें देखें",

    trackProblemProgress:
      "समस्या की प्रगति देखें",

    howWorks:
      "SamadhanSetu कैसे काम करता है",

    citizenReports:
      "नागरिक समस्या दर्ज करता है",

    citizenReportsText:
      "विवरण, प्रमाण और लाइव लोकेशन के साथ समस्या दर्ज करें।",

    aiAnalysis:
      "AI विश्लेषण",

    aiAnalysisText:
      "AI समस्या की श्रेणी और आवश्यकताओं की पहचान करता है।",

    smartLocalAssignment:
      "स्मार्ट स्थानीय असाइनमेंट",

    smartLocalAssignmentText:
      "नज़दीकी उपयुक्त नगरपालिका, कॉलेज या सेवा टीम की सिफारिश की जाती है।",

    collegeAccepts:
      "कॉलेज स्वीकार करता है",

    collegeAcceptsText:
      "कॉलेज समस्या की समीक्षा करता है और अपनी टीम द्वारा हल किए जा सकने पर स्वीकार करता है।",

    resolutionReward:
      "समाधान और पुरस्कार",

    resolutionRewardText:
      "हर चरण को ट्रैक करें और समस्या हल होने पर पुरस्कार अंक प्राप्त करें।",

    // Recent
    recentComplaints:
      "हाल की शिकायतें",

    viewAll:
      "सभी देखें",

    noComplaints:
      "अभी कोई शिकायत नहीं है",

    startReporting:
      "नागरिक समस्या दर्ज करके शुरुआत करें।",

    submitFirstProblem:
      "पहली समस्या दर्ज करें",

    // Submit
    userDetails:
      "नागरिक जानकारी",

    fullName:
      "पूरा नाम",

    mobile:
      "मोबाइल नंबर",

    email:
      "ईमेल",

    city:
      "शहर",

    district:
      "जिला",

    state:
      "राज्य",

    pincode:
      "पिनकोड",

    address:
      "पता",

    enterDistrict:
      "जिला दर्ज करें",

    enterState:
      "राज्य दर्ज करें",

    enterPincode:
      "पिनकोड दर्ज करें",

    completeAddress:
      "अपना पूरा पता दर्ज करें",

    problemDetails:
      "समस्या विवरण",

    problemDetailsText:
      "अपनी सामुदायिक समस्या बताएं।",

    problemTitle:
      "समस्या का शीर्षक",

    problemTitlePlaceholder:
      "उदाहरण: 5 दिनों से कचरा नहीं उठाया गया",

    problemCategory:
      "समस्या श्रेणी",

    selectCategory:
      "श्रेणी चुनें",

    roadInfrastructure:
      "सड़क और बुनियादी ढांचा",

    waterSupply:
      "जल आपूर्ति",

    wasteManagement:
      "कचरा प्रबंधन",

    electricity:
      "बिजली",

    drainage:
      "ड्रेनेज",

    agriculture:
      "कृषि",

    medicalPublicHealth:
      "चिकित्सा और सार्वजनिक स्वास्थ्य",

    education:
      "शिक्षा",

    publicSafety:
      "सार्वजनिक सुरक्षा",

    other:
      "अन्य",

    subcategory:
      "उप-श्रेणी",

    subcategoryPlaceholder:
      "उदाहरण: गड्ढा / कचरा",

    problemDate:
      "समस्या दिनांक",

    priority:
      "प्राथमिकता",

    low:
      "कम",

    medium:
      "मध्यम",

    high:
      "उच्च",

    critical:
      "अति गंभीर",

    detailedDescription:
      "विस्तृत विवरण",

    descriptionPlaceholder:
      "अपनी समस्या लिखें या माइक्रोफोन का उपयोग करें...",

    useMyLocation:
      "मेरा लोकेशन उपयोग करें",

    liveLocation:
      "लाइव लोकेशन",

    nearbyCenters:
      "पास के केंद्र",

    liveLocationNearby:
      "लाइव लोकेशन और नजदीकी सेवाएं",

    liveLocationText:
      "आपकी लाइव लोकेशन AI को नजदीकी कॉलेज, नगरपालिका और संबंधित सरकारी सेवाएं खोजने में मदद करती है।",

    detecting:
      "पता लगा रहा है...",

    useMyLiveLocation:
      "मेरी लाइव लोकेशन का उपयोग करें",

    selectedGPSLocation:
      "चयनित GPS लोकेशन",

    latitude:
      "अक्षांश",

    longitude:
      "देशांतर",

    exactLocation:
      "सटीक लोकेशन",

    exactLocationPlaceholder:
      "लाइव लोकेशन का उपयोग करें या मैन्युअली दर्ज करें",

    nearestLandmark:
      "निकटतम स्थान चिन्ह",

    landmark:
      "स्थान चिन्ह",

    landmarkPlaceholder:
      "उदाहरण: बस स्टैंड के पास",

    wardArea:
      "वार्ड / क्षेत्र",

    wardPlaceholder:
      "वार्ड या क्षेत्र दर्ज करें",

    communityImpact:
      "सामुदायिक प्रभाव",

    communityImpactText:
      "बताएं कि यह समस्या स्थानीय नागरिकों को कैसे प्रभावित करती है।",

    affectedPeople:
      "अनुमानित प्रभावित लोग",

    affectedPeoplePlaceholder:
      "उदाहरण: 100",

    reportedBefore:
      "क्या यह पहले रिपोर्ट किया गया था?",

    previousComplaintID:
      "पिछली शिकायत आईडी",

    previousComplaintPlaceholder:
      "शिकायत आईडी दर्ज करें",

    impactOnCitizens:
      "नागरिकों पर प्रभाव",

    impactPlaceholder:
      "बताएं कि यह समस्या लोगों को कैसे प्रभावित करती है...",

    evidence:
      "सबूत",

    evidenceText:
      "फोटो या संबंधित दस्तावेज़ अपलोड करें।",

    uploadEvidence:
      "सबूत अपलोड करें",

    selected:
      "चयनित",

    speak:
      "बोलें",

    listening:
      "सुन रहा है...",

    voiceNotSupported:
      "❌ वॉइस-टू-टेक्स्ट समर्थित नहीं है। कृपया Google Chrome का उपयोग करें।",

    voiceListening:
      "🎤 सुन रहा है... कृपया अपनी समस्या बोलें।",

    voiceSuccess:
      "✅ आवाज सफलतापूर्वक टेक्स्ट में बदल दी गई।",

    microphoneDenied:
      "❌ माइक्रोफोन की अनुमति नहीं दी गई। कृपया अनुमति दें।",

    voiceRecognitionError:
      "❌ आवाज पहचानने में समस्या हुई। कृपया फिर प्रयास करें।",

    geolocationNotSupported:
      "❌ इस ब्राउज़र में जिओलोकेशन समर्थित नहीं है।",

    gettingLiveLocation:
      "📍 आपकी लाइव लोकेशन प्राप्त की जा रही है...",

    locationDetected:
      "✅ लोकेशन मिल गई। अनुमानित सटीकता",

    meters:
      "मीटर",

    locationPermissionDenied:
      "❌ लोकेशन की अनुमति अस्वीकार कर दी गई है।",

    locationUnavailable:
      "❌ आपकी वर्तमान लोकेशन उपलब्ध नहीं है।",

    locationTimeout:
      "❌ लोकेशन अनुरोध का समय समाप्त हो गया।",

    locationError:
      "❌ आपकी वर्तमान लोकेशन प्राप्त नहीं हो सकी।",

    mapLocationSelected:
      "✅ मानचित्र लोकेशन चुनी गई। अनुमानित सटीकता",

    samadhanAI:
      "समाधान AI",

    samadhanAIText:
      "आपकी समस्या का विवरण, श्रेणी और लाइव लोकेशन का विश्लेषण करके नजदीकी संबंधित नगरपालिका, कॉलेज या सरकारी सेवा टीम की सिफारिश की जाएगी।",

    rewardParticipation:
      "सार्थक भागीदारी के लिए आपको रिवॉर्ड पॉइंट्स मिलेंगे।",

    submitComplaint:
      "शिकायत जमा करें",

    complaintSubmittedSuccess:
      "शिकायत सफलतापूर्वक जमा हो गई!",

    complaintRegisteredSuccess:
      "आपकी शिकायत सफलतापूर्वक दर्ज हो गई है।",

    yourComplaintID:
      "आपकी शिकायत आईडी",

    aiAnalysisCompleted:
      "AI विश्लेषण पूरा हो गया है।",

    locationUsedMatching:
      "स्थानीय संगठन से मिलान करने के लिए आपके स्थान का उपयोग किया गया।",

    earnedReward:
      "सार्थक भागीदारी के लिए आपको रिवॉर्ड पॉइंट्स मिले हैं।",

    submitAnother:
      "दूसरी शिकायत जमा करें",

    // Track
    trackComplaint:
      "शिकायत ट्रैक करें",

    trackText:
      "AI असाइनमेंट, कॉलेज प्रतिक्रिया, टीम, प्रगति और अंतिम समाधान देखें।",

    complaintID:
      "शिकायत ID",

    track:
      "ट्रैक करें",

    problemType:
      "समस्या प्रकार",

    organizationType:
      "संस्था का प्रकार",

    reportedLocation:
      "रिपोर्ट किया गया स्थान",

    yourLatitude:
      "आपका अक्षांश",

    yourLongitude:
      "आपका देशांतर",

    assignedCenter:
      "असाइन किया गया केंद्र",

    problemDescription:
      "समस्या विवरण",

    stepByStep:
      "चरण-दर-चरण प्रगति",

    complaintSubmitted:
      "शिकायत दर्ज",

    complaintSubmittedText:
      "नागरिक की शिकायत सफलतापूर्वक दर्ज की गई।",

    collegeRequestSent:
      "कॉलेज अनुरोध भेजा गया",

    collegeRequestSentText:
      "समस्या को स्वीकार करने के लिए कॉलेज को भेजा गया है।",

    collegeAcceptedTeam:
      "कॉलेज ने स्वीकार किया और टीम नियुक्त की",

    workInProgress:
      "काम जारी है",

    workInProgressText:
      "असाइन की गई टीम समस्या पर काम कर रही है।",

    problemResolvedText:
      "असाइन की गई टीम ने समस्या का समाधान पूरा कर दिया है।",

    aiRecommendation:
      "AI सिफारिश",

    enterComplaintId:
      "कृपया अपनी शिकायत ID दर्ज करें।",

    complaintNotFound:
      "शिकायत नहीं मिली। कृपया अपनी शिकायत ID जांचें।",

    awaitingCollegeResponse:
      "कॉलेज के जवाब की प्रतीक्षा",

    underReview:
      "समीक्षा में",

    civicProblem:
      "नागरिक समस्या",

    general:
      "सामान्य",

    recently:
      "हाल ही में",

    assignedCollege:
      "आवंटित कॉलेज",

    nearbyCollege:
      "नजदीकी कॉलेज",

    collegeCollaborationText:
      "स्थान और समस्या श्रेणी के आधार पर आपकी समस्या को नजदीकी कॉलेज से जोड़ा गया है।",

    collegeRequestSentTo:
      "आपकी समस्या अनुरोध भेजा गया है",

    collegeReviewText:
      "कॉलेज समस्या की समीक्षा करेगा और तय करेगा कि छात्र या फैकल्टी टीम इसे हल कर सकती है या नहीं।",

    requestSent:
      "अनुरोध भेजा गया",

    collegeAcceptedProblem:
      "ने समस्या स्वीकार कर ली है।",

    teamWorkingText:
      "असाइन की गई टीम ने समाधान पर काम शुरू कर दिया है।",

    acceptedOn:
      "स्वीकार करने की तारीख",

    collegeCouldNotAccept:
      "कॉलेज समस्या स्वीकार नहीं कर सका",

    collegeRejectedText:
      "असाइन किया गया कॉलेज इस समस्या को स्वीकार नहीं कर सका।",

    aiAssignmentText:
      "आपकी समस्या को सबसे उपयुक्त नजदीकी संस्था के साथ जोड़ा गया है।",

    concernedAuthority:
      "संबंधित प्राधिकरण",

    governmentService:
      "सरकारी सेवा",

    concernedServiceTeam:
      "संबंधित सेवा टीम",

    generalCivicService:
      "सामान्य नागरिक सेवा",

    unavailable:
      "उपलब्ध नहीं",

    notProvided:
      "प्रदान नहीं किया गया",

    notAvailable:
      "उपलब्ध नहीं",

    notAssigned:
      "असाइन नहीं किया गया",

    team:
      "टीम",

    assignedCollegeTeam:
      "असाइन की गई कॉलेज टीम",

    workingProblem:
      "समस्या पर काम कर रही है।",

    workAfterAcceptance:
      "स्वीकार होने के बाद समस्या पर काम करेगी।",

    problemSolvedSuccessfully:
      "समस्या सफलतापूर्वक हल हो गई!",

    solvedBy:
      "समस्या हल करने वाला",

    additionalReward:
      "आपको अतिरिक्त +50 रिवॉर्ड पॉइंट्स मिले।",

    problemSentTo:
      "समस्या भेजी गई",

    forAcceptance:
      "स्वीकृति के लिए।",

    sent:
      "भेजा गया",

    waitingCollegeResponse:
      "कॉलेज के जवाब की प्रतीक्षा",

    acceptedProblem:
      "ने समस्या स्वीकार कर ली।",

    assignedStudentTeam:
      "असाइन की गई छात्र टीम",

    workingOnIt:
      "इस पर काम कर रही है।",

    collegeAcceptStep:
      "कॉलेज द्वारा समस्या स्वीकार करने पर यह चरण पूरा होगा।",

    aiAssignmentReview:
      "AI असाइनमेंट और समीक्षा",

    aiAssignmentReviewText:
      "शिकायत का विश्लेषण करके उसे संबंधित नजदीकी टीम को असाइन किया जाता है।",

    // College
    collegeProblemRequests:
      "कॉलेज समस्या अनुरोध",

    collegeRequestsText:
      "पास की सामुदायिक समस्याओं की समीक्षा करें और जिन समस्याओं को आपका कॉलेज हल कर सकता है उन्हें स्वीकार करें।",

    loggedInAs:
      "लॉगिन के रूप में",

    noCollegeRequests:
      "कोई कॉलेज अनुरोध नहीं",

    noCollegeRequestsText:
      "आपके कॉलेज को असाइन की गई नई नागरिक, बुनियादी ढाँचे और तकनीकी समस्याएँ यहाँ दिखाई देंगी।",

    acceptProblem:
      "समस्या स्वीकार करें",

    reject:
      "अस्वीकार करें",

    requestStatus:
      "अनुरोध स्थिति",

    requestMessage:
      "अनुरोध संदेश",

    requestAccepted:
      "समस्या स्वीकार की गई",

    requestAcceptedText:
      "आपका कॉलेज इस समस्या को हल करने पर काम करेगा।",

    requestRejected:
      "अनुरोध अस्वीकार",

    rejectionReason:
      "कारण",

    totalRequests:
      "कुल अनुरोध",

    pendingRequests:
      "लंबित अनुरोध",

    acceptedRequests:
      "स्वीकृत अनुरोध",

    rejectedRequests:
      "अस्वीकृत अनुरोध",

    filterRequests:
      "अनुरोध फ़िल्टर करें",

    all:
      "सभी",

    noDescription:
      "समस्या का विवरण उपलब्ध नहीं है।",

    citizen:
      "नागरिक",

    collegeRepresentative:
      "कॉलेज प्रतिनिधि",

    requestAcceptedSuccess:
      "कॉलेज अनुरोध सफलतापूर्वक स्वीकार किया गया।",

    requestRejectedSuccess:
      "कॉलेज अनुरोध अस्वीकार कर दिया गया।",

    enterRejectionReason:
      "इस समस्या को अस्वीकार करने का कारण दर्ज करें:",

    collegeUnableToHandle:
      "कॉलेज टीम इस समस्या को संभालने में सक्षम नहीं है।",

    respondedOn:
      "प्रतिक्रिया दिनांक",

    responseBy:
      "प्रतिक्रिया देने वाले",

    requestRejectedText:
      "यह अनुरोध कॉलेज द्वारा अस्वीकार कर दिया गया है। Admin द्वारा पुनः असाइनमेंट आवश्यक हो सकता है।",

    // Admin
    departmentDashboard:
      "विभाग डैशबोर्ड",

    departmentText:
      "शिकायतों की समीक्षा करें, AI असाइनमेंट, कॉलेज सहयोग और समाधान की प्रगति देखें।",

    complaintManagement:
      "शिकायत प्रबंधन",

    allComplaints:
      "सभी शिकायतें",

    collegePending:
      "कॉलेज लंबित",

    collegeAcceptedCount:
      "कॉलेज द्वारा स्वीकार",

    gpsLocation:
      "GPS लोकेशन",

    updateStatus:
      "शिकायत स्थिति अपडेट करें",

    resolve:
      "समाधान करें",

    adminReassignment:
      "Admin द्वारा पुनः असाइनमेंट आवश्यक है।",

    // Notifications
    notificationsTitle:
      "सूचनाएँ",

    noNotifications:
      "अभी कोई सूचना नहीं है।",

    // Feedback
    feedbackTitle:
      "फीडबैक और सुझाव",

    feedbackSubtitle:
      "आपका फीडबैक SamadhanSetu को हर नागरिक के लिए सरल, तेज और बेहतर बनाने में मदद करता है।",

    shareYourExperience:
      "अपना अनुभव साझा करें",

    feedbackIntroText:
      "SamadhanSetu पोर्टल का उपयोग करते समय अपना अनुभव बताएं।",

    ratingQuestion:
      "आप SamadhanSetu पोर्टल को कितनी रेटिंग देंगे?",

    ratingInstruction:
      "कृपया रेटिंग चुनें",

    satisfactionQuestion:
      "आप पोर्टल से कितने संतुष्ट हैं?",

    easeQuestion:
      "शिकायत दर्ज करना कितना आसान था?",

    responseTimeQuestion:
      "पोर्टल के प्रतिक्रिया समय को आप कैसे रेट करेंगे?",

    recommendationQuestion:
      "क्या आप SamadhanSetu को दूसरों को सुझाएंगे?",

    overallExperienceQuestion:
      "आपका कुल अनुभव कैसा रहा?",

    suggestionQuestion:
      "क्या आपके पास हमारे लिए कोई सुझाव है?",

    suggestionPlaceholder:
      "अपने सुझाव लिखें या बताएं कि हम कैसे सुधार कर सकते हैं...",

    feedbackNote:
      "आपका फीडबैक नागरिक सेवाओं को बेहतर बनाने में मदद करता है।",

    submitFeedback:
      "फीडबैक जमा करें",

    feedbackSubmitted:
      "फीडबैक सफलतापूर्वक जमा हो गया!",

    feedbackThankYou:
      "SamadhanSetu को बेहतर बनाने में मदद करने के लिए धन्यवाद।",

    communityFeedback:
      "समुदाय का फीडबैक",

    responses:
      "प्रतिक्रियाएं",

    noFeedbackYet:
      "अभी कोई फीडबैक नहीं",

    noFeedbackText:
      "अपना अनुभव साझा करने वाले पहले नागरिक बनें।",

    pleaseSelectRating:
      "कृपया पहले रेटिंग चुनें।",

    verySatisfied:
      "बहुत संतुष्ट",

    satisfied:
      "संतुष्ट",

    neutral:
      "तटस्थ",

    dissatisfied:
      "असंतुष्ट",

    veryDissatisfied:
      "बहुत असंतुष्ट",

    veryEasy:
      "बहुत आसान",

    easy:
      "आसान",

    moderate:
      "मध्यम",

    difficult:
      "कठिन",

    veryDifficult:
      "बहुत कठिन",

    excellent:
      "उत्कृष्ट",

    good:
      "अच्छा",

    average:
      "औसत",

    poor:
      "खराब",

    veryPoor:
      "बहुत खराब",

    definitelyYes:
      "निश्चित रूप से हाँ",

    probablyYes:
      "शायद हाँ",

    notSure:
      "पता नहीं",

    probablyNo:
      "शायद नहीं",

    definitelyNo:
      "बिल्कुल नहीं",

    stars:
      "सितारे",

    // General
    saveChanges:
      "बदलाव सहेजें",

    yes:
      "हाँ",

    no:
      "नहीं",

    success:
      "सफल",

    error:
      "त्रुटि",
  },
};

// =========================================================
// PROVIDER
// =========================================================

export function LanguageProvider({
  children,
}) {
  const [language, setLanguage] =
    useState(() => {
      return (
        localStorage.getItem(
          "portalLanguage"
        ) || "en"
      );
    });

  useEffect(() => {
    localStorage.setItem(
      "portalLanguage",
      language
    );

    document.documentElement.lang =
      language;
  }, [language]);

  const changeLanguage = (
    newLanguage
  ) => {
    if (
      !translations[newLanguage]
    ) {
      return;
    }

    setLanguage(newLanguage);
  };

  const t = (key) => {
    return (
      translations[language]?.[key] ||
      translations.en[key] ||
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,

        setLanguage:
          changeLanguage,

        changeLanguage,

        t,

        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// =========================================================
// HOOK
// =========================================================

export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}

export default LanguageContext;