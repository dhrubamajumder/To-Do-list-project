// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskBtn.addEventListener('click', addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Task cannot be empty!');
    return;
  }

  const task = createTaskElement(taskText);
  taskList.appendChild(task);
  saveTaskToLocalStorage(taskText);
  taskInput.value = '';
}

// Function to create a task element
function createTaskElement(taskText) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task-item';

  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;
  taskDiv.appendChild(taskContent);

  const actionButtons = document.createElement('div');

  // Update button
  const updateBtn = document.createElement('button');
  updateBtn.className = 'btn btn-warning btn-sm mr-2';
  updateBtn.textContent = '🖋';
  updateBtn.onclick = () => updateTask(taskContent);
  actionButtons.appendChild(updateBtn);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm';
  deleteBtn.textContent = '✖';                                 
  deleteBtn.onclick = () => deleteTask(taskDiv, taskText);
  actionButtons.appendChild(deleteBtn);

  taskDiv.appendChild(actionButtons);
  return taskDiv;
}

// Function to update a task
function updateTask(taskElement) {
  const newTaskText = prompt('Update the task:', taskElement.textContent);
  if (newTaskText && newTaskText.trim() !== '') {
    const oldTaskText = taskElement.textContent;
    taskElement.textContent = newTaskText.trim();
    updateTaskInLocalStorage(oldTaskText, newTaskText.trim());
  } else {
    alert('Task cannot be empty!');
  }
}

// Function to delete a task
function deleteTask(taskDiv, taskText) {
  if (confirm('Are you sure you want to delete this task?')) {
    taskDiv.remove();
    deleteTaskFromLocalStorage(taskText);
  }
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskText => {
    const task = createTaskElement(taskText);
    taskList.appendChild(task);
  });
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in localStorage
function updateTaskInLocalStorage(oldTaskText, newTaskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.indexOf(oldTaskText);
  if (taskIndex !== -1) {
    tasks[taskIndex] = newTaskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Delete task from localStorage
function deleteTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
