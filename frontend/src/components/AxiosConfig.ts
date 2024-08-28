import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

axiosInstance.interceptors.request.use((config) => {
    config.headers["Authorization"] = sessionStorage.getItem("token");
    return config;
});

export default axiosInstance;