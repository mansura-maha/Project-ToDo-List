document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}
function addTask() {
    let textInput = document.getElementById('taskInput');
    let taskText = textInput.value;

    if (!taskText.trim()) {
        alert("Please enter a task!");
        return;
    }
    addTaskToDOM(taskText);
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    textInput.value = "";
}
function addTaskToDOM(taskText) {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span>
            <span class="update btn btn-primary" onclick="updateTask(this)">Update</span>
            <span class="delete btn btn-danger" onclick="deleteTask(this)">Delete</span>
        </span>
    `;
    ul.appendChild(li);
}
function updateTask(element) {
    let li = element.parentElement.parentElement;
    let taskSpan = li.querySelector('.task-text');
    let currentText = taskSpan.innerText;
    let updatedText = prompt("Update your task:", currentText);

    if (updatedText && updatedText.trim() !== "") {
        taskSpan.innerText = updatedText.trim();
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.map(task => task === currentText ? updatedText.trim() : task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.querySelector('.task-text').innerText;
    li.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
