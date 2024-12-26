import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { loginUser } from '../../services/auth'
import { api } from '../../services/api'
import { toast } from 'react-hot-toast'

function Login() {
  const { setUser, setError } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState({})

  const validateForm = () => {
    const errors = {}
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await loginUser(formData)
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      setUser(response.user)
      toast.success('Successfully logged in!')
    } catch (err) {
      setError(err.message || 'Login failed')
      toast.error(err.message || 'Login failed')
      setFormErrors({})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={formErrors.email ? 'error' : ''}
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={formErrors.password ? 'error' : ''}
          />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="auth-links">
        <button onClick={() => window.location.href = '/forgot-password'} className="link-button">
          Forgot Password?
        </button>
      </div>
    </div>
  )
}

export default Login 