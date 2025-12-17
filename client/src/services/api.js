// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend base URL
});

// Attach token automatically if present in localStorage (will add login later)
API.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user"); // we will store { token, ... } later
  if (stored) {
    try {
      const user = JSON.parse(stored);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      // ignore parse errors
    }
  }
  return config;
});

export default API;
