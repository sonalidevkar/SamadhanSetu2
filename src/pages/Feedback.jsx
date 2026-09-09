import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Feedback() {
  const { t } = useLanguage();

  const [feedback, setFeedback] = useState({
    rating: 0,
    satisfaction: "",
    easeOfUse: "",
    responseTime: "",
    recommendation: "",
    overallExperience: "",
    suggestion: "",
  });

  const [submittedFeedback, setSubmittedFeedback] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem("portalFeedback") || "[]"
        );
      } catch {
        return [];
      }
    });

  const [success, setSuccess] = useState(false);

  const handleOptionChange = (field, value) => {
    setFeedback((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (feedback.rating === 0) {
      alert(t("pleaseSelectRating"));
      return;
    }

    const newFeedback = {
      id: `FB-${Date.now()}`,
      name: "Citizen User",
      ...feedback,
      createdAt: new Date().toLocaleString(),
    };

    const updatedFeedback = [
      newFeedback,
      ...submittedFeedback,
    ];

    setSubmittedFeedback(updatedFeedback);

    localStorage.setItem(
      "portalFeedback",
      JSON.stringify(updatedFeedback)
    );

    setSuccess(true);

    setFeedback({
      rating: 0,
      satisfaction: "",
      easeOfUse: "",
      responseTime: "",
      recommendation: "",
      overallExperience: "",
      suggestion: "",
    });
  };

  const getRatingText = () => {
    switch (feedback.rating) {
      case 1:
        return t("veryPoor");
      case 2:
        return t("poor");
      case 3:
        return t("average");
      case 4:
        return t("good");
      case 5:
        return t("excellent");
      default:
        return t("pleaseSelectRating");
    }
  };

  const renderOptions = (
    field,
    options
  ) => {
    return (
      <div className="feedback-options">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`feedback-option ${
              feedback[field] === option.value
                ? "selected"
                : ""
            }`}
            onClick={() =>
              handleOptionChange(
                field,
                option.value
              )
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="feedback-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">

        <div>
          <h1>
            ⭐ {t("feedbackTitle")}
          </h1>

          <p>
            {t("feedbackSubtitle")}
          </p>
        </div>

      </div>

      {/* =====================================
          FEEDBACK FORM
      ====================================== */}

      <div className="feedback-card">

        <div className="feedback-intro">

          <div className="feedback-intro-icon">
            💬
          </div>

          <h2>
            {t("shareYourExperience")}
          </h2>

          <p>
            {t("feedbackIntroText")}
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* =================================
              QUESTION 1 - RATING
          ================================== */}

          <div className="feedback-rating-section">

            <h3>
              1. {t("ratingQuestion")}
            </h3>

            <p>
              {t("ratingInstruction")}
            </p>

            <div className="star-rating">

              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    className={
                      feedback.rating >= star
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handleOptionChange(
                        "rating",
                        star
                      )
                    }
                    aria-label={`${star} ${t(
                      "stars"
                    )}`}
                  >
                    ★
                  </button>
                )
              )}

            </div>

            <div className="rating-text">
              {getRatingText()}
            </div>

          </div>

          {/* =================================
              QUESTIONS 2-6
          ================================== */}

          <div className="feedback-question-grid">

            {/* QUESTION 2 */}

            <div className="feedback-question">

              <label>
                2.{" "}
                {t("satisfactionQuestion")}
              </label>

              {renderOptions(
                "satisfaction",
                [
                  {
                    value: "Very Satisfied",
                    label: t("verySatisfied"),
                  },
                  {
                    value: "Satisfied",
                    label: t("satisfied"),
                  },
                  {
                    value: "Neutral",
                    label: t("neutral"),
                  },
                  {
                    value: "Dissatisfied",
                    label: t("dissatisfied"),
                  },
                  {
                    value: "Very Dissatisfied",
                    label: t(
                      "veryDissatisfied"
                    ),
                  },
                ]
              )}

            </div>

            {/* QUESTION 3 */}

            <div className="feedback-question">

              <label>
                3.{" "}
                {t("easeQuestion")}
              </label>

              {renderOptions(
                "easeOfUse",
                [
                  {
                    value: "Very Easy",
                    label: t("veryEasy"),
                  },
                  {
                    value: "Easy",
                    label: t("easy"),
                  },
                  {
                    value: "Moderate",
                    label: t("moderate"),
                  },
                  {
                    value: "Difficult",
                    label: t("difficult"),
                  },
                  {
                    value: "Very Difficult",
                    label: t(
                      "veryDifficult"
                    ),
                  },
                ]
              )}

            </div>

            {/* QUESTION 4 */}

            <div className="feedback-question">

              <label>
                4.{" "}
                {t("responseTimeQuestion")}
              </label>

              {renderOptions(
                "responseTime",
                [
                  {
                    value: "Excellent",
                    label: t("excellent"),
                  },
                  {
                    value: "Good",
                    label: t("good"),
                  },
                  {
                    value: "Average",
                    label: t("average"),
                  },
                  {
                    value: "Poor",
                    label: t("poor"),
                  },
                  {
                    value: "Very Poor",
                    label: t("veryPoor"),
                  },
                ]
              )}

            </div>

            {/* QUESTION 5 */}

            <div className="feedback-question">

              <label>
                5.{" "}
                {t("recommendationQuestion")}
              </label>

              {renderOptions(
                "recommendation",
                [
                  {
                    value: "Definitely Yes",
                    label: t(
                      "definitelyYes"
                    ),
                  },
                  {
                    value: "Probably Yes",
                    label: t(
                      "probablyYes"
                    ),
                  },
                  {
                    value: "Not Sure",
                    label: t("notSure"),
                  },
                  {
                    value: "Probably No",
                    label: t(
                      "probablyNo"
                    ),
                  },
                  {
                    value: "Definitely No",
                    label: t(
                      "definitelyNo"
                    ),
                  },
                ]
              )}

            </div>

            {/* QUESTION 6 */}

            <div className="feedback-question">

              <label>
                6.{" "}
                {t("overallExperienceQuestion")}
              </label>

              {renderOptions(
                "overallExperience",
                [
                  {
                    value: "Excellent",
                    label: t("excellent"),
                  },
                  {
                    value: "Good",
                    label: t("good"),
                  },
                  {
                    value: "Average",
                    label: t("average"),
                  },
                  {
                    value: "Poor",
                    label: t("poor"),
                  },
                  {
                    value: "Very Poor",
                    label: t("veryPoor"),
                  },
                ]
              )}

            </div>

          </div>

          {/* =================================
              SUGGESTION
          ================================== */}

          <div className="feedback-suggestion">

            <label>
              💡 {t("suggestionQuestion")}
            </label>

            <textarea
              value={
                feedback.suggestion
              }
              onChange={(e) =>
                handleOptionChange(
                  "suggestion",
                  e.target.value
                )
              }
              placeholder={t(
                "suggestionPlaceholder"
              )}
              rows="5"
            />

          </div>

          {/* =================================
              SUBMIT
          ================================== */}

          <div className="feedback-submit-area">

            <div className="feedback-submit-note">
              ⭐ {t("feedbackNote")}
            </div>

            <button
              type="submit"
              className="feedback-submit-button"
            >
              ✅ {t("submitFeedback")}
            </button>

          </div>

        </form>

      </div>

      {/* =====================================
          SUCCESS MESSAGE
      ====================================== */}

      {success && (
        <div className="feedback-success">

          <div className="feedback-success-icon">
            ✅
          </div>

          <h2>
            {t("feedbackSubmitted")}
          </h2>

          <p>
            {t("feedbackThankYou")}
          </p>

        </div>
      )}

      {/* =====================================
          USER FEEDBACK
      ====================================== */}

      <div className="feedback-list">

        <div className="feedback-list-header">

          <h2>
            💬 {t("communityFeedback")}
          </h2>

          <span className="feedback-count">
            {submittedFeedback.length}{" "}
            {t("responses")}
          </span>

        </div>

        {submittedFeedback.length === 0 ? (

          <div className="feedback-empty">

            <div className="feedback-empty-icon">
              ⭐
            </div>

            <h3>
              {t("noFeedbackYet")}
            </h3>

            <p>
              {t("noFeedbackText")}
            </p>

          </div>

        ) : (

          submittedFeedback.map(
            (item) => (

              <div
                className="feedback-item"
                key={item.id}
              >

                <div className="feedback-user-name">
                  👤 {item.name}
                </div>

                <div className="feedback-user-meta">
                  {item.createdAt}
                </div>

                <div className="feedback-item-rating">
                  {"★".repeat(
                    item.rating
                  )}
                  {"☆".repeat(
                    5 - item.rating
                  )}
                </div>

                {item.suggestion && (
                  <p className="feedback-item-text">
                    “{item.suggestion}”
                  </p>
                )}

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}

export default Feedback;