import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ==============================
// Citizen Pages
// ==============================
import Dashboard from "./pages/Dashboard";
import SubmitProblem from "./pages/SubmitProblem";
import MyComplaints from "./pages/MyComplaints";
import TrackStatus from "./pages/TrackStatus";
import AIAssistant from "./pages/AIAssistant";
import Notifications from "./pages/Notifications";
import HelpSupport from "./pages/HelpSupport";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";

// ==============================
// Auth Pages
// ==============================
import Login from "./pages/Login";
import Register from "./pages/Register";

// ==============================
// Role Dashboards
// ==============================
import AdminDashboard from "./pages/AdminDashboard";
import CollegeDashboard from "./pages/CollegeDashboard";
import IndustryDashboard from "./pages/IndustryDashboard";

// ==============================
// Existing College Page
// ==============================
import CollegeRequests from "./pages/CollegeRequests";

// ==============================
// Components
// ==============================
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// ==============================
// Context
// ==============================
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ComplaintProvider } from "./context/ComplaintContext";
import { LanguageProvider } from "./context/LanguageContext";


// =========================================================
// CITIZEN LAYOUT
// =========================================================

function CitizenLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}


// =========================================================
// ADMIN LAYOUT
// =========================================================

function AdminLayout() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="page-content full-page-content">
        <AdminDashboard />
      </main>
    </div>
  );
}


// =========================================================
// COLLEGE LAYOUT
// =========================================================

function CollegeLayout() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="page-content full-page-content">
        <CollegeDashboard />
      </main>
    </div>
  );
}


// =========================================================
// INDUSTRY LAYOUT
// =========================================================

function IndustryLayout() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="page-content full-page-content">
        <IndustryDashboard />
      </main>
    </div>
  );
}


// =========================================================
// ROLE HOME
// =========================================================

function RoleHome() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  switch (user.role) {
    case "admin":
      return (
        <Navigate
          to="/admin"
          replace
        />
      );

    case "college":
      return (
        <Navigate
          to="/college-dashboard"
          replace
        />
      );

    case "industry":
      return (
        <Navigate
          to="/industry-dashboard"
          replace
        />
      );

    case "citizen":
    default:
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
  }
}


// =========================================================
// PROTECTED ROUTE
// =========================================================

function ProtectedRoute({
  allowedRoles,
  children,
}) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <RoleHome />;
  }

  return children;
}


// =========================================================
// APP ROUTES
// =========================================================

function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC
      ===================================================== */}

      <Route
        path="/"
        element={<RoleHome />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =====================================================
          CITIZEN DASHBOARD
      ===================================================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <Dashboard />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          CITIZEN - SUBMIT PROBLEM
      ===================================================== */}

      <Route
        path="/submit-problem"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <SubmitProblem />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          CITIZEN - MY COMPLAINTS
      ===================================================== */}

      <Route
        path="/my-complaints"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <MyComplaints />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          CITIZEN - TRACK STATUS
      ===================================================== */}

      <Route
        path="/track-status"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <TrackStatus />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          CITIZEN - AI ASSISTANT
      ===================================================== */}

      <Route
        path="/ai-assistant"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <AIAssistant />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          CITIZEN - NOTIFICATIONS
      ===================================================== */}

      <Route
        path="/notifications"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <Notifications />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          CITIZEN - HELP
      ===================================================== */}

      <Route
        path="/help-support"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <HelpSupport />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          CITIZEN - FEEDBACK
      ===================================================== */}

      <Route
        path="/feedback"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <Feedback />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          CITIZEN - PROFILE
      ===================================================== */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenLayout>
              <Profile />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          ADMIN
      ===================================================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          COLLEGE DASHBOARD
      ===================================================== */}

      <Route
        path="/college-dashboard"
        element={
          <ProtectedRoute allowedRoles={["college"]}>
            <CollegeLayout />
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          COLLEGE REQUESTS
      ===================================================== */}

      <Route
        path="/college-requests"
        element={
          <ProtectedRoute allowedRoles={["college"]}>
            <CitizenLayout>
              <CollegeRequests />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          INDUSTRY DASHBOARD
      ===================================================== */}

      <Route
        path="/industry-dashboard"
        element={
          <ProtectedRoute allowedRoles={["industry"]}>
            <IndustryLayout />
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          UNKNOWN ROUTE
      ===================================================== */}

      <Route
        path="*"
        element={<RoleHome />}
      />

    </Routes>
  );
}


// =========================================================
// MAIN APP
// =========================================================

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <ComplaintProvider>
            <AppRoutes />
          </ComplaintProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;