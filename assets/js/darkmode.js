const btn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check for saved preference, otherwise use system setting
if (currentTheme === "dark" || (!currentTheme && systemPrefersDark)) {
    document.body.classList.add("dark-mode");
    btn.innerHTML = "Light Mode";
} else {
    btn.innerHTML = "Dark Mode";
}

// The Toggle Function
btn.onclick = function() {
    document.body.classList.toggle("dark-mode");
    
    let theme = "light";
    if (document.body.classList.contains("dark-mode")) {
        theme = "dark";
        btn.innerHTML = "Light Mode";
    } else {
        btn.innerHTML = "Dark Mode";
    }
    
    // Save the choice to the browser's memory
    localStorage.setItem("theme", theme);
};
