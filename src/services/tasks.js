import { api } from './api';

export async function fetchTasks() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${api.baseURL}/tasks`, {
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function createTask(task) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${api.baseURL}/tasks`, {
    method: 'POST',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function updateTask(id, task) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${api.baseURL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

export async function deleteTask(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${api.baseURL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.json();
} 