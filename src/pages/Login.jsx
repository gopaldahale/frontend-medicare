import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../context/AuthContext'
import { axiosAuthAPI } from '../config/axios-instance';

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [userLoginCredentials, setUserLoginCredentials] = useState({ email: '', password: '' })

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userLoginCredentials
    // const apiurl = 'http://localhost:5000/api/auth'

    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    // try and catch 
    try {
      // 🔐 login → cookie set
      // await axios.post(`${apiurl}/login`, { email, password }, { withCredentials: true })
      await axiosAuthAPI.post(`/login`, { email, password }, { withCredentials: true })

      // 🔥 fetch current user after login
      // const userRes = await axios.get(`${apiurl}/me`, { withCredentials: true })
      const userRes = await axiosAuthAPI.get(`/me`)
      setUser(userRes.data.user);

      // await fetchDoctor();

      if (userRes.data.user.role === "patient") {
        navigate("/patient-dashboard");
      } else if (userRes.data.user.role === 'doctor') {
        navigate("/doctor-dashboard");
      } else {
        navigate('/login')
      }

      setTimeout(() => {
        alert("Login successful ✅");
      }, 500);
    } catch (error) { alert(error.response?.data?.message || "Login failed ❌"); }

  }

  return (
    <section className="page-container py-12 sm:py-16">
      <div className="mx-auto max-w-md glass-card p-8">
        <div className="mb-7 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Welcome Back</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Sign in to continue</h2>
          <p className="mt-2 text-sm text-slate-500">Access your appointments and health dashboard.</p>
        </div>

        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
            value={userLoginCredentials.email}
            onChange={(e) => { setUserLoginCredentials({ ...userLoginCredentials, email: e.target.value }) }}
          />

          <input
            type="password"
            placeholder="Enter password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
            value={userLoginCredentials.password}
            onChange={(p) => setUserLoginCredentials({ ...userLoginCredentials, password: p.target.value })}
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:translate-y-[-1px]"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login