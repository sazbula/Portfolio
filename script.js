// script.js

// ---- Theme ----
const root = document.documentElement;
const modeBtn = document.getElementById("modeBtn");
const modeIcon = document.getElementById("modeIcon");

function setTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    if (modeIcon) modeIcon.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    if (modeIcon) modeIcon.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
}

const saved = localStorage.getItem("theme");
setTheme(saved || "dark");

modeBtn?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
  setTheme(current === "light" ? "dark" : "light");
});

// ---- Mobile nav ----
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav__link").forEach((a) => {
  a.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// ---- Typing effect ----
const typingEl = document.getElementById("typing");
const phrases = ["data-driven platforms.", "production DevOps flows.","ML-powered insights.", "full-stack products.","cloud-ready apps."];
let p = 0, i = 0, deleting = false;

function tick() {
  if (!typingEl) return;
  const text = phrases[p];

  if (!deleting) {
    i++;
    typingEl.textContent = text.slice(0, i);
    if (i === text.length) {
      deleting = true;
      setTimeout(tick, 1000);
      return;
    }
  } else {
    i--;
    typingEl.textContent = text.slice(0, i);
    if (i === 0) {
      deleting = false;
      p = (p + 1) % phrases.length;
    }
  }

  setTimeout(tick, deleting ? 45 : 70);
}
if (typingEl) tick();

// ---- Projects filter (UPDATED for .case) ----
const filters = document.querySelectorAll(".filter");
const cases = document.querySelectorAll(".case");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const f = btn.dataset.filter;
    cases.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ").filter(Boolean);
      const show = f === "all" || tags.includes(f);
      card.style.display = show ? "grid" : "none";
    });
  });
});

// ---- Reveal on scroll ----
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// ---- Scroll progress ----
const bar = document.getElementById("progressBar");
function updateProgress() {
  if (!bar) return;
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  bar.style.width = `${pct}%`;
}
document.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ---- Footer year ----
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Contact form (front-end only) ----
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (formMsg) formMsg.textContent = "✅ Sent (demo). Connect to Formspree / EmailJS / your backend when ready.";
  form.reset();
});

// ---- Copy email button ----
const copyBtn = document.getElementById("copyEmailBtn");
copyBtn?.addEventListener("click", async () => {
  const email = copyBtn.getAttribute("data-email");
  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
    if (formMsg) formMsg.textContent = "Copied email to clipboard.";
  } catch {
    if (formMsg) formMsg.textContent = "Could not copy automatically — please copy manually.";
  }
});

