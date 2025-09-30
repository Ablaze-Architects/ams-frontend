import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/login/Button"
import { Input } from "@/components/login/Input"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/login/Card"
import { Label } from "@/components/login/Label"
import { setAuth } from "../utils/auth"

// Exported runtime-updated IDs for cross-module use
export let admin_id = null
export let alumni_id = null

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Call login API
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (res.ok) {
        const user = data.user
        // Extract username and email reliably
        const username =
          user.admin_name ||
          (user.metadata && user.metadata.display_name) ||
          user.displayName ||
          user.name ||
          "User"
        const userEmail = user.email || user.admin_email || ""
        const avatar = user.admin_profile_picture_key
          ? `/avatars/${user.admin_profile_picture_key}`
          : "/avatars/default.jpg"

        // Save to localStorage for sidebar/NavUser etc.
        setAuth(
          data.token || "",
          user.role,
          {
            name: username,
            email: userEmail,
            avatar: avatar
          }
        )

        // Redirect by role
        const normalizedRole = (user.role || "").trim().toUpperCase()
        // Prefer role-specific backend IDs, then fall back
        // ADMIN -> user.admin_id || user.id || user._id
        // ALUMNI -> user.alumni_id || user.id || user._id
        // Update exported ids based on role and persist for reloads
        if (normalizedRole === "ADMIN") {
          const resolvedUserId = user.admin_id || user.id || user._id || null
          admin_id = resolvedUserId
          alumni_id = null
          if (resolvedUserId) {
            localStorage.setItem("adminId", String(resolvedUserId))
            localStorage.removeItem("alumniId")
          }
          console.log("[Login] Set ADMIN id:", resolvedUserId)
        } else if (normalizedRole === "ALUMNI") {
          const resolvedUserId = user.alumni_id || user.id || user._id || null
          alumni_id = resolvedUserId
          admin_id = null
          if (resolvedUserId) {
            localStorage.setItem("alumniId", String(resolvedUserId))
            localStorage.removeItem("adminId")
          }
          console.log("[Login] Set ALUMNI id:", resolvedUserId)
        } else {
          admin_id = null
          alumni_id = null
          localStorage.removeItem("adminId")
          localStorage.removeItem("alumniId")
        }
        console.log("[Login] role:", normalizedRole)

        // Update exported ids based on role
        if (normalizedRole === "ADMIN") {
          admin_id = user.id || null
          alumni_id = null
        } else if (normalizedRole === "ALUMNI") {
          alumni_id = user.id || null
          admin_id = null
        } else {
          admin_id = null
          alumni_id = null
        }

        if (normalizedRole === "ALUMNI") {
          navigate("/community")
        } else if (normalizedRole === "ADMIN") {
          navigate("/dashboard")
          console.log("Admin user logged in:", user)
        } else {
          navigate("/unauthorized")
        }
      } else {
        alert(data.message || "Invalid credentials. Please sign up first!")
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={handleLogin}>
            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
