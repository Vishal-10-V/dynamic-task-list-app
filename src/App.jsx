import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdChecklist } from 'react-icons/md';

function App() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('taskflow-dark') === 'true';
    } catch {
      return false;
    }
  });

  // ── Persist tasks to localStorage ─────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── Persist dark mode ─────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('taskflow-dark', darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const addTask = (taskData) => {
    const { text, priority, dueDate, category } = taskData;
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      priority: priority || 'medium',
      dueDate: dueDate || null,
      category: category || 'general',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  // ── Derived stats ──────────────────────────────────────────────────────────
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
      {/* Background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-brand">
            <MdChecklist className="brand-icon" />
            <div>
              <h1 className="app-title">TaskFlow</h1>
              <p className="app-subtitle">Stay organised, stay ahead</p>
            </div>
          </div>

          <button
            className="dark-toggle"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </header>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card stat-pending">
            <span className="stat-number">{pendingCount}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card stat-done">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        {/* Input */}
        <TaskInput onAdd={addTask} />

        {/* Filter bar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        {/* Task list */}
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          filter={filter}
        />
      </div>
    </div>
  );
}

export default App;
