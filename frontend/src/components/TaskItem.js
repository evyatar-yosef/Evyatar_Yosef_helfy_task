import React from 'react';
import '../styles/TaskItem.css';

// TaskItem component for displaying a single task

function TaskItem(props) {
    const task = props.task; // task data

    function onDeleteClick() { // handle delete click
        props.onDelete(task.id);
    }

    function onToggleClick() { // handle toggle click
        props.onToggle(task.id);
    }

    return (
        <div className={"task-item priority-" + task.priority + (task.completed ? " task-completed" : "")}>
            <div className="task-info">
                <h3 className="task-title"> 
                    {task.title} 
                </h3>
                <p className="task-desc">{task.description}</p> 
                <div className="task-meta">
                    <span className="priority-badge">{task.priority}</span>
                    <span className="task-date">
                        {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div className="task-actions">
                <button
                    className="btn-status"
                    onClick={onToggleClick}
                    title={task.completed ? "Mark as Pending" : "Mark as Completed"}
                >
                    {task.completed ? "uncopmlete" : "complete"}    
                </button>
                <button className="btn-edit" onClick={function () { props.onEdit(task); }}>
                    Edit
                </button>
                <button
                    className="btn-delete"
                    onClick={onDeleteClick}
                    title="Delete Task"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;