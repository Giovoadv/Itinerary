import { api } from './api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    ...api.headers,
    'Authorization': `Bearer ${token}`
  };
};

export async function fetchTasks() {
  const response = await fetch(`${api.baseURL}/tasks`, {
    headers: getAuthHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch tasks');
  return data;
}

export async function createTask(task) {
  const response = await fetch(`${api.baseURL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(task)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create task');
  return data;
}

export async function updateTask(id, task) {
  const response = await fetch(`${api.baseURL}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(task)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update task');
  return data;
}

export async function deleteTask(id) {
  if (!id) {
    throw new Error('Task ID is required');
  }

  try {
    const response = await fetch(`${api.baseURL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete task');
    }

    return data;
  } catch (error) {
    console.error('Delete task error:', error);
    throw error;
  }
} 