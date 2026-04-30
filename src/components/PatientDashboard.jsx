import React, { useEffect, useState } from 'react'
// import doctors from '../data/doctors'
import DoctorCard from './DoctorCard'
// import axios from 'axios'
import { axiosAuthAPI } from "../config/axios-instance";

import { useDoctor } from '../context/AuthContext'


const PatientDashboard = () => {

  const { doctors, fetchDoctor } = useDoctor();
  const [myAppointments, setMyAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [favoriteOverrides, setFavoriteOverrides] = useState({});
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");

  useEffect(() => {
    fetchDoctor();
  }, [fetchDoctor]);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyAppointments();
  }, []);

  const handleFavoriteChange = (doctorId, isFavorite) => {
    setFavoriteOverrides((prev) => ({ ...prev, [doctorId]: isFavorite }));
  };

  const mergedDoctors = (doctors || []).map((doctor) => ({
    ...doctor,
    isFavorite:
      favoriteOverrides[doctor._id] !== undefined
        ? favoriteOverrides[doctor._id]
        : doctor.isFavorite,
  }));

  const filteredDoctors = mergedDoctors.filter((doctor) => {
    const name = doctor.username?.toLowerCase() || "";
    const specializationText = doctor.doctorInfo?.specialization?.toLowerCase() || "";
    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      specializationText.includes(search.toLowerCase());

    const specialization = doctor.doctorInfo?.specialization || "General Medicine";
    const matchesSpecialization =
      selectedSpecialization === "all" || specialization === selectedSpecialization;
    const matchesSaved = showSavedOnly ? doctor.isFavorite : true;

    return matchesSearch && matchesSpecialization && matchesSaved;
  });

  const specializationOptions = [
    "all",
    ...Array.from(
      new Set(
        (mergedDoctors || []).map(
          (doctor) => doctor.doctorInfo?.specialization || "General Medicine"
        )
      )
    ),
  ];

  return (
    <section className="page-container py-10">
      <div className="mb-8">
        <h1 className="section-title">Patient Dashboard</h1>
        <p className="section-subtitle">Find specialists and book appointments in a few clicks.</p>
      </div>

      <div className="glass-card mb-6 grid gap-3 p-4 md:grid-cols-[1fr_auto_auto]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by doctor name or specialization"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-300 focus:ring-2"
        />
        <button
          type="button"
          onClick={() => setShowSavedOnly((prev) => !prev)}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${showSavedOnly
            ? "border-rose-200 bg-rose-50 text-rose-700"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
        >
          {showSavedOnly ? "Showing Saved" : "Show Saved Only"}
        </button>
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        >
          {specializationOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All Specializations" : option}
            </option>
          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredDoctors.map((doctor) =>
          <DoctorCard
            key={doctor._id}
            doctors={doctor}
            appointments={myAppointments}
            setMyAppointments={setMyAppointments}
            onFavoriteChange={handleFavoriteChange}
          />
        )}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="glass-card mt-6 p-8 text-center text-slate-500">
          No doctors match your current search/filter.
        </div>
      )}
    </section>
  )
}

export default PatientDashboard