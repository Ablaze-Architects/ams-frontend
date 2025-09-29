import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const token = getToken();
  const userRole = getRole();

  console.log("ProtectedRoute - token:", token, "role:", userRole);

  // Redirect to login if no token found
  if (!token) return <Navigate to="login" replace />;

  // Check role permission
  if (role) {
    // Normalize to uppercase for case-insensitive matching
    const requiredRole = role.toUpperCase();
    const currentRole = userRole ? userRole.toUpperCase() : "";

    if ((requiredRole === "ADMIN" && currentRole === "ADMIN") || (requiredRole === "ALUMNI" && currentRole === "ALUMNI")) {
      // Authorized user, show children components
      return children;
    } else {
      // Unauthorized access
  return <Navigate to="unauthorized" replace />;
    }
  }

  return children;
}
