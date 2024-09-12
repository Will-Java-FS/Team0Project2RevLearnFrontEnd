import axios from "axios";
import AuthService from "./AuthService";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/", // Use Vite environment variable or fallback to localhost
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      // Ensure no spaces or newlines in the token
      config.headers["Authorization"] = `Bearer ${token.trim()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response.data); // Log response error details
    } else if (error.request) {
      console.error("No response received:", error.request); // Log if no response received
    } else {
      console.error("Request error:", error.message); // Log if error occurs in setting up the request
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
