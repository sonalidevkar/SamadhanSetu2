
import React, { useState } from "react";

function ReportProblem() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [problemId, setProblemId] = useState("");

  // Handle text, select and textarea fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImage(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.category ||
      !formData.description.trim() ||
      !formData.location.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const id =
      "SS-" +
      Date.now().toString().slice(-8);

    const newProblem = {
      id: id,
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      location: formData.location.trim(),
      image: image,
      status: "Submitted",
      date: new Date().toLocaleDateString("en-IN"),

      tracking: [
        {
          status: "Problem Reported",
          description:
            "Problem has been successfully submitted.",
          completed: true,
          date: new Date().toLocaleDateString("en-IN"),
        },

        {
          status: "Under Review",
          description:
            "The problem is waiting for verification.",
          completed: false,
          date: "-",
        },

        {
          status: "University Assigned",
          description:
            "A suitable university team will be assigned.",
          completed: false,
          date: "-",
        },

        {
          status: "Industry Collaboration",
          description:
            "Industry partners can collaborate on the solution.",
          completed: false,
          date: "-",
        },

        {
          status: "Solution Development",
          description:
            "The assigned team will develop the solution.",
          completed: false,
          date: "-",
        },

        {
          status: "Problem Resolved",
          description:
            "The solution will be implemented.",
          completed: false,
          date: "-",
        },
      ],
    };

    const oldProblems =
      JSON.parse(
        localStorage.getItem("samadhanProblems")
      ) || [];

    const updatedProblems = [
      ...oldProblems,
      newProblem,
    ];

    localStorage.setItem(
      "samadhanProblems",
      JSON.stringify(updatedProblems)
    );

    setProblemId(id);
    setSubmitted(true);

    setFormData({
      title: "",
      category: "",
      description: "",
      location: "",
    });

    setImage(null);
  };

  const reportAnother = () => {
    setSubmitted(false);
    setProblemId("");
  };

  return (
    <section className="page-section">

      <div className="form-container">

        {!submitted ? (
          <>
            <h1>Report a Problem</h1>

            <p>
              Report a community problem and help
              make your area better.
            </p>

            <form onSubmit={handleSubmit}>

              {/* TITLE */}

              <label htmlFor="problem-title">
                Problem Title *
              </label>

              <input
                id="problem-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Garbage collection issue"
                autoComplete="off"
                required
              />


              {/* CATEGORY */}

              <label htmlFor="problem-category">
                Category *
              </label>

              <select
                id="problem-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Healthcare">
                  Healthcare
                </option>

                <option value="Agriculture">
                  Agriculture
                </option>

                <option value="Environment">
                  Environment
                </option>

                <option value="Transportation">
                  Transportation
                </option>

                <option value="Water & Sanitation">
                  Water & Sanitation
                </option>

                <option value="Employment">
                  Employment
                </option>

                <option value="Public Safety">
                  Public Safety
                </option>

                <option value="Other">
                  Other
                </option>
              </select>


              {/* DESCRIPTION */}

              <label htmlFor="problem-description">
                Problem Description *
              </label>

              <textarea
                id="problem-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the problem in detail..."
                rows="6"
                required
              />


              {/* LOCATION */}

              <label htmlFor="problem-location">
                Location *
              </label>

              <input
                id="problem-location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter city / village / area"
                autoComplete="off"
                required
              />


              {/* IMAGE */}

              <label htmlFor="problem-image">
                Upload Image
              </label>

              <input
                id="problem-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />


              {/* IMAGE PREVIEW */}

              {image && (
                <div className="image-preview">
                  <p>Image Preview:</p>

                  <img
                    src={image}
                    alt="Problem preview"
                  />
                </div>
              )}


              {/* SUBMIT */}

              <button
                type="submit"
                className="primary-btn"
              >
                Submit Problem
              </button>

            </form>
          </>
        ) : (

          /* SUCCESS */

          <div className="success-message">

            <div className="success-icon">
              ✓
            </div>

            <h1>
              Problem Reported Successfully!
            </h1>

            <p>
              Thank you for helping your community.
              Your problem has been submitted to
              SamadhanSetu.
            </p>

            <div className="card problem-id-card">

              <h3>
                Your Problem ID
              </h3>

              <h2>
                {problemId}
              </h2>

              <p>
                Save this ID to track your problem.
              </p>

            </div>

            <div className="success-buttons">

              <button
                className="primary-btn"
                onClick={reportAnother}
              >
                Report Another Problem
              </button>

              <button
                className="outline-btn"
                onClick={() =>
                  window.location.href =
                    `/track/${problemId}`
                }
              >
                Track Problem
              </button>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}

export default ReportProblem;
