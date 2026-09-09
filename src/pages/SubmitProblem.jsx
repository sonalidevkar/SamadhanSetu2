import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useComplaints } from "../context/ComplaintContext";
import { useLanguage } from "../context/LanguageContext";

import LocationMap from "../components/LocationMap";

function SubmitProblem() {
  const { user } = useAuth();
  const { addComplaint } = useComplaints();
  const { t, language } = useLanguage();

  const navigate = useNavigate();

  // ==========================================
  // FORM STATE
  // ==========================================

  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    city: user?.city || "",
    district: "",
    state: "",
    pincode: "",

    title: "",
    category: "",
    subcategory: "",
    description: "",
    exactLocation: "",
    landmark: "",
    ward: "",
    problemDate: "",
    priority: "Medium",

    affectedPeople: "",
    impact: "",
    previousComplaint: "No",
    previousComplaintId: "",

    latitude: "",
    longitude: "",
  });

  // ==========================================
  // OTHER STATES
  // ==========================================

  const [evidence, setEvidence] = useState(null);

  const [success, setSuccess] = useState(false);

  const [complaintId, setComplaintId] = useState("");

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [locationMessage, setLocationMessage] =
    useState("");

  const [isListening, setIsListening] =
    useState(false);

  const [voiceSupported, setVoiceSupported] =
    useState(true);

  const [voiceMessage, setVoiceMessage] =
    useState("");

  // ==========================================
  // VOICE SUPPORT CHECK
  // ==========================================

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
    }
  }, []);

  // ==========================================
  // VOICE LANGUAGE
  // ==========================================

  const getSpeechLanguage = () => {
    switch (language) {
      case "mr":
        return "mr-IN";

      case "hi":
        return "hi-IN";

      default:
        return "en-IN";
    }
  };

  // ==========================================
  // VOICE TO TEXT
  // ==========================================

  const startVoiceToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceMessage(
        t("voiceNotSupported")
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = getSpeechLanguage();

    recognition.onstart = () => {
      setIsListening(true);

      setVoiceMessage(
        t("voiceListening")
      );
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setForm((prev) => ({
        ...prev,

        description:
          `${prev.description}${
            prev.description ? " " : ""
          }${transcript}`,
      }));

      setVoiceMessage(
        t("voiceSuccess")
      );
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (
        event.error === "not-allowed"
      ) {
        setVoiceMessage(
          t("microphoneDenied")
        );
      } else {
        setVoiceMessage(
          t("voiceRecognitionError")
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // ==========================================
  // LIVE LOCATION
  // ==========================================

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage(
        t("geolocationNotSupported")
      );
      return;
    }

    setLocationLoading(true);

    setLocationMessage(
      t("gettingLiveLocation")
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const accuracy =
          position.coords.accuracy;

        setForm((prev) => ({
          ...prev,

          latitude:
            latitude.toString(),

          longitude:
            longitude.toString(),

          exactLocation:
            `GPS Location: ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}`,
        }));

        setLocationLoading(false);

        setLocationMessage(
          `${t(
            "locationDetected"
          )} ${Math.round(
            accuracy
          )} ${t("meters")}.`
        );
      },

      (error) => {
        setLocationLoading(false);

        switch (error.code) {
          case 1:
            setLocationMessage(
              t("locationPermissionDenied")
            );
            break;

          case 2:
            setLocationMessage(
              t("locationUnavailable")
            );
            break;

          case 3:
            setLocationMessage(
              t("locationTimeout")
            );
            break;

          default:
            setLocationMessage(
              t("locationError")
            );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // ==========================================
  // LOCATION FROM MAP
  // ==========================================

  const handleMapLocation = (location) => {
    if (!location) return;

    const latitude =
      location.latitude;

    const longitude =
      location.longitude;

    setForm((prev) => ({
      ...prev,

      latitude:
        latitude.toString(),

      longitude:
        longitude.toString(),

      exactLocation:
        `GPS Location: ${latitude.toFixed(
          6
        )}, ${longitude.toFixed(6)}`,
    }));

    setLocationMessage(
      `${t(
        "mapLocationSelected"
      )} ${Math.round(
        location.accuracy || 0
      )} ${t("meters")}.`
    );
  };

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // FILE
  // ==========================================

  const handleFileChange = (e) => {
    setEvidence(
      e.target.files[0] || null
    );
  };

  // ==========================================
  // DEPARTMENT
  // ==========================================

  const getDepartment = (category) => {
    switch (category) {
      case "Road & Infrastructure":
        return "Public Works / Municipal Engineering";

      case "Water Supply":
        return "Municipal Water Supply Department";

      case "Waste Management":
        return "Municipal Solid Waste Management";

      case "Electricity":
        return "Electricity / Street Light Service";

      case "Drainage":
        return "Municipal Drainage Department";

      case "Education":
        return "Education Department";

      case "Public Safety":
        return "Public Safety Department";

      case "Agriculture":
        return "Agriculture Service";

      case "Medical & Public Health":
        return "Public Health / Medical Service";

      default:
        return "Concerned Municipal Department";
    }
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const department =
      getDepartment(form.category);

    const complaint =
      addComplaint({
        ...form,

        department,

        evidence: evidence
          ? {
              name: evidence.name,
              type: evidence.type,
              size: evidence.size,
            }
          : null,

        location: {
          latitude: form.latitude,
          longitude: form.longitude,
          exactLocation:
            form.exactLocation,
        },

        history: [
          {
            status: "Submitted",
            date: new Date().toLocaleString(),
          },
        ],
      });

    setComplaintId(
      complaint.id
    );

    setSuccess(true);
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setSuccess(false);
    setComplaintId("");

    setForm((prev) => ({
      ...prev,

      title: "",
      category: "",
      subcategory: "",
      description: "",
      exactLocation: "",
      landmark: "",
      ward: "",
      problemDate: "",
      priority: "Medium",
      affectedPeople: "",
      impact: "",
      previousComplaint: "No",
      previousComplaintId: "",
      latitude: "",
      longitude: "",
    }));

    setEvidence(null);

    setLocationMessage("");
    setVoiceMessage("");
  };

  // ==========================================
  // SUCCESS SCREEN
  // ==========================================

  if (success) {
    return (
      <div className="submit-success-page">

        <div className="dashboard-card success-card">

          <div className="success-icon">
            ✅
          </div>

          <h1>
            {t("complaintSubmittedSuccess")}
          </h1>

          <p>
            {t("complaintRegisteredSuccess")}
          </p>

          <div className="complaint-id-box">

            <span>
              {t("yourComplaintID")}
            </span>

            <strong>
              {complaintId}
            </strong>

          </div>

          <div
            style={{
              marginTop: "15px",
              padding: "15px",
              background: "#f0fdf4",
              borderRadius: "10px",
              color: "#15803d",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            🤖{" "}
            {t("aiAnalysisCompleted")}

            <br />

            📍{" "}
            {t("locationUsedMatching")}

            <br />

            ⭐{" "}
            {t("earnedReward")}
            <strong>
              {" "}+10 {t("points")}
            </strong>
          </div>

          <div className="complaint-actions">

            <button
              className="primary-button"
              onClick={() =>
                navigate(
                  "/track-status"
                )
              }
            >
              📍 {t("trackComplaint")}
            </button>

            <button
              className="secondary-button"
              onClick={resetForm}
            >
              ➕ {t("submitAnother")}
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // MAIN FORM
  // ==========================================

  return (
    <div className="submit-problem-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">

        <div>

          <h1>
            📝 {t("submitCommunityProblem")}
          </h1>

          <p>
            {t("submitProblemDescription")}
          </p>

        </div>

      </div>

      <form onSubmit={handleSubmit}>

        {/* =====================================
            CITIZEN DETAILS
        ====================================== */}

        <div className="dashboard-card form-card">

          <div className="form-card-header">

            <h2>
              👤 {t("citizenDetails")}
            </h2>

            <p>
              {t("citizenDetailsText")}
            </p>

          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>
                {t("fullName")} *
              </label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                {t("email")} *
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                {t("mobile")} *
              </label>

              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                {t("city")} *
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                {t("district")}
              </label>

              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder={t(
                  "enterDistrict"
                )}
              />
            </div>

            <div className="form-group">
              <label>
                {t("state")}
              </label>

              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder={t(
                  "enterState"
                )}
              />
            </div>

            <div className="form-group">
              <label>
                {t("pincode")}
              </label>

              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder={t(
                  "enterPincode"
                )}
              />
            </div>

            <div className="form-group full-width">

              <label>
                {t("address")} *
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="3"
                required
                placeholder={t(
                  "completeAddress"
                )}
              />

            </div>

          </div>

        </div>

        {/* =====================================
            PROBLEM DETAILS
        ====================================== */}

        <div className="dashboard-card form-card">

          <div className="form-card-header">

            <h2>
              🚨 {t("problemDetails")}
            </h2>

            <p>
              {t("problemDetailsText")}
            </p>

          </div>

          <div className="form-grid">

            <div className="form-group full-width">

              <label>
                {t("problemTitle")} *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder={t(
                  "problemTitlePlaceholder"
                )}
                required
              />

            </div>

            <div className="form-group">

              <label>
                {t("problemCategory")} *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  {t("selectCategory")}
                </option>

                <option value="Road & Infrastructure">
                  {t("roadInfrastructure")}
                </option>

                <option value="Water Supply">
                  {t("waterSupply")}
                </option>

                <option value="Waste Management">
                  {t("wasteManagement")}
                </option>

                <option value="Electricity">
                  {t("electricity")}
                </option>

                <option value="Drainage">
                  {t("drainage")}
                </option>

                <option value="Agriculture">
                  {t("agriculture")}
                </option>

                <option value="Medical & Public Health">
                  {t("medicalPublicHealth")}
                </option>

                <option value="Education">
                  {t("education")}
                </option>

                <option value="Public Safety">
                  {t("publicSafety")}
                </option>

                <option value="Other">
                  {t("other")}
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                {t("subcategory")}
              </label>

              <input
                type="text"
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                placeholder={t(
                  "subcategoryPlaceholder"
                )}
              />

            </div>

            <div className="form-group">

              <label>
                {t("problemDate")}
              </label>

              <input
                type="date"
                name="problemDate"
                value={form.problemDate}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                {t("priority")} *
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                required
              >

                <option value="Low">
                  {t("low")}
                </option>

                <option value="Medium">
                  {t("medium")}
                </option>

                <option value="High">
                  {t("high")}
                </option>

                <option value="Critical">
                  {t("critical")}
                </option>

              </select>

            </div>

            {/* VOICE */}

            <div className="form-group full-width">

              <label>
                {t("detailedDescription")} *
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems:
                    "flex-start",
                }}
              >

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder={t(
                    "descriptionPlaceholder"
                  )}
                  required
                  style={{
                    flex: 1,
                  }}
                />

                <button
                  type="button"
                  onClick={
                    startVoiceToText
                  }
                  disabled={
                    isListening ||
                    !voiceSupported
                  }
                  className="secondary-button"
                  style={{
                    minWidth: "125px",
                  }}
                >

                  {isListening
                    ? `🎙️ ${t(
                        "listening"
                      )}`
                    : `🎤 ${t(
                        "speak"
                      )}`}

                </button>

              </div>

              {voiceMessage && (
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color:
                      isListening
                        ? "#2563eb"
                        : "#64748b",
                  }}
                >
                  {voiceMessage}
                </p>
              )}

            </div>

          </div>

        </div>

        {/* =====================================
            LIVE MAP
        ====================================== */}

        <div className="dashboard-card form-card">

          <div className="form-card-header">

            <h2>
              📍 {t("liveLocationNearby")}
            </h2>

            <p>
              {t("liveLocationText")}
            </p>

          </div>

          {/* LOCATION BUTTON */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "15px",
            }}
          >

            <button
              type="button"
              onClick={
                getLiveLocation
              }
              disabled={
                locationLoading
              }
              className="primary-button"
            >
              {locationLoading
                ? `📍 ${t(
                    "detecting"
                  )}`
                : `📍 ${t(
                    "useMyLiveLocation"
                  )}`}
            </button>

          </div>

          {/* LOCATION MESSAGE */}

          {locationMessage && (
            <div
              style={{
                marginBottom: "15px",
                padding: "11px 13px",
                borderRadius: "9px",
                background:
                  locationMessage.startsWith(
                    "✅"
                  )
                    ? "#ecfdf5"
                    : "#fff1f2",
                color:
                  locationMessage.startsWith(
                    "✅"
                  )
                    ? "#15803d"
                    : "#dc2626",
                fontSize: "12px",
              }}
            >
              {locationMessage}
            </div>
          )}

          {/* MAP */}

          <LocationMap
            selectedCategory={
              form.category
            }
            onLocationDetected={
              handleMapLocation
            }
          />

          {/* COORDINATES */}

          {form.latitude &&
            form.longitude && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "14px",
                  background: "#eef6ff",
                  borderRadius: "10px",
                }}
              >

                <strong
                  style={{
                    display: "block",
                    color: "#1d4ed8",
                    fontSize: "13px",
                    marginBottom: "5px",
                  }}
                >
                  📍{" "}
                  {t("selectedGPSLocation")}
                </strong>

                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  {t("latitude")}:{" "}
                  {form.latitude}
                </span>

                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  {t("longitude")}:{" "}
                  {form.longitude}
                </span>

              </div>
            )}

          {/* EXACT LOCATION */}

          <div
            className="form-grid"
            style={{
              marginTop: "20px",
            }}
          >

            <div className="form-group full-width">

              <label>
                {t("exactLocation")} *
              </label>

              <input
                type="text"
                name="exactLocation"
                value={form.exactLocation}
                onChange={handleChange}
                placeholder={t(
                  "exactLocationPlaceholder"
                )}
                required
              />

            </div>

            <div className="form-group">

              <label>
                {t("nearestLandmark")}
              </label>

              <input
                type="text"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder={t(
                  "landmarkPlaceholder"
                )}
              />

            </div>

            <div className="form-group">

              <label>
                {t("wardArea")}
              </label>

              <input
                type="text"
                name="ward"
                value={form.ward}
                onChange={handleChange}
                placeholder={t(
                  "wardPlaceholder"
                )}
              />

            </div>

          </div>

        </div>

        {/* =====================================
            IMPACT
        ====================================== */}

        <div className="dashboard-card form-card">

          <div className="form-card-header">

            <h2>
              👥 {t("communityImpact")}
            </h2>

            <p>
              {t("communityImpactText")}
            </p>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                {t("affectedPeople")}
              </label>

              <input
                type="number"
                name="affectedPeople"
                value={form.affectedPeople}
                onChange={handleChange}
                placeholder={t(
                  "affectedPeoplePlaceholder"
                )}
                min="0"
              />

            </div>

            <div className="form-group">

              <label>
                {t("reportedBefore")}
              </label>

              <select
                name="previousComplaint"
                value={
                  form.previousComplaint
                }
                onChange={handleChange}
              >

                <option value="No">
                  {t("no")}
                </option>

                <option value="Yes">
                  {t("yes")}
                </option>

              </select>

            </div>

            {form.previousComplaint ===
              "Yes" && (
              <div className="form-group">

                <label>
                  {t("previousComplaintID")}
                </label>

                <input
                  type="text"
                  name="previousComplaintId"
                  value={
                    form.previousComplaintId
                  }
                  onChange={
                    handleChange
                  }
                  placeholder={t(
                    "previousComplaintPlaceholder"
                  )}
                />

              </div>
            )}

            <div className="form-group full-width">

              <label>
                {t("impactOnCitizens")}
              </label>

              <textarea
                name="impact"
                value={form.impact}
                onChange={handleChange}
                rows="4"
                placeholder={t(
                  "impactPlaceholder"
                )}
              />

            </div>

          </div>

        </div>

        {/* =====================================
            EVIDENCE
        ====================================== */}

        <div className="dashboard-card form-card">

          <div className="form-card-header">

            <h2>
              📷 {t("evidence")}
            </h2>

            <p>
              {t("evidenceText")}
            </p>

          </div>

          <div className="form-group">

            <label>
              {t("uploadEvidence")}
            </label>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={
                handleFileChange
              }
            />

            {evidence && (
              <p className="file-name">
                📎 {t("selected")}:{" "}
                {evidence.name}
              </p>
            )}

          </div>

        </div>

        {/* =====================================
            AI SUBMISSION
        ====================================== */}

        <div className="dashboard-card submit-final-card">

          <div className="ai-info-box">

            🤖{" "}
            <strong>
              {t("samadhanAI")}:
            </strong>

            <br />

            {t("samadhanAIText")}

            <br />

            ⭐ {t("rewardParticipation")}

          </div>

          <button
            type="submit"
            className="primary-button submit-button"
          >
            🚀 {t("submitComplaint")}
          </button>

        </div>

      </form>

    </div>
  );
}

export default SubmitProblem;