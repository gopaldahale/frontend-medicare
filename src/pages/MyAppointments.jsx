import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { axiosAuthAPI } from "../config/axios-instance";
import { useAuth } from "../context/AuthContext";

const MyAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const fetchMyAppointments = async () => {
    try {
      // const res = await axios.get('http://localhost:5000/api/appointments/my', { withCredentials: true })
      const res = await axiosAuthAPI.get('/appointments/my')
      setAppointments(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyAppointments();
  }, [])

  const updateStatus = async (appointmentId, status) => {
    try {
      const res = await axiosAuthAPI.patch(`/appointments/${appointmentId}/status`, { status });
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === appointmentId ? res.data.appointment : appt))
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const startReschedule = (appointment) => {
    setEditingId(appointment._id);
    setRescheduleData({
      date: appointment.date?.split("T")[0] || "",
      startTime: appointment.startTime || "",
      endTime: appointment.endTime || "",
    });
  };

  const submitReschedule = async (appointmentId) => {
    try {
      const res = await axiosAuthAPI.patch(
        `/appointments/${appointmentId}/reschedule`,
        rescheduleData
      );
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === appointmentId ? res.data.appointment : appt))
      );
      setEditingId(null);
    } catch (error) {
      alert(error.response?.data?.message || "Reschedule failed");
    }
  };

  return (
    <section className="page-container py-10">
      <h1 className="mb-6 text-center text-3xl font-semibold tracking-tight text-slate-900">
        My Appointments
      </h1>
      <p className="mb-6 text-center text-slate-500">
        {user?.role === "doctor"
          ? "Manage upcoming patient visits, statuses and schedule changes."
          : "Track your appointments, reschedule visits and join online consultations."}
      </p>

      {appointments.length === 0 ? (
        <p className="glass-card p-10 text-center text-slate-500">
          No appointments booked
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {appointments.map((appt) => (
            <div key={appt._id} className="glass-card space-y-1 p-5">
              <div className="mb-2 flex items-center justify-between">
                <p>
                  <strong className="text-slate-700">
                    {user?.role === "doctor" ? "Patient:" : "Doctor:"}
                  </strong>{" "}
                  {user?.role === "doctor" ? appt.patient?.username : appt.doctor?.username}
                </p>
                <span className="rounded-full bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700">
                  #{appt._id?.slice(-5)}
                </span>
              </div>
              <p>
                <strong className="text-slate-700">Email:</strong>{" "}
                {user?.role === "doctor" ? appt.patient?.email : appt.doctor?.email}
              </p>
              <p><strong className="text-slate-700">Department:</strong> <span className="capitalize">{appt.department}</span></p>
              <p><strong className="text-slate-700">Date:</strong> {new Date(appt.date).toDateString()}</p>
              <p>
                <strong className="text-slate-700">Time:</strong>{" "}
                {dayjs(appt.startTime, "HH:mm").format("h:mm A")} - {dayjs(appt.endTime, "HH:mm").format("h:mm A")}
              </p>
              <p><strong className="text-slate-700">Mode:</strong> <span className="capitalize">{appt.type || "in-person"}</span></p>
              <p><strong className="text-slate-700">Reason:</strong> {appt.reason}</p>
              <p><strong className="text-slate-700">Status:</strong> <span className={`capitalize ${appt.status === "confirmed" ? "text-emerald-600" : appt.status === "cancelled" ? "text-rose-600" : "text-amber-600"}`}>{appt.status}</span></p>

              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                <button
                  type="button"
                  onClick={() => startReschedule(appt)}
                  disabled={["completed", "cancelled", "no-show"].includes(appt.status)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(appt._id, "confirmed")}
                  disabled={appt.status === "confirmed" || appt.status === "cancelled"}
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(appt._id, "cancelled")}
                  disabled={appt.status === "cancelled" || appt.status === "completed"}
                  className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={appt.type !== "online" || !appt.meetingLink}
                  onClick={() => window.open(appt.meetingLink, "_blank")}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  Join Call
                </button>
              </div>

              {editingId === appt._id && (
                <div className="mt-4 grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 md:grid-cols-3">
                  <input
                    type="date"
                    value={rescheduleData.date}
                    onChange={(e) =>
                      setRescheduleData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="rounded border border-slate-200 px-2 py-1.5 text-sm"
                  />
                  <input
                    type="time"
                    value={rescheduleData.startTime}
                    onChange={(e) =>
                      setRescheduleData((prev) => ({ ...prev, startTime: e.target.value }))
                    }
                    className="rounded border border-slate-200 px-2 py-1.5 text-sm"
                  />
                  <input
                    type="time"
                    value={rescheduleData.endTime}
                    onChange={(e) =>
                      setRescheduleData((prev) => ({ ...prev, endTime: e.target.value }))
                    }
                    className="rounded border border-slate-200 px-2 py-1.5 text-sm"
                  />
                  <div className="md:col-span-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => submitReschedule(appt._id)}
                      className="rounded bg-sky-600 px-3 py-2 text-xs font-medium text-white hover:bg-sky-700"
                    >
                      Save New Slot
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAppointments;