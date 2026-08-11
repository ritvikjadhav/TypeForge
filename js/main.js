document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.querySelector("#themeToggle");
    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector(".nav-links");
    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const savedTheme = localStorage.getItem("typeforge-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
    }

    themeToggle?.addEventListener("click", () => {
        body.classList.toggle("dark");

        localStorage.setItem(
            "typeforge-theme",
            body.classList.contains("dark") ? "dark" : "light"
        );
    });

    menuToggle?.addEventListener("click", () => {
        const open = navLinks.classList.toggle("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            open
        );
    });

    navLinks?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-open");
            menuToggle?.setAttribute("aria-expanded", "false");
        });
    });
});
