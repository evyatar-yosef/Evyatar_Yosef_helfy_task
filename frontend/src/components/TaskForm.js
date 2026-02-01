import React, { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

function TaskForm(props) {
    // task fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');

    useEffect(function () {
        if (props.taskToEdit) {
            setTitle(props.taskToEdit.title);
            setDescription(props.taskToEdit.description);
            setPriority(props.taskToEdit.priority);
        } else {
            setTitle('');
            setDescription('');
            setPriority('medium');
        }
    }, [props.taskToEdit]);

    function handleSubmit(event) {
        event.preventDefault();

        if (title.trim() === "") {
            alert("Title is required");
            return;
        }

        const taskData = {
            title: title,
            description: description,
            priority: priority
        };

        if (props.taskToEdit) {
            props.onSubmit(props.taskToEdit.id, taskData);
        } else {
            props.onSubmit(taskData);
        }

        // reset form
        setTitle('');
        setDescription('');
        setPriority('medium');
    }
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            {/* dinamic header */}
            <h3>{props.taskToEdit ? 'Edit Task' : 'Create New Task'}</h3>

            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={function (e) { setTitle(e.target.value); }}
                    placeholder="Enter task title"
                />
            </div>

            <div className="form-group">
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={function (e) { setDescription(e.target.value); }}
                    placeholder="Enter description"
                />
            </div>

            <div className="form-group">
                <label>Priority:</label>
                <select
                    value={priority}
                    onChange={function (e) { setPriority(e.target.value); }}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="form-actions">
                {/* button cahnge according o the mode */}
                <button type="submit">
                    {props.taskToEdit ? 'Save Changes' : 'Add Task'}
                </button>

                {/* cancel button only in edit mode */}
                {props.taskToEdit && (
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={function () { props.onCancel(); }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default TaskForm;