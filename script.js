document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  const savedTheme = localStorage.getItem("theme");

  // 🔹 Apply theme helper
  const applyTheme = (theme) => {
    if (theme === "light") {
      document.body.classList.add("light");
      toggleBtn.textContent = "☀️";
    } else {
      document.body.classList.remove("light");
      toggleBtn.textContent = "🌙";
    }
  };

  // 1️⃣ Initial theme decision
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(mediaQuery.matches ? "light" : "dark");
  }

  // 2️⃣ Manual toggle (user always wins)
  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    const theme = isLight ? "light" : "dark";

    localStorage.setItem("theme", theme);
    toggleBtn.textContent = isLight ? "☀️" : "🌙";
  });

  // 3️⃣ React to system theme changes (only if user has no preference)
  mediaQuery.addEventListener("change", (e) => {
    if (localStorage.getItem("theme")) return;
    applyTheme(e.matches ? "light" : "dark");
  });
});
