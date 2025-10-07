import axios from "axios";

// Usa la URL del backend desde .env o por defecto http://localhost:8080/api
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // pon true si usas cookies/sesiones
});

export default api;
