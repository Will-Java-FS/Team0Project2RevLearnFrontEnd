import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Backend server URL
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Properly format the token
    }

    return config;
  },
  (error) => {
    // Handle any errors during the request setup
    console.error("Request error:", error);
    // Ensure the rejection reason is an instance of Error
    return Promise.reject(
      error instanceof Error ? error : new Error("Request setup failed"),
    );
  },
);

export default axiosInstance;
