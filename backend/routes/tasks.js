const express = require('express');
const router = express.Router();
const validator = require('../middleware/validator');

let tasks = [];

router.get('/', function (req, res) {
    res.status(200).json(tasks);
});

router.post('/', validator.validateTask, function (req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
// must include title and priority
    if (!title || !priority) {
        return res.status(400).json({ error: "Title and priority are required" });
    }

    const newTask = {
        id: Date.now(),
        title: title,
        description: description || "",
        completed: false,
        createdAt: new Date(),
        priority: priority
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const completed = req.body.completed;

// search for the task in the database
    let taskIndex = -1;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            taskIndex = i;
            break;
        }
    }
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
// if their is a new value, update it else keep the old value
    tasks[taskIndex].title = title || tasks[taskIndex].title;
    tasks[taskIndex].description = description || tasks[taskIndex].description;
    tasks[taskIndex].priority = priority || tasks[taskIndex].priority;
    if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
    }

    res.status(200).json(tasks[taskIndex]);
});

router.patch('/:id/toggle', function (req, res) {
    const id = parseInt(req.params.id);
    
    let task = null;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            task = tasks[i];
            break;
        }
    }

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.completed = !task.completed;
    res.status(200).json(task);
});

router.delete('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });
// check id task is deleted
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;