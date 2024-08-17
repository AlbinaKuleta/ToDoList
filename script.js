document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskMessage = document.getElementById('task-message');

    if (taskInput.value.trim() !== "") {
        const taskItem = document.createElement('li');
        
        const taskText = document.createElement('span');
        taskText.textContent = taskInput.value;
        taskItem.appendChild(taskText);

        const editBtn = document.createElement('button');
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener('click', () => editTask(taskItem, taskText));
        taskItem.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });
        taskItem.appendChild(deleteBtn);

        taskText.addEventListener('click', () => {
            taskText.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(taskItem);
        taskInput.value = "";

        taskMessage.textContent = "Task added successfully!";
        setTimeout(() => taskMessage.textContent = "", 2000);

        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add('completed');
        }
        taskItem.appendChild(taskText);

        const editBtn = document.createElement('button');
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener('click', () => editTask(taskItem, taskText));
        taskItem.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });
        taskItem.appendChild(deleteBtn);

        taskText.addEventListener('click', () => {
            taskText.classList.toggle('completed');
            saveTasks();
        });

        document.getElementById('task-list').appendChild(taskItem);
    });
}

function editTask(taskItem, taskText) {
    const newTask = prompt("Edit your task", taskText.textContent);
    if (newTask !== null) {
        taskText.textContent = newTask;
        saveTasks();
    }
}
