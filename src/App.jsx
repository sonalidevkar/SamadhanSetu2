import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import SubmitProblem from "./pages/SubmitProblem";
import MyComplaints from "./pages/MyComplaints";
import TrackStatus from "./pages/TrackStatus";
import AIAssistant from "./pages/AIAssistant";
import Notifications from "./pages/Notifications";
import HelpSupport from "./pages/HelpSupport";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import CollegeRequests from "./pages/CollegeRequests";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ComplaintProvider } from "./context/ComplaintContext";
import { LanguageProvider } from "./context/LanguageContext";

function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="page-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/submit-problem" element={<SubmitProblem />} />
            <Route path="/my-complaints" element={<MyComplaints />} />
            <Route path="/track-status" element={<TrackStatus />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/college-requests" element={<CollegeRequests />} />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Website open -> Login */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Public pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected pages */}
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}

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