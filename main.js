"use strict";
let tasks = [];
let taskIdCounter = 1;
function addTask(taskName) {
    const task = {
        id: taskIdCounter++,
        name: taskName
    };
    tasks.push(task);
    renderTasks();
}
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}
function renderTasks() {
    const taskListElement = document.getElementById('taskList');
    if (!taskListElement)
        return;
    taskListElement.innerHTML = '';
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.name;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(task.id));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskListElement.appendChild(listItem);
    });
}
function editTask(taskId) {
    const newTaskName = prompt('Enter new task name:');
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit && newTaskName !== null) {
        taskToEdit.name = newTaskName;
        renderTasks();
    }
}
const addTaskBtn = document.getElementById('addTaskBtn');
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
        const taskInput = document.getElementById('taskInput');
        if (!taskInput)
            return;
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            addTask(taskName);
            taskInput.value = '';
        }
        else {
            alert('Please enter a task.');
        }
    });
}
