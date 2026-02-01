import React from 'react';
import '../styles/TaskFilter.css';

// TaskFilter component for filtering tasks by status

function TaskFilter(props) {
    const filterStatus = props.filterStatus; // current filter status
    const setFilterStatus = props.onFilterChange; // function to set filter status

    return (
        <div className="filter-container">
            <button 
                className={filterStatus === 'all' ? 'active' : ''} 
                onClick={function() { setFilterStatus('all'); }}
            >
                All
            </button>
            <button 
                className={filterStatus === 'pending' ? 'active' : ''} 
                onClick={function() { setFilterStatus('pending'); }}
            >
                uncompleted
            </button>
            <button 
                className={filterStatus === 'completed' ? 'active' : ''} 
                onClick={function() { setFilterStatus('completed'); }}
            >
                Completed
            </button>
        </div>
    );
}

export default TaskFilter;