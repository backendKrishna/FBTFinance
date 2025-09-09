import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if different
});

// Add token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
