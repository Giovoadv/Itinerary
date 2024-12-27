// Remove localhost fallback in production
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('VITE_API_URL environment variable is not set');
}

export const api = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}; 