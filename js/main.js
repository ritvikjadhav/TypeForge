document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const body = document.body;
    const themeToggle = document.querySelector("#themeToggle");
    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector(".nav-links");

    /* =========================================
       THEME
    ========================================= */

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


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    function closeMobileMenu() {
        navLinks?.classList.remove("mobile-open");
        menuToggle?.setAttribute("aria-expanded", "false");
    }

    menuToggle?.addEventListener("click", event => {
        event.stopPropagation();

        const isOpen = navLinks?.classList.toggle("mobile-open");

        menuToggle?.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    navLinks?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", event => {
        if (
            !navLinks?.contains(event.target) &&
            !menuToggle?.contains(event.target)
        ) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });


    /* =========================================
       PAGE LOAD REVEAL
       Only runs once when the page opens
    ========================================= */

    const loadGroups = [
        {
            selector: ".navbar",
            delay: 0
        },
        {
            selector: ".hero .eyebrow",
            delay: 100
        },
        {
            selector: ".hero .hero-title",
            delay: 180
        },
        {
            selector: ".hero .hero-description",
            delay: 280
        },
        {
            selector: ".hero .hero-actions",
            delay: 380
        },
        {
            selector: ".hero .hero-note",
            delay: 460
        },
        {
            selector: ".hero-visual",
            delay: 220
        },
        {
            selector: ".quick-proof",
            delay: 520
        }
    ];

    loadGroups.forEach(item => {
        document.querySelectorAll(item.selector).forEach(element => {

            element.classList.add("page-reveal");

            element.style.setProperty(
                "--reveal-delay",
                `${item.delay}ms`
            );

        });
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {

            document
                .querySelectorAll(".page-reveal")
                .forEach(element => {
                    element.classList.add("is-visible");
                });

        });
    });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const scrollElements = document.querySelectorAll(
        ".section-heading, .feature-card, .workflow-card, .showcase-card, .cta-inner, .footer"
    );

    scrollElements.forEach((element, index) => {

        element.classList.add("scroll-reveal");

        element.style.setProperty(
            "--reveal-delay",
            `${(index % 4) * 80}ms`
        );

    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        scrollElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        scrollElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =========================================
       FEATURE CARD STAGGER
    ========================================= */

    document.querySelectorAll(".feature-grid").forEach(grid => {

        grid.querySelectorAll(".feature-card").forEach(
            (card, index) => {

                card.style.setProperty(
                    "--reveal-delay",
                    `${index * 90}ms`
                );

            }
        );

    });


    /* =========================================
       WORKFLOW CARD STAGGER
    ========================================= */

    document.querySelectorAll(".workflow-grid").forEach(grid => {

        grid.querySelectorAll(".workflow-card").forEach(
            (card, index) => {

                card.style.setProperty(
                    "--reveal-delay",
                    `${index * 100}ms`
                );

            }
        );

    });


    /* =========================================
       SMOOTH ANCHOR SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if (
        sections.length &&
        navAnchors.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const id = entry.target.id;

                    navAnchors.forEach(anchor => {

                        anchor.classList.toggle(
                            "active",
                            anchor.getAttribute("href") === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =========================================
       KEYBOARD PREVIEW
    ========================================= */

    document
        .querySelectorAll(".keyboard-preview span")
        .forEach(key => {

            key.addEventListener("mouseenter", () => {
                key.classList.add("key-hover");
            });

            key.addEventListener("mouseleave", () => {
                key.classList.remove("key-hover");
            });

        });


    /* =========================================
       ACCESSIBILITY
    ========================================= */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {

        document
            .querySelectorAll(
                ".page-reveal, .scroll-reveal"
            )
            .forEach(element => {

                element.classList.add("is-visible");

            });

    }

});
