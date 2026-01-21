// This tells the script: "Wait until the whole page is ready"
document.addEventListener("DOMContentLoaded", function() {
    
    const btn = document.getElementById("theme-toggle");
    
    // Safety check: if the button isn't on this specific page, don't run the script
    if (!btn) return;

    const currentTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (currentTheme === "dark" || (!currentTheme && systemPrefersDark)) {
        document.body.classList.add("dark-mode");
        btn.innerHTML = "Light Mode";
    }

    btn.onclick = function() {
        document.body.classList.toggle("dark-mode");
        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
            btn.innerHTML = "Light Mode";
        } else {
            btn.innerHTML = "Dark Mode";
        }
        localStorage.setItem("theme", theme);
    };
});
