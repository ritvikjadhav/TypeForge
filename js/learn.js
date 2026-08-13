/* =========================================
   VELTYPE — LEARN V1
   ========================================= */

const levels = [
    {
        id: 1,
        title: "Foundation",
        description: "Start here if you're new to touch typing.",
        difficulty: "Beginner",
        lessons: [
            {
                id: 1,
                title: "Keyboard Basics",
                description: "Understand the keyboard, key groups and the role of the most important keys.",
                duration: 8,
                difficulty: "Beginner"
            },
            {
                id: 2,
                title: "Correct Sitting Position",
                description: "Set up your hands, wrists, posture and screen position for comfortable typing.",
                duration: 7,
                difficulty: "Beginner"
            },
            {
                id: 3,
                title: "Finger Placement",
                description: "Learn which finger controls each part of the keyboard and why position matters.",
                duration: 10,
                difficulty: "Beginner"
            },
            {
                id: 4,
                title: "Home Row Basics",
                description: "Master the home row and use F and J as your navigation anchors.",
                duration: 10,
                difficulty: "Beginner"
            }
        ]
    },

    {
        id: 2,
        title: "Core Typing",
        description: "Build control across the full keyboard.",
        difficulty: "Beginner",
        lessons: [
            {
                id: 5,
                title: "Left Hand Practice",
                description: "Build muscle memory across the left side of the keyboard.",
                duration: 10,
                difficulty: "Beginner"
            },
            {
                id: 6,
                title: "Right Hand Practice",
                description: "Strengthen your right-hand movement while maintaining correct finger placement.",
                duration: 10,
                difficulty: "Beginner"
            },
            {
                id: 7,
                title: "Top Row",
                description: "Reach the top row naturally without losing your home-row position.",
                duration: 12,
                difficulty: "Beginner"
            },
            {
                id: 8,
                title: "Bottom Row",
                description: "Learn the bottom row and improve accuracy across the full alphabet.",
                duration: 12,
                difficulty: "Beginner"
            }
        ]
    },

    {
        id: 3,
        title: "Accuracy",
        description: "Turn correct technique into reliable typing.",
        difficulty: "Intermediate",
        lessons: [
            {
                id: 9,
                title: "Numbers & Symbols",
                description: "Learn efficient movement for numbers, punctuation and common symbols.",
                duration: 12,
                difficulty: "Intermediate"
            },
            {
                id: 10,
                title: "Capital Letters",
                description: "Use Shift correctly and build clean capitalization habits.",
                duration: 8,
                difficulty: "Intermediate"
            },
            {
                id: 11,
                title: "Punctuation",
                description: "Practice commas, periods, quotes, brackets and other everyday punctuation.",
                duration: 12,
                difficulty: "Intermediate"
            },
            {
                id: 12,
                title: "Fixing Common Errors",
                description: "Identify repeated mistakes and build cleaner typing habits.",
                duration: 10,
                difficulty: "Intermediate"
            }
        ]
    },

    {
        id: 4,
        title: "Speed",
        description: "Build speed without losing control.",
        difficulty: "Intermediate",
        lessons: [
            {
                id: 13,
                title: "Common Letter Patterns",
                description: "Practice frequently used letter combinations to reduce unnecessary movement.",
                duration: 12,
                difficulty: "Intermediate"
            },
            {
                id: 14,
                title: "Common Words",
                description: "Build speed through high-frequency words used in everyday writing.",
                duration: 12,
                difficulty: "Intermediate"
            },
            {
                id: 15,
                title: "Sentence Flow",
                description: "Move from isolated words to smooth, continuous sentences.",
                duration: 12,
                difficulty: "Intermediate"
            },
            {
                id: 16,
                title: "Building Consistent Speed",
                description: "Learn how to maintain speed without sacrificing accuracy.",
                duration: 15,
                difficulty: "Intermediate"
            }
        ]
    },

    {
        id: 5,
        title: "Real World",
        description: "Apply typing skills to everyday computer work.",
        difficulty: "Advanced",
        lessons: [
            {
                id: 17,
                title: "Typing Emails",
                description: "Practice the patterns, punctuation and formatting commonly used in emails.",
                duration: 12,
                difficulty: "Intermediate"
            },
            {
                id: 18,
                title: "Documents & Writing",
                description: "Improve typing endurance through longer-form everyday writing.",
                duration: 15,
                difficulty: "Intermediate"
            },
            {
                id: 19,
                title: "Typing for Coding",
                description: "Practice symbols, brackets and character combinations commonly used in code.",
                duration: 15,
                difficulty: "Advanced"
            },
            {
                id: 20,
                title: "Numbers & Data Entry",
                description: "Develop reliable number-entry speed and accuracy for practical work.",
                duration: 12,
                difficulty: "Advanced"
            }
        ]
    },

    {
        id: 6,
        title: "Advanced",
        description: "Push your speed, endurance and consistency.",
        difficulty: "Advanced",
        lessons: [
            {
                id: 21,
                title: "Speed Under Pressure",
                description: "Maintain accuracy while gradually increasing your typing speed.",
                duration: 15,
                difficulty: "Advanced"
            },
            {
                id: 22,
                title: "Long-Form Endurance",
                description: "Build the stamina needed for longer writing and work sessions.",
                duration: 18,
                difficulty: "Advanced"
            },
            {
                id: 23,
                title: "60+ WPM Training",
                description: "Use structured drills to move beyond intermediate typing speeds.",
                duration: 20,
                difficulty: "Advanced"
            },
            {
                id: 24,
                title: "Final Typing Challenge",
                description: "Put everything together in a realistic test of speed, accuracy and consistency.",
                duration: 20,
                difficulty: "Advanced"
            }
        ]
    }
];

/* =========================================
   ELEMENTS
   ========================================= */

const levelList = document.getElementById("levelList");

if (levelList) {
    renderLevels();
    setupAccordion();
    loadProgress();
}

/* =========================================
   RENDER LEVELS
   ========================================= */

function renderLevels() {
    levelList.innerHTML = levels.map(level => `
        <article class="level" data-level="${level.id}">

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
                        <span class="level-title">${level.title}</span>
                        <span class="level-tag">${level.difficulty}</span>
                    </span>

                    <span class="level-description">
                        ${level.description}
                    </span>

                    <span class="level-progress">
                        <span class="level-progress-top">
                            <span class="progress-count">0/${level.lessons.length}</span>
                            <span class="progress-percent">0%</span>
                        </span>

                        <span class="progress-track">
                            <span class="progress-fill"></span>
                        </span>
                    </span>
                </span>

                <span class="level-arrow" aria-hidden="true">↓</span>
            </button>

            <div
                class="level-content"
                id="level-content-${level.id}"
            >
                <div class="level-content-inner">
                    <div class="lesson-list">
                        ${level.lessons.map(lesson => `
                            <a
                                href="lesson.html?lesson=${lesson.id}"
                                class="lesson-item"
                                data-lesson="${lesson.id}"
                            >
                                <span class="lesson-number">
                                    ${String(lesson.id).padStart(2, "0")}
                                </span>

                                <span class="lesson-content">
                                    <span class="lesson-title">
                                        ${lesson.title}
                                    </span>

                                    <span class="lesson-description">
                                        ${lesson.description}
                                    </span>

                                    <span class="lesson-meta">
                                        <span>${lesson.duration} min</span>
                                        <span>${lesson.difficulty}</span>
                                    </span>
                                </span>

                                <span class="lesson-arrow" aria-hidden="true">
                                    →
                                </span>
                            </a>
                        `).join("")}
                    </div>
                </div>
            </div>

        </article>
    `).join("");
}

/* =========================================
   ACCORDION
   ONLY ONE LEVEL OPEN
   ========================================= */

function setupAccordion() {
    const triggers = document.querySelectorAll(".level-trigger");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const currentLevel = trigger.closest(".level");
            const isOpen = currentLevel.classList.contains("open");

            document.querySelectorAll(".level.open").forEach(level => {
                if (level !== currentLevel) {
                    closeLevel(level);
                }
            });

            if (isOpen) {
                closeLevel(currentLevel);
            } else {
                openLevel(currentLevel);
            }
        });
    });
}

function openLevel(level) {
    const trigger = level.querySelector(".level-trigger");

    level.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");

    const items = level.querySelectorAll(".lesson-item");

    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 55}ms`;
    });
}

function closeLevel(level) {
    const trigger = level.querySelector(".level-trigger");

    level.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");

    level.querySelectorAll(".lesson-item").forEach(item => {
        item.style.transitionDelay = "0ms";
    });
}

/* =========================================
   PROGRESS
   ========================================= */

function loadProgress() {
    const completedLessons =
        JSON.parse(localStorage.getItem("veltypeCompletedLessons")) || [];

    levels.forEach(level => {
        const completed = level.lessons.filter(lesson =>
            completedLessons.includes(String(lesson.id))
        ).length;

        const percent = Math.round(
            (completed / level.lessons.length) * 100
        );

        const levelElement = document.querySelector(
            `[data-level="${level.id}"]`
        );

        if (!levelElement) return;

        const count = levelElement.querySelector(".progress-count");
        const percentage = levelElement.querySelector(".progress-percent");
        const fill = levelElement.querySelector(".progress-fill");

        count.textContent =
            `${completed}/${level.lessons.length}`;

        percentage.textContent =
            `${percent}%`;

        fill.style.width =
            `${percent}%`;

        level.lessons.forEach(lesson => {
            const lessonElement = levelElement.querySelector(
                `[data-lesson="${lesson.id}"]`
            );

            if (
                lessonElement &&
                completedLessons.includes(String(lesson.id))
            ) {
                lessonElement.classList.add("completed");
            }
        });
    });
}

/* =========================================
   CROSS-PAGE LESSON COMPLETION
   ========================================= */

window.addEventListener("storage", event => {
    if (event.key === "veltypeCompletedLessons") {
        loadProgress();
    }
});
