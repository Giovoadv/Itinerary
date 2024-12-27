const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

export const api = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}; 