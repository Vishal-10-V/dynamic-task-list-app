import React from 'react';
import TaskItem from './TaskItem';
import { MdOutlinePlaylistAddCheck } from 'react-icons/md';

function TaskList({ tasks, onDelete, onToggle, filter }) {
  if (tasks.length === 0) {
    const emptyMessages = {
      all: { icon: '✨', title: 'No tasks yet!', sub: 'Add your first task above to get started.' },
      pending: { icon: '🎉', title: 'All caught up!', sub: 'No pending tasks — great work!' },
      completed: { icon: '📋', title: 'Nothing completed yet', sub: 'Complete a task to see it here.' },
    };
    const msg = emptyMessages[filter] || emptyMessages.all;

    return (
      <div className="empty-state">
        <span className="empty-icon">{msg.icon}</span>
        <h3 className="empty-title">{msg.title}</h3>
        <p className="empty-sub">{msg.sub}</p>
      </div>
    );
  }

  return (
    <ul className="task-list" role="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
