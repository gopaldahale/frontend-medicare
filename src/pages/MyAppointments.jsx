import { useEffect, useState } from "react";
import axios from 'axios'
import { axiosAuthAPI } from "../config/axios-instance";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

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
    fetchMyAppointments();
  }, [])

  return (
    <section className="page-container py-10">
      <h1 className="mb-6 text-center text-3xl font-semibold tracking-tight text-slate-900">
        My Appointments 📅
      </h1>

      {appointments.length === 0 ? (
        <p className="glass-card p-10 text-center text-slate-500">
          No appointments booked
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {appointments.map((appt) => (
            <div key={appt._id} className="glass-card space-y-1 p-5">
              <div className="mb-2 flex items-center justify-between">
                <p><strong className="text-slate-700">Doctor:</strong> {appt.doctor?.username}</p>
                <span className="rounded-full bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700">
                  #{appt._id?.slice(-5)}
                </span>
              </div>
              <p><strong className="text-slate-700">Department:</strong> <span className="capitalize">{appt.department}</span></p>
              <p><strong className="text-slate-700">Date:</strong> {new Date(appt.date).toDateString()}</p>
              <p><strong className="text-slate-700">Time:</strong> {appt.startTime} - {appt.endTime}</p>
              <p><strong className="text-slate-700">Reason:</strong> {appt.reason}</p>
              <p><strong className="text-slate-700">Status:</strong> <span className={`capitalize ${appt.status === "confirmed" ? "text-emerald-600" : appt.status === "cancelled" ? "text-rose-600" : "text-amber-600"}`}>{appt.status}</span></p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled
                  title="Connect to reschedule API later"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500"
                >
                  Reschedule
                </button>
                <button
                  type="button"
                  disabled
                  title="Connect to join meeting flow later"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500"
                >
                  Join Call
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAppointments;