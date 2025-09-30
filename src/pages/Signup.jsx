import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/login/Button"
import { Input } from "@/components/login/Input"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/login/Card"
import { Label } from "@/components/login/Label"
import { setAuth } from "@/utils/auth" // Added import

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState("");
  const [stream, setStream] = useState("");
  const [occupation, setOccupation] = useState("");
  const [yearOfGraduation, setYearOfGraduation] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [showSocialInputs, setShowSocialInputs] = useState(false);
  const navigate = useNavigate();

  const handleFirstStep = (e) => {
    e.preventDefault();
    if (role === "ALUMNI") {
      setStep(2);
    } else if (role === "ADMIN") {
      handleAdminSignup();
    }
  };

  const handleAdminSignup = async () => {
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, email, phone, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setAuth("", role, {
          displayName: data.displayName || displayName,
          email: data.email || email,
          avatar: data.avatar || "/avatars/default.jpg",
        });
        alert("Signup successful! Please login.");
  navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleAlumniSignup = async (e) => {
    e.preventDefault();
    try {
      const filteredLinks = socialLinks.filter(
        (l) => l.alumni_link.trim() && l.alumni_link_name.trim()
      );
      const alumniBody = {
        displayName,
        email,
        phone,
        password,
        role,
        course,
        stream,
        occupation,
        yearOfGraduation,
        ...(filteredLinks.length > 0 ? { socialLinks: filteredLinks } : {}),
      };
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alumniBody),
      });
      const data = await res.json();
      console.log("Signup API returned:", data);
      if (res.ok) {
        setAuth("", role, {
          displayName: data.displayName || displayName,
          email: data.email || email,
          avatar: data.avatar || "/avatars/default.jpg",
        });
        alert("Signup successful! Please login.");
  navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleSocialLinkChange = (idx, field, value) => {
    setSocialLinks((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form className="flex flex-col gap-3" onSubmit={handleFirstStep}>
              <div>
                <Label>Display Name</Label>
                <Input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label>Phone</Label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div>
                <Label>Role</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="ALUMNI">ALUMNI</option>
                </select>
              </div>
              <Button type="submit">{role === "ADMIN" ? "Sign In" : role === "ALUMNI" ? "Next" : "Submit"}</Button>
            </form>
          )}
          {step === 2 && (
            <form className="flex flex-col gap-3" onSubmit={handleAlumniSignup}>
              <div>
                <Label>Course</Label>
                <Input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required />
              </div>
              <div>
                <Label>Stream</Label>
                <Input type="text" value={stream} onChange={(e) => setStream(e.target.value)} required />
              </div>
              <div>
                <Label>Occupation</Label>
                <Input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
              </div>
              <div>
                <Label>Year of Graduation</Label>
                <Input type="text" value={yearOfGraduation} onChange={(e) => setYearOfGraduation(e.target.value)} required />
              </div>
              <div>
                <Label>Social Links</Label>
                {!showSocialInputs && (
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-primary-foreground text-primary border border-primary-foreground font-bold"
                    onClick={() => {
                      setShowSocialInputs(true);
                      setSocialLinks([{ alumni_link: "", alumni_link_name: "" }]);
                    }}
                  >
                    +
                  </button>
                )}
                {showSocialInputs && (
                  <>
                    {socialLinks.map((link, idx) => (
                      <div key={idx} className="flex gap-2 mb-2 items-center">
                        <Input
                          type="url"
                          placeholder="Link URL"
                          value={link.alumni_link}
                          onChange={(e) => handleSocialLinkChange(idx, "alumni_link", e.target.value)}
                        />
                        <select
                          className="w-full border rounded-md p-2"
                          value={link.alumni_link_name}
                          onChange={(e) => handleSocialLinkChange(idx, "alumni_link_name", e.target.value)}
                        >
                          <option value="">Select Platform</option>
                          <option value="LINKEDIN">LINKEDIN</option>
                          <option value="GITHUB">GITHUB</option>
                          <option value="FACEBOOK">FACEBOOK</option>
                          <option value="INSTAGRAM">INSTAGRAM</option>
                          <option value="REDDIT">REDDIT</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                        {socialLinks.length < 5 && (
                          <button
                            type="button"
                            className="px-2 py-1 rounded bg-primary-foreground text-primary border border-primary-foreground font-bold"
                            onClick={() => setSocialLinks([...socialLinks, { alumni_link: "", alumni_link_name: "" }])}
                          >
                            +
                          </button>
                        )}
                        {socialLinks.length > 1 && (
                          <button
                            type="button"
                            className="px-2 py-1 rounded bg-destructive text-white border border-destructive font-bold"
                            onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== idx))}
                          >
                            -
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <Button type="submit">Sign In</Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
