document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const body = document.body;
    const themeToggle = document.querySelector("#themeToggle");
    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector(".nav-links");

    /* ================================
       THEME
    ================================= */

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


    /* ================================
       MOBILE NAVIGATION
    ================================= */

    function closeMobileMenu() {
        navLinks?.classList.remove("mobile-open");
        menuToggle?.setAttribute("aria-expanded", "false");
    }

    menuToggle?.addEventListener("click", event => {
        event.stopPropagation();

        const isOpen = navLinks?.classList.toggle("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    navLinks?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    document.addEventListener("click", event => {
        if (
            !navLinks?.contains(event.target) &&
            !menuToggle?.contains(event.target)
        ) {
            closeMobileMenu();
        }
    });


    /* ================================
       PAGE LOAD ANIMATION
    ================================= */

    const pageElements = [
        ".navbar",
        ".hero-copy",
        ".hero-visual",
        ".quick-proof"
    ];

    pageElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("page-reveal");
        });
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.querySelectorAll(".page-reveal").forEach(element => {
                element.classList.add("is-visible");
            });
        });
    });


    /* ================================
       HERO STAGGER
    ================================= */

    const heroItems = [
        ".hero .eyebrow",
        ".hero .hero-title",
        ".hero .hero-description",
        ".hero .hero-actions",
        ".hero .hero-note"
    ];

    heroItems.forEach((selector, index) => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("hero-reveal");
            element.style.setProperty(
                "--delay",
                `${index * 90}ms`
            );
        });
    });

    setTimeout(() => {
        document.querySelectorAll(".hero-reveal").forEach(element => {
            element.classList.add("is-visible");
        });
    }, 100);


    /* ================================
       SCROLL REVEAL
    ================================= */

    const revealSelectors = [
        ".section-heading",
        ".feature-card",
        ".workflow-card",
        ".showcase-card",
        ".cta-inner",
        ".footer"
    ];

    const revealElements = [];

    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("scroll-reveal");
            revealElements.push(element);
        });
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

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
    }


    /* ================================
       STAGGER FEATURE CARDS
    ================================= */

    document.querySelectorAll(".feature-grid").forEach(grid => {

        grid.querySelectorAll(".feature-card").forEach(
            (card, index) => {
                card.style.setProperty(
                    "--delay",
                    `${index * 80}ms`
                );
            }
        );

    });


    /* ================================
       STAGGER WORKFLOW CARDS
    ================================= */

    document.querySelectorAll(".workflow-grid").forEach(grid => {

        grid.querySelectorAll(".workflow-card").forEach(
            (card, index) => {
                card.style.setProperty(
                    "--delay",
                    `${index * 100}ms`
                );
            }
        );

    });


    /* ================================
       SMOOTH ANCHOR NAVIGATION
    ================================= */

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


    /* ================================
       ACTIVE NAVIGATION
    ================================= */

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

                        const isActive =
                            anchor.getAttribute("href") === `#${id}`;

                        anchor.classList.toggle(
                            "active",
                            isActive
                        );

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* ================================
       TYPING PREVIEW MICRO ANIMATION
    ================================= */

    const demoPassage = document.querySelector(".demo-passage");

    if (demoPassage) {

        const cursor = demoPassage.querySelector(".demo-cursor");

        if (cursor) {
            cursor.setAttribute(
                "aria-hidden",
                "true"
            );
        }

    }


    /* ================================
       KEYBOARD HOVER FEEDBACK
    ================================= */

    document.querySelectorAll(".keyboard-preview span").forEach(key => {

        key.addEventListener("mouseenter", () => {
            key.classList.add("key-hover");
        });

        key.addEventListener("mouseleave", () => {
            key.classList.remove("key-hover");
        });

    });


    /* CTA / BUTTON PRESS FEEDBACK */

    document.querySelectorAll("button, .button, .nav-cta").forEach(element => {

        element.addEventListener("pointerdown", () => {
            element.classList.add("is-pressed");
        });
        element.addEventListener("pointerup", () => {
            element.classList.remove("is-pressed");
        });
        element.addEventListener("pointerleave", () => {
            element.classList.remove("is-pressed");
        });
    });


    /* ESCAPE CLOSES MOBILE MENU */

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });


    /* REDUCED MOTION */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );
    if (reducedMotion.matches) {
        document
            .querySelectorAll(
                ".page-reveal, .hero-reveal, .scroll-reveal"
            )
            .forEach(element => {
                element.classList.add("is-visible");
            });
    }
});
