import React, { useState, useEffect } from "react";
import { alumni_id as exportedAlumniId } from "../../pages/Login.jsx";

const DEFAULT_POSTER = "/default-poster.jpg";

export default function InvitationPage() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  function openModal(event) {
    setSelectedEvent(event);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedEvent(null);
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
            <div
              key={inv.alumni_invitation_id}
              className="bg-white rounded shadow p-4 flex flex-col cursor-pointer"
              onClick={() => openModal(event)}
            >
              <img
                src={posterSrc}
                alt={event.event_name || "Event Poster"}
                className="rounded h-40 w-full object-cover mb-4"
                onError={(e) => (e.currentTarget.src = DEFAULT_POSTER)}
              />
              <h2 className="text-lg font-semibold text-purple-700">{event.event_name || "Event Name"}</h2>
              <p className="text-sm text-gray-600 mb-1">{date} &bull; {time}</p>
              <p className="text-gray-700 flex-grow">{event.event_description || "No description provided."}</p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-6 rounded max-w-3xl w-full overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-3xl font-bold text-gray-500 hover:text-red-600"
              onClick={closeModal}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <img
              src={selectedEvent.event_poster_key ? `/api/uploads/${selectedEvent.event_poster_key}` : DEFAULT_POSTER}
              alt={selectedEvent.event_name || "Event Poster"}
              className="mb-4 rounded w-full max-h-60 object-cover"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedEvent.event_name}</h2>
            <p className="mb-2 text-sm text-gray-600">
              Date: {new Date(selectedEvent.event_date_time).toLocaleDateString()} &nbsp; Time:{" "}
              {new Date(selectedEvent.event_date_time).toLocaleTimeString()}
            </p>
            <p className="mb-2">{selectedEvent.event_description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
