// This function runs immediately to prevent the "white flash"
(function() {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
  }
})();

document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    // Set initial button text
    if (document.documentElement.classList.contains("dark-mode")) {
        btn.innerHTML = "Light Mode";
    }

    btn.onclick = function() {
        document.documentElement.classList.toggle("dark-mode");
        
        let theme = "light";
        if (document.documentElement.classList.contains("dark-mode")) {
            theme = "dark";
            btn.innerHTML = "Light Mode";
        } else {
            btn.innerHTML = "Dark Mode";
        }
        localStorage.setItem("theme", theme);
    };
});
