import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../context/AuthContext'

const Login = () => {
  // style
  const loginFormClass = "bg-white p-6 rounded shadow-md w-80";
  const h2Class = "text-2xl font-bold mb-4 text-center";
  const inputClass = "w-full mb-3 p-2 border rounded";
  const submitBtnClass = "w-full text-white p-2 rounded";

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [userLoginCredentials, setUserLoginCredentials] = useState({ email: '', password: '' })

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userLoginCredentials
    const apiurl = 'http://localhost:5000/api/auth'

    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    // try and catch 
    try {
      // 🔐 login → cookie set
      await axios.post(`${apiurl}/login`, { email, password }, { withCredentials: true })

      // 🔥 fetch current user after login
      const userRes = await axios.get(`${apiurl}/me`, { withCredentials: true })
      setUser(userRes.data.user);

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
    <div className="flex justify-center items-center mt-20">
      <form className={loginFormClass} onSubmit={handleLoginSubmit} >
        <h2 className={h2Class}>Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          className={inputClass}
          value={userLoginCredentials.email}
          onChange={(e) => { setUserLoginCredentials({ ...userLoginCredentials, email: e.target.value }) }}
        />

        <input
          type="password"
          placeholder="Enter password"
          className={inputClass}
          value={userLoginCredentials.password}
          onChange={(p) => setUserLoginCredentials({ ...userLoginCredentials, password: p.target.value })}
        />

        <button
          type="submit"
          className={`${submitBtnClass} bg-emerald-500`}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login