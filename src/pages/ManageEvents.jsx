import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/login/Card";
import { admin_id } from "./Login";


export default function ManageEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const adminId = admin_id || localStorage.getItem("userId");
    if (!adminId) return;
    fetch(`/api/events/${adminId}/getAllEvents`)
      .then(res => res.json())
      .then(response => {
        console.log("API response:", response);
        if (response.data) setEvents(response.data);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <ul className="space-y-4">
              {events.map(event => (
                <li key={event.event_id} className="border rounded p-3">
                  <div className="font-bold">{event.event_name}</div>
                  <div>Description: {event.event_description}</div>
                  <div>Date & Time: {event.event_date_time ? new Date(event.event_date_time).toLocaleString() : "N/A"}</div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
