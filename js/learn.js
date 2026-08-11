/* ========================================
   VELTYPE — LEARNING SYSTEM
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".learn-page")) return;
    initLearningPage();
});

/* ========================================
   LESSON DATA
   ======================================== */

const VELTYPE_LESSONS = [
    {
        id: "home-row",
        title: "Home Row Basics",
        level: "Foundation",
        duration: 10,
        lessons: 5,
        category: "foundation"
    },
    {
        id: "letter-control",
        title: "Letter Control",
        level: "Accuracy",
        duration: 15,
        lessons: 7,
        category: "accuracy"
    },
    {
        id: "word-flow",
        title: "Word Flow",
        level: "Flow",
        duration: 20,
        lessons: 6,
        category: "flow"
    },
    {
        id: "speed-training",
        title: "Speed Training",
        level: "Speed",
        duration: 25,
        lessons: 7,
        category: "speed"
    }
];

const STORAGE_KEY = "veltype-learning-progress";

/* ========================================
   INITIALIZE
   ======================================== */

function initLearningPage() {
    setupNavigation();
    setupTheme();
    renderProgress();
    setupContinueLearning();
    setupLessonActions();
    setupScrollReveal();
    setupProgressAnimations();
    setupCardInteractions();
}

/* ========================================
   STORAGE
   ======================================== */

function getProgress() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

function saveProgress(progress) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
    );
}

/* ========================================
   LESSON STATUS
   ======================================== */

function isLessonComplete(id) {
    const progress = getProgress();
    return Boolean(progress[id]?.completed);
}

function completeLesson(id, score = null) {
    if (!id) return;

    const progress = getProgress();

    progress[id] = {
        completed: true,
        score: Number.isFinite(Number(score))
            ? Number(score)
            : null,
        completedAt: new Date().toISOString()
    };

    saveProgress(progress);
    renderProgress();
}

/* ========================================
   OVERALL PROGRESS
   ======================================== */

function getCompletedCount() {
    const progress = getProgress();

    return VELTYPE_LESSONS.filter(
        lesson => progress[lesson.id]?.completed
    ).length;
}

function getOverallPercentage() {
    const total = VELTYPE_LESSONS.length;

    if (!total) return 0;

    return Math.round(
        (getCompletedCount() / total) * 100
    );
}

function renderProgress() {
    const progress = getProgress();
    const completed = getCompletedCount();
    const percentage = getOverallPercentage();

    updateText(
        ".progress-percent",
        `${percentage}%`
    );

    updateText(
        ".progress-card-bottom span:first-child",
        `${completed} of ${VELTYPE_LESSONS.length} levels`
    );

    updateText(
        ".progress-card-bottom span:last-child",
        `${VELTYPE_LESSONS.length - completed} remaining`
    );

    updateText(
        ".progress-stats div:nth-child(2) strong",
        completed
    );

    updateProgressBars(percentage);

    updateLessonCards(progress);
}

/* ========================================
   PROGRESS BARS
   ======================================== */

function updateProgressBars(percentage) {
    document
        .querySelectorAll(
            ".large-progress span, .progress-line span"
        )
        .forEach(bar => {
            bar.style.setProperty(
                "--progress",
                `${percentage}%`
            );

            requestAnimationFrame(() => {
                bar.style.width = `${percentage}%`;
            });
        });
}

/* ========================================
   LESSON CARDS
   ======================================== */

function updateLessonCards(progress) {
    document
        .querySelectorAll(".path-card")
        .forEach((card, index) => {
            const lesson = VELTYPE_LESSONS[index];

            if (!lesson) return;

            const completed =
                Boolean(progress[lesson.id]?.completed);

            card.classList.toggle(
                "completed",
                completed
            );

            if (completed) {
                card.classList.remove("current");
                card.classList.add("completed");
            }
        });
}

/* ========================================
   CONTINUE LEARNING
   ======================================== */

function getNextLesson() {
    const progress = getProgress();

    return (
        VELTYPE_LESSONS.find(
            lesson => !progress[lesson.id]?.completed
        ) ||
        VELTYPE_LESSONS[0]
    );
}

function setupContinueLearning() {
    const button =
        document.querySelector(
            ".continue-copy .button"
        );

    if (!button) return;

    button.addEventListener("click", event => {
        const lesson = getNextLesson();

        if (!lesson) return;

        event.preventDefault();

        button.classList.add("is-loading");

        setTimeout(() => {
            window.location.href =
                `lesson.html?lesson=${encodeURIComponent(
                    lesson.id
                )}`;
        }, 180);
    });
}

/* ========================================
   LESSON ACTIONS
   ======================================== */

function setupLessonActions() {
    document
        .querySelectorAll(".path-action")
        .forEach((button, index) => {
            const lesson =
                VELTYPE_LESSONS[index];

            if (!lesson) return;

            const card =
                button.closest(".path-card");

            if (
                card?.classList.contains("locked")
            ) {
                return;
            }

            button.addEventListener(
                "click",
                event => {
                    event.preventDefault();

                    button.classList.add(
                        "is-loading"
                    );

                    setTimeout(() => {
                        window.location.href =
                            `lesson.html?lesson=${encodeURIComponent(
                                lesson.id
                            )}`;
                    }, 180);
                }
            );
        });
}

/* ========================================
   NAVIGATION
   ======================================== */

function setupNavigation() {
    const menu =
        document.querySelector("#menuToggle");

    const nav =
        document.querySelector("#navLinks") ||
        document.querySelector(".nav-links");

    if (!menu || !nav) return;

    menu.addEventListener("click", () => {
        const open =
            nav.classList.toggle("mobile-open");

        menu.setAttribute(
            "aria-expanded",
            String(open)
        );

        document.body.classList.toggle(
            "menu-open",
            open
        );
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove(
                "mobile-open"
            );

            menu.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );
        });
    });
}

/* ========================================
   THEME
   ======================================== */

function setupTheme() {
    const button =
        document.querySelector("#themeToggle");

    if (!button) return;

    const savedTheme =
        localStorage.getItem(
            "veltype-theme"
        );

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    button.addEventListener("click", () => {
        document.body.classList.add(
            "theme-transition"
        );

        const dark =
            document.body.classList.toggle("dark");

        localStorage.setItem(
            "veltype-theme",
            dark ? "dark" : "light"
        );

        setTimeout(() => {
            document.body.classList.remove(
                "theme-transition"
            );
        }, 400);
    });
}

/* ========================================
   SCROLL REVEAL
   ======================================== */

function setupScrollReveal() {
    const elements =
        document.querySelectorAll(
            ".path-card, .practice-card, .continue-card, .tip-card"
        );

    if (!elements.length) return;

    elements.forEach((element, index) => {
        element.classList.add(
            "reveal-on-scroll"
        );

        element.style.setProperty(
            "--reveal-delay",
            `${Math.min(index * 60, 240)}ms`
        );
    });

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("revealed");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px"
            }
        );

    elements.forEach(element => {
        observer.observe(element);
    });
}

/* ========================================
   PROGRESS ANIMATION
   ======================================== */

function setupProgressAnimations() {
    const bars =
        document.querySelectorAll(
            ".large-progress span, .progress-line span"
        );

    bars.forEach(bar => {
        const target =
            bar.closest(".large-progress")
                ? getOverallPercentage()
                : 57;

        bar.style.width = "0%";

        setTimeout(() => {
            bar.style.width = `${target}%`;
        }, 350);
    });
}

/* ========================================
   CARD INTERACTIONS
   ======================================== */

function setupCardInteractions() {
    document
        .querySelectorAll(
            ".practice-card, .path-card"
        )
        .forEach(card => {
            card.addEventListener(
                "mouseenter",
                () => {
                    card.classList.add(
                        "is-hovered"
                    );
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {
                    card.classList.remove(
                        "is-hovered"
                    );
                }
            );
        });
}

/* ========================================
   TEXT HELPER
   ======================================== */

function updateText(selector, value) {
    const element =
        document.querySelector(selector);

    if (element) {
        element.textContent = value;
    }
}

/* ========================================
   PUBLIC API
   ======================================== */

window.VelTypeLearning = {
    lessons: VELTYPE_LESSONS,
    getProgress,
    saveProgress,
    completeLesson,
    isLessonComplete,
    getNextLesson,
    getCompletedCount,
    getOverallPercentage
};
