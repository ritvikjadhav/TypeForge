document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.querySelector("#themeToggle");
    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector(".nav-links");

    // Theme
    const savedTheme = localStorage.getItem("veltype-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
    }

    themeToggle?.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark");

        localStorage.setItem(
            "veltype-theme",
            isDark ? "dark" : "light"
        );
    });

    // Mobile navigation
    menuToggle?.addEventListener("click", () => {
        const isOpen = navLinks?.classList.toggle("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    // Close mobile menu after navigation
    navLinks?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-open");
            menuToggle?.setAttribute("aria-expanded", "false");
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", event => {
        if (
            !navLinks?.contains(event.target) &&
            !menuToggle?.contains(event.target)
        ) {
            navLinks?.classList.remove("mobile-open");
            menuToggle?.setAttribute("aria-expanded", "false");
        }
    });
});
