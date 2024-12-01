const express = require('express');
const cors = require('cors');
const app = express();
 
app.use(cors());
app.use(express.json());
 
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];
 
// Endpoint 1: Add a Task
app.get('/tasks/add', (req, res) => {
  const { taskId, text, priority } = req.query;//Alternate for let taskId = req.query.taskId;
  if (!taskId || !text || !priority) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }
  tasks.push({ taskId: parseInt(taskId), text, priority: parseInt(priority) });
  res.send({ tasks });
});
 
// Endpoint 2: Get All Tasks
app.get('/tasks', (req, res) => {
  res.send({ tasks });
});
 
// Endpoint 3: Sort Tasks by Priority
app.get('/tasks/sort-by-priority', (req, res) => {
  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
  res.send({ tasks: sortedTasks });
});
 
// Endpoint 4: Edit Task Priority
app.get('/tasks/edit-priority', (req, res) => {
  const { taskId, priority } = req.query;
  if (!taskId || !priority) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }
  tasks = tasks.map(task =>
    task.taskId === parseInt(taskId) ? { ...task, priority: parseInt(priority) } : task
  );
  res.send({ tasks });
});
 
// Endpoint 5: Edit Task Text
app.get('/tasks/edit-text', (req, res) => {
  const { taskId, text } = req.query;
  if (!taskId || !text) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }
  tasks = tasks.map(task =>
    task.taskId === parseInt(taskId) ? { ...task, text } : task
  );
  res.send({ tasks });
});
 
// Endpoint 6: Delete a Task
app.get('/tasks/delete', (req, res) => {
  const { taskId } = req.query;
  if (!taskId) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }
  tasks = tasks.filter(task => task.taskId !== parseInt(taskId));
  res.send({ tasks });
});
 
// Endpoint 7: Filter Tasks by Priority
app.get('/tasks/filter-by-priority', (req, res) => {
  const { priority } = req.query;
  if (!priority) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }
  const filteredTasks = tasks.filter(task => task.priority === parseInt(priority));
  res.send({ tasks: filteredTasks });
});
 
// Start the server
const port = 3000;
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});




