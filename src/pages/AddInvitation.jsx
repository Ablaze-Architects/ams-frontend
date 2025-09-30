import React, { useEffect, useMemo, useState } from "react"
import { adminId as exportedAdminId } from "./Login.jsx"
import { getRole, getUser } from "@/utils/auth"
import { useNavigate } from "react-router-dom"

export default function AddInvitation() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [eventSearch, setEventSearch] = useState("")
  const [alumni, setAlumni] = useState([])
  const [alumniLoading, setAlumniLoading] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState("")
  const [selectedAlumniIds, setSelectedAlumniIds] = useState([])
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const adminId = exportedAdminId || localStorage.getItem("adminId") || ((getRole() || "").toUpperCase() === "ADMIN" ? (getUser()?.id || "") : "")
  console.log("[AddInvitation] adminId:", adminId, "isNull?", adminId == null || adminId === "")

  
  useEffect(() => {
    if (!adminId) return
    async function loadEvents() {
      try {
        setEventsLoading(true)
        setError("")
        const res = await fetch(`/api/events/${adminId}/getAllEvents`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to load events")
        // Backend returns { success, count, data: [...] }
        const list = Array.isArray(data)
          ? data
          : (data.data || data.events || [])
        setEvents(list)
      } catch (err) {
        setError(err.message || "Error loading events")
      } finally {
        setEventsLoading(false)
      }
    }
    loadEvents()
  }, [adminId])

  useEffect(() => {
    if (step !== 2) return
    async function loadAlumni() {
      try {
        setAlumniLoading(true)
        setError("")
        const res = await fetch(`/api/alumni`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to load alumni")
        const list = Array.isArray(data) ? data : (data.alumni || data.results || [])
        setAlumni(list)
      } catch (err) {
        setError(err.message || "Error loading alumni")
      } finally {
        setAlumniLoading(false)
      }
    }
    loadAlumni()
  }, [step])

  const selectedEvent = useMemo(() => {
    return events.find(e => (e.id || e.event_id) === selectedEventId)
  }, [events, selectedEventId])

  const filteredEvents = useMemo(() => {
    const q = eventSearch.trim().toLowerCase()
    if (!q) return events
    return events.filter(evt => {
      const name = (evt.event_name || evt.name || "").toLowerCase()
      const desc = (evt.event_description || evt.description || "").toLowerCase()
      const when = (evt.event_date_time ? new Date(evt.event_date_time).toLocaleString() : "").toLowerCase()
      return name.includes(q) || desc.includes(q) || when.includes(q)
    })
  }, [events, eventSearch])

  function proceedToAlumni() {
    setError("")
    if (!selectedEventId) {
      setError("Please select an event to continue")
      return
    }
    setStep(2)
  }

  function toggleAlumni(alumniId) {
    setSelectedAlumniIds(prev => prev.includes(alumniId)
      ? prev.filter(id => id !== alumniId)
      : [...prev, alumniId])
  }

  function selectAllAlumni() {
    const allIds = alumni.map(a => a.id || a.alumni_id)
    setSelectedAlumniIds(allIds)
  }

  function clearAllAlumni() {
    setSelectedAlumniIds([])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!adminId) {
      setError("Admin ID not found. Please login as admin.")
      return
    }
    if (!selectedEventId) {
      setError("Please select an event")
      return
    }
    if (selectedAlumniIds.length === 0) {
      setError("Please select at least one alumni")
      return
    }
    if (!title || !message) {
      setError("Title and message are required")
      return
    }
    try {
      setSending(true)
      const resolvedEventId = Number(selectedEventId)
      const payload = {
        title,
        message,
        event_id: Number.isNaN(resolvedEventId) ? selectedEventId : resolvedEventId,
        alumni_ids: selectedAlumniIds,
        message_file_key: null,
      }
      const res = await fetch(`/api/messages/${adminId}/createMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to create invitation")
      }
      const invitedNames = alumni
        .filter(a => selectedAlumniIds.includes(a.id || a.alumni_id))
        .map(a => a.name || a.alumni_name || a.full_name || a.email || (a.id || a.alumni_id))
      const eventName = selectedEvent?.event_name || selectedEvent?.name || selectedEventId
      setSuccess(`Invited ${invitedNames.join(", ")} to event: ${eventName}`)
      setShowSuccess(true)
      setTimeout(() => {
        navigate("/dashboard/invitations")
      }, 5000)
      setTitle("")
      setMessage("")
      setSelectedAlumniIds([])
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Add Invitation</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && !showSuccess && <p className="text-green-600 mb-3">{success}</p>}

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-purple-700">Select an Event</h2>
          {eventsLoading && <p>Loading events...</p>}
          {!eventsLoading && events.length === 0 && <p>No events found.</p>}
          {!eventsLoading && events.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="mb-3">
                <input
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Search events by name, description, or date/time"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
              {filteredEvents.map(evt => {
                const id = evt.id || evt.event_id
                return (
                  <label key={id} className={`border rounded p-3 cursor-pointer bg-white transition hover:shadow-md hover:-translate-y-0.5 ${selectedEventId === id ? "border-purple-600 ring-1 ring-purple-200" : "border-gray-300"}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="event"
                        className="mt-1"
                        checked={selectedEventId === id}
                        onChange={() => setSelectedEventId(id)}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{evt.event_name || evt.name || `Event ${id}`}</div>
                        <div className="text-sm text-gray-600 truncate max-w-[50ch]">{evt.event_description || evt.description || ""}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {evt.event_date_time ? new Date(evt.event_date_time).toLocaleString() : ""}
                        </div>
                      </div>
                    </div>
                  </label>
                )
              })}
              </div>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700" onClick={proceedToAlumni}>Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-purple-700">Select Alumni</h2>
            <div className="flex gap-2">
              <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300" onClick={selectAllAlumni} type="button">Select All</button>
              <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300" onClick={clearAllAlumni} type="button">Clear</button>
            </div>
          </div>
          {alumniLoading && <p>Loading alumni...</p>}
          {!alumniLoading && alumni.length === 0 && <p>No alumni found.</p>}
          {!alumniLoading && alumni.length > 0 && (
            <div className="border rounded divide-y bg-white">
              {alumni.map(a => {
                const id = a.id || a.alumni_id
                const label = a.name || a.alumni_name || a.full_name || a.email || `Alumni ${id}`
                const checked = selectedAlumniIds.includes(id)
                return (
                  <label key={id} className="flex items-center gap-3 p-2 cursor-pointer hover:bg-purple-50/50">
                    <input type="checkbox" checked={checked} onChange={() => toggleAlumni(id)} />
                    <span>{label}</span>
                  </label>
                )
              })}
            </div>
          )}

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Invitation title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                className="w-full border rounded px-3 py-2 min-h-28"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your invitation message"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded border hover:bg-gray-50"
                onClick={() => setStep(1)}
              >Back</button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-60 hover:bg-purple-700"
                disabled={sending}
              >
                {sending ? "Sending..." : "Create Invitation"}
              </button>
            </div>
          </form>
        </div>
      )}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-sm w-full">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <p className="text-green-700 font-medium mb-1">{success}</p>
            <p className="text-sm text-gray-500">Redirecting to manage invitations...</p>
          </div>
        </div>
      )}
    </div>
  )
}


