const isDevelopment = import.meta.env.MODE === 'development';

const API_URL = isDevelopment 
  ? 'http://localhost:5000/api'
  : import.meta.env.VITE_BACK_END_URL + '/api';

if (!API_URL) {
  console.error('API URL is not set');
}

export const api = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}; 