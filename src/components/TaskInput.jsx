import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

function TaskInput({ onAdd }) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('general');

  const categories = ['general', 'work', 'personal', 'shopping', 'health', 'finance'];
  const priorities = ['low', 'medium', 'high'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd({ text: value, priority, dueDate, category });
      setValue('');
      setPriority('medium');
      setDueDate('');
      setCategory('general');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <div className="extended-input">
        {/* Task Text */}
        <div className="input-group">
          <label className="input-label">Task</label>
          <input
            type="text"
            className="input-field"
            placeholder="What do you need to do?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            maxLength={120}
          />
        </div>

        {/* Due Date */}
        <div className="input-group">
          <label className="input-label">📅 Due Date</label>
          <input
            type="date"
            className="input-field"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Priority */}
        <div className="input-group">
          <label className="input-label">Priority</label>
          <select
            className="input-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p === 'high' && '🔴'} {p === 'medium' && '🟡'} {p === 'low' && '🟢'} {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="input-group">
          <label className="input-label">Category</label>
          <select
            className="input-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Add Button */}
        <div className="input-group">
          <label className="input-label">&nbsp;</label>
          <button 
            type="submit" 
            className="add-btn"
            disabled={!value.trim()}
            title="Press Ctrl+Enter or click to add"
          >
            <FiPlus className="add-icon" />
            <span>Add</span>
          </button>
        </div>
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem', textAlign: 'center' }}>
        💡 Tip: Press Ctrl+Enter to quickly add task
      </div>
    </form>
  );
}

export default TaskInput;
