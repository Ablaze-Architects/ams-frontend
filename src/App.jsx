import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/login/protected";

import { Home } from "@/pages/Home";
import { Dashboard } from "@/pages/Dashboard";
import Community from "./pages/Community";
import InvitationPage from "./components/events/Invitation";
import AlumniDirectory from "./pages/AlumniDirectory";
<<<<<<< HEAD
import ManageInvitations from "./pages/ManageInvitations";
import AddInvitation from "./pages/AddInvitation";
import AddEvent from "./pages/AddEvent";
import ManageEvents from "./pages/ManageEvents";
=======
import AddEvent from "./components/events/AddEvent";
import ManageEvents from "./components/events/ManageEvents";
>>>>>>> 30acd474244c69d5d0cebea81f7b7ca885172436

function App() {
  return (
    <Router>
      <AppContent />
      <Routes>
        {/* Redirect root / to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />


        <Route path="/dashboard" element={
           <Dashboard />
        }>
            <Route index element={<div />} />
            <Route path="alumni-records" element={<AlumniDirectory />} />
<<<<<<< HEAD
            <Route path="events" element={<div>Manage Events</div>} />
            <Route path="events/add" element={<div>Add Event</div>} />
            <Route path="invitations" element={<ManageInvitations />} />
            <Route path="invitations/add" element={<AddInvitation />} />
=======
            <Route path="events" element={<ManageEvents />} />
            <Route path="events/add" element={<AddEvent />} />
            <Route path="events/invitations" element={<InvitationPage />} />
>>>>>>> 30acd474244c69d5d0cebea81f7b7ca885172436
            
        </Route>

        <Route path="/community" element={
           <Community />
        } />

        <Route path="/events/invitations" element={
          <InvitationPage />
        } />

        <Route path="/alumnidir" element={
          <AlumniDirectory />
        } />
        
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/events/add" element={<AddEvent />} />
        <Route path="/admin/events/manage" element={<ManageEvents />} />
      </Routes>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hidenavbar = location.pathname.startsWith("/dashboard");
  return (
    <>
      {!hidenavbar && <Navbar />}
    </>
  );
}

export default App;
