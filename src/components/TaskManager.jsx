import { useState } from 'react'

function TaskManager({ selectedDate, tasks, onAddTask, onEditTask, onDeleteTask }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    deadline: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingTask) {
      onEditTask(editingTask.id, { ...taskForm, date: selectedDate })
    } else {
      onAddTask({ ...taskForm, date: selectedDate, id: Date.now() })
    }
    setIsModalOpen(false)
    setEditingTask(null)
    setTaskForm({ title: '', description: '', deadline: '' })
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setTaskForm({
      title: task.title,
      description: task.description,
      deadline: task.deadline
    })
    setIsModalOpen(true)
  }

  const filteredTasks = tasks.filter(
    task => task.date.toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="task-manager">
      <div className="task-header">
        <h3>Tasks for {selectedDate.toLocaleDateString()}</h3>
        <button onClick={() => setIsModalOpen(true)}>Add Task</button>
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-content">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              {task.deadline && <p>Deadline: {task.deadline}</p>}
            </div>
            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingTask ? 'Edit Task' : 'Add Task'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={taskForm.title}
                onChange={e => setTaskForm({...taskForm, title: e.target.value})}
                required
              />
              <textarea
                placeholder="Description"
                value={taskForm.description}
                onChange={e => setTaskForm({...taskForm, description: e.target.value})}
              />
              <input
                type="time"
                value={taskForm.deadline}
                onChange={e => setTaskForm({...taskForm, deadline: e.target.value})}
              />
              <div className="modal-actions">
                <button type="submit">{editingTask ? 'Save' : 'Add'}</button>
                <button type="button" onClick={() => {
                  setIsModalOpen(false)
                  setEditingTask(null)
                  setTaskForm({ title: '', description: '', deadline: '' })
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskManager 