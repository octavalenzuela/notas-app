import axios from "axios";

// Creamos una instancia de axios con configuración base
const api = axios.create({
  baseURL: "http://localhost:8081/api" // URL del backend
});

export default api;
