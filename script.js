document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const systemPrefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  const savedTheme = localStorage.getItem("theme");

  // 1️⃣ Initial theme decision
  if (savedTheme) {
    // User preference exists
    if (savedTheme === "light") {
      document.body.classList.add("light");
      toggleBtn.textContent = "☀️";
    } else {
      toggleBtn.textContent = "🌙";
    }
  } else {
    // No user preference → follow system
    if (systemPrefersLight) {
      document.body.classList.add("light");
      toggleBtn.textContent = "☀️";
    } else {
      toggleBtn.textContent = "🌙";
    }
  }

  // 2️⃣ Manual toggle (user always wins)
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "🌙";
    }
  });
});
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", (e) => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return; // user preference overrides system

    if (e.matches) {
      document.body.classList.add("light");
      document.getElementById("theme-toggle").textContent = "☀️";
    } else {
      document.body.classList.remove("light");
      document.getElementById("theme-toggle").textContent = "🌙";
    }
  });
