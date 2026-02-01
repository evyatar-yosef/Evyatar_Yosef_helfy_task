import React, { useState, useEffect, useRef } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import taskService from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const formRef = useRef(null);

  useEffect(function () {
    fetchTasks();
  }, []);

  function fetchTasks() {
    setIsLoading(true);
    taskService.getAllTasks()
      .then(function (data) {
        setTasks(data);
        setIsLoading(false);
      })
      .catch(function (err) {
        setError("Failed to load tasks");
        setIsLoading(false);
      });
  }

  function handleCreateTask(taskData) {
    taskService.createTask(taskData)
      .then(function (newTask) {
        setTasks(function (prevTasks) {
          return [...prevTasks, newTask];
        });
      })
      .catch(function (err) {
        alert("Error: " + err.message);
      });
  }
  function handleEditClick(task) {
    setTaskToEdit(task);

    // smooth scroll to the form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  function handleToggleTask(id) {
    taskService.toggleTaskStatus(id)
      .then(function (updatedTask) {
        setTasks(function (prevTasks) {
          const newTasks = [];
          for (let i = 0; i < prevTasks.length; i++) {
            if (prevTasks[i].id === id) {
              newTasks.push(updatedTask);
            } else {
              newTasks.push(prevTasks[i]);
            }
          }
          return newTasks;
        });
      })
      .catch(function (err) {
        alert("Error toggling task: " + err.message);
      });
  }

  function handleDeleteTask(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete === true) {
      taskService.deleteTask(id)
        .then(function () {
          setTasks(function (prevTasks) {
            const filtered = [];
            for (let i = 0; i < prevTasks.length; i++) {
              if (prevTasks[i].id !== id) {
                filtered.push(prevTasks[i]);
              }
            }
            return filtered;
          });
        })
        .catch(function (err) {
          alert("Error deleting task: " + err.message);
        });
    }
  }

  function handleUpdateTask(id, updatedData) {
    taskService.updateTask(id, updatedData)
      .then(function (updatedTask) {
        setTasks(function (prevTasks) {
          const newTasks = [];
          for (let i = 0; i < prevTasks.length; i++) {
            if (prevTasks[i].id === id) {
              newTasks.push(updatedTask);
            } else {
              newTasks.push(prevTasks[i]);
            }
          }
          return newTasks;
        });
        setTaskToEdit(null);
      })
      .catch(function (err) {
        alert("Error updating task: " + err.message);
      });
  }

  // filter tasks
  const filteredTasks = tasks.filter(function (task) {
    if (filterStatus === 'completed') {
      return task.completed === true;
    }
    if (filterStatus === 'pending') {
      return task.completed === false;
    }
    return true;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Helfy Task Manager</h1>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        {/* edit or create task form */}
        <div ref={formRef}>
          <TaskForm
            onSubmit={taskToEdit ? handleUpdateTask : handleCreateTask}
            taskToEdit={taskToEdit}
            onCancel={function () { setTaskToEdit(null); }}
          />
        </div>

        {isLoading ? (
          <div className="loading-container">
            <p>Loading tasks from server...</p>
          </div>
        ) : (
          <section className="task-list-section">

            <h2>Your Tasks ({filteredTasks.length})</h2>

            {/* filter tasks */}
            <TaskFilter
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />

            {/* carousel */}
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditClick}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;