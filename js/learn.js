
/* ========================================
   TYPEFORGE — LEARNING SYSTEM
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".learn-main, .lesson-card, .learning-path")) return;
    initLearningPage();
});

const TYPEFORGE_LESSONS = [
    {
        id: "home-row",
        title: "Home Row Fundamentals",
        description: "Build the foundation of accurate touch typing.",
        level: "Beginner",
        duration: "8 min",
        category: "Basics"
    },
    {
        id: "top-row",
        title: "Top Row Mastery",
        description: "Learn to reach the top row without losing rhythm.",
        level: "Beginner",
        duration: "10 min",
        category: "Basics"
    },
    {
        id: "bottom-row",
        title: "Bottom Row Control",
        description: "Improve accuracy with the lower keyboard row.",
        level: "Beginner",
        duration: "10 min",
        category: "Basics"
    },
    {
        id: "capitalization",
        title: "Capital Letters",
        description: "Use Shift naturally without breaking your rhythm.",
        level: "Beginner",
        duration: "7 min",
        category: "Accuracy"
    },
    {
        id: "punctuation",
        title: "Punctuation & Symbols",
        description: "Master punctuation while maintaining typing flow.",
        level: "Intermediate",
        duration: "12 min",
        category: "Accuracy"
    },
    {
        id: "numbers",
        title: "Numbers & Shortcuts",
        description: "Practice numbers and common keyboard combinations.",
        level: "Intermediate",
        duration: "12 min",
        category: "Accuracy"
    },
    {
        id: "rhythm",
        title: "Typing Rhythm",
        description: "Develop smoother keystrokes and consistent speed.",
        level: "Intermediate",
        duration: "10 min",
        category: "Speed"
    },
    {
        id: "speed",
        title: "Speed Building",
        description: "Push your WPM while keeping accuracy above 95%.",
        level: "Advanced",
        duration: "15 min",
        category: "Speed"
    }
];

/* ========================================
   INITIALIZE
   ======================================== */

function initLearningPage() {
    renderLearningProgress();
    initLessonFilters();
    initLessonSearch();
    initLessonButtons();
    updateLearningStats();
}

/* ========================================
   PROGRESS
   ======================================== */

function getLearningProgress() {
    try {
        return JSON.parse(
            localStorage.getItem("typeforge-learning-progress")
        ) || {};
    } catch {
        return {};
    }
}

function saveLearningProgress(progress) {
    localStorage.setItem(
        "typeforge-learning-progress",
        JSON.stringify(progress)
    );
}

function isLessonComplete(id) {
    const progress = getLearningProgress();
    return Boolean(progress[id]?.completed);
}

function completeLesson(id, score = null) {
    const progress = getLearningProgress();

    progress[id] = {
        completed: true,
        score,
        completedAt: new Date().toISOString()
    };

    saveLearningProgress(progress);
    renderLearningProgress();
    updateLearningStats();
}

/* ========================================
   RENDER PROGRESS
   ======================================== */

function renderLearningProgress() {
    const progress = getLearningProgress();

    document.querySelectorAll("[data-lesson-id]").forEach(card => {
        const id = card.dataset.lessonId;
        const completed = Boolean(progress[id]?.completed);

        card.classList.toggle("completed", completed);

        const status = card.querySelector("[data-lesson-status]");

        if (status) {
            status.textContent = completed
                ? "Completed"
                : "Start lesson";
        }

        const icon = card.querySelector("[data-lesson-icon]");

        if (icon && completed) {
            icon.className = "fa-solid fa-circle-check";
        }
    });

    updateOverallProgress();
}

function updateOverallProgress() {
    const total = TYPEFORGE_LESSONS.length;
    const progress = getLearningProgress();

    const completed = TYPEFORGE_LESSONS.filter(
        lesson => progress[lesson.id]?.completed
    ).length;

    const percentage =
        total > 0
            ? Math.round((completed / total) * 100)
            : 0;

    document
        .querySelectorAll("[data-learning-progress]")
        .forEach(element => {
            element.textContent = `${percentage}%`;
        });

    document
        .querySelectorAll("[data-learning-completed]")
        .forEach(element => {
            element.textContent = completed;
        });

    document
        .querySelectorAll("[data-learning-total]")
        .forEach(element => {
            element.textContent = total;
        });

    document
        .querySelectorAll(".learning-progress-bar span")
        .forEach(bar => {
            bar.style.width = `${percentage}%`;
        });
}

/* ========================================
   LESSON FILTERS
   ======================================== */

function initLessonFilters() {
    const filterButtons =
        document.querySelectorAll("[data-filter]");

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(item =>
                item.classList.remove("active")
            );

            button.classList.add("active");

            filterLessons(filter);
        });
    });
}

function filterLessons(filter) {
    document.querySelectorAll("[data-lesson-id]").forEach(card => {
        const category =
            card.dataset.category || "";
        const level =
            card.dataset.level || "";

        const matches =
            filter === "all" ||
            category.toLowerCase() === filter.toLowerCase() ||
            level.toLowerCase() === filter.toLowerCase();

        card.hidden = !matches;
    });
}

/* ========================================
   SEARCH
   ======================================== */

function initLessonSearch() {
    const searchInput =
        document.querySelector("[data-lesson-search]");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const query =
            searchInput.value.trim().toLowerCase();

        document.querySelectorAll("[data-lesson-id]").forEach(card => {
            const text = card.textContent.toLowerCase();

            card.hidden =
                query.length > 0 &&
                !text.includes(query);
        });
    });
}

/* ========================================
   LESSON BUTTONS
   ======================================== */

function initLessonButtons() {
    document.querySelectorAll(
        "[data-start-lesson]"
    ).forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.startLesson;

            if (!id) return;

            window.location.href =
                `lesson.html?lesson=${encodeURIComponent(id)}`;
        });
    });
}

/* ========================================
   LEARNING STATS
   ======================================== */

function updateLearningStats() {
    const progress = getLearningProgress();

    const completedLessons =
        Object.values(progress).filter(
            lesson => lesson.completed
        );

    const totalPracticeMinutes =
        completedLessons.length * 10;

    const averageScore = (() => {
        const scores = completedLessons
            .map(item => Number(item.score))
            .filter(score => Number.isFinite(score));

        if (!scores.length) return 0;

        return Math.round(
            scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        );
    })();

    document
        .querySelectorAll("[data-learning-stat='lessons']")
        .forEach(element => {
            element.textContent =
                completedLessons.length;
        });

    document
        .querySelectorAll("[data-learning-stat='minutes']")
        .forEach(element => {
            element.textContent =
                totalPracticeMinutes;
        });

    document
        .querySelectorAll("[data-learning-stat='score']")
        .forEach(element => {
            element.textContent =
                averageScore ? `${averageScore}%` : "—";
        });
}

/* ========================================
   CONTINUE LEARNING
   ======================================== */

function getNextLesson() {
    const progress = getLearningProgress();

    return (
        TYPEFORGE_LESSONS.find(
            lesson => !progress[lesson.id]?.completed
        ) || TYPEFORGE_LESSONS[0]
    );
}

function initContinueButton() {
    const button =
        document.querySelector("[data-continue-learning]");

    if (!button) return;

    button.addEventListener("click", () => {
        const lesson = getNextLesson();

        if (lesson) {
            window.location.href =
                `lesson.html?lesson=${encodeURIComponent(
                    lesson.id
                )}`;
        }
    });
}

initContinueButton();

/* ========================================
   PUBLIC API
   ======================================== */

window.TypeForgeLearning = {
    lessons: TYPEFORGE_LESSONS,
    getProgress: getLearningProgress,
    completeLesson,
    isComplete: isLessonComplete,
    getNextLesson
};

