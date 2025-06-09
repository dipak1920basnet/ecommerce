import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Adjust if using deployed backend
});

export default api;
