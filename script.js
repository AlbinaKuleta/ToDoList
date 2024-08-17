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
        deleteBtn.addEventListener('click', () => taskItem.remove());
        taskItem.appendChild(deleteBtn);

        taskText.addEventListener('click', () => {
            taskText.classList.toggle('completed');
        });

        taskList.appendChild(taskItem);
        taskInput.value = "";

        taskMessage.textContent = "Todo item Created Successfully.";
        setTimeout(() => taskMessage.textContent = "", 2000);
    }
}

function editTask(taskItem, taskText) {
    const newTask = prompt("Edit your task", taskText.textContent);
    if (newTask !== null) {
        taskText.textContent = newTask;
    }
}
