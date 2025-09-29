import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/login/Card";
import { Input } from "@/components/login/Input";
import { Label } from "@/components/login/Label";
import { Button } from "@/components/login/Button";

export default function AddEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = localStorage.getItem("userId");
      if (!adminId) {
        alert("Admin ID not found. Please login again.");
        return;
      }
      const res = await fetch(`/api/events/${adminId}/createEvent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: eventName,
          date: eventDate,
          description: eventDescription,
        }),
      });
      if (res.ok) {
  navigate("admin/events/manage");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add event.");
      }
    } catch {
      alert("Error adding event.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <Label>Event Name</Label>
              <Input type="text" value={eventName} onChange={e => setEventName(e.target.value)} required />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" value={eventDescription} onChange={e => setEventDescription(e.target.value)} />
            </div>
            <Button type="submit">Add Event</Button>
          </form>
        </CardContent>
    
      </Card>
    </div>
  );
}
