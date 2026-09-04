import React, { useState } from "react";
import "./style.css";

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {
  en: {
    dashboard: "Dashboard",
    submit: "Submit Problem",
    complaints: "My Complaints",
    track: "Track Status",
    ai: "AI Assistant",
    notifications: "Notifications",
    help: "Help & Support",
    feedback: "Feedback",
    profile: "Profile",
    logout: "Logout",
    login: "Login",
    createAccount: "Create Account",
    welcome: "Your Voice. Our Action.",
    better: "Better Tomorrow.",
    heroText:
      "Report issues, track progress and get solutions with the power of technology.",
    submitProblem: "Submit a Problem",
    howWorks: "How it Works?",
    total: "Total Complaints",
    progress: "In Progress",
    resolved: "Resolved",
    pending: "Pending",
    recent: "Recent Complaints",
    viewAll: "View All",
    quickActions: "Quick Actions",
    newProblem: "Submit a New Problem",
    trackProblem: "Track Your Problem",
    talkAI: "Talk to AI Assistant",
    viewNotifications: "View Notifications",
    problemTitle: "Problem Title",
    category: "Category",
    description: "Description",
    location: "Location",
    image: "Upload Image",
    submitBtn: "Submit Problem",
    cancel: "Cancel",
    back: "Back",
    delete: "Delete",
    edit: "Edit",
    save: "Save Changes",
    name: "Full Name",
    email: "Email",
    mobile: "Mobile Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    userType: "User Type",
    citizen: "Citizen",
    student: "Student",
    university: "University Representative",
    industry: "Industry Partner",
    accountCreated: "Account created successfully!",
    invalidLogin: "Invalid email or password.",
    alreadyExists: "An account with this email already exists.",
    passwordMismatch: "Passwords do not match.",
    profileUpdated: "Profile updated successfully!",
    problemSubmitted: "Problem submitted successfully!",
    deleteConfirm: "Are you sure you want to delete this problem?",
    noProblems: "No problems submitted yet.",
    problemDetails: "Problem Details",
    reportedBy: "Reported By",
    date: "Date",
    status: "Status",
    journey: "Problem Journey",
    universityAssigned: "University Assigned",
    industryPartner: "Industry Partner",
    solution: "How We Are Solving It",
    collaboration: "University + Industry Collaboration",
    currentWork: "Current Work",
    resolvedMessage: "Problem successfully resolved!",
    inProgressMessage: "Solution development is in progress.",
    chooseLanguage: "Language",
    passwordHint: "Minimum 6 characters",
    joinText: "Join SamadhanSetu and help your community.",
  },

  mr: {
    dashboard: "डॅशबोर्ड",
    submit: "समस्या नोंदवा",
    complaints: "माझ्या तक्रारी",
    track: "स्थिती तपासा",
    ai: "AI सहाय्यक",
    notifications: "सूचना",
    help: "मदत आणि समर्थन",
    feedback: "अभिप्राय",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",
    login: "लॉगिन",
    createAccount: "खाते तयार करा",
    welcome: "तुमचा आवाज. आमची कृती.",
    better: "उत्तम उद्यासाठी.",
    heroText:
      "तंत्रज्ञानाच्या मदतीने समस्या नोंदवा, प्रगतीचा मागोवा घ्या आणि उपाय मिळवा.",
    submitProblem: "समस्या नोंदवा",
    howWorks: "हे कसे कार्य करते?",
    total: "एकूण तक्रारी",
    progress: "प्रगतीपथावर",
    resolved: "निराकरण झालेल्या",
    pending: "प्रलंबित",
    recent: "अलीकडील तक्रारी",
    viewAll: "सर्व पहा",
    quickActions: "जलद कृती",
    newProblem: "नवीन समस्या नोंदवा",
    trackProblem: "समस्येचा मागोवा घ्या",
    talkAI: "AI सहाय्यकाशी बोला",
    viewNotifications: "सूचना पहा",
    problemTitle: "समस्येचे शीर्षक",
    category: "वर्ग",
    description: "वर्णन",
    location: "स्थान",
    image: "फोटो अपलोड करा",
    submitBtn: "समस्या सबमिट करा",
    cancel: "रद्द करा",
    back: "मागे",
    delete: "डिलीट",
    edit: "संपादन",
    save: "बदल जतन करा",
    name: "पूर्ण नाव",
    email: "ईमेल",
    mobile: "मोबाईल नंबर",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड पुन्हा लिहा",
    userType: "वापरकर्ता प्रकार",
    citizen: "नागरिक",
    student: "विद्यार्थी",
    university: "विद्यापीठ प्रतिनिधी",
    industry: "उद्योग भागीदार",
    accountCreated: "खाते यशस्वीरित्या तयार झाले!",
    invalidLogin: "ईमेल किंवा पासवर्ड चुकीचा आहे.",
    alreadyExists: "या ईमेलने खाते आधीच अस्तित्वात आहे.",
    passwordMismatch: "पासवर्ड जुळत नाहीत.",
    profileUpdated: "प्रोफाइल यशस्वीरित्या अपडेट झाले!",
    problemSubmitted: "समस्या यशस्वीरित्या सबमिट झाली!",
    deleteConfirm: "ही समस्या डिलीट करायची आहे का?",
    noProblems: "अजून कोणतीही समस्या नोंदवलेली नाही.",
    problemDetails: "समस्येची माहिती",
    reportedBy: "नोंद करणारा",
    date: "दिनांक",
    status: "स्थिती",
    journey: "समस्येचा प्रवास",
    universityAssigned: "विद्यापीठ नियुक्त",
    industryPartner: "उद्योग भागीदार",
    solution: "आम्ही समस्या कशी सोडवत आहोत",
    collaboration: "विद्यापीठ + उद्योग सहकार्य",
    currentWork: "सध्याचे काम",
    resolvedMessage: "समस्येचे यशस्वीरित्या निराकरण झाले!",
    inProgressMessage: "उपाय विकसित करण्याचे काम सुरू आहे.",
    chooseLanguage: "भाषा",
    passwordHint: "किमान ६ अक्षरे",
    joinText: "SamadhanSetu मध्ये सहभागी व्हा आणि आपल्या समुदायाला मदत करा.",
  },

  hi: {
    dashboard: "डैशबोर्ड",
    submit: "समस्या दर्ज करें",
    complaints: "मेरी शिकायतें",
    track: "स्थिति देखें",
    ai: "AI सहायक",
    notifications: "सूचनाएं",
    help: "मदद और सहायता",
    feedback: "प्रतिक्रिया",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",
    login: "लॉगिन",
    createAccount: "खाता बनाएं",
    welcome: "आपकी आवाज़। हमारी कार्रवाई।",
    better: "बेहतर कल के लिए।",
    heroText:
      "तकनीक की मदद से समस्या दर्ज करें, प्रगति देखें और समाधान प्राप्त करें।",
    submitProblem: "समस्या दर्ज करें",
    howWorks: "यह कैसे काम करता है?",
    total: "कुल शिकायतें",
    progress: "प्रगति में",
    resolved: "हल की गई",
    pending: "लंबित",
    recent: "हाल की शिकायतें",
    viewAll: "सभी देखें",
    quickActions: "त्वरित कार्य",
    newProblem: "नई समस्या दर्ज करें",
    trackProblem: "अपनी समस्या ट्रैक करें",
    talkAI: "AI सहायक से बात करें",
    viewNotifications: "सूचनाएं देखें",
    problemTitle: "समस्या का शीर्षक",
    category: "श्रेणी",
    description: "विवरण",
    location: "स्थान",
    image: "फोटो अपलोड करें",
    submitBtn: "समस्या जमा करें",
    cancel: "रद्द करें",
    back: "वापस",
    delete: "डिलीट",
    edit: "संपादन",
    save: "बदलाव सेव करें",
    name: "पूरा नाम",
    email: "ईमेल",
    mobile: "मोबाइल नंबर",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    userType: "उपयोगकर्ता प्रकार",
    citizen: "नागरिक",
    student: "छात्र",
    university: "विश्वविद्यालय प्रतिनिधि",
    industry: "उद्योग भागीदार",
    accountCreated: "खाता सफलतापूर्वक बनाया गया!",
    invalidLogin: "ईमेल या पासवर्ड गलत है।",
    alreadyExists: "इस ईमेल से खाता पहले से मौजूद है।",
    passwordMismatch: "पासवर्ड मेल नहीं खाते।",
    profileUpdated: "प्रोफाइल सफलतापूर्वक अपडेट हुई!",
    problemSubmitted: "समस्या सफलतापूर्वक जमा हुई!",
    deleteConfirm: "क्या आप इस समस्या को डिलीट करना चाहते हैं?",
    noProblems: "अभी तक कोई समस्या दर्ज नहीं की गई है।",
    problemDetails: "समस्या की जानकारी",
    reportedBy: "द्वारा रिपोर्ट",
    date: "दिनांक",
    status: "स्थिति",
    journey: "समस्या की यात्रा",
    universityAssigned: "विश्वविद्यालय नियुक्त",
    industryPartner: "उद्योग भागीदार",
    solution: "हम समस्या का समाधान कैसे कर रहे हैं",
    collaboration: "विश्वविद्यालय + उद्योग सहयोग",
    currentWork: "वर्तमान कार्य",
    resolvedMessage: "समस्या सफलतापूर्वक हल हो गई!",
    inProgressMessage: "समाधान विकसित करने का काम जारी है।",
    chooseLanguage: "भाषा",
    passwordHint: "कम से कम 6 अक्षर",
    joinText: "SamadhanSetu से जुड़ें और अपने समुदाय की मदद करें।",
  },
};

/* =========================================================
   DEFAULT TRACKING
========================================================= */

const createTracking = () => [
  {
    status: "Problem Submitted",
    description: "Citizen submitted the community problem.",
    completed: true,
    date: new Date().toLocaleDateString("en-IN"),
  },
  {
    status: "AI Analysis",
    description: "Problem is analyzed and categorized by the platform.",
    completed: true,
    date: new Date().toLocaleDateString("en-IN"),
  },
  {
    status: "University Assigned",
    description: "Suitable university team is assigned.",
    completed: false,
    date: "-",
  },
  {
    status: "Solution Development",
    description: "Students and experts develop a practical solution.",
    completed: false,
    date: "-",
  },
  {
    status: "Industry Collaboration",
    description: "Industry partner provides technology and implementation support.",
    completed: false,
    date: "-",
  },
  {
    status: "Testing & Implementation",
    description: "Solution is tested and prepared for implementation.",
    completed: false,
    date: "-",
  },
  {
    status: "Problem Resolved",
    description: "Final solution is implemented for the community.",
    completed: false,
    date: "-",
  },
];

/* =========================================================
   LOGIN
========================================================= */

function Login({ onLogin, goRegister, goHome, t }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("samadhanUsers")) || [];

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!user) {
      alert(t.invalidLogin);
      return;
    }

    localStorage.setItem(
      "samadhanCurrentUser",
      JSON.stringify(user)
    );

    onLogin(user);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <button className="back-link" onClick={goHome}>
          ← {t.back}
        </button>

        <div className="auth-logo">🌉</div>

        <h1>{t.login}</h1>
        <p>{t.joinText}</p>

        <form onSubmit={handleSubmit}>
          <label>{t.email}</label>

          <input
            type="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>{t.password}</label>

          <div className="password-wrap">
            <input
              type={show ? "text" : "password"}
              value={password}
              placeholder={t.password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
            >
              {show ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="primary-btn full" type="submit">
            🔐 {t.login}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <button
          className="outline-btn full"
          onClick={goRegister}
        >
          ✨ {t.createAccount}
        </button>
      </div>
    </main>
  );
}

/* =========================================================
   REGISTER
========================================================= */

function Register({ onRegister, goLogin, goHome, t }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    userType: "Citizen",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState(false);

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (form.mobile.length !== 10) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (form.password.length < 6) {
      alert(t.passwordHint);
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert(t.passwordMismatch);
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("samadhanUsers")) || [];

    const exists = users.some(
      (u) =>
        u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (exists) {
      alert(t.alreadyExists);
      return;
    }

    const user = {
      id: "USER-" + Date.now().toString().slice(-6),
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      location: form.location,
      userType: form.userType,
      password: form.password,
      photo: "",
      createdAt: new Date().toLocaleDateString("en-IN"),
    };

    users.push(user);

    localStorage.setItem(
      "samadhanUsers",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "samadhanCurrentUser",
      JSON.stringify(user)
    );

    alert(t.accountCreated);

    onRegister(user);
  };

  return (
    <main className="auth-page">
      <div className="register-card">
        <button className="back-link" onClick={goHome}>
          ← {t.back}
        </button>

        <div className="auth-logo">👤</div>

        <h1>{t.createAccount}</h1>
        <p>{t.joinText}</p>

        <form onSubmit={submit}>
          <div className="two-column">
            <div>
              <label>{t.name}</label>

              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label>{t.email}</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label>{t.mobile}</label>

              <input
                name="mobile"
                value={form.mobile}
                maxLength="10"
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile: e.target.value.replace(/\D/g, ""),
                  })
                }
                placeholder="10 digit mobile"
                required
              />
            </div>

            <div>
              <label>{t.location}</label>

              <input
                name="location"
                value={form.location}
                onChange={update}
                placeholder="City / Village"
                required
              />
            </div>
          </div>

          <label>{t.userType}</label>

          <select
            name="userType"
            value={form.userType}
            onChange={update}
          >
            <option>Citizen</option>
            <option>Student</option>
            <option>University</option>
            <option>Industry</option>
          </select>

          <label>{t.password}</label>

          <div className="password-wrap">
            <input
              type={show ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={update}
              required
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
            >
              {show ? "🙈" : "👁️"}
            </button>
          </div>

          <label>{t.confirmPassword}</label>

          <input
            type={show ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={update}
            required
          />

          <button className="primary-btn full" type="submit">
            ✨ {t.createAccount}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <button
          className="outline-btn full"
          onClick={goLogin}
        >
          🔐 {t.login}
        </button>
      </div>
    </main>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function Profile({ user, updateUser, logout, goHome, t }) {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user.name,
    mobile: user.mobile,
    location: user.location,
    userType: user.userType,
    photo: user.photo || "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const photoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm({
        ...form,
        photo: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const save = () => {
    const updated = {
      ...user,
      ...form,
    };

    const users =
      JSON.parse(localStorage.getItem("samadhanUsers")) || [];

    const updatedUsers = users.map((u) =>
      u.id === user.id ? updated : u
    );

    localStorage.setItem(
      "samadhanUsers",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "samadhanCurrentUser",
      JSON.stringify(updated)
    );

    updateUser(updated);
    setEditing(false);

    alert(t.profileUpdated);
  };

  return (
    <main className="content-page">
      <button className="back-link" onClick={goHome}>
        ← {t.back}
      </button>

      <div className="profile-card">
        <div className="profile-top">
          <div className="big-avatar">
            {user.photo ? (
              <img src={user.photo} alt="Profile" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>

          <h1>{user.name}</h1>
          <p>{user.userType}</p>
        </div>

        {!editing ? (
          <>
            <div className="profile-grid">
              <div>
                <span>🆔 User ID</span>
                <strong>{user.id}</strong>
              </div>

              <div>
                <span>📧 {t.email}</span>
                <strong>{user.email}</strong>
              </div>

              <div>
                <span>📱 {t.mobile}</span>
                <strong>{user.mobile}</strong>
              </div>

              <div>
                <span>📍 {t.location}</span>
                <strong>{user.location}</strong>
              </div>

              <div>
                <span>👤 {t.userType}</span>
                <strong>{user.userType}</strong>
              </div>

              <div>
                <span>📅 Joined</span>
                <strong>{user.createdAt}</strong>
              </div>
            </div>

            <div className="button-row">
              <button
                className="primary-btn"
                onClick={() => setEditing(true)}
              >
                ✏️ {t.edit}
              </button>

              <button
                className="danger-btn"
                onClick={logout}
              >
                🚪 {t.logout}
              </button>
            </div>
          </>
        ) : (
          <div className="edit-profile">
            <h2>✏️ {t.edit} Profile</h2>

            <label>{t.name}</label>

            <input
              name="name"
              value={form.name}
              onChange={change}
            />

            <label>{t.mobile}</label>

            <input
              name="mobile"
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value.replace(/\D/g, ""),
                })
              }
              maxLength="10"
            />

            <label>{t.location}</label>

            <input
              name="location"
              value={form.location}
              onChange={change}
            />

            <label>{t.userType}</label>

            <select
              name="userType"
              value={form.userType}
              onChange={change}
            >
              <option>Citizen</option>
              <option>Student</option>
              <option>University</option>
              <option>Industry</option>
            </select>

            <label>📷 Profile Photo</label>

            <input
              type="file"
              accept="image/*"
              onChange={photoChange}
            />

            <div className="button-row">
              <button
                className="primary-btn"
                onClick={save}
              >
                💾 {t.save}
              </button>

              <button
                className="outline-btn"
                onClick={() => setEditing(false)}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   SUBMIT PROBLEM
========================================================= */

function SubmitProblem({ user, goHome, t }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    location: user.location || "",
    image: "",
  });

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const imageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm({
        ...form,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();

    const problems =
      JSON.parse(localStorage.getItem("samadhanProblems")) ||
      [];

    const problem = {
      id: "PROB-" + Date.now().toString().slice(-6),
      title: form.title,
      category: form.category,
      description: form.description,
      location: form.location,
      image: form.image,
      reportedBy: user.name,
      userId: user.id,
      date: new Date().toLocaleDateString("en-IN"),
      status: "In Progress",
      university: "KVG University Innovation Team",
      industry: "Open for Industry Collaboration",
      tracking: createTracking(),
    };

    problems.unshift(problem);

    localStorage.setItem(
      "samadhanProblems",
      JSON.stringify(problems)
    );

    alert(t.problemSubmitted);

    goHome();
  };

  return (
    <main className="content-page">
      <button className="back-link" onClick={goHome}>
        ← {t.back}
      </button>

      <div className="form-card">
        <div className="page-title">
          <span>📝</span>
          <div>
            <h1>{t.submit}</h1>
            <p>Help your community by reporting a real problem.</p>
          </div>
        </div>

        <form onSubmit={submit}>
          <label>{t.problemTitle}</label>

          <input
            name="title"
            value={form.title}
            onChange={update}
            placeholder="Example: Garbage collection issue"
            required
          />

          <label>{t.category}</label>

          <select
            name="category"
            value={form.category}
            onChange={update}
            required
          >
            <option value="">Select category</option>
            <option>Education</option>
            <option>Healthcare</option>
            <option>Agriculture</option>
            <option>Environment</option>
            <option>Transportation</option>
            <option>Water & Sanitation</option>
            <option>Roads</option>
            <option>Electricity</option>
            <option>Other</option>
          </select>

          <label>{t.description}</label>

          <textarea
            name="description"
            value={form.description}
            onChange={update}
            placeholder="Describe the problem in detail..."
            rows="6"
            required
          />

          <label>{t.location}</label>

          <input
            name="location"
            value={form.location}
            onChange={update}
            placeholder="City / Village / Area"
            required
          />

          <label>{t.image}</label>

          <input
            type="file"
            accept="image/*"
            onChange={imageChange}
          />

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="upload-preview"
            />
          )}

          <button className="primary-btn" type="submit">
            🚀 {t.submitBtn}
          </button>
        </form>
      </div>
    </main>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ user, navigate, t }) {
  const [problems, setProblems] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("samadhanProblems")) || []
    );
  });

  const refresh = () => {
    setProblems(
      JSON.parse(localStorage.getItem("samadhanProblems")) || []
    );
  };

  const deleteProblem = (id) => {
    if (!window.confirm(t.deleteConfirm)) return;

    const updated = problems.filter(
      (problem) => problem.id !== id
    );

    localStorage.setItem(
      "samadhanProblems",
      JSON.stringify(updated)
    );

    refresh();
  };

  const total = problems.length;

  const resolved = problems.filter(
    (p) => p.status === "Resolved"
  ).length;

  const pending = problems.filter(
    (p) => p.status === "Pending"
  ).length;

  const progress = problems.filter(
    (p) => p.status === "In Progress"
  ).length;

  return (
    <main className="dashboard-page">
      <section className="hero-card">
        <div>
          <span className="hero-label">
            🌍 Digital Community Helpdesk
          </span>

          <h1>
            {t.welcome}
            <br />
            <span>{t.better}</span>
          </h1>

          <p>{t.heroText}</p>

          <button
            className="primary-btn"
            onClick={() => navigate("submit")}
          >
            📝 {t.submitProblem} →
          </button>
        </div>

        <div className="hero-illustration">
          🌱
          <div>🤝</div>
          <div>🏙️</div>
          <div>🎓</div>
        </div>
      </section>

      <h2 className="section-heading">
        {t.howWorks}
      </h2>

      <div className="work-grid">
        <WorkCard
          icon="📝"
          title="1. Submit"
          text="Submit your community problem easily."
        />

        <WorkCard
          icon="🤖"
          title="2. AI Process"
          text="Our platform analyzes and categorizes it."
        />

        <WorkCard
          icon="🎓"
          title="3. Assigned"
          text="University teams work on the problem."
        />

        <WorkCard
          icon="✅"
          title="4. Resolved"
          text="Track progress until the problem is solved."
        />
      </div>

      <div className="stats-grid">
        <Stat icon="📋" title={t.total} value={total} />
        <Stat icon="⏳" title={t.progress} value={progress} />
        <Stat icon="✅" title={t.resolved} value={resolved} />
        <Stat icon="⚠️" title={t.pending} value={pending} />
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>{t.recent}</h2>

          <button
            className="text-btn"
            onClick={() => navigate("complaints")}
          >
            {t.viewAll} →
          </button>
        </div>

        {problems.length === 0 ? (
          <div className="empty-box">
            <div>📭</div>
            <h3>{t.noProblems}</h3>
            <button
              className="primary-btn"
              onClick={() => navigate("submit")}
            >
              {t.submitProblem}
            </button>
          </div>
        ) : (
          <div className="complaint-list">
            {problems.slice(0, 5).map((problem) => (
              <ComplaintRow
                key={problem.id}
                problem={problem}
                navigate={navigate}
                deleteProblem={deleteProblem}
                t={t}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function WorkCard({ icon, title, text }) {
  return (
    <div className="work-card">
      <div className="work-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="stat-box">
      <span>{icon}</span>
      <div>
        <strong>{value}</strong>
        <p>{title}</p>
      </div>
    </div>
  );
}

/* =========================================================
   MY COMPLAINTS
========================================================= */

function Complaints({ user, navigate, t }) {
  const [problems, setProblems] = useState(
    () =>
      JSON.parse(localStorage.getItem("samadhanProblems")) || []
  );

  const myProblems = problems.filter(
    (p) => p.userId === user.id
  );

  const deleteProblem = (id) => {
    if (!window.confirm(t.deleteConfirm)) return;

    const updated = problems.filter(
      (p) => p.id !== id
    );

    localStorage.setItem(
      "samadhanProblems",
      JSON.stringify(updated)
    );

    setProblems(updated);
  };

  return (
    <main className="content-page">
      <div className="page-title">
        <span>📋</span>
        <div>
          <h1>{t.complaints}</h1>
          <p>All problems submitted by you.</p>
        </div>
      </div>

      {myProblems.length === 0 ? (
        <div className="empty-box">
          <div>📭</div>
          <h2>{t.noProblems}</h2>

          <button
            className="primary-btn"
            onClick={() => navigate("submit")}
          >
            📝 {t.submitProblem}
          </button>
        </div>
      ) : (
        <div className="complaints-grid">
          {myProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              navigate={navigate}
              deleteProblem={deleteProblem}
              t={t}
            />
          ))}
        </div>
      )}
    </main>
  );
}

/* =========================================================
   PROBLEM CARD
========================================================= */

function ProblemCard({
  problem,
  navigate,
  deleteProblem,
  t,
}) {
  return (
    <div className="problem-card">
      {problem.image && (
        <img
          src={problem.image}
          alt={problem.title}
        />
      )}

      <div className="problem-body">
        <span className="category-tag">
          {problem.category}
        </span>

        <h3>{problem.title}</h3>

        <p>{problem.description}</p>

        <div className="problem-info">
          📍 {problem.location}
        </div>

        <div className="problem-info">
          🆔 {problem.id}
        </div>

        <div className="problem-info">
          📅 {problem.date}
        </div>

        <span className="status-tag">
          {problem.status}
        </span>

        <div className="button-row">
          <button
            className="primary-btn small"
            onClick={() =>
              navigate("tracker", problem)
            }
          >
            🔍 {t.track}
          </button>

          <button
            className="danger-btn small"
            onClick={() =>
              deleteProblem(problem.id)
            }
          >
            🗑️ {t.delete}
          </button>
        </div>
      </div>
    </div>
  );
}

function ComplaintRow({
  problem,
  navigate,
  deleteProblem,
  t,
}) {
  return (
    <div className="complaint-row">
      <div className="complaint-icon">📋</div>

      <div className="complaint-main">
        <h3>{problem.title}</h3>
        <p>
          📍 {problem.location} · 🆔 {problem.id}
        </p>
      </div>

      <span className="status-tag">
        {problem.status}
      </span>

      <button
        className="track-btn"
        onClick={() => navigate("tracker", problem)}
      >
        🔍 {t.track}
      </button>

      <button
        className="delete-icon-btn"
        onClick={() => deleteProblem(problem.id)}
      >
        🗑️
      </button>
    </div>
  );
}

/* =========================================================
   TRACKER
========================================================= */

function Tracker({ problem, navigate, t }) {
  if (!problem) {
    return (
      <main className="content-page">
        <div className="empty-box">
          <h2>Problem not found.</h2>

          <button
            className="primary-btn"
            onClick={() => navigate("complaints")}
          >
            ← {t.back}
          </button>
        </div>
      </main>
    );
  }

  const tracking = problem.tracking || [];

  const completed = tracking.filter(
    (item) => item.completed
  ).length;

  const percentage = Math.round(
    (completed / tracking.length) * 100
  );

  return (
    <main className="content-page">
      <button
        className="back-link"
        onClick={() => navigate("complaints")}
      >
        ← {t.back}
      </button>

      <div className="tracker-header">
        <span>🔍 PROBLEM TRACKING</span>

        <h1>{problem.title}</h1>

        <p>
          Problem ID: <strong>{problem.id}</strong>
        </p>
      </div>

      <div className="tracking-info-grid">
        <InfoBox
          icon="🏷️"
          title={t.category}
          value={problem.category}
        />

        <InfoBox
          icon="📍"
          title={t.location}
          value={problem.location}
        />

        <InfoBox
          icon="👤"
          title={t.reportedBy}
          value={problem.reportedBy}
        />

        <InfoBox
          icon="📅"
          title={t.date}
          value={problem.date}
        />
      </div>

      <div className="progress-card">
        <div className="progress-top">
          <div>
            <span>OVERALL PROGRESS</span>
            <h2>{percentage}% Complete</h2>
          </div>

          <div className="progress-circle">
            {percentage}%
          </div>
        </div>

        <div className="progress-bar">
          <div
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <div className="partner-grid">
        <div className="partner-box">
          <div className="partner-icon">🎓</div>

          <div>
            <span>{t.universityAssigned}</span>

            <h3>
              {problem.university ||
                "To Be Assigned"}
            </h3>

            <p>
              University students and faculty
              work on the technical solution.
            </p>
          </div>
        </div>

        <div className="partner-box">
          <div className="partner-icon">🏢</div>

          <div>
            <span>{t.industryPartner}</span>

            <h3>
              {problem.industry ||
                "Open for Collaboration"}
            </h3>

            <p>
              Industry provides technology,
              mentorship and implementation support.
            </p>
          </div>
        </div>
      </div>

      <div className="description-card">
        <h2>📝 {t.problemDetails}</h2>

        <p>{problem.description}</p>
      </div>

      <div className="timeline-section">
        <h2>🚀 {t.journey}</h2>

        <div className="timeline">
          {tracking.map((step, index) => (
            <div
              className={`timeline-item ${
                step.completed ? "completed" : ""
              }`}
              key={index}
            >
              <div className="timeline-dot">
                {step.completed ? "✓" : index + 1}
              </div>

              <div className="timeline-content">
                <h3>{step.status}</h3>

                <p>{step.description}</p>

                <small>
                  📅 {step.date}
                </small>

                {!step.completed &&
                  index === completed && (
                    <div className="current-work">
                      <strong>
                        ⚙️ {t.currentWork}
                      </strong>

                      <p>
                        The assigned team is currently
                        working on this stage.
                      </p>

                      <div className="mini-grid">
                        <div>
                          🎓 University
                          <strong>
                            {problem.university}
                          </strong>
                        </div>

                        <div>
                          🏢 Industry
                          <strong>
                            {problem.industry}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="solution-card">
        <div className="solution-icon">💡</div>

        <div>
          <span>{t.solution}</span>

          <h2>{t.solution}</h2>

          <p>
            The problem is analyzed by the assigned
            university team. Students and experts
            develop a prototype, test the solution
            and collaborate with industry partners
            for real-world implementation.
          </p>
        </div>
      </div>

      <div className="collaboration-card">
        <span>🤝</span>

        <h2>{t.collaboration}</h2>

        <div className="collaboration-flow">
          <div>
            🎓
            <strong>University</strong>
            <small>Research + Students</small>
          </div>

          <b>→</b>

          <div>
            💡
            <strong>Innovation</strong>
            <small>Prototype + Testing</small>
          </div>

          <b>→</b>

          <div>
            🏢
            <strong>Industry</strong>
            <small>Technology + Funding</small>
          </div>

          <b>→</b>

          <div>
            🌍
            <strong>Community</strong>
            <small>Real Impact</small>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoBox({ icon, title, value }) {
  return (
    <div className="info-box">
      <span>{icon}</span>
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   SIMPLE PAGES
========================================================= */

function AIPage({ navigate }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const send = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        user: message,
        bot:
          "Thank you for your question. SamadhanSetu AI can help categorize your problem, suggest solutions and guide you through the reporting process.",
      },
    ]);

    setMessage("");
  };

  return (
    <main className="content-page">
      <button
        className="back-link"
        onClick={() => navigate("dashboard")}
      >
        ← Back
      </button>

      <div className="ai-card">
        <div className="ai-header">🤖</div>

        <h1>SamadhanSetu AI Assistant</h1>

        <p>
          Ask about reporting problems, tracking,
          solutions or community services.
        </p>

        <div className="chat-box">
          {messages.length === 0 && (
            <div className="ai-message">
              👋 Hello! How can I help you today?
            </div>
          )}

          {messages.map((m, i) => (
            <React.Fragment key={i}>
              <div className="user-message">
                {m.user}
              </div>

              <div className="ai-message">
                🤖 {m.bot}
              </div>
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={send} className="chat-form">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question..."
          />

          <button className="primary-btn">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

function Notifications({ navigate }) {
  return (
    <main className="content-page">
      <button
        className="back-link"
        onClick={() => navigate("dashboard")}
      >
        ← Back
      </button>

      <div className="page-title">
        <span>🔔</span>
        <div>
          <h1>Notifications</h1>
          <p>Your latest SamadhanSetu updates.</p>
        </div>
      </div>

      <div className="notification-list">
        <div>🔵 Your problem has been received.</div>
        <div>🎓 University assignment is under review.</div>
        <div>🤝 Industry collaboration is available.</div>
      </div>
    </main>
  );
}

function HelpPage({ navigate }) {
  return (
    <main className="content-page">
      <button
        className="back-link"
        onClick={() => navigate("dashboard")}
      >
        ← Back
      </button>

      <div className="page-title">
        <span>❓</span>
        <div>
          <h1>Help & Support</h1>
          <p>We are here to help you.</p>
        </div>
      </div>

      <div className="help-grid">
        <div>
          <h3>📝 How to report?</h3>
          <p>
            Click Submit Problem and provide the
            required information.
          </p>
        </div>

        <div>
          <h3>🔍 How to track?</h3>
          <p>
            Open My Complaints and click Track.
          </p>
        </div>

        <div>
          <h3>👤 Profile</h3>
          <p>
            Open your profile to edit your personal
            information and photo.
          </p>
        </div>
      </div>
    </main>
  );
}

function Feedback({ navigate }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    alert("Thank you for your feedback!");
    setText("");
  };

  return (
    <main className="content-page">
      <button
        className="back-link"
        onClick={() => navigate("dashboard")}
      >
        ← Back
      </button>

      <div className="form-card">
        <div className="page-title">
          <span>⭐</span>
          <div>
            <h1>Feedback</h1>
            <p>Tell us how we can improve SamadhanSetu.</p>
          </div>
        </div>

        <form onSubmit={submit}>
          <label>Your Feedback</label>

          <textarea
            rows="7"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your feedback..."
            required
          />

          <button className="primary-btn">
            ⭐ Submit Feedback
          </button>
        </form>
      </div>
    </main>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [page, setPage] = useState("login");
  
  const [selectedProblem, setSelectedProblem] =
    useState(null);

  const [language, setLanguage] = useState(
    localStorage.getItem("samadhanLanguage") || "en"
  );

  const [currentUser, setCurrentUser] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem("samadhanCurrentUser")
        );
      } catch {
        return null;
      }
    });

  const t = translations[language];

  const changeLanguage = (lang) => {
    setLanguage(lang);

    localStorage.setItem(
      "samadhanLanguage",
      lang
    );
  };

  const navigate = (newPage, problem = null) => {
    setSelectedProblem(problem);
    setPage(newPage);
  };

  const login = (user) => {
    setCurrentUser(user);
    setPage("dashboard");
  };

  const logout = () => {
    localStorage.removeItem(
      "samadhanCurrentUser"
    );

    setCurrentUser(null);
    setPage("dashboard");
  };

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  /* ---------------------------------------------
     AUTH PAGES
  --------------------------------------------- */

  if (!currentUser && page === "login") {
    return (
      <Login
        onLogin={login}
        goRegister={() => setPage("register")}
        goHome={() => setPage("dashboard")}
        t={t}
      />
    );
  }

  if (!currentUser && page === "register") {
    return (
      <Register
        onRegister={login}
        goLogin={() => setPage("login")}
        goHome={() => setPage("dashboard")}
        t={t}
      />
    );
  }

  /* ---------------------------------------------
     NAVBAR
  --------------------------------------------- */

  return (
    <div className="app">
      <header className="navbar">
        <div
          className="brand"
          onClick={() => navigate("dashboard")}
        >
          <div className="brand-icon">🌉</div>

          <div>
            <strong>SamadhanSetu</strong>
            <small>AI-Powered Civic Helpdesk</small>
          </div>
        </div>

        <div className="nav-right">
          <select
            className="language-select"
            value={language}
            onChange={(e) =>
              changeLanguage(e.target.value)
            }
          >
            <option value="en">🇬🇧 English</option>
            <option value="mr">🇮🇳 मराठी</option>
            <option value="hi">🇮🇳 हिन्दी</option>
          </select>

          {currentUser ? (
            <button
              className="nav-profile"
              onClick={() => navigate("profile")}
            >
              <div className="nav-avatar">
                {currentUser.photo ? (
                  <img
                    src={currentUser.photo}
                    alt="Profile"
                  />
                ) : (
                  currentUser.name
                    .charAt(0)
                    .toUpperCase()
                )}
              </div>

              <span>{currentUser.name}</span>
              <b>⌄</b>
            </button>
          ) : (
            <div className="auth-nav-buttons">
              <button
                className="login-nav"
                onClick={() => setPage("login")}
              >
                🔐 {t.login}
              </button>

              <button
                className="register-nav"
                onClick={() => setPage("register")}
              >
                ✨ {t.createAccount}
              </button>
            </div>
          )}
        </div>
      </header>

      {currentUser && (
        <aside className="sidebar">
          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => navigate("dashboard")}
          >
            🏠 <span>{t.dashboard}</span>
          </button>

          <button
            className={page === "submit" ? "active" : ""}
            onClick={() => navigate("submit")}
          >
            ➕ <span>{t.submit}</span>
          </button>

          <button
            className={page === "complaints" ? "active" : ""}
            onClick={() => navigate("complaints")}
          >
            📋 <span>{t.complaints}</span>
          </button>

          <button
            className={page === "tracker" ? "active" : ""}
            onClick={() => navigate("complaints")}
          >
            🔍 <span>{t.track}</span>
          </button>

          <button
            className={page === "ai" ? "active" : ""}
            onClick={() => navigate("ai")}
          >
            🤖 <span>{t.ai}</span>
          </button>

          <button
            className={page === "notifications" ? "active" : ""}
            onClick={() => navigate("notifications")}
          >
            🔔 <span>{t.notifications}</span>
          </button>

          <button
            className={page === "help" ? "active" : ""}
            onClick={() => navigate("help")}
          >
            ❓ <span>{t.help}</span>
          </button>

          <button
            className={page === "feedback" ? "active" : ""}
            onClick={() => navigate("feedback")}
          >
            ⭐ <span>{t.feedback}</span>
          </button>

          <button
            className={page === "profile" ? "active" : ""}
            onClick={() => navigate("profile")}
          >
            👤 <span>{t.profile}</span>
          </button>

          <button
            className="logout-side"
            onClick={logout}
          >
            🚪 <span>{t.logout}</span>
          </button>
        </aside>
      )}

      <div
        className={
          currentUser
            ? "main-with-sidebar"
            : "main-full"
        }
      >
        {currentUser && page === "dashboard" && (
          <Dashboard
            user={currentUser}
            navigate={navigate}
            t={t}
          />
        )}

        {currentUser && page === "submit" && (
          <SubmitProblem
            user={currentUser}
            goHome={() => navigate("dashboard")}
            t={t}
          />
        )}

        {currentUser && page === "complaints" && (
          <Complaints
            user={currentUser}
            navigate={navigate}
            t={t}
          />
        )}

        {currentUser && page === "tracker" && (
          <Tracker
            problem={selectedProblem}
            navigate={navigate}
            t={t}
          />
        )}

        {currentUser && page === "profile" && (
          <Profile
            user={currentUser}
            updateUser={updateUser}
            logout={logout}
            goHome={() => navigate("dashboard")}
            t={t}
          />
        )}

        {currentUser && page === "ai" && (
          <AIPage navigate={navigate} />
        )}

        {currentUser && page === "notifications" && (
          <Notifications navigate={navigate} />
        )}

        {currentUser && page === "help" && (
          <HelpPage navigate={navigate} />
        )}

        {currentUser && page === "feedback" && (
          <Feedback navigate={navigate} />
        )}
      </div>

      <footer>
        🌉 <strong>SamadhanSetu</strong>
        <span>
          Connecting Problems with Solutions.
        </span>
        <small>© 2026 SamadhanSetu</small>
      </footer>
    </div>
  );
}

export default App;