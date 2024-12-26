const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTasks() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function createTask(task) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function updateTask(id, task) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

export async function deleteTask(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.json();
} 