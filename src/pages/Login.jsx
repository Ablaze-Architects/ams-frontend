import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/login/button"
import { Input } from "@/components/login/input"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/login/card"
import { Label } from "@/components/login/label"
import { setAuth } from "../utils/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
  const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setAuth(data.token, data.user.role)

        // Redirect based on role
        if (data.user.role === "ALUMNI") {
          navigate("/community")
        } else if (data.user.role === "ADMIN") {
          navigate("/dashboard")
        } else {
          navigate("/unauthorized")
        }
      } else {
        alert(data.message || "Invalid credentials. Please sign up first!")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
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
