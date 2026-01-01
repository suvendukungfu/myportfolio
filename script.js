document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  const savedTheme = localStorage.getItem("theme");

  const applyTheme = (theme) => {
    document.body.classList.toggle("light", theme === "light");
    themeToggle.checked = theme === "light";
  };

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(mediaQuery.matches ? "light" : "dark");
  }

  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "light" : "dark";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  });

  mediaQuery.addEventListener("change", (e) => {
    if (localStorage.getItem("theme")) return;
    applyTheme(e.matches ? "light" : "dark");
  });
});

function toggleMenu() {
  document.getElementById("menu").classList.toggle("open");
}
