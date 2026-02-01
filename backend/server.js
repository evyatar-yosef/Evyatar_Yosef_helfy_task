const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000; 
const taskRoutes = require('./routes/tasks');

// Middlewares 
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Home route
app.get('/', function (req, res) {
    res.status(200).send('Task Manager API is running');
});

app.listen(port, function () {
    console.log('Server is running on port ' + port);
});