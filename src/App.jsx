
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CitizenDashboard from "./pages/Citizen/CitizenDashboard";
import MyProblems from "./pages/Citizen/MyProblems";
import ProblemDetails from "./pages/Citizen/ProblemDetails";
import ReportProblem from "./pages/Citizen/ReportProblem";

import GovernmentDashboard from "./pages/Government/GovernmentDashboard";
import Analytics from "./pages/Government/Analytics";
import ProblemMonitoring from "./pages/Government/ProblemMonitoring";
import ImpactTracking from "./pages/Government/ImpactTracking";

import IndustryDashboard from "./pages/Industry/IndustryDashboard";
import Projects from "./pages/Industry/Projects";
import Funding from "./pages/Industry/Funding";
import Mentorship from "./pages/Industry/Mentorship";

import UniversityDashboard from "./pages/University/UniversityDashboard";
import MatchedProblems from "./pages/University/MatchedProblems";
import UniversityProjectDetails from "./pages/University/ProjectDetails";
import TeamManagement from "./pages/University/TeamManagement";

/* =========================================================
   PROTECTED ROUTE
========================================================= */

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = String(user.role || "").toLowerCase();

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* =========================================================
   ROLE BASED HOME
========================================================= */

const RoleBasedHome = () => {
  const { user } = useAuth();

  if (!user) {
    return <Home />;
  }

  const role = String(user.role || "").toLowerCase();

  switch (role) {
    case "admin":
      return <Navigate to="/admin" replace />;

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

    case "university":
      return (
        <Navigate
          to="/university-dashboard"
          replace
        />
      );

    case "government":
      return (
        <Navigate
          to="/government-dashboard"
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
};

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

const AdminDashboard = () => {
  return (
    <GovernmentDashboard />
  );
};

/* =========================================================
   COLLEGE DASHBOARD
========================================================= */

const CollegeDashboard = () => {
  return (
    <UniversityDashboard />
  );
};

/* =========================================================
   APP
========================================================= */

function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route
        path="/"
        element={<RoleBasedHome />}
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
          CITIZEN
      ===================================================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/report-problem"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <ReportProblem />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-problems"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <MyProblems />
          </ProtectedRoute>
        }
      />

      <Route
        path="/problems/:id"
        element={
          <ProtectedRoute
            allowedRoles={["citizen", "admin", "college", "industry"]}
          >
            <ProblemDetails />
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
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/problems"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ProblemMonitoring />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/impact"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ImpactTracking />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          GOVERNMENT
      ===================================================== */}

      <Route
        path="/government-dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["government", "admin"]}
          >
            <GovernmentDashboard />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          COLLEGE
      ===================================================== */}

      <Route
        path="/college-dashboard"
        element={
          <ProtectedRoute allowedRoles={["college"]}>
            <CollegeDashboard />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          INDUSTRY
      ===================================================== */}

      <Route
        path="/industry-dashboard"
        element={
          <ProtectedRoute allowedRoles={["industry"]}>
            <IndustryDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/industry/projects"
        element={
          <ProtectedRoute allowedRoles={["industry"]}>
            <Projects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/industry/funding"
        element={
          <ProtectedRoute allowedRoles={["industry"]}>
            <Funding />
          </ProtectedRoute>
        }
      />

      <Route
        path="/industry/mentorship"
        element={
          <ProtectedRoute allowedRoles={["industry"]}>
            <Mentorship />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          UNIVERSITY
      ===================================================== */}

      <Route
        path="/university-dashboard"
        element={
          <ProtectedRoute
            allowedRoles={[
              "university",
              "college",
            ]}
          >
            <UniversityDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/university/matched-problems"
        element={
          <ProtectedRoute
            allowedRoles={[
              "university",
              "college",
            ]}
          >
            <MatchedProblems />
          </ProtectedRoute>
        }
      />

      <Route
        path="/university/projects/:id"
        element={
          <ProtectedRoute
            allowedRoles={[
              "university",
              "college",
            ]}
          >
            <UniversityProjectDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/university/teams"
        element={
          <ProtectedRoute
            allowedRoles={[
              "university",
              "college",
            ]}
          >
            <TeamManagement />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

/* =========================================================
   ROOT APP
========================================================= */

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

