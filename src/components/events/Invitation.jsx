import React, { useEffect, useState } from "react";
import { alumni_id as exportedAlumniId } from "../../pages/Login.jsx";

const DEFAULT_POSTER = "/default-poster.jpg";

export default function InvitationPage() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Read stored user on startup
  const alumniId = exportedAlumniId || "";

  useEffect(() => {
    if (!alumniId) {
      setError("Alumni ID not found. Please login.");
      setLoading(false);
      return;
    }
    async function fetchInvitations() {
      try {
        setLoading(true);
        const response = await fetch(`/api/messages/${alumniId}/getAllInvitations`);
        const data = await response.json();
        if (response.ok && data.success) {
          setInvitations(data.invitations);
          setError("");
        } else {
          setError(data.message || "Failed to fetch invitations");
        }
      } catch (err) {
        setError("Error fetching invitations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchInvitations();
  }, [alumniId]);

  function formatDateTime(iso) {
    if (!iso) return { date: "-", time: "-" };
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      time: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
    };
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Invitations</h1>

      {loading && <p>Loading invitations...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && invitations.length === 0 && <p>No invitations found.</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {invitations.map((inv) => {
          const event = inv.events || {};
          const { date, time } = formatDateTime(event.event_date_time);
          const posterSrc = event.event_poster_key ? `/api/uploads/${event.event_poster_key}` : DEFAULT_POSTER;
          return (
            <div key={inv.alumni_invitation_id} className="bg-white rounded shadow p-4 flex flex-col">
              <img
                src={posterSrc}
                alt={event.event_name || "Event Poster"}
                className="rounded h-40 w-full object-cover mb-4"
                onError={(e) => (e.currentTarget.src = DEFAULT_POSTER)}
              />
              <h2 className="text-lg font-semibold">{event.event_name || "Event Name"}</h2>
              <p className="text-sm text-gray-600 mb-1">{date} &bull; {time}</p>
              <p className="text-gray-700 flex-grow">{event.event_description || "No description provided."}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
