import { createContext, useEffect, useContext, useState } from "react";
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // fetch current user from backend using cookie token
    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
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
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);