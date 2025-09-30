import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/login/Card";


export default function ManageEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Prefer persisted admin id so it works across reloads and direct navigation
    const adminId = localStorage.getItem("adminId");
    console.log("[ManageEvents] adminId=", adminId);
    if (!adminId) return;
    fetch(`/api/events/${adminId}/getAllEvents`)
      .then(res => res.json())
      .then(response => {
        console.log("API response:", response);
        if (response.data) setEvents(response.data);
      });
  }, []);

  return (
  <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-24 px-4 pb-8">
      <Card className="w-[1000px]">
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {events.map(event => (
                <div key={event.event_id} className="border rounded bg-white shadow flex flex-col">
                  <img
                    src={`/${event.event_poster_key || "poster.jpg"}`}
                    alt="Event Poster"
                    className="w-full object-cover rounded-t"
                    style={{ height: '120px', maxHeight: '33%', minHeight: '120px' }}
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="font-bold text-lg mb-2">{event.event_name}</div>
                    <div className="mb-1 text-gray-700">{event.event_description}</div>
                    <div className="text-sm text-gray-500">{event.event_date_time ? new Date(event.event_date_time).toLocaleString() : "N/A"}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
