import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoute from "./components/login/protected"

import { Home } from "@/pages/Home"
import { Dashboard } from "@/pages/Dashboard"
import Community from "./pages/Community"

function App() {
  return (
    <Router basename="/ams-frontend">
      <AppContent />

      <Routes>
        {/* Redirect root / to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={
           <ProtectedRoute role="ADMIN">
              <Dashboard />
          </ProtectedRoute>
          } />

          <Route path="/community" element={
            <ProtectedRoute role="ALUMNI">
              <Community />
            </ProtectedRoute>
          } />

          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

function AppContent() {
  const location = useLocation();
  const hidenavbar = location.pathname === "/dashboard";

  return ( 
    <>
      {!hidenavbar && <Navbar />}
    </>
  )
}

export default App
