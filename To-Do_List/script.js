
// from here we can open login and signup modal
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signup-page-Btn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const closeButtons = document.querySelectorAll("[data-close]");
const signupLink = document.getElementById("signupLink");
const loginLink = document.getElementById("loginLink");
const forgotPasswordLink = document.querySelector(".forgot-password");
const forgotModal = document.getElementById("forgotModal");
// when user click on get started free button, signup modal will open
const ctaSignupBtn = document.getElementById("cta-signup");

// when user click on login button, login modal will open
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "flex";
  });
}
// when user click on signup button, signup modal will open
if (signupBtn) {
  signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.style.display = "flex";
  });
}
// when user click on forgot password link, forgot password modal will open
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    forgotModal.style.display = "flex";
  });
}
// when user click get started free button, signup modal will open
if (ctaSignupBtn){
  ctaSignupBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    signupModal.style.display = "flex";
  })
}
// when user click on close button, modal will close
closeButtons.forEach((btn) => {
  btn.onclick = () => {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
    forgotModal.style.display = "none";
    
  };
});

window.onclick = (e) => {
  if (e.target === loginModal) loginModal.style.display = "none";
  if (e.target === signupModal) signupModal.style.display = "none";
  if (e.target === forgotModal) forgotModal.style.display = "none";
};
// when user open login modal and click on signup link, login modal will close and signup modal will open
if (signupLink) {
  signupLink.addEventListener("click", () => {
    loginModal.style.display = "none";
    signupModal.style.display = "flex";
  });
}
// signup page password toggle
const signupEyeToggle = document.getElementById("signup-eye-toggle");
if (signupEyeToggle) {
  const signupPasswordInput = document.getElementById("signup-password");
  signupEyeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (signupPasswordInput.type === "password") {
      signupPasswordInput.type = "text";
      signupEyeToggle.classList.remove("fa-eye-slash");
      signupEyeToggle.classList.add("fa-eye");
    } else {
      signupPasswordInput.type = "password";
      signupEyeToggle.classList.remove("fa-eye");
      signupEyeToggle.classList.add("fa-eye-slash");
    }
  });
}
//  when user open signup modal and click on login link, signup modal will close and login modal will open
if (loginLink) {
  loginLink.addEventListener("click", () => {
    signupModal.style.display = "none";
    loginModal.style.display = "flex";
  });
}
// login page password toggle
const loginEyeToggle = document.getElementById("login-eye-toggle");
if (loginEyeToggle) {
  const loginPasswordInput = document.getElementById("login-password");
  loginEyeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginPasswordInput.type === "password") {
      loginPasswordInput.type = "text";
      loginEyeToggle.classList.remove("fa-eye-slash");
      loginEyeToggle.classList.add("fa-eye");
    } else {
      loginPasswordInput.type = "password";
      loginEyeToggle.classList.remove("fa-eye");
      loginEyeToggle.classList.add("fa-eye-slash");
    }
  });
}
// when user click on forgot password link, forgot password modal will open and login modal will close
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", () => {
    loginModal.style.display = "none";
    forgotModal.style.display = "flex";
  });
}
// when user enter registered email in forgot password modal and click on reset password button, then verify email from saved email in local storage and and new password input modal open and update that new password in local storage
const forgotBtn = document.querySelector(".forgot-btn");
if (forgotBtn) {
  forgotBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const forgotEmail = document.getElementById("forgot-email").value.trim();
    if (!forgotEmail) {
      alert("Please enter your email");
      return;
    }
    const users = JSON.parse(localStorage.getItem("todo-users")) || [];
    const user = users.find(
      (user) => user.email.toLowerCase() === forgotEmail.toLowerCase(),
    );
    if (!user) {
      alert("Email not found");
      return;
    }
    forgotModal.style.display = "none";
    const newPasswordModal = document.createElement("div");
    newPasswordModal.classList.add("modal");
    newPasswordModal.innerHTML = `
      <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Reset Password</h2>
        <input type="password" id="new-password" placeholder="New Password" />
        <button class="reset-btn">Reset Password</button>
      </div>
    `;
    document.body.appendChild(newPasswordModal);
    newPasswordModal.style.display = "flex";
    const resetBtn = document.querySelector(".reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const newPassword = document.getElementById("new-password").value;
        if (!newPassword) {
          alert("Please enter a new password");
          return;
        }
        if (newPassword.length < 6) {
          alert("Password must be at least 6 characters long");
          return;
        }
        user.password = newPassword;
        localStorage.setItem("todo-users", JSON.stringify(users));
        alert("Password reset successfully");
        newPasswordModal.style.display = "none";
      });
    }
  });
}

// signup form validation and register user in local storage

// ✅ Email Validator
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// ✅ Signup form handler
const signupForm = document.querySelector(".create-btn");
if (signupForm) {
  signupForm.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // ✅ Fetch users from localStorage (parse as array)
    let users = JSON.parse(localStorage.getItem("todo-users")) || [];

    // ✅ Check for duplicate email
    const userExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (userExists) {
      alert("❌ This email is already registered.");
      return;
    }

    // ✅ Add new user
    const newUser = { name, email, password };
    users.push(newUser);

    // ✅ Save back to localStorage
    localStorage.setItem("todo-users", JSON.stringify(users));

    alert("✅ User registered successfully!");

    // ✅ Close signup, open login
    signupModal.style.display = "none";
    loginModal.style.display = "flex";

    // ✅ Clear form fields
    document.getElementById("signup-name").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-password").value = "";
  });
}

//  login page validation and login user from local storage

const loginForm = document.querySelector(".login-btn");
if (loginForm) {
  loginForm.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
    // get users from local storage to check if user exists
    let users = JSON.parse(localStorage.getItem("todo-users")) || [];
    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password,
    );
    if (!user) {
      alert("Invalid email or password");
      return;
    } else {
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // ✅ Add this

      window.location.href = "dashboard/dashboard.html";
    }
  });
}
//  login user name display in to_do.html page
// Show logged-in username
const usernameDisplay = document.getElementById("username-display");
window.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (window.loggedInUser && window.loggedInUser.name && usernameDisplay) {
  usernameDisplay.textContent = `👋 ${window.loggedInUser.name}`;
}

//  logout user and redirect to index.html page
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    location.href = "index.html";
  });
}

// when user input task in input field and click on add task button, task will be added in local storage and display in todo list
const addTaskBtn = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("todo-input");
const todoBody = document.getElementById("todo-body");

// Load tasks on page load (optional)
window.onload = () => {
  displayTasks();
};

// Add new task
if (addTaskBtn) {
  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();

    if (!taskText) {
      alert("Please enter a task");
      return;
    }
    if (taskText.length < 5) {
      alert("Task must be at least 5 characters long");
      return;
    }
    // Prevent numeric-only input
    if (!/[a-zA-Z]/.test(taskText)) {
      alert("Task must include at least one letter");
      return;
    }

    // Check for duplicate tasks
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const duplicate = tasks.find(
      (t) => t.text.toLowerCase() === taskText.toLowerCase(),
    );

    if (duplicate) {
      alert("This task already exists");
      return;
    }

    tasks.push({ 
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: taskText, 
      status: "in-progress",
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    todoInput.value = "";
    displayTasks();
  });
}

// Function to display tasks in the table
function displayTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (!todoBody) return;
  todoBody.innerHTML = ""; // Clear table first

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.text}
      <button class="edit-btn" title="Edit Task">
      <i class="fa fa-edit"></i>
      </button>
      </td>
      <td><span class="status ${task.status === "finished" ? "finished" : "in-progress"}">
        ${task.status === "finished" ? "Finished" : "In progress"}</span>
      </td>
      <td>
        <button class="btn delete">DELETE</button>
        <button class="btn finished">FINISHED</button>
      </td>
    `;

    // DELETE functionality

    row.querySelector(".delete").onclick = () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this task?",
      );
      if (confirmDelete) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
      }
    };
    // edit task functionality
    // Edit functionality
const editBtn = row.querySelector(".edit-btn");

    editBtn.onclick = () => {
      if (task.status === "finished") {
        editBtn.disabled = true;
        editBtn.title = "Finished task cannot be edited";
        editBtn.style.cursor = "not-allowed";
        editBtn.style.color = "#999";
        alert("Finished task cannot be edited")
        return;
      }

      // Prompt user to edit the task
      const newTask = prompt("Edit your task:", task.text);
      if (newTask && /[a-zA-Z]/.test(newTask) && newTask.length >= 5) {
        tasks[index].text = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
      }
    };

    // FINISHED functionality
    row.querySelector(".finished").onclick = () => {
      tasks[index].status = "finished";
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    todoBody.appendChild(row);
  });
}


// ✅ Apply theme on load (same as dashboard toggle effect)
// check dark mode is enabled or not
const allowedDarkPages = ["dashboard.html", "to_do.html"];
const currentPage = window.location.pathname.split("/").pop();
// Load and apply saved theme from dashboard
if (allowedDarkPages.includes(currentPage)) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    document.body.style.backgroundColor = "#152238";
  }
}

