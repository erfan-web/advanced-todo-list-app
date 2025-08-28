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

  filterSelect.addEventListener('change', renderTasks);
  priorityFilter.addEventListener('change', renderTasks);
  categoryFilter.addEventListener('change', renderTasks);

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
    const filterValue = filterSelect.value;
    const priorityValue = priorityFilter.value;
    const categoryValue = categoryFilter.value;
    const searchValue = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        // Filter by status
        if (filterValue === 'completed' && !task.completed) return false;
        if (filterValue === 'pending' && task.completed) return false;
        
        // Filter by priority
        if (priorityValue !== 'all' && task.priority !== priorityValue) return false;
        
        // Filter by category
        if (categoryValue !== 'all') {
            if (!task.categories || !task.categories.includes(categoryValue)) return false;
        }
        
        // Filter by search
        if (searchValue && !task.text.toLowerCase().includes(searchValue)) return false;
        
        return true;
    });

    if (filteredTasks.length === 0) {
      taskList.innerHTML = `
          <div class="empty-state">
              <i class="fas fa-tasks"></i>
              <p>No tasks found</p>
              <small>Try changing your filters or add a new task</small>
          </div>
      `;
      return;
    }

    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.setAttribute('data-id', task.id);
      taskItem.setAttribute('draggable', 'true');

      taskItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      ${task.priority ? `<span class="task-priority priority-${task.priority}">${task.priority}</span>` : ''}
      <div class="task-actions">
        <button class="btn-icon edit-btn" data-id="${task.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-icon delete-btn" data-id="${task.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      `;

      taskList.appendChild(taskItem);
    });

  }
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
});
