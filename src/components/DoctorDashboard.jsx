import React, { useEffect, useState } from 'react'

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    const currentDoctor = JSON.parse(localStorage.getItem("loggedInUser"))

    setDoctorData(currentDoctor)

    const getCurrentDocAppointments = storedAppointments.filter(
      (doctor) => doctor.doctorEmail === currentDoctor.email
    )
    setAppointments(getCurrentDocAppointments)
  }, [])

  // console.log(doctorData)

  const handleStatus = (index, newStatus) => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const currentDoctor = JSON.parse( localStorage.getItem("loggedInUser") );

    // update correct appointment
    const updatedAppointments = allAppointments.map((appt) => {
      if (
        appt.doctorEmail === currentDoctor.email &&
        appt.patientEmail === appointments[index].patientEmail &&
        appt.date === appointments[index].date
      ) {
        return { ...appt, status: newStatus };
      }
      return appt;
    });

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    // update UI
    setAppointments(
      updatedAppointments.filter(
        (appt) => appt.doctorEmail === currentDoctor.email
      )
    );
  };
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Doctor <span className='text-red-400'>{doctorData.username?.toUpperCase()}</span> Dashboard 👨‍⚕️
        </h1>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">
            No appointments yet
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt, index) => (
              <div key={index} className="border p-4 rounded shadow">
                <h2 className="font-bold">
                  <span className='font-light'>Patient</span> {appt.patientName}
                </h2>
                <p>{appt.patientEmail}</p>
                <p className="text-sm text-gray-500">{appt.date}</p>

                <p className="mt-2 font-semibold">
                  Status: <span className={`${appt.status !== 'accepted' ? 'text-red-600' : 'text-green-600'}`}>{appt.status}</span>
                </p>

                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => handleStatus(index, "accepted")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatus(index, "rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
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