import React from 'react'
import logo from '../assets/hospitallogo2.PNG'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth();
    const menuLink = "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    return (
        <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
            <div className="page-container flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-sky-600 to-cyan-500 p-1.5 shadow-lg shadow-sky-500/25">
                        <img src={logo} alt="Hospital logo" className="h-12 w-12 rounded-lg object-cover" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-base font-semibold tracking-tight text-slate-900">
                            <span className='text-rose-600'>Devi Ratna</span> Hospital
                        </span>
                        <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-slate-400">
                            Care you can trust
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    {!user && <Link to="/" className={menuLink}>Home</Link>}
                    {user?.role === "patient" && (
                        <Link to="/my-appointments" className={menuLink}>My Appointments</Link>
                    )}

                    {user ? (
                        <>
                            <Link to={user?.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"} className={menuLink}>Dashboard</Link>
                            <button onClick={handleLogout} className="ml-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="ml-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-sky-700 transition hover:border-sky-300 hover:bg-sky-50">
                                Login
                            </Link>
                            <Link to="/register" className="rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition hover:translate-y-[-1px]">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar