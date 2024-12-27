import { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import TaskManager from './components/TaskManager'
import './App.css'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { AuthProvider, useAuth } from './context/AuthContext'
import { fetchTasks, createTask, updateTask, deleteTask } from './services/tasks'
import { toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const { user, loading, logout } = useAuth()
  const [selectedView, setSelectedView] = useState('month')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const [showRegister, setShowRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserTasks()
    }
  }, [user])

  const fetchUserTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks()
      setTasks(fetchedTasks.map(task => ({
        ...task,
        date: new Date(task.date)
      })))
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = async (newTask) => {
    try {
      const savedTask = await createTask(newTask)
      setTasks([...tasks, { ...savedTask, date: new Date(savedTask.date) }])
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const savedTask = await updateTask(taskId, updatedTask)
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...savedTask, date: new Date(savedTask.date) } : task
      ))
      toast.success('Task updated successfully')
    } catch (error) {
      console.error('Failed to update task:', error)
      toast.error(error.message || 'Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      setTasks(tasks.filter(task => task._id !== taskId))
      toast.success('Task deleted successfully')
    } catch (error) {
      console.error('Failed to delete task:', error)
      toast.error(error.message || 'Failed to delete task')
    }
  }

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  if (!user) {
    return (
      <div className="auth-container">
        {showRegister ? (
          <Register onRegisterSuccess={() => setShowRegister(false)} />
        ) : (
          <>
            <Login />
            <button className="need-account-button" onClick={() => setShowRegister(true)}>
              Need an account? Register
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="itinerary-app">
      <header className="app-header">
        <div className="header-content">
          <h1>Itinerary Planner</h1>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
        <div className="view-controls">
          <button 
            onClick={() => setSelectedView('day')}
            className={selectedView === 'day' ? 'active' : ''}
          >
            Day
          </button>
          <button 
            onClick={() => setSelectedView('week')}
            className={selectedView === 'week' ? 'active' : ''}
          >
            Week
          </button>
          <button 
            onClick={() => setSelectedView('month')}
            className={selectedView === 'month' ? 'active' : ''}
          >
            Month
          </button>
        </div>
      </header>
      
      <main className="calendar-container">
        <div className="calendar-view">
          <Calendar 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            tasks={tasks}
          />
        </div>

        <div className="tasks-container">
          <TaskManager
            selectedDate={selectedDate}
            tasks={tasks}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f8fafc',
          },
        }}
      />
      <AppContent />
    </AuthProvider>
  )
}

export default App
