const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const api = {
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
}; 