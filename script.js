document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const themeToggle = document.getElementById("themeToggle");

  // Initialize the app
  init();

  // Event Listeners
  themeToggle.addEventListener("click", toggleTheme);

  function init() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
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
});
