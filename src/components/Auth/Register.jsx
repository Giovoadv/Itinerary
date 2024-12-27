import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../services/api';

function Register({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api.baseURL}/auth/register`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Account created successfully!');
        onRegisterSuccess();
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Account</button>
      </form>
    </div>
  );
}

export default Register; 