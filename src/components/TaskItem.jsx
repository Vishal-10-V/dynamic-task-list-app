import React, { useState } from 'react';
import { FiTrash2, FiCheck } from 'react-icons/fi';

function TaskItem({ task, onDelete, onToggle }) {
  const [removing, setRemoving] = useState(false);

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 350);
  };

  // Calculate if task is overdue
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const isToday = task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString();

  // Format due date
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${removing ? 'removing' : ''}`}>
      {/* Custom Checkbox */}
      <button
        className={`check-btn ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}
        title={task.completed ? 'Mark as pending' : 'Mark as completed'}
      >
        {task.completed && <FiCheck className="check-icon" />}
      </button>

      {/* Task Content */}
      <div style={{ flex: 1 }}>
        {/* Task Text */}
        <div className="task-header">
          <span className={`task-text ${task.completed ? 'done-text' : ''}`}>
            {task.text}
          </span>
          {task.priority && (
            <span className={`priority-badge priority-${task.priority}`}>
              {task.priority === 'high' && '🔴'}
              {task.priority === 'medium' && '🟡'}
              {task.priority === 'low' && '🟢'}
              {task.priority}
            </span>
          )}
        </div>

        {/* Meta Information */}
        {(task.dueDate || task.category) && (
          <div className="task-meta">
            {task.dueDate && (
              <div className={`due-date ${isOverdue ? 'overdue' : isToday ? 'today' : ''}`}>
                📅 {formatDate(task.dueDate)}
              </div>
            )}
            {task.category && task.category !== 'general' && (
              <span className="category-tag">#{task.category}</span>
            )}
          </div>
        )}
      </div>

      {/* Delete button */}
      <button
        className="delete-btn"
        onClick={handleDelete}
        aria-label="Delete task"
        title="Delete task"
      >
        <FiTrash2 />
      </button>
    </li>
  );
}

export default TaskItem;
