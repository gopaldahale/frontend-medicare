import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import { Register } from './pages/Register.jsx' 
import PrivateRoutes from "./routes/PrivateRoute.jsx";
import PublicRoute from "./routes/PublicRoutes.jsx";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import MyAppointments from './pages/MyAppointments.jsx'
import {AuthProvider} from './context/AuthContext.jsx'

const App = () => {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/patient-dashboard" element={<PrivateRoutes role="patient"> <PatientDashboardPage /> </PrivateRoutes>} />
          <Route path="/doctor-dashboard" element={<PrivateRoutes role="doctor"> <DoctorDashboardPage /> </PrivateRoutes>} />
          <Route path="/my-appointments" element={<PrivateRoutes> <MyAppointments /> </PrivateRoutes>} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App