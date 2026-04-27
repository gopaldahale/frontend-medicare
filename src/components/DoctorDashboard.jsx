import axios from 'axios'
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

  const fetchPatientAppt = async () => {
    try {
      setLoading(true)
      // const res = await axios.get('http://localhost:5000/api/appointments/doctor-appointment', { withCredentials: true })
      const res = await axiosAuthAPI.get('/appointments/doctor-appointment')
      // console.log("API DATA:", res.data)
      setPatientAppt(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateSatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, { status }, { withCredentials: true })
      fetchPatientAppt();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPatientAppt()
  }, [])

  return (
    <>
      <div className="page-container py-10">
        <h1 className="mb-6 text-center text-3xl font-semibold tracking-tight text-slate-900">
          Dr. <span className='text-red-400'>{(user.username).charAt(0).toUpperCase() + (user.username).slice(1).toLowerCase()}</span> Dashboard 👨‍⚕️
        </h1>

        {patientAppt.length === 0 ? (
          <p className="glass-card p-10 text-center text-slate-500">
            No appointments yet
          </p>
        ) : (
          <div className="space-y-4">
            {patientAppt.map((appt, index) => (
              <div key={index} className="glass-card p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-800">
                    <span className='font-normal text-slate-500'>Patient</span> <span className='capitalize'>{appt.patient.username}</span>
                  </h2>
                  <span className="rounded-full bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700">
                    #{appt._id?.slice(-5)}
                  </span>
                </div>
                <p className="text-slate-600">{appt.patient.email}</p>
                <p className="text-sm text-slate-500">{new Date(appt.date).toDateString()}</p>
                <p className="text-slate-700"> {dayjs(appt.startTime, "HH:mm").format('h:mm A')} - {dayjs(appt.endTime, "HH:mm").format('h:mm A')} </p>
                <p className="text-sm text-slate-600"><span className="font-medium text-slate-700">Reason:</span> {appt.reason || "General consultation"}</p>

                <p className="mt-2 font-semibold text-slate-700">
                  Status: <span className={`${appt.status !== 'confirmed' ? 'text-red-600' : 'text-green-600'} capitalize`}>{appt.status}</span>
                </p>

                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => updateSatus(appt._id, "confirmed")}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateSatus(appt._id, "cancelled")}
                    className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled
                    title="Connect notes API later"
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500"
                  >
                    Add Notes
                  </button>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default DoctorDashboard