import React from 'react'
import BookingModal from './BookingModal';
import avatarimg from '../assets/profileavatar.png'
// import axios from 'axios';
import { axiosAuthAPI } from "../config/axios-instance";


const DoctorCard = ({ doctors, appointments, setMyAppointments }) => {
    // style
    const styles = {
        card: `w-full max-w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white
         shadow-lg shadow-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`,

        imageWrapper: `relative h-[220px] w-full bg-slate-100`,

        image: `w-full h-full object-cover object-top`,

        statusDot: `absolute top-3 right-3 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white`,

        body: `p-4`,

        badge: `mb-2 inline-block rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium tracking-wide text-sky-700`,

        name: `mb-1 text-lg font-semibold text-slate-900`,

        divider: `mb-3 border-slate-100`,
    };

    const specialization = doctors.doctorInfo?.specialization || "General Medicine";
    const experience = doctors.doctorInfo?.experienceYears || doctors.doctorInfo?.experience || "5+";
    const consultationFee = doctors.doctorInfo?.fee || doctors.doctorInfo?.consultationFee || "900";
    const rating = doctors.doctorInfo?.rating || "4.8";
    const nextAvailable = doctors.doctorInfo?.nextAvailable || "Today, 5:30 PM";

    const bookedAppointment = appointments?.find(
        (appt) =>
            (appt.doctor === doctors._id || appt.doctor?._id === doctors._id) &&
            appt.status !== "cancelled"
    );

    const handleCancel = async (id) => {
        try {
            // await axios.patch(
            //     `http://localhost:5000/api/appointments/${id}/status`,
            //     { status: "cancelled" },
            //     { withCredentials: true }
            // );
            await axiosAuthAPI.patch(
                `/appointments/${id}/status`,
                { status: "cancelled" }, 
            );

            // if (response.status === 200) {
            //     fetchMyAppointments();
            // }
            setMyAppointments(prev =>
                prev.map(appt =>
                    appt._id === id ? { ...appt, status: "cancelled" } : appt
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.card}>

            <div className={styles.imageWrapper}>
                <img className={styles.image} src={`${doctors.image_url ? doctors.image_url : avatarimg}`} alt={doctors.username} />
                <span className={styles.statusDot} />
            </div>

            <div className={styles.body}>
                <div className="mb-2 flex items-center justify-between gap-2">
                    <span className={styles.badge}>{specialization}</span>
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">⭐ {rating}</span>
                </div>

                <h2 className={styles.name}>{doctors.username}</h2>
                <p className="text-sm text-slate-500">MBBS, MD - {specialization}</p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-slate-50 px-3 py-2">
                        <p className="text-slate-400">Experience</p>
                        <p className="font-semibold text-slate-700">{experience} yrs</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 px-3 py-2">
                        <p className="text-slate-400">Consultation</p>
                        <p className="font-semibold text-slate-700">NPR {consultationFee}</p>
                    </div>
                </div>

                <p className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                    Next available: {nextAvailable}
                </p>

                <hr className={styles.divider} />

                <div className="mb-3 flex items-center gap-2">
                    <button
                        type="button"
                        disabled
                        className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs font-medium text-slate-500"
                        title="Connect this with backend later"
                    >
                        Save Doctor
                    </button>
                    <button
                        type="button"
                        disabled
                        className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs font-medium text-slate-500"
                        title="Connect this with backend later"
                    >
                        View Profile
                    </button>
                </div>

                {bookedAppointment ? (
                    <button onClick={() => handleCancel(bookedAppointment._id)} className="w-full rounded-xl bg-rose-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700">
                        Cancel Appointment
                    </button>
                ) : (
                    <BookingModal doctor={doctors} setMyAppointments={setMyAppointments} />
                )}
            </div>

        </div >

    )
}

export default DoctorCard