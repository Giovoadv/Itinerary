import { api } from './api';

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${api.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        ...api.headers,
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}

export async function refreshTokens(refreshToken) {
  try {
    const response = await fetch(`${api.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        ...api.headers,
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}

export async function requestPasswordReset(email) {
  try {
    const response = await fetch(`${api.baseURL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        ...api.headers,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password reset request failed');
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
} 