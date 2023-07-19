const inputTask = document.querySelector("#taskInput");
const addTaskButton = document.querySelector("#addButton");
const pendingSection = document.querySelector("#pendingTasks");
const completedSection = document.querySelector("#completedTasks");
const editTaskButton = document.querySelector("#editButton");
const deleteTaskButton = document.querySelector("#deleteButton");
const completeTaskButton = document.querySelector("#completeTaskButton");
const taskItem = document.createElement("li");

//EVENT LISTNERS

//0. Adding eventlistner to add button
addTaskButton.addEventListener("click", () => {
  const task = inputTask.value.trim();
  if (task !== "") {
    saveTaskToStorage(task);
    addTaskToWindow(task);

    inputTask.value = "";
  }
});

//2. Edit Button
//2. Completed Button
//4. Adding Event Listner to Task Item

//FUNCTIONS

//Time Function
function time() {
  let heading1 = document.getElementById("heading1");

  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = now.getHours();
  const mins = `${now.getMinutes()}`.padStart(2, 0);
  const secs = `${now.getSeconds()}`.padStart(2, 0);
  setTimeout(time, 1000);
  let date = `${day} / ${month} / ${year} , ${hour}:${mins}:${secs}`;
  heading1.textContent = date;
}
time();

//Keeping The Tasks when the window is reloaded
window.addEventListener("load", () => {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => {
    addTaskToWindow(task);
    completeTask(task);
  });
});

// window.addEventListener("load", () => {
//   const tasks = getTasksFromStorage();

//   // Clear both pending and completed tasks sections before rendering tasks from local storage
//   pendingSection.innerHTML = "";
//   // completedSection.innerHTML = "";

//   tasks.forEach((task) => {
//     addTaskToWindow(task.name, task.completed);
//   });
// });
// 3. loading tasks from local storage

function addTaskToWindow(task) {
  const taskItem = document.createElement("li");
  taskItem.textContent = task;
  // taskItem.classList.add("taskLi");
  taskItem.addEventListener("click", (e) => {
    let selected = e.target.textContent;
    console.log(selected);
  });
  pendingSection.appendChild(taskItem);
}
// 1.Getting Tasks From Local Storage
function getTasksFromStorage() {
  const tasks = localStorage.getItem("tasks");
  if (tasks != null) {
    return JSON.parse(tasks);
  }
  return [];
}
// 2. Saving Tasks to the local Storage
function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4. Renedering Tasks to the Window
// function addTaskToWindow(task) {
//   const taskItem = document.createElement("li");
//   // for (let i = 0; i < taskItem.innerText.length; i++) {
//   //   // console.log(taskItem[i]);
//   // }
//   taskItem.textContent = task;
//   // taskItem.classList.add("taskLi");
//   taskItem.addEventListener("click", (e) => {
//     let selected = e.target.textContent;
//     console.log(selected);
//   });
//   pendingSection.appendChild(taskItem);
// }

function addTaskToWindow(task, isCompleted = false) {
  const taskItem = document.createElement("li");
  taskItem.textContent = task;
  // taskItem.classList.add("taskLi");
  taskItem.addEventListener("click", (e) => {
    let selected = e.target.textContent;
    console.log(selected);
  });

  if (isCompleted) {
    completedSection.appendChild(taskItem);
  } else {
    pendingSection.appendChild(taskItem);
  }
}

//5. Moving Task to completed section
function moveTaskToCompleted() {
  pendingSection.removeChild(taskItem);
  completedSection.appendChild(taskItem);
}

// Attach a click event listener to each <li> element
// console.log(pendingSection);

// allan edit

// Function to Select a task
let tasks = getTasksFromStorage();
let selectTaskIndex = -1;

function selectTask(event) {
  let taskList = document.getElementById("pendingTasks");
  let listItems = taskList.getElementsByTagName("li");
  //remove the taskli class from all list items
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].classList.remove("taskLi");
  }

  //adding the selected class to the clicked list item
  event.target.classList.add("taskLi");

  //Finding the index of the selected task
  for (let j = 0; j < listItems.length; j++) {
    if (listItems[j].classList.contains("taskLi")) {
      selectTaskIndex = j;
      break;
    }
  }
}

//The Edit key
function editTask() {
  if (selectTaskIndex >= 0) {
    let newTaskName = prompt("Edit Task:");
    if (newTaskName !== null) {
      tasks[selectTaskIndex] = newTaskName; // Update the task name in the tasks array

      // Update the task name in the pending tasks list
      let taskList = document.getElementById("pendingTasks");
      let listItem = taskList.childNodes[selectTaskIndex];
      listItem.textContent = newTaskName;

      // Update tasks in local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}

// Delete task

function deleteTask() {
  if (selectTaskIndex >= 0) {
    tasks.splice(selectTaskIndex, 1); // Remove the task from the array
    let taskList = document.getElementById("pendingTasks");
    taskList.childNodes[selectTaskIndex].remove(); // Remove the list item from the task list
    selectTaskIndex = -1; // Reset the selected task index

    // Update tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Complete task Button

function completeTask() {
  if (selectTaskIndex >= 0) {
    let completedTask = tasks[selectTaskIndex];

    if (completedTask) {
      // tasks.splice(selectTaskIndex, 1); // Remove the task from the array
      let pendingList = document.getElementById("pendingTasks");
      let completedList = document.getElementById("completedTasks");

      // Remove the list item from the pending tasks list
      let listItem = pendingList.childNodes[selectTaskIndex];
      listItem.remove();
      // Create a new list item for the completed task
      let completedListItem = document.createElement("li");
      completedListItem.textContent = tasks[selectTaskIndex];
      completedList.appendChild(completedListItem); // Append the completed task to the completed tasks list
      selectTaskIndex = -1;
      // Reset the selected task index
    }
  }
}

// ...
