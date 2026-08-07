
/* ========================================
   TYPEFORGE — MAIN JAVASCRIPT
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileMenu();
    initActiveNavigation();
    initSmoothScroll();
    initRevealAnimations();
});

/* ========================================
   THEME
   ======================================== */

function initTheme() {
    const themeToggle = document.querySelector(".theme-toggle");
    const savedTheme = localStorage.getItem("typeforge-theme");

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("typeforge-theme", newTheme);
            updateThemeIcon();
        });
    }
}

function updateThemeIcon() {
    const themeToggle = document.querySelector(".theme-toggle");

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");
    if (!icon) return;

    const isLight =
        document.documentElement.getAttribute("data-theme") === "light";

    icon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );
}

/* ========================================
   MOBILE MENU
   ======================================== */

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("mobile-open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.className = isOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";
        }
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-open");
            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "fa-solid fa-bars";
            }
        });
    });
}

/* ========================================
   ACTIVE NAVIGATION
   ======================================== */

function initActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");

        if (!href) return;

        const linkPage = href.split("/").pop();

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

/* ========================================
   SCROLL REVEAL
   ======================================== */

function initRevealAnimations() {
    const elements = document.querySelectorAll(
        ".feature-card, .test-card, .practice-card, .lesson-card, .summary-card, .dashboard-card"
    );

    if (!elements.length || !("IntersectionObserver" in window)) return;

    elements.forEach(element => {
        element.classList.add("reveal-ready");
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach(element => observer.observe(element));
}

/* ========================================
   GLOBAL HELPERS
   ======================================== */

function formatNumber(value, decimals = 0) {
    return Number(value || 0).toFixed(decimals);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getData(key, fallback = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
}

/* ========================================
   MOBILE MENU STYLES
   ======================================== */

const mobileMenuStyle = document.createElement("style");

mobileMenuStyle.textContent = `
    @media (max-width: 760px) {
        .nav-links.mobile-open {
            position: absolute;
            top: calc(100% + 1px);
            left: 14px;
            right: 14px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 8px;
            border: 1px solid var(--border);
            border-radius: 14px;
            background: var(--surface);
            box-shadow: var(--shadow);
        }

        .nav-links.mobile-open a {
            padding: 13px;
            border-radius: 8px;
        }

        .nav-links.mobile-open a:hover {
            background: var(--surface-light);
        }

        .nav-links.mobile-open a::after {
            display: none;
        }

        .reveal-ready {
            opacity: 0;
            transform: translateY(15px);
            transition: opacity .5s ease, transform .5s ease;
        }

        .reveal-visible {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (min-width: 761px) {
        .reveal-ready {
            opacity: 0;
            transform: translateY(15px);
            transition: opacity .5s ease, transform .5s ease;
        }

        .reveal-visible {
            opacity: 1;
            transform: translateY(0);
        }
    }
 ';

document.head.appendChild(mobileMenuStyle);
