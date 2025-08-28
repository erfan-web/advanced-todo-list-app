document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const themeToggle = document.getElementById("themeToggle");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const filterSelect = document.getElementById("filterSelect");
  const priorityFilter = document.getElementById("priorityFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  // State variables
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Initialize the app
  init();

  // Event Listeners
  addTaskBtn.addEventListener("click", addTask);
  themeToggle.addEventListener("click", toggleTheme);

  function init() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
    renderTasks()
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: "medium",
      dueDate: "",
      categories: [],
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    taskInput.value = "";
    saveTask()
    renderTasks()
  }
  function saveTask(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme == "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    updateThemeIcon(newTheme);
  }
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("i");
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  function renderTasks() {

  }
});
