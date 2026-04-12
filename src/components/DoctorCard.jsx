import React from 'react'

const DoctorCard = ({ doctor, handleBooking }) => {
    // style
    const styles = {
        card: `w-[260px] bg-white border border-gray-100 rounded-2xl overflow-hidden
         hover:border-gray-300 transition-all duration-200`,

        imageWrapper: `relative w-full m-auto h-[200px] bg-gray-100`,

        image: `w-full h-full object-cover object-top`,

        statusDot: `absolute top-3 right-3 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white`,

        body: `p-4`,

        badge: `inline-block text-[11px] font-medium font-[Roboto] tracking-wide
          px-3 py-1 rounded-full bg-blue-50 text-blue-700 mb-2`,

        name: `font-[Montserrat] text-base font-bold text-gray-900 mb-1`,

        meta: `text-[13px] text-gray-400 mb-3 flex items-center gap-1.5`,

        metaDot: `w-1 h-1 rounded-full bg-gray-300 inline-block`,

        divider: `border-gray-100 mb-3`,

        ratingRow: `flex items-center justify-between mb-4`,

        stars: `text-amber-400 text-sm tracking-wide`,

        reviewCount: `text-[12px] text-gray-400`,

        button: `w-full py-2.5 bg-[#185fa5] hover:bg-[#0c447c] active:scale-[0.98]
           text-white text-[13px] font-semibold font-[Montserrat] tracking-wide
           rounded-lg transition-all duration-200`,
    };

    return (
        <div className={styles.card}>

            <div className={styles.imageWrapper}>
                <img className={styles.image} src={doctor.image_url} alt={doctor.name} />
                <span className={styles.statusDot} />
            </div>

            <div className={styles.body}>
                <span className={styles.badge}>{doctor.specialization}</span>

                <h2 className={styles.name}>{doctor.name}</h2>

                {/* <p className={styles.meta}>
                    {doctor.experience} yrs exp
                    <span className={styles.metaDot} />
                    {doctor.qualification}
                </p> */}

                <hr className={styles.divider} />

                {/* <div className={styles.ratingRow}>
                    <span className={styles.stars}>★★★★★</span>
                    <span className={styles.reviewCount}>{doctor.rating} · {doctor.reviews} reviews</span>
                </div> */}

                <button className={styles.button} onClick={()=>handleBooking(doctor)}>Book Appointment</button>
        </div>

        </div >

    )
}

export default DoctorCard