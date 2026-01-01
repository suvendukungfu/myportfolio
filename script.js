/* ---------- THEME SYSTEM ---------- */
const toggle = document.getElementById("theme-toggle");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

const applyTheme = (theme) => {
  document.body.classList.toggle("light", theme === "light");
  toggle.checked = theme === "light";
};

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || (prefersLight.matches ? "light" : "dark"));

toggle.addEventListener("change", () => {
  const theme = toggle.checked ? "light" : "dark";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

/* ⌨️ Keyboard Shortcut */
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "d") {
    toggle.checked = !toggle.checked;
    toggle.dispatchEvent(new Event("change"));
  }
});

/* 📱 Swipe Down Gesture */
let startY = 0;
window.addEventListener("touchstart", (e) => (startY = e.touches[0].clientY));
window.addEventListener("touchend", (e) => {
  if (e.changedTouches[0].clientY - startY > 80) {
    toggle.checked = !toggle.checked;
    toggle.dispatchEvent(new Event("change"));
  }
});

/* 🧠 Typing Effect */
const roles = [
  "Full Stack Developer",
  "React & Node.js Engineer",
  "IoT & Robotics Builder",
];
let roleIndex = 0, charIndex = 0;
const typingEl = document.getElementById("typing");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingEl.textContent += roles[roleIndex][charIndex++];
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 1500);
  }
}
function erase() {
  if (charIndex > 0) {
    typingEl.textContent = roles[roleIndex].slice(0, --charIndex);
    setTimeout(erase, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
  }
}
type();

/* 🎮 Easter Egg */
let buffer = "";
document.addEventListener("keydown", (e) => {
  buffer += e.key.toLowerCase();
  if (buffer.includes("hello")) {
    alert("👋 Hello there! You found the easter egg!");
    buffer = "";
  }
});

/* 🌊 Scroll Reveal */
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
});

/* 🎇 PARTICLES */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: Math.random() * 0.5,
    dy: Math.random() * 0.5,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.5)";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x > canvas.width || p.y > canvas.height) {
      p.x = 0;
      p.y = 0;
    }
  });
  requestAnimationFrame(animate);
}
animate();

/* 📱 Navbar */
function toggleMenu() {
  document.getElementById("menu").classList.toggle("open");
}
