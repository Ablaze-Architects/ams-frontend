import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoute from "./components/login/protected"

import { Home } from "@/pages/Home"
import { Dashboard } from "@/pages/Dashboard"
import Community from "./pages/Community"
import AddEvent from "./pages/AddEvent";
import ManageEvents from "./pages/ManageEvents";

function App() {
  return (
    <Router basename="/ams-frontend">
      <AppContent />

      <Routes>
        {/* Redirect root / to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/dashboard" element={
             <Dashboard />
         } />

          <Route path="/community" element={
              <Community />
          } />

          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/events/add" element={<AddEvent />} />
        <Route path="/admin/events/manage" element={<ManageEvents />} />
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
