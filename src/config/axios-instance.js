import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

// auth required
export const axiosAuthAPI = axios.create({
    baseURL,
    withCredentials: true
});

// public
export const axiosPublicAPI = axios.create({
    baseURL
});