import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

function FilterBar({ filter, setFilter, completedCount, onClearCompleted }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted} title="Clear all completed tasks">
          <FiTrash2 />
          <span>Clear Completed</span>
        </button>
      )}
    </div>
  );
}

export default FilterBar;
