# Helfy Task Manager - Junior Full Stack Assignment

A task management application featuring a custom infinite carousel and smooth UX transitions.

---

## 🚀 Features
- **Custom Endless Carousel**: Implemented using React State and CSS animations (No external libraries).
- **Smooth Navigation**: Auto-scroll to the top when editing a task for better UX.
- **Task Filtering**: Filter by All, Pending, or Completed status.
- **Full CRUD**: Integration with a task service for managing task data.
- **Responsive Design**: Centered layout for both the form and task list.

---

## 🛠 Setup and Installation

### Backend Setup
1. Navigate to the `server` folder.
2. Run `npm install` to install dependencies.
3. Start the server by running `node app.js`.
   * The server runs on **http://localhost:4000**.

### Frontend Setup
1. Navigate to the `client` folder.
2. Run `npm install` to install dependencies.
3. Start the application by running `npm start`.
   * The application will open automatically at **http://localhost:3000**.

---

## API Documentation

The backend exposes a RESTful API for task management:

* **GET** `/api/tasks`: Fetches all tasks.
* **POST** `/api/tasks`: Creates a new task (Requires `title` and `priority`).
* **PUT** `/api/tasks/:id`: Updates an existing task.
* **PATCH** `/api/tasks/:id/toggle`: Toggles the task's completion status.
* **DELETE** `/api/tasks/:id`: Deletes a task by ID.

---



