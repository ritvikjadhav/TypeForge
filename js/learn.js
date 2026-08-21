"use strict";

/* =========================================
   VELTYPE — LEARN
   Learning path, lesson rendering and progress
   ========================================= */

const levelList = document.getElementById("levelList");

const STORAGE_KEY = "veltypeLessonProgress";

/*
    Six learning levels.
    Lesson information itself comes from lessondata.js.
*/

const levelGroups = [
    {
        id: 1,
        title: "Foundation",
        description: "Start here if you're new to touch typing.",
        difficulty: "Beginner",
        lessonIds: [1, 2, 3, 4]
    },
    {
        id: 2,
        title: "Core Typing",
        description: "Build control across the full keyboard.",
        difficulty: "Beginner",
        lessonIds: [5, 6, 7, 8]
    },
    {
        id: 3,
        title: "Accuracy",
        description: "Turn correct technique into reliable typing.",
        difficulty: "Intermediate",
        lessonIds: [9, 10, 11, 12, 13, 14]
    },
    {
        id: 4,
        title: "Speed",
        description: "Build speed without losing control.",
        difficulty: "Intermediate",
        lessonIds: [15, 16, 17, 18]
    },
    {
        id: 5,
        title: "Real World",
        description: "Apply typing skills to everyday computer work.",
        difficulty: "Advanced",
        lessonIds: [19, 20, 21, 22]
    },
    {
        id: 6,
        title: "Advanced",
        description: "Push your speed, endurance and consistency.",
        difficulty: "Advanced",
        lessonIds: [23, 24]
    }
];

/* =========================================
   INITIALIZATION
   ========================================= */

if (levelList && Array.isArray(lessons)) {
    renderLevels();
    setupAccordion();
    loadProgress();
    setupRevealAnimations();

    window.addEventListener("storage", handleStorageChange);
}

/* =========================================
   GET LESSON
   Reads lesson information from lessondata.js
   ========================================= */

function getLesson(id) {
    return lessons.find(
        lesson => lesson.id === id
    );
}

/* =========================================
   READ PROGRESS
   ========================================= */

function getProgress() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        return saved && typeof saved === "object"
            ? saved
            : {};
    } catch {
        return {};
    }
}

/* =========================================
   CHECK LESSON COMPLETION
   ========================================= */

function isLessonCompleted(id, progress) {
    return Boolean(
        progress[id]?.completed === true
    );
}

/* =========================================
   CHECK LESSON UNLOCK
   =========================================

   Lesson 1 is always unlocked.

   Every next lesson becomes available
   only after the previous lesson is
   completely finished.
*/

function isLessonUnlocked(id, progress) {
    if (id === 1) {
        return true;
    }

    return isLessonCompleted(
        id - 1,
        progress
    );
}

/* =========================================
   RENDER LEVELS
   ========================================= */

function renderLevels() {
    const progress = getProgress();

    levelList.innerHTML = levelGroups
        .map(level => {
            const levelLessons = level.lessonIds
                .map(getLesson)
                .filter(Boolean);

            const completedCount =
                levelLessons.filter(lesson =>
                    isLessonCompleted(
                        lesson.id,
                        progress
                    )
                ).length;

            const percent =
                levelLessons.length
                    ? Math.round(
                          (completedCount /
                              levelLessons.length) *
                              100
                      )
                    : 0;

            return `
                <article
                    class="level reveal"
                    data-level="${level.id}"
                >

                    <button
                        class="level-trigger"
                        type="button"
                        aria-expanded="false"
                        aria-controls="level-content-${level.id}"
                    >

                        <span class="level-number">
                            ${String(level.id).padStart(2, "0")}
                        </span>

                        <span class="level-main">

                            <span class="level-title-row">
                                <span class="level-title">
                                    ${escapeHTML(level.title)}
                                </span>

                                <span class="level-tag">
                                    ${escapeHTML(level.difficulty)}
                                </span>
                            </span>

                            <span class="level-description">
                                ${escapeHTML(level.description)}
                            </span>

                            <span class="level-progress">

                                <span class="level-progress-top">
                                    <span class="progress-count">
                                        ${completedCount}/${levelLessons.length}
                                    </span>

                                    <span class="progress-percent">
                                        ${percent}%
                                    </span>
                                </span>

                                <span class="progress-track">
                                    <span
                                        class="progress-fill"
                                        style="width: ${percent}%"
                                    ></span>
                                </span>

                            </span>

                        </span>

                        <span
                            class="level-arrow"
                            aria-hidden="true"
                        >
                            ↓
                        </span>

                    </button>

                    <div
                        class="level-content"
                        id="level-content-${level.id}"
                    >

                        <div class="level-content-inner">

                            <div class="lesson-list">

                                ${levelLessons
                                    .map(
                                        lesson =>
                                            renderLessonItem(
                                                lesson,
                                                progress
                                            )
                                    )
                                    .join("")}

                            </div>

                        </div>

                    </div>

                </article>
            `;
        })
        .join("");
}

/* =========================================
   RENDER LESSON ITEM
   ========================================= */

function renderLessonItem(
    lesson,
    progress
) {
    const completed =
        isLessonCompleted(
            lesson.id,
            progress
        );

    const unlocked =
        isLessonUnlocked(
            lesson.id,
            progress
        );

    const classes = [
        "lesson-item",
        completed ? "completed" : "",
        !unlocked ? "locked" : ""
    ]
        .filter(Boolean)
        .join(" ");

    if (!unlocked) {
        return `
            <div
                class="${classes}"
                data-lesson="${lesson.id}"
                aria-disabled="true"
            >

                <span class="lesson-number">
                    ${String(lesson.id).padStart(2, "0")}
                </span>

                <span class="lesson-content">

                    <span class="lesson-title">
                        ${escapeHTML(lesson.title)}
                    </span>

                    <span class="lesson-description">
                        Complete Lesson ${String(
                            lesson.id - 1
                        ).padStart(2, "0")} to unlock this lesson.
                    </span>

                    <span class="lesson-meta">
                        <span>
                            ${lesson.duration} min
                        </span>

                        <span>
                            ${escapeHTML(lesson.difficulty)}
                        </span>

                        <span>
                            Locked
                        </span>
                    </span>

                </span>

                <span
                    class="lesson-arrow"
                    aria-hidden="true"
                >
                    🔒
                </span>

            </div>
        `;
    }

    return `
        <a
            href="lesson.html?lesson=${lesson.id}"
            class="${classes}"
            data-lesson="${lesson.id}"
        >

            <span class="lesson-number">
                ${String(lesson.id).padStart(2, "0")}
            </span>

            <span class="lesson-content">

                <span class="lesson-title">
                    ${escapeHTML(lesson.title)}
                </span>

                <span class="lesson-description">
                    ${escapeHTML(lesson.description)}
                </span>

                <span class="lesson-meta">

                    <span>
                        ${lesson.duration} min
                    </span>

                    <span>
                        ${escapeHTML(lesson.difficulty)}
                    </span>

                    ${
                        completed
                            ? "<span>Completed</span>"
                            : ""
                    }

                </span>

            </span>

            <span
                class="lesson-arrow"
                aria-hidden="true"
            >
                ${
                    completed
                        ? "✓"
                        : "→"
                }
            </span>

        </a>
    `;
}

/* =========================================
   ACCORDION
   ========================================= */

function setupAccordion() {
    document
        .querySelectorAll(".level-trigger")
        .forEach(trigger => {
            trigger.addEventListener(
                "click",
                () => {
                    const level =
                        trigger.closest(".level");

                    if (!level) {
                        return;
                    }

                    const isOpen =
                        level.classList.contains(
                            "open"
                        );

                    document
                        .querySelectorAll(
                            ".level.open"
                        )
                        .forEach(
                            openLevel => {
                                if (
                                    openLevel !==
                                    level
                                ) {
                                    closeLevel(
                                        openLevel
                                    );
                                }
                            }
                        );

                    if (isOpen) {
                        closeLevel(level);
                    } else {
                        openLevel(level);
                    }
                }
            );
        });
}

/* =========================================
   OPEN LEVEL
   ========================================= */

function openLevel(level) {
    const trigger =
        level.querySelector(
            ".level-trigger"
        );

    const items =
        level.querySelectorAll(
            ".lesson-item"
        );

    level.classList.add("open");

    trigger?.setAttribute(
        "aria-expanded",
        "true"
    );

    items.forEach(
        (item, index) => {
            item.style.transitionDelay =
                `${index * 60}ms`;
        }
    );
}

/* =========================================
   CLOSE LEVEL
   ========================================= */

function closeLevel(level) {
    const trigger =
        level.querySelector(
            ".level-trigger"
        );

    level.classList.remove("open");

    trigger?.setAttribute(
        "aria-expanded",
        "false"
    );

    level
        .querySelectorAll(".lesson-item")
        .forEach(item => {
            item.style.transitionDelay =
                "0ms";
        });
}

/* =========================================
   REFRESH PROGRESS
   ========================================= */

function loadProgress() {
    if (!levelList) {
        return;
    }

    const progress = getProgress();

    renderLevels();

    setupAccordion();

    setupRevealAnimations();
}

/* =========================================
   CROSS-PAGE STORAGE UPDATE
   ========================================= */

function handleStorageChange(event) {
    if (
        event.key === STORAGE_KEY
    ) {
        loadProgress();
    }
}

/* =========================================
   SCROLL REVEAL
   ========================================= */

function setupRevealAnimations() {
    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) {
        return;
    }

    if (
        !(
            "IntersectionObserver" in
            window
        )
    ) {
        elements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(
                    entry => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px"
            }
        );

    elements.forEach(
        element =>
            observer.observe(element)
    );
}

/* =========================================
   ESCAPE HTML
   ========================================= */

function escapeHTML(value) {
    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
    }
