import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/login/Card";
import { Input } from "@/components/login/Input";
import { Label } from "@/components/login/Label";
import { Button } from "@/components/login/Button";
import * as React from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { admin_id } from "./Login";
import { getRole } from "../utils/auth";

export default function AddEvent() {
  const [event_name, setevent_name] = useState("");
  const [event_date_time, setevent_date_time] = useState(null);
  const [event_description, setevent_description] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = (getRole() || "").trim().toUpperCase();
      const adminId = admin_id || localStorage.getItem("adminId");
      console.log("[AddEvent] role=", role, "exported admin_id=", admin_id, "localStorage adminId=", localStorage.getItem("adminId"));
      if (role !== "ADMIN") {
        alert("Only admins can add events. Please login as an admin.");
        return;
      }
      if (!adminId) {
        alert("Admin ID not found. Please login again.");
        return;
      }
      const payload = {
        name: (event_name || "").trim(),
        dateTime: event_date_time ? new Date(event_date_time).toISOString() : null,
        description: (event_description || "").trim(),
      };
      // Client-side validation mirroring backend requirements
      if (!payload.event_name) {
        alert("Event name is required");
        console.warn("[AddEvent] Missing name in payload", payload);
        return;
      }
      if (!payload.event_date_time) {
        alert("Event date/time is required");
        console.warn("[AddEvent] Missing dateTime in payload", payload);
        return;
      }
      console.log("[AddEvent] POST /api/events/:adminId/createEvent payload=", payload);
      const res = await fetch(`/api/events/${adminId}/createEvent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
  navigate("/admin/events/manage");
      } else {
        let data = null;
        try {
          data = await res.json();
        } catch (parseErr) {
          console.warn("[AddEvent] Failed to parse error JSON", parseErr);
        }
        console.error("[AddEvent] API error", { status: res.status, data });
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Event Name</Label>
              <Input type="text" value={event_name} onChange={e => setevent_name(e.target.value)} required />
            </div>
            <div>
              <Label>Date & Time</Label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={event_date_time}
                  onChange={(newValue) => setevent_date_time(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      label: 'Select Date & Time'
                    }
                  }}
                />
              </LocalizationProvider>
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" value={event_description} onChange={e => setevent_description(e.target.value)} />
            </div>
            <Button type="submit">Add Event</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
