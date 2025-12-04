import axios from "axios";

// Creamos una instancia de axios con configuración base
const api = axios.create({
  baseURL: "https://notas-backend-j2aw.onrender.com/api" // URL del backend
});

export default api;
