const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

// Initialize tasks from Local Storage or set empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Variable to track the task being edited
let editingTaskItem = null;

// Function to save tasks to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  // Clear task list before rendering
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    // Create HTML elements for each task
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const taskContent = document.createElement("span");
    taskContent.className = "task-content";
    taskContent.textContent = task;

    const editButton = document.createElement("button");
    editButton.id = "edit";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";
    deleteButton.textContent = "Delete";

    // Appending elements to the task item
    taskItem.appendChild(taskContent);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Inserting the new task at the beginning of the task list
    taskList.appendChild(taskItem);

    // Event listener for editing the task
    editButton.addEventListener("click", function () {
      taskInput.value = taskContent.textContent;
      addButton.textContent = "Edit";
      editingTaskItem = taskItem;
    });

    // Event listener for deleting the task
    deleteButton.addEventListener("click", function () {
      // Remove task from tasks array
      tasks.splice(tasks.indexOf(task), 1);
      // Save tasks to Local Storage
      saveTasks();
      // Remove task item from the DOM
      taskList.removeChild(taskItem);
      taskInput.value = "";
      editingTaskItem = null;
      addButton.textContent = "Add";
    });
  });
}

// Event listener for form submission
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Checking if an existing task is being edited or a new task is being added
  if (!editingTaskItem) {
    addTask();
  } else {
    editTask();
  }
});

// Function to add a new task
function addTask() {
  // Getting the task input value and trimming whitespace
  const task = taskInput.value.trim();

  // Validating if a task is entered or not
  if (!task) {
    alert("Please enter a task.");
    return;
  }

  // Adding task to tasks array
  tasks.push(task);
  // Save tasks to Local Storage
  saveTasks();

  // Render tasks
  renderTasks();

  // Clearing the task input field
  taskInput.value = "";
}

// Function to edit an existing task
function editTask() {
  // Getting the edited task value and trimming whitespace
  const editedTask = taskInput.value.trim();

  // Validating if an edited task is entered or not
  if (!editedTask) {
    alert("Please enter a task.");
    return;
  }

  // Finding the content span of the task being edited
  const editedTaskContent = editingTaskItem.querySelector(".task-content");

  // Updating the content of the task
  editedTaskContent.textContent = editedTask;

  // Update tasks array
  tasks[tasks.indexOf(editedTaskContent.textContent)] = editedTask;
  // Save tasks to Local Storage
  saveTasks();

  // Resetting the Add button text and editingTaskItem variable
  addButton.textContent = "Add";
  editingTaskItem = null;

  // Clearing the task input field
  taskInput.value = "";
}

// Load tasks when the page loads
window.addEventListener("load", function () {
  renderTasks();
});
