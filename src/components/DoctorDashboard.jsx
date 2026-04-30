import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { axiosAuthAPI } from "../config/axios-instance";

// 1. Load the plugin
dayjs.extend(customParseFormat);

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [patientAppt, setPatientAppt] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeActionId, setActiveActionId] = useState(null)
  const [notesDraft, setNotesDraft] = useState({})

  const fetchPatientAppt = async () => {
    try {
      setLoading(true)
      // const res = await axios.get('http://localhost:5000/api/appointments/doctor-appointment', { withCredentials: true })
      const res = await axiosAuthAPI.get('/appointments/doctor-appointment')
      setPatientAppt(res.data)
      const mappedNotes = {};
      for (const appt of res.data) {
        mappedNotes[appt._id] = appt.notes || "";
      }
      setNotesDraft(mappedNotes);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      setActiveActionId(id)
      const res = await axiosAuthAPI.patch(`/appointments/${id}/status`, { status })
      setPatientAppt((prev) =>
        prev.map((appt) => (appt._id === id ? res.data.appointment : appt))
      );
    } catch (error) {
      console.log(error)
    } finally {
      setActiveActionId(null)
    }
  }

  const saveNotes = async (id) => {
    try {
      setActiveActionId(id)
      const res = await axiosAuthAPI.patch(`/appointments/${id}/notes`, {
        notes: notesDraft[id] || "",
      });
      setPatientAppt((prev) =>
        prev.map((appt) => (appt._id === id ? res.data.appointment : appt))
      );
    } catch (error) {
      console.log(error)
    } finally {
      setActiveActionId(null)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPatientAppt()
  }, [])

  const statusPill = (status) => {
    if (status === "confirmed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (status === "cancelled") return "bg-rose-50 text-rose-700 border-rose-200";
    if (status === "completed") return "bg-slate-100 text-slate-700 border-slate-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="page-container py-10">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-6 text-white shadow-xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Dr. {(user?.username || "").charAt(0).toUpperCase() + (user?.username || "").slice(1).toLowerCase()} Dashboard
        </h1>
        <p className="mt-2 text-sm text-sky-100">
          Manage consultations, update status, and save clinical notes from one place.
        </p>
      </div>

      {loading ? (
        <div className="glass-card p-10 text-center text-slate-500">Loading appointments...</div>
      ) : patientAppt.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">No appointments yet</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {patientAppt.map((appt) => (
            <div key={appt._id} className="glass-card rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {appt.patient?.username || "Patient"}
                  </h2>
                  <p className="text-sm text-slate-500">{appt.patient?.email}</p>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${statusPill(appt.status)}`}>
                  {appt.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 text-sm">
                <p className="text-slate-600"><span className="font-medium text-slate-800">Date:</span> {new Date(appt.date).toDateString()}</p>
                <p className="text-slate-600"><span className="font-medium text-slate-800">Time:</span> {dayjs(appt.startTime, "HH:mm").format('h:mm A')} - {dayjs(appt.endTime, "HH:mm").format('h:mm A')}</p>
                <p className="text-slate-600"><span className="font-medium text-slate-800">Dept:</span> <span className="capitalize">{appt.department}</span></p>
                <p className="text-slate-600"><span className="font-medium text-slate-800">Id:</span> #{appt._id?.slice(-5)}</p>
              </div>

              <p className="mt-3 text-sm text-slate-700">
                <span className="font-medium text-slate-800">Reason:</span> {appt.reason || "General consultation"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => updateStatus(appt._id, "confirmed")}
                  disabled={activeActionId === appt._id || appt.status === "confirmed" || appt.status === "cancelled"}
                  className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(appt._id, "cancelled")}
                  disabled={activeActionId === appt._id || appt.status === "cancelled" || appt.status === "completed"}
                  className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Doctor Notes
                </label>
                <textarea
                  value={notesDraft[appt._id] || ""}
                  onChange={(e) =>
                    setNotesDraft((prev) => ({ ...prev, [appt._id]: e.target.value }))
                  }
                  rows={3}
                  placeholder="Add consultation notes..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-sky-300 transition focus:ring-2"
                />
                <button
                  type="button"
                  onClick={() => saveNotes(appt._id)}
                  disabled={activeActionId === appt._id}
                  className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Save Notes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard