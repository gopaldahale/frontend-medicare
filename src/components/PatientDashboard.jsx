import React, { useEffect, useState } from 'react'
// import doctors from '../data/doctors'
import DoctorCard from './DoctorCard'
// import axios from 'axios'
import { axiosAuthAPI } from "../config/axios-instance";

import { useDoctor } from '../context/AuthContext'


const PatientDashboard = () => {

  const { doctors, fetchDoctor } = useDoctor();
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => { fetchDoctor(); console.log(doctors) }, [])

  const fetchMyAppointments = async () => {
    try {
      // const res = await axios.get(
      //   "http://localhost:5000/api/appointments/my",
      //   { withCredentials: true }
      // );
      const res = await axiosAuthAPI.get(
        "/appointments/my", 
      );
      setMyAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyAppointments();
  }, []);


  return (
    <section className="page-container py-10">
      <div className="mb-8">
        <h1 className="section-title">Patient Dashboard</h1>
        <p className="section-subtitle">Find specialists and book appointments in a few clicks.</p>
      </div>

      <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {doctors.map((doctor) =>
          <DoctorCard key={doctor._id} doctors={doctor} appointments={myAppointments} setMyAppointments={setMyAppointments} />
        )}
      </div>
    </section>
  )
}

export default PatientDashboard