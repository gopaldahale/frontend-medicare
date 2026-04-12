import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const Register = () => {
  // style
  const FormClass = "bg-white p-6 rounded shadow-md w-80";
  const h2Class = "text-2xl font-bold mb-4 text-center";
  const inputClass = "w-full mb-3 p-2 border rounded";
  const submitBtnClass = "w-full bg-gradient-to-br from-[#1a6fa8] to-[#38b2ac] text-white p-2 rounded hover:bg-blue-700";

  const navigate = useNavigate()

  const [userData, setUserData] = useState({ username: '', email: '', password: '', role: 'patient' })
  const { username, email, password, role } = userData

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
      const res = await axios.post('http://localhost:5000/api/auth/register', { username, password, email, role })

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
    <div className="flex justify-center items-center mt-20">
      <form className={FormClass} onSubmit={handleRegisterSubmit} >
        <h2 className={h2Class}>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter username"
          className={inputClass}
          value={username}
          onChange={handleUserChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className={inputClass}
          value={email}
          onChange={handleUserChange}

        />

        <input
          type="text"
          name="password"
          placeholder="Enter password"
          className={inputClass}
          value={password}
          onChange={handleUserChange}

        />

        <select
          className={inputClass}
          name="role"
          value={role}
          onChange={handleUserChange}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button
          type="submit"
          className={submitBtnClass}
        >
          Register
        </button>
      </form>
    </div>
  )
}
