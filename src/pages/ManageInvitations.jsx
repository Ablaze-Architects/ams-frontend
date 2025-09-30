import React, { useEffect, useMemo, useState } from "react"

export default function ManageInvitations() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [alumniMap, setAlumniMap] = useState({})

  useEffect(() => {
    async function loadInvitations() {
      try {
        setLoading(true)
        setError("")
        const res = await fetch("/api/messages/invitations")
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch invitations")
        }
        // Support shapes: array, { invitations }, or { data: { invitations } }
        const list = Array.isArray(data)
          ? data
          : (data.invitations || (data.data && data.data.invitations) || [])
        setInvitations(list)
      } catch (err) {
        setError(err.message || "Something went wrong loading invitations")
      } finally {
        setLoading(false)
      }
    }
    loadInvitations()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return invitations
    return invitations.filter((inv) => {
      const event = inv.events || {}
      const name = (event.event_name || "").toLowerCase()
      const desc = (event.event_description || "").toLowerCase()
      const alumId = (inv.admin_alumni_messages && inv.admin_alumni_messages.alumni_id) || ""
      const alumName = (alumniMap[alumId] || "").toLowerCase()
      return name.includes(q) || desc.includes(q) || String(alumId).toLowerCase().includes(q) || alumName.includes(q)
    })
  }, [invitations, search, alumniMap])

  useEffect(() => {
    async function loadAlumni() {
      try {
        const res = await fetch("/api/alumni")
        const data = await res.json()
        if (!res.ok) return
        const list = Array.isArray(data) ? data : (data.alumni || data.results || [])
        const map = {}
        for (const a of list) {
          const id = a.id || a.alumni_id
          const name = a.name || a.alumni_name || a.full_name || a.email || ""
          if (id) map[id] = name
        }
        setAlumniMap(map)
      } catch {
        // ignore alumni load errors for table display
      }
    }
    loadAlumni()
  }, [])

  return (
    <div className="w-full">
      <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Manage Invitations</h1>
      </div>
      <div className="mb-4">
        <input
          className="w-full max-w-md border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Search by event name, description, or alumni ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {filtered.length} of {invitations.length} invitations
        </div>
      )}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">No invitations found.</div>
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-50 border-b">
                <th className="p-3 text-left font-semibold text-purple-700">Invitation ID</th>
                <th className="p-3 text-left font-semibold text-purple-700">Alumni</th>
                <th className="p-3 text-left font-semibold text-purple-700">Event Name</th>
                <th className="p-3 text-left font-semibold text-purple-700">Date & Time</th>
                <th className="p-3 text-left font-semibold text-purple-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, idx) => {
                const event = inv.events || {}
                const dateTime = event.event_date_time ? new Date(event.event_date_time).toLocaleString() : "-"
                const alumniId = inv.admin_alumni_messages && inv.admin_alumni_messages.alumni_id
                const alumniName = alumniMap[alumniId] || alumniId || "-"
                return (
                  <tr key={inv.alumni_invitation_id || idx} className="border-b hover:bg-purple-50/40">
                    <td className="p-3">{inv.alumni_invitation_id || "-"}</td>
                    <td className="p-3">{alumniName}</td>
                    <td className="p-3">{event.event_name || "-"}</td>
                    <td className="p-3">{dateTime}</td>
                    <td className="p-3 text-sm truncate max-w-[40ch] text-gray-700" title={event.event_description || "-"}>
                      {event.event_description || "-"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  )
}


