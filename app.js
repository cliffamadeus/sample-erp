// Session storage keys
const USERS_KEY = "users";
const ADMINS_KEY = "admins";

// Initialize session storage if empty
if (!sessionStorage.getItem(USERS_KEY)) {
  sessionStorage.setItem(USERS_KEY, JSON.stringify([]));
}
if (!sessionStorage.getItem(ADMINS_KEY)) {
  sessionStorage.setItem(ADMINS_KEY, JSON.stringify([]));
}

// Toggle between login and signup forms
function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
}

// Handle login
function handleLogin() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const role = document.getElementById("loginRole").value;

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  const users = JSON.parse(sessionStorage.getItem(USERS_KEY));
  const admins = JSON.parse(sessionStorage.getItem(ADMINS_KEY));

  let userFound = false;

  if (role === "admin") {
    userFound = admins.some((user) => user.username === username);
  } else {
    userFound = users.some((user) => user.username === username);
  }

  if (userFound) {
    alert("Login successful!");
    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "welcome.html";
    }
  } else {
    alert("User not found. Please sign up.");
  }
}

// Handle signup
function handleSignup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.getElementById("signupRole").value;

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  const userData = { username, timestamp: new Date().toLocaleString() };

  if (role === "admin") {
    const admins = JSON.parse(sessionStorage.getItem(ADMINS_KEY));
    admins.push(userData);
    sessionStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
    alert("Admin account created successfully!");
    if (window.location.pathname.includes("admin-dashboard.html")) {
      window.location.reload(); // Refresh the admin dashboard
    } else {
      window.location.href = "admin-dashboard.html";
    }
  } else {
    const users = JSON.parse(sessionStorage.getItem(USERS_KEY));
    users.push(userData);
    sessionStorage.setItem(USERS_KEY, JSON.stringify(users));
    alert("User account created successfully!");
    if (window.location.pathname.includes("admin-dashboard.html")) {
      window.location.reload(); // Refresh the admin dashboard
    } else {
      window.location.href = "welcome.html";
    }
  }
}

// Logout function
function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

