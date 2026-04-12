import React from 'react'
import doctors from '../data/doctors'
import DoctorCard from './DoctorCard'

const PatientDashboard = () => {

  const handleBooking = (doctor) => {

    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"))

    const appointment = {
      id: Date.now(),
      patientName: currentUser.username,
      patientEmail: currentUser.email,
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      specialization: doctor.specialization,
      date: new Date().toLocaleString(),
      status: "pending"
    }
    // Get existing appointments
    const existing = JSON.parse(localStorage.getItem("appointments")) || [];

    const existingAppointment = existing.find(
      (user) => user.patientEmail == appointment.patientEmail && user.doctorEmail == appointment.doctorEmail
    )

    if (existingAppointment) return (alert('Appointment already taken!'));

    // Add new appointment
    const updated = [...existing, appointment];

    localStorage.setItem("appointments", JSON.stringify(updated))

    alert("Appointment booked ✅");
  }

  return (
    <> Patient Dashboard
      <div className='grid grid-cols-3 gap-6 w-max mx-auto my-10'>
        {doctors.map((docData) =>
          <DoctorCard key={docData.id} doctor={docData} handleBooking={handleBooking} />
        )}

      </div>
    </>
  )
}

export default PatientDashboard