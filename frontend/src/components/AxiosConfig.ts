import axios from "axios";

// Use the environment variable to set the base URL
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL, // Access Vite environment variable
baseURL: "http://localhost:8080",
 // Use a hardcoded URL for now
});

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;