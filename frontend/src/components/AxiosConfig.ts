import axios from "axios";

// Axios instance for making requests
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

// Request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
    config.headers["Authorization"] = sessionStorage.getItem("token");
    return config;
});

export default axiosInstance;