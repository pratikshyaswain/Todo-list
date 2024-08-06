// Variable initialization
let addBtn = document.getElementById("btn");
let taskInput = document.getElementById("input");
let listItems = document.getElementById("list-items");
let pendingTask = document.getElementById("pendingTasks");
let editText;
let taskData = JSON.parse(localStorage.getItem("taskData")) || [];

// Function to display tasks from local storage on load
window.onload = function () {
  taskData.forEach((task) => {
    let li = document.createElement("li");
    const tasks = `
      <div class="name">
        <p>${task.item}</p>
      </div>
     
      <div class="btn">
      <button class="complete" onclick="completeTask(this)"><i class="fa-solid fa-check"></i></button>
      <button class="edit" onclick="editTask(this)">EDIT</button>
      <button class="dlt" onclick="dltTask(this)"><i class="fa-solid fa-xmark"></i></button>
    </div>
    `;
    li.innerHTML = tasks;
    if (task.status) {
      li.querySelector("p").classList.add("strike");
      // Hide the edit button
      li.querySelector(".edit").style.display = "none";
    }
    listItems.appendChild(li);
  });
  updatePendingTaskCount();
};

// Function to add task
function addTask() {
  if (taskInput.value === "") {
    alert("Enter Task To Add!");
    taskInput.focus();
  } else {
    let li = document.createElement("li");
    const tasks = `
      <div class="name">
        <p class="name">${taskInput.value}</p>
      </div>
      <div class="btn">
        <button class="complete" onclick="completeTask(this)"><i class="fa-solid fa-check"></i></button>
        <button class="edit" onclick="editTask(this)">EDIT</button>
        <button class="dlt" onclick="dltTask(this)"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;
    li.innerHTML = tasks;
    listItems.appendChild(li);

    let item = { item: taskInput.value, status: false };
    taskData.push(item);
    localStorage.setItem("taskData", JSON.stringify(taskData));
    taskInput.value = "";
    updatePendingTaskCount();
  }
}

function completeTask(e) {
  let taskItem =
    e.parentElement.previousElementSibling.querySelector("p").innerText;
  let taskIndex = taskData.findIndex((task) => task.item === taskItem);
  if (taskIndex > -1) {
    taskData[taskIndex].status = true;
    localStorage.setItem("taskData", JSON.stringify(taskData));
    e.parentElement.previousElementSibling
      .querySelector("p")
      .classList.add("strike");
    // Hide the edit button
    e.parentElement.querySelector(".edit").style.display = "none";
    updatePendingTaskCount();
  }
}

// Function to edit selected task
function editSelectText() {
  let oldTaskItem = editText.innerText;
  editText.innerText = taskInput.value;
  addBtn.setAttribute("onclick", "addTask()");
  let taskIndex = taskData.findIndex((task) => task.item === oldTaskItem);
  if (taskIndex > -1) {
    taskData[taskIndex].item = taskInput.value;
  }
  localStorage.setItem("taskData", JSON.stringify(taskData));
  taskInput.value = "";
  updatePendingTaskCount();
}

// Function to edit the task
function editTask(e) {
  if (e.parentElement.previousElementSibling.querySelector("p")) {
    taskInput.value =
      e.parentElement.previousElementSibling.querySelector("p").innerText;
    addBtn.setAttribute("onclick", "editSelectText()");
    editText = e.parentElement.previousElementSibling.querySelector("p");
  }
}

// Function to delete task
function dltTask(e) {
  let dltText =
    e.parentElement.previousElementSibling.querySelector("p").innerText;
  if (confirm(`Are you sure you want to delete the task: ${dltText}?`)) {
    let index = taskData.findIndex((task) => task.item === dltText);
    if (index > -1) {
      taskData.splice(index, 1);
      localStorage.setItem("taskData", JSON.stringify(taskData));
      e.parentElement.parentElement.remove();
      updatePendingTaskCount();
    }
  }
}

// Function to update pending task count
function updatePendingTaskCount() {
  const countValue = document.querySelector(".countValue");
  const pendingCount = taskData.filter((task) => !task.status).length;
  countValue.innerText = pendingCount;
  if (pendingCount === 0) {
    pendingTask.classList.remove("hide");
  } else {
    pendingTask.classList.remove("hide");
  }
}

// function call to update the pending task count
updatePendingTaskCount();
