
// dashboard.js

// Get DOM elements
const greeting = document.getElementById("greeting");
const dashboardLogoutBtn = document.getElementById("dashboard-logoutBtn");
const taskBody = document.getElementById("task-body");
const totalTasksEl = document.getElementById("total-tasks");
const progressTasksEl = document.getElementById("progress-tasks");
const finishedTasksEl = document.getElementById("finished-tasks");
const progressFill = document.getElementById("progress-fill");
const progressPercent = document.getElementById("progress-percent");
const searchInput = document.getElementById("search-task");
const sortSelect = document.getElementById("sort-tasks");
const toggleThemeBtn = document.getElementById("toggle-theme");

// Load user greeting
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
window.loggedInUser = loggedInUser;

if (!loggedInUser) {
  location.href = "../index.html";
} else {
  greeting.textContent = `👋 Welcome, ${loggedInUser.name}`;
}

// Logout handler
dashboardLogoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  location.href = "../index.html";
});

// Get tasks and ensure they have proper IDs
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Fix task IDs if missing
tasks = tasks.map((task, index) => {
  if (!task.id || typeof task.id !== 'string') {
    task.id = `task_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`;
  }
  if (!task.createdAt) {
    task.createdAt = new Date().toISOString();
  }
  return task;
});

// Save fixed tasks back to localStorage
localStorage.setItem("tasks", JSON.stringify(tasks));

function displayTasks(taskArray = tasks) {
  console.log("Displaying tasks:", taskArray);
  
  // Clear the task body
  taskBody.innerHTML = "";

  if (taskArray.length === 0) {
    taskBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No tasks found</td></tr>';
    updateSummary(taskArray);
    return;
  }

  taskArray.forEach((task, displayIndex) => {
    const tr = document.createElement("tr");
    const createdDate = task.createdAt ? new Date(task.createdAt).toLocaleString() : "N/A";

    tr.innerHTML = `
      <td>${displayIndex + 1}</td>
      <td>${task.text || 'Untitled Task'}</td>
      <td><span class="status ${task.status || 'in-progress'}">${(task.status || 'in-progress').replace("-", " ")}</span></td>
      <td>${createdDate}</td>
      <td>
        <button class="delete-btn" data-id="${task.id}">Delete</button>
        <button class="finish-btn" data-id="${task.id}" ${task.status === 'finished' ? 'disabled' : ''}>Finish</button>
      </td>
    `;
    taskBody.appendChild(tr);
  });

  updateSummary(taskArray);
}

function updateSummary(data) {
  const total = data.length;
  const inProgress = data.filter((t) => t.status === "in-progress").length;
  const finished = data.filter((t) => t.status === "finished").length;

  totalTasksEl.textContent = total;
  progressTasksEl.textContent = inProgress;
  finishedTasksEl.textContent = finished;

  const percent = total === 0 ? 0 : Math.round((finished / total) * 100);
  progressFill.style.width = `${percent}%`;
  progressPercent.textContent = `${percent}% Completed`;
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  refreshCurrentView();
});

// Sort functionality
sortSelect.addEventListener("change", () => {
  refreshCurrentView();
});

// Event delegation for task actions
taskBody.addEventListener("click", (e) => {
  const target = e.target;
  const taskId = target.dataset.id;

  console.log("Button clicked:", target.className, "Task ID:", taskId);
  console.log("Current tasks array:", tasks);

  if (!taskId) {
    console.log("No task ID found");
    return;
  }

  if (target.classList.contains("delete-btn")) {
    console.log("Delete button clicked for task:", taskId);
    
    if (confirm("Are you sure you want to delete this task?")) {
      // Find task index
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      console.log("Found task at index:", taskIndex);
      
      if (taskIndex !== -1) {
        // Remove task
        const removedTask = tasks.splice(taskIndex, 1);
        console.log("Removed task:", removedTask);
        
        // Update localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log("Updated localStorage, new tasks:", tasks);

        // Refresh view immediately
        refreshCurrentView();
      } else {
        console.log("Task not found in array");
      }
    }
  } else if (target.classList.contains("finish-btn")) {
    console.log("Finish button clicked for task:", taskId);
    
    // Find task index
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    console.log("Found task at index:", taskIndex);
    
    if (taskIndex !== -1 && tasks[taskIndex].status !== "finished") {
      // Update status
      tasks[taskIndex].status = "finished";
      console.log("Updated task status:", tasks[taskIndex]);
      
      // Update localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Updated localStorage, new tasks:", tasks);

      // Refresh view immediately
      refreshCurrentView();
    } else {
      console.log("Task not found or already finished");
    }
  }
});

// Function to refresh the current view while maintaining filters
function refreshCurrentView() {
  console.log("Refreshing view...");
  
  const searchValue = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;

  let filteredTasks = [...tasks];

  // Apply search filter if there's a search term
  if (searchValue) {
    filteredTasks = filteredTasks.filter((t) => 
      (t.text || '').toLowerCase().includes(searchValue)
    );
  }

  // Apply sort if selected
  if (sortValue === "newest") {
    filteredTasks.reverse();
  } else if (sortValue === "status") {
    filteredTasks.sort((a, b) => (a.status || 'in-progress').localeCompare(b.status || 'in-progress'));
  }

  console.log("Filtered tasks:", filteredTasks);
  displayTasks(filteredTasks);
}

let isDark = localStorage.getItem("theme") === "dark";

// Apply saved theme on load
if (isDark) {
  document.body.style.backgroundColor = "#152238";
  document.body.classList.add("dark-theme");
  toggleThemeBtn.textContent = "🌞 Toggle Theme";
} else {
  toggleThemeBtn.textContent = "🌓 Toggle Theme";
}

// Theme toggle logic
toggleThemeBtn.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    document.body.style.backgroundColor = "#071630";
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    toggleThemeBtn.textContent = "🌞 Toggle Theme";
  } else {
    document.body.style.backgroundColor = "#f4f6f8";
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    toggleThemeBtn.textContent = "🌓 Toggle Theme";
  }
});


// Listen for storage changes from other tabs/pages
window.addEventListener('storage', (e) => {
  if (e.key === 'tasks') {
    console.log("Storage changed, reloading tasks");
    tasks = JSON.parse(e.newValue || '[]');
    refreshCurrentView();
  }
});

// Listen for focus events to refresh when user comes back to this tab
window.addEventListener('focus', () => {
  const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (JSON.stringify(currentTasks) !== JSON.stringify(tasks)) {
    console.log("Tasks changed while tab was not focused, reloading");
    tasks = currentTasks;
    refreshCurrentView();
  }
});

// Also listen for visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (JSON.stringify(currentTasks) !== JSON.stringify(tasks)) {
      console.log("Tasks changed while tab was hidden, reloading");
      tasks = currentTasks;
      refreshCurrentView();
    }
  }
});

// Redirect to add task page
const addTaskBtnDashboard = document.getElementById("add-task");
if (addTaskBtnDashboard) {
  addTaskBtnDashboard.addEventListener("click", () => {
    location.href = "../to_do.html";
  });
}

// Initial load
displayTasks(tasks);
