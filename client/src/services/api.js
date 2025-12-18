// src/services/api.js
import axios from "axios";

// 🔐 Ensure backend URL is present (helps catch mobile/env issues)
if (!import.meta.env.VITE_BACKEND_URL) {
  console.error("❌ VITE_BACKEND_URL is missing");
}

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// 🔑 Attach token automatically if present in localStorage
API.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch {
        // ignore parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
