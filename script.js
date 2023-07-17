const inputTask = document.querySelector("#taskInput");
const addTaskButton = document.querySelector("#addButton");
const pendingSection = document.querySelector("#pendingTasks");
const completedSection = document.querySelector(".completedTasks");
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
// 1 Delete Button

///////////////////////////////////////////////////////////////////

// for (var item of listItems) {
//   var itemText = item.textContent;
//   console.log("Item: " + itemText);
// }

//////////////////////////////////////////////////////////////////
// Get all the <li> elements

//1.Delete Button
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
  heading1.textContent = `${day} / ${month} / ${year} , ${hour}:${mins}:${secs}`;
}
time();
//Keeping The Tasks when the window is reloaded
window.addEventListener("load", () => {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => {
    addTaskToWindow(task);
  });
});

// 3. loading tasks from local storage

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
function addTaskToWindow(task) {
  const taskItem = document.createElement("li");
  for (let i = 0; i < taskItem.innerText.length; i++) {
    console.log(taskItem[i]);
  }
  taskItem.textContent = task;
  taskItem.classList.add("taskLi");
  taskItem.addEventListener("click", (e) => {
    let selected = e.target.textContent;
    // console.log(selected);

    editTaskButton.addEventListener("click", function (e) {
      let saveSelected = [];
      // for (let i = 0; i < selected.length; i++) {
      //  saveSelected.push(selected[i]);
      // console.log(selected[]);
      // }

      // saveSelected.push(selected);
      // for (let i = 0; i < saveSelected.length; i++)
      // {
      //   console.log(selected[i]);
      // }
    });
  });
  pendingSection.appendChild(taskItem);
}

//5. Moving Task to completed section
function moveTaskToCompleted() {
  pendingSection.removeChild(taskItem);
  completedSection.appendChild(taskItem);
}

// Attach a click event listener to each <li> element
// console.log(pendingSection);

// allan edit
