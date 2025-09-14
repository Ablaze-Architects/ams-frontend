import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "@/pages/Home"
import { Dashboard } from "@/pages/Dashboard"

function App() {
  return (
    <Router>
      <AppContent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
