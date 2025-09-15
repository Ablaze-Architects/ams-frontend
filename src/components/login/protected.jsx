import { Navigate } from "react-router-dom"
import { getToken, getRole } from "../../utils/auth"

export default function ProtectedRoute({ children, role }) {

  const token = getToken();
  const userRole = getRole();

  if (!token) return <Navigate to="/login" />;

  // Only allow ADMIN and ALUMNI, all uppercase
  if (role) {
    if ((role.toUpperCase() === "ADMIN" && userRole?.toUpperCase() === "ADMIN") || (role.toUpperCase() === "ALUMNI" && userRole?.toUpperCase() === "ALUMNI")) {
      return children;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  }
  // If no role required, allow
  return children;
}
