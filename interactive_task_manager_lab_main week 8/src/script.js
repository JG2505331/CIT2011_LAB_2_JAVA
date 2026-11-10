console.log("JavaScript file loaded successfully");

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item", task.priority);

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const title = document.createElement("span");
        title.textContent = task.title;

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        const toggleButton = document.createElement("button");
        toggleButton.textContent = task.completed ? "Undo" : "Complete";
        toggleButton.classList.add("toggle-btn");

        toggleButton.addEventListener("click", function() {
            toggleTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        actions.appendChild(toggleButton);
        actions.appendChild(deleteButton);

        taskItem.appendChild(title);
        taskItem.appendChild(actions);

        taskList.appendChild(taskItem);
    });
}

function addTask(title, priority) {
    const newTask = {
        id: Date.now(),
        title: title,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();
}

function toggleTask(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const priority = taskPriority.value;

    if (title === "") {
        return;
    }

    addTask(title, priority);

    taskForm.reset();
});

displayTasks();
