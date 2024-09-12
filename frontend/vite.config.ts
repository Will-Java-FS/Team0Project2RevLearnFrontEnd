import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://54.205.97.225:8080/", // Backend server URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
