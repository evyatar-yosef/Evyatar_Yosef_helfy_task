const API_URL = 'http://localhost:4000/api/tasks';

const taskService = {
// GET all tasks
    getAllTasks: function () {
        return fetch(API_URL)
            .then(function (response) {
                if (response.ok === false) {
                    throw new Error('Failed to fetch tasks');
                }
                return response.json();
            });
    },

// POST a new task
    createTask: function (taskData) {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
            .then(function (response) {
                if (response.ok === false) {
                    throw new Error('Failed to create task');
                }
                return response.json();
            });
    },

// PUT - update an existing task
    updateTask: function (id, updatedData) {
        return fetch(API_URL + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(function (response) {
                if (response.ok === false) {
                    throw new Error('Failed to update task');
                }
                return response.json();
            });
    },

// PATCH - toggle completion status
    toggleTaskStatus: function (id) {
        return fetch(API_URL + '/' + id + '/toggle', {
            method: 'PATCH'
        })
            .then(function (response) {
                if (response.ok === false) {
                    throw new Error('Failed to toggle task');
                }
                return response.json();
            });
    },

// DELETE a task
    deleteTask: function (id) {
        return fetch(API_URL + '/' + id, {
            method: 'DELETE'
        })
            .then(function (response) {
                if (response.ok === false) {
                    throw new Error('Failed to delete task');
                }
                return response.json();
            });
    }
};

export default taskService;