import React from 'react';
import Carousel from './Carousel';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

// TaskList component for displaying tasks in a carousel format

function TaskList(props) {
    return (
        <div className="task-list-wrapper"> 
            <Carousel
                items={props.tasks}
                emptyMessage={<p className="no-tasks">No tasks found. Try a different filter!</p>}
                renderItem={function (task) { // render each task in the carousel
                    return (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={props.onToggle} 
                            onDelete={props.onDelete}
                            onEdit={props.onEdit}       
                        />
                    );
                }}
            />
        </div>
    );
}

export default TaskList;