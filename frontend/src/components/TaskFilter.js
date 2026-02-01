import React from 'react';
import '../styles/TaskFilter.css';

function TaskFilter(props) {
    const filterStatus = props.filterStatus;
    const setFilterStatus = props.onFilterChange;

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