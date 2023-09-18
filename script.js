// Selectors for input Box, task, and list container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCount = document.getElementById("task-count");

let tasksLeft = 0; // Variable to keep track of tasks left

// Load tasksLeft from localStorage if available
if (localStorage.getItem("tasksLeft")) {
    tasksLeft = parseInt(localStorage.getItem("tasksLeft"));
}

// Function to update task count
function updateTaskCount() {
    taskCount.textContent = `Tasks left: ${tasksLeft}`;
}

// Function to ADD a task to the list container
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        tasksLeft++; // Increment task count
        updateTaskCount(); // Update the displayed task count
        saveData();
    }
    inputBox.value = "";   // Clear the input box
}

// EventListener to toggle tasks as done or remove them
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("check");

        if (e.target.classList.contains("check")) {
            tasksLeft--; // Decrement task count when a task is marked as done
        } else {
            tasksLeft++; // Increment task count when unmarked
        }
        updateTaskCount();
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        const parentLI = e.target.parentElement;

        if (!parentLI.classList.contains("check")) {
            // Only decrement tasksLeft if the task is not marked as done
            tasksLeft--;
        }

        parentLI.remove();
        updateTaskCount();
        saveData();
    }
}, false);

// Function to save data in localStorage 
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("tasksLeft", tasksLeft.toString()); // Save tasksLeft as a string
}

// Function to show data from localStorage
function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateTaskCount();
}

showData(); // Call to 