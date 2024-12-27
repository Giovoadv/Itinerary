import { api } from './api';

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${api.baseURL}/auth/login`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}

export async function refreshTokens(refreshToken) {
  try {
    const response = await fetch(`${api.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Token refresh failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}

export async function requestPasswordReset(email) {
  try {
    const response = await fetch(`${api.baseURL}/auth/forgot-password`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Password reset request failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
} 