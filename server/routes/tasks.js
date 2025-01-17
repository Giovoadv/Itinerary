import express from 'express';
import Task from '../models/Task.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all tasks for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create a new task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user.userId
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Update a task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  
  console.log('Delete request received for task:', id);
  console.log('User ID:', req.user.userId);
  
  if (!id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  try {
    // Verify the task exists and belongs to the user before deletion
    const taskToDelete = await Task.findOne({
      _id: id,
      userId: req.user.userId
    });

    console.log('Task to delete:', taskToDelete);

    if (!taskToDelete) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Delete the task
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      userId: req.user.userId
    });

    console.log('Deleted task:', deletedTask);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ 
      message: 'Task deleted successfully', 
      task: deletedTask 
    });
  } catch (error) {
    console.error('Delete task error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }
    res.status(500).json({ message: 'Error deleting task' });
  }
});

export default router; 