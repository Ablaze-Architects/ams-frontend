import React, { useEffect, useState } from "react"

export default function ManageInvitations() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
        // Expecting data like { success, invitations: [...] } or an array directly
        const list = Array.isArray(data) ? data : (data.invitations || [])
        setInvitations(list)
      } catch (err) {
        setError(err.message || "Something went wrong loading invitations")
      } finally {
        setLoading(false)
      }
    }
    loadInvitations()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Invitations</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && invitations.length === 0 && (
        <p>No invitations found.</p>
      )}
      {!loading && !error && invitations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Event</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((inv, idx) => (
                <tr key={inv.id || inv.alumni_invitation_id || idx} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{inv.title || inv.subject || "-"}</td>
                  <td className="p-2 border truncate max-w-[28ch]" title={inv.message || ""}>
                    {inv.message || "-"}
                  </td>
                  <td className="p-2 border">{inv.event_id || inv.eventId || "-"}</td>
                  <td className="p-2 border">{inv.created_at ? new Date(inv.created_at).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


