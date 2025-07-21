import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_URL || 'https://api.university.e-aribt.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;