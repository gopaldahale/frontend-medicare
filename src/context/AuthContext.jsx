import { createContext, useEffect, useContext, useState, useRef } from "react";
import axios from 'axios'
import { axiosAuthAPI } from "../config/axios-instance";


const AuthContext = createContext();
const DoctorContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // fetch current user from backend using cookie token
    const fetchUser = async () => {
        try {
            // const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
            const res = await axiosAuthAPI.get('/auth/me')
            setUser(res.data.user);
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error(error);
            }
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    // logout user 
    const logout = async () => {
        // await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
        await axiosAuthAPI.post('/auth/logout', {})
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const DoctorProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);
    const { user } = useAuth();
    const [loadingDoctors, setLoadingDoctors] = useState(true)

    const fetchDoctor = async () => {
        try {
            // const res = await axios.get('http://localhost:5000/api/users/doctors')
            const res = await axiosAuthAPI.get('/users/doctors')
            setDoctors(res.data)
        } catch (error) {
            console.error(error);
            setDoctors(null);
        } finally {
            setLoadingDoctors(false);
        }
    }
    // const hasFetched = useRef(false)
    // useEffect(() => {
    //     if (user?.role === "patient" && !hasFetched.current) {
    //         hasFetched.current = true;
    //         fetchDoctor();
    //     }
    // }, [user]);
    useEffect(() => {
        if (user?.role === "patient") {
            fetchDoctor();
        }
    }, []);

    return (
        <DoctorContext.Provider value={{ doctors, loadingDoctors, fetchDoctor }}>{children}</DoctorContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export const useDoctor = () => useContext(DoctorContext);