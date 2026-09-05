const body = document.body;
const navbar = document.getElementById("navbar");
const progress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(scrollTop / docHeight) * 100}%`;

  navbar.classList.toggle("scrolled", scrollTop > 30);
  backToTop.classList.toggle("show", scrollTop > 550);
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuToggle.innerHTML = navMenu.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const savedTheme = localStorage.getItem("pragati-theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const light = body.classList.contains("light");
  localStorage.setItem("pragati-theme", light ? "light" : "dark");
  themeToggle.innerHTML = light
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("skill-bar")) entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal, .skill-bar").forEach(el => observer.observe(el));

function animateCounter(el) {
  const target = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();
  const isDecimal = String(el.dataset.count).includes(".");
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = isDecimal ? target.toFixed(1) : target;
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll("[data-count]").forEach(animateCounter);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stats-strip").forEach(el => statsObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
