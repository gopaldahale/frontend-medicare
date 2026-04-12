import { useEffect, useState } from "react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const allAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    const currentUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    // 🔥 filter only current patient data
    const myAppointments = allAppointments.filter(
      (appt) => appt.patientEmail === currentUser.email
    );

    setAppointments(myAppointments);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Appointments 📅
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">
          No appointments booked
        </p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h2 className="font-bold">{appt.doctorName}</h2>
              <p>{appt.specialization}</p>
              <p className="text-sm text-gray-500">{appt.date}</p>
              <p className="mt-2 font-semibold">
                Status: <span className={`${appt.status !== 'accepted' ? 'text-red-600' : 'text-green-600'}`}>{appt.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;