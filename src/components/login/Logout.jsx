import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Cannot logout: userId not found.");
        return;
      }
      const endpoint = `/api/user/${userId}/logout`;
      await fetch(endpoint, { method: "POST", credentials: "include" });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
