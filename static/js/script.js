/**
 * Sumit Timande Portfolio - Main JavaScript
 */

(function () {
  "use strict";

  const THEME_KEY = "portfolio-theme";

  /* ---------- Loading Screen ---------- */
  function initLoader() {
    const loader = document.getElementById("loader");
    const body = document.body;

    body.classList.add("loading");

    window.addEventListener("load", () => {
      setTimeout(() => {
        loader?.classList.add("hidden");
        body.classList.remove("loading");
      }, 800);
    });
  }

  /* ---------- Theme Toggle ---------- */
  function initTheme() {
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const saved = localStorage.getItem(THEME_KEY) || "dark";

    document.documentElement.setAttribute("data-theme", saved);
    updateThemeIcon(icon, saved);

    toggle?.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      updateThemeIcon(icon, next);
    });
  }

  function updateThemeIcon(icon, theme) {
    if (!icon) return;
    icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  }

  /* ---------- Navbar Scroll & Active Links ---------- */
  function initNavbar() {
    const navbar = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link-custom");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }

      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });

    const collapse = document.getElementById("navbarNav");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse && collapse.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  /* ---------- Scroll to Top ---------- */
  function initScrollTop() {
    const btn = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn?.classList.add("visible");
      } else {
        btn?.classList.remove("visible");
      }
    });

    btn?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Typed.js Hero Typing ---------- */
  function initTyped() {
    if (typeof Typed === "undefined") return;

    new Typed("#typed-text", {
      strings: [
        "Python Developer",
        "Flask Developer",
        "Machine Learning Enthusiast",
        "Backend Developer",
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }

  /* ---------- Particles.js ---------- */
  function initParticles() {
    if (typeof particlesJS === "undefined") return;

    particlesJS("particles-js", {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 800 } },
        color: { value: ["#06b6d4", "#3b82f6", "#8b5cf6"] },
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: "#3b82f6",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.4 } },
        },
      },
      retina_detect: true,
    });
  }

  /* ---------- AOS Animations ---------- */
  function initAOS() {
    if (typeof AOS === "undefined") return;
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }

  /* ---------- Skill Progress Bars ---------- */
  function initSkillBars() {
    const bars = document.querySelectorAll(".skill-progress");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach((bar) => observer.observe(bar));
  }

  /* ---------- Animated Statistics ---------- */
  function initStats() {
    const statNumbers = document.querySelectorAll("[data-count]");

    const animateCount = (el) => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1500;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((el) => observer.observe(el));
  }

  /* ---------- Auto-dismiss Flash Alerts ---------- */
  function initFlashAlerts() {
    const alerts = document.querySelectorAll(".alert-flash");
    alerts.forEach((alert) => {
      setTimeout(() => {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
        bsAlert.close();
      }, 5000);
    });
  }

  /* ---------- Initialize ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initTheme();
    initNavbar();
    initScrollTop();
    initTyped();
    initParticles();
    initAOS();
    initSkillBars();
    initStats();
    initFlashAlerts();
  });
})();
