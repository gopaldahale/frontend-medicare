import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useDoctor } from '../context/AuthContext'
import axios from 'axios'
import DoctorCard from '../components/DoctorCard'
import heroImage from '../assets/hero.png'
import hospitalLogo from '../assets/hospitallogo2.PNG'
import { axiosAuthAPI } from '../config/axios-instance'

const Home = () => {
  const { user } = useAuth()
  const { doctors, fetchDoctor } = useDoctor()
  const [myAppointments, setMyAppointments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'patient') {
      navigate('/patient-dashboard', { replace: true })
      return
    }
    if (user?.role === 'doctor') {
      navigate('/doctor-dashboard', { replace: true })
    }
  }, [user, navigate])

  useEffect(() => {
    if (user?.role === 'patient') {
      fetchDoctor()
    }
  }, [user])

  const fetchMyAppointments = async () => {
    try {
      // const res = await axios.get(
      //   'http://localhost:5000/api/appointments/my',
      //   { withCredentials: true }
      // )
      const res = await axiosAuthAPI.get(
        '/appointments/my',)
      setMyAppointments(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyAppointments()
    }
  }, [user])

  // Styles
  const styles = {
    heroSection: `relative min-h-[500px] bg-gradient-to-br from-[#1a6fa8] via-[#2589c8] to-[#38b2ac] overflow-hidden`,
    heroContent: `relative z-10 container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between`,
    heroText: `md:w-1/2 text-white`,
    heroTitle: `text-4xl md:text-5xl font-bold mb-6 leading-tight`,
    heroSubtitle: `text-xl md:text-2xl mb-4 font-light opacity-90`,
    heroDescription: `text-lg mb-8 opacity-80 max-w-lg`,
    heroButtons: `flex gap-4 flex-wrap`,
    heroImage: `md:w-1/2 flex justify-center`,
    heroImg: `max-w-md w-full object-contain drop-shadow-2xl`,
    shimmerBar: `absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a6fa8] via-[#38b2ac] to-[#1a6fa8] bg-[length:200%_100%] animate-shimmer`,

    featuresSection: `py-20 bg-gradient-to-b from-white to-[#f8fcff]`,
    sectionTitle: `text-3xl md:text-4xl font-bold text-center text-[#0e3a5c] mb-4`,
    sectionSubtitle: `text-lg text-[#7fa8c4] text-center mb-12 max-w-2xl mx-auto`,
    featuresGrid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto px-6`,
    featureCard: `bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#dce8f0] hover:border-[#1a6fa8] group`,
    featureIcon: `w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a6fa8] to-[#38b2ac] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`,
    featureTitle: `text-lg font-bold text-[#0e3a5c] mb-2`,
    featureDescription: `text-sm text-gray-500`,

    doctorsSection: `py-20 bg-[#f0f7ff]`,
    doctorsGrid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-6 justify-items-center`,

    statsSection: `py-16 bg-gradient-to-r from-[#1a6fa8] to-[#38b2ac] text-white`,
    statsGrid: `grid grid-cols-2 md:grid-cols-4 gap-8 container mx-auto px-6 text-center`,
    statNumber: `text-4xl md:text-5xl font-bold mb-2`,
    statLabel: `text-sm md:text-base opacity-90`,

    ctaSection: `py-20 bg-gradient-to-br from-[#0e3a5c] to-[#1a6fa8] text-white text-center`,
    ctaTitle: `text-3xl md:text-4xl font-bold mb-4`,
    ctaDescription: `text-lg opacity-90 mb-8 max-w-2xl mx-auto`,
    ctaButton: `px-8 py-4 bg-white text-[#1a6fa8] font-bold rounded-xl hover:bg-[#f0f7ff] transition-all duration-300 shadow-lg hover:shadow-xl text-lg`,

    infoSection: `py-20 bg-white`,
    infoGrid: `grid grid-cols-1 md:grid-cols-2 gap-12 container mx-auto px-6 items-center`,
    infoImage: `rounded-2xl shadow-2xl`,
    infoContent: ``,
    infoTitle: `text-3xl font-bold text-[#0e3a5c] mb-4`,
    infoDescription: `text-gray-600 mb-6 leading-relaxed`,
    infoList: `space-y-3`,
    infoItem: `flex items-center gap-3 text-gray-700`,
    infoCheck: `w-5 h-5 rounded-full bg-gradient-to-br from-[#1a6fa8] to-[#38b2ac] flex items-center justify-center text-white text-xs`,

    footerSection: `bg-[#0e3a5c] text-white py-12`,
    footerContent: `container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8`,
    footerBrand: `flex items-center gap-3 mb-4`,
    footerBrandText: `text-lg font-bold`,
    footerTitle: `text-lg font-semibold mb-4 text-[#7fa8c4]`,
    footerLinks: `space-y-2`,
    footerLink: `text-sm text-gray-300 hover:text-white cursor-pointer transition-colors`,
    footerBottom: `border-t border-[#1a4a6e] mt-8 pt-8 text-center text-sm text-gray-400`,
  }

  const features = [
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Expert Doctors',
      description: 'Highly qualified specialists with years of experience in various medical fields.'
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Easy Appointment',
      description: 'Book appointments online 24/7 with just a few clicks from anywhere.'
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Patient-Centric Care',
      description: 'Personalized treatment plans focused on your unique health needs.'
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Modern Facilities',
      description: 'State-of-the-art medical equipment and comfortable hospital environment.'
    }
  ]

  const stats = [
    { number: '50+', label: 'Expert Doctors' },
    { number: '10K+', label: 'Happy Patients' },
    { number: '25+', label: 'Specializations' },
    { number: '24/7', label: 'Emergency Care' }
  ]

  const infoItems = [
    'Comprehensive health checkups',
    'Advanced diagnostic services',
    'Minimally invasive surgeries',
    'Post-treatment follow-up care',
    'Insurance claim assistance'
  ]

  if (user) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Your Health, <br />
              <span className="text-[#ffd700]">Our Priority</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Welcome to Devi Ratna Hospital
            </p>
            <p className={styles.heroDescription}>
              Experience world-class healthcare with our team of expert doctors,
              state-of-the-art facilities, and personalized treatment approach.
              Your journey to better health starts here.
            </p>
            <div className={styles.heroButtons}>
              {user?.role === 'patient' ? (
                <Link to="/patient-dashboard" className="px-8 py-3 bg-white text-[#1a6fa8] font-bold rounded-xl hover:bg-[#f0f7ff] transition-all duration-300 shadow-lg">
                  Book Appointment
                </Link>
              ) : (
                <Link to="/register" className="px-8 py-3 bg-white text-[#1a6fa8] font-bold rounded-xl hover:bg-[#f0f7ff] transition-all duration-300 shadow-lg">
                  Get Started
                </Link>
              )}
              <Link to="/login" className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#1a6fa8] transition-all duration-300">
                Login
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src={heroImage} alt="Hospital" className={styles.heroImg} />
          </div>
        </div>
        <div className={styles.shimmerBar} />
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        <p className={styles.sectionSubtitle}>
          At Devi Ratna Hospital, we combine medical expertise with compassionate care
          to provide the best healthcare experience for you and your family.
        </p>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors Section - Only for patients */}
      {user?.role === 'patient' && doctors && doctors.length > 0 && (
        <section className={styles.doctorsSection}>
          <h2 className={styles.sectionTitle}>Our Expert Doctors</h2>
          <p className={styles.sectionSubtitle}>
            Browse through our team of highly qualified specialists and book your appointment today.
          </p>
          <div className={styles.doctorsGrid}>
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctors={doctor}
                appointments={myAppointments}
                setMyAppointments={setMyAppointments}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/patient-dashboard" className="px-8 py-3 bg-[#1a6fa8] text-white font-bold rounded-xl hover:bg-[#0c447c] transition-all duration-300 shadow-lg">
              View All Doctors
            </Link>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div>
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
              alt="Hospital Facility"
              className={styles.infoImage}
            />
          </div>
          <div className={styles.infoContent}>
            <h2 className={styles.infoTitle}>Comprehensive Healthcare Services</h2>
            <p className={styles.infoDescription}>
              We offer a wide range of medical services under one roof, ensuring
              that you receive complete care for all your health needs. From routine
              checkups to complex procedures, our team is equipped to handle it all.
            </p>
            <div className={styles.infoList}>
              {infoItems.map((item, index) => (
                <div key={index} className={styles.infoItem}>
                  <span className={styles.infoCheck}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/register" className="inline-block mt-8 px-8 py-3 bg-[#1a6fa8] text-white font-bold rounded-xl hover:bg-[#0c447c] transition-all duration-300 shadow-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Prioritize Your Health?</h2>
        <p className={styles.ctaDescription}>
          Join thousands of satisfied patients who trust Devi Ratna Hospital for their healthcare needs.
          Book your appointment today and experience the difference.
        </p>
        <Link to="/register" className={styles.ctaButton}>
          Book Your Appointment Now
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footerSection}>
        <div className={styles.footerContent}>
          <div>
            <div className={styles.footerBrand}>
              <img src={hospitalLogo} alt="Logo" className="h-12 w-12 rounded" />
              <div>
                <div className={styles.footerBrandText}>Devi Ratna Hospital</div>
                <div className="text-xs text-[#7fa8c4]">Care you can trust</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-4">
              Providing world-class healthcare services with a team of expert doctors
              and state-of-the-art facilities.
            </p>
          </div>

          <div>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <div className={styles.footerLinks}>
              <div className={styles.footerLink}>Home</div>
              <div className={styles.footerLink}>About Us</div>
              <div className={styles.footerLink}>Services</div>
              <div className={styles.footerLink}>Contact</div>
            </div>
          </div>

          <div>
            <h4 className={styles.footerTitle}>Services</h4>
            <div className={styles.footerLinks}>
              <div className={styles.footerLink}>Cardiology</div>
              <div className={styles.footerLink}>Neurology</div>
              <div className={styles.footerLink}>Dermatology</div>
              <div className={styles.footerLink}>General Medicine</div>
            </div>
          </div>

          <div>
            <h4 className={styles.footerTitle}>Contact</h4>
            <div className={styles.footerLinks}>
              <div className="text-sm text-gray-300">📍 123 Health Street, Medical City</div>
              <div className="text-sm text-gray-300">📞 +91 9876543210</div>
              <div className="text-sm text-gray-300">✉️ info@deviratnahospital.com</div>
              <div className="text-sm text-gray-300">🕐 24/7 Emergency Services</div>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} Devi Ratna Hospital. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home