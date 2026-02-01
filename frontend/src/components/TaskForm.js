import React, { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

// TaskForm component for creating and editing tasks

function TaskForm(props) {
    // task fields
    const [title, setTitle] = useState(''); // task title
    const [description, setDescription] = useState(''); // task description
    const [priority, setPriority] = useState('medium'); // task priority

    useEffect(function () { // update form when taskToEdit changes
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

    function handleSubmit(event) { // handle form submission
        event.preventDefault();

        if (title.trim() === "") { // validate title
            alert("Title is required");
            return;
        }

        const taskData = {
            title: title,
            description: description,
            priority: priority
        };

        if (props.taskToEdit) { // if editing, call onSubmit with id and task data
            props.onSubmit(props.taskToEdit.id, taskData);
        } else { // if creating, call onSubmit with task data
            props.onSubmit(taskData);
        }

        // reset form
        setTitle('');
        setDescription('');
        setPriority('medium');
    }
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            {/* dinamic header according to the current mode*/}
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