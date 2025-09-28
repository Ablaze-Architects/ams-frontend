import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/login/Card";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const adminId = localStorage.getItem("userId");
    if (!adminId) return;
    fetch(`/api/events/${adminId}/getAllEvents`)
      .then(res => res.json())
      .then(data => {
        if (data.events) setEvents(data.events);
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
                <li key={event.id} className="border rounded p-3">
                  <div className="font-bold">{event.name}</div>
                  <div>Date: {event.date}</div>
                  <div>Location: {event.location}</div>
                  <div>Description: {event.description}</div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
