import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios"
import { axiosAuthAPI } from "../config/axios-instance";

export const Register = () => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({ username: '', email: '', password: '', role: 'patient', firstName: '', lastName: '' })
  const { username, email, password, role, firstName, lastName } = userData

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Please fill data");
      return;
    }

    try {
      // const res = await axios.post('http://localhost:5000/api/auth/register', {
      //   username, password, email, role, profile: {
      //     firstName,
      //     lastName
      //   }
      // })
      const res = await axiosAuthAPI.post('/auth/register', {
        username, password, email, role, profile: {
          firstName,
          lastName
        }
      })

      console.log(res)

      setTimeout(() => {
        alert("Registered successfully ✅");
        navigate("/login")
      }, 600)

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed ❌");
    }

  }
  return (
    <section className="page-container py-12 sm:py-16">
      <div className="mx-auto max-w-2xl glass-card p-8">
        <div className="mb-7 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Create Account</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Join Devi Ratna Hospital</h2>
        </div>

        <form className="space-y-4" onSubmit={handleRegisterSubmit} >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="firstName"
            placeholder="Enter firstname"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
            value={firstName}
            onChange={handleUserChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Enter lastname"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
            value={lastName}
            onChange={handleUserChange}
          />

        </div>

        <input
          type="text"
          name="username"
          placeholder="Enter username"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
          value={username}
          onChange={handleUserChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
          value={email}
          onChange={handleUserChange}

        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
          value={password}
          onChange={handleUserChange}

        />

        <select
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-400 focus:outline-none"
          name="role"
          value={role}
          onChange={handleUserChange}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:translate-y-[-1px]"
        >
          Register
        </button>
      </form>
      </div>
    </section>
  )
}
