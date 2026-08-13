/* ========================================
   VELTYPE — LEARN
   ======================================== */

(() => {
    "use strict";

    const STORAGE_KEY = "veltypeLessons";

    const lessons = [
        {
            id: 1,
            level: 1,
            category: "Foundation",
            title: "Keyboard Basics",
            description: "Understand the keyboard, key groups and the role of the most important keys.",
            duration: 8,
            difficulty: "Beginner"
        },
        {
            id: 2,
            level: 1,
            category: "Foundation",
            title: "Correct Sitting Position",
            description: "Set up your hands, wrists, posture and screen position for comfortable typing.",
            duration: 7,
            difficulty: "Beginner"
        },
        {
            id: 3,
            level: 1,
            category: "Foundation",
            title: "Finger Placement",
            description: "Learn which finger controls each part of the keyboard and why position matters.",
            duration: 10,
            difficulty: "Beginner"
        },
        {
            id: 4,
            level: 1,
            category: "Foundation",
            title: "Home Row Basics",
            description: "Master the home row and use F and J as your navigation anchors.",
            duration: 10,
            difficulty: "Beginner"
        },

        {
            id: 5,
            level: 2,
            category: "Core Typing",
            title: "Left Hand Practice",
            description: "Build muscle memory across the left side of the keyboard.",
            duration: 10,
            difficulty: "Beginner"
        },
        {
            id: 6,
            level: 2,
            category: "Core Typing",
            title: "Right Hand Practice",
            description: "Strengthen your right-hand movement while maintaining correct finger placement.",
            duration: 10,
            difficulty: "Beginner"
        },
        {
            id: 7,
            level: 2,
            category: "Core Typing",
            title: "Top Row",
            description: "Reach the top row naturally without losing your home-row position.",
            duration: 12,
            difficulty: "Beginner"
        },
        {
            id: 8,
            level: 2,
            category: "Core Typing",
            title: "Bottom Row",
            description: "Learn the bottom row and improve accuracy across the full alphabet.",
            duration: 12,
            difficulty: "Beginner"
        },

        {
            id: 9,
            level: 3,
            category: "Accuracy",
            title: "Numbers & Symbols",
            description: "Learn efficient movement for numbers, punctuation and common symbols.",
            duration: 12,
            difficulty: "Intermediate"
        },
        {
            id: 10,
            level: 3,
            category: "Accuracy",
            title: "Capital Letters",
            description: "Use Shift correctly and build clean capitalization habits.",
            duration: 8,
            difficulty: "Intermediate"
        },
        {
            id: 11,
            level: 3,
            category: "Accuracy",
            title: "Punctuation",
            description: "Practice commas, periods, quotes, brackets and other everyday punctuation.",
            duration: 12,
            difficulty: "Intermediate"
        },
        {
            id: 12,
            level: 3,
            category: "Accuracy",
            title: "Fixing Common Errors",
            description: "Identify repeated mistakes and build cleaner typing habits.",
            duration: 10,
            difficulty: "Intermediate"
        },

        {
            id: 13,
            level: 4,
            category: "Speed",
            title: "Common Letter Patterns",
            description: "Practice frequently used letter combinations to reduce unnecessary movement.",
            duration: 12,
            difficulty: "Intermediate"
        },
        {
            id: 14,
            level: 4,
            category: "Speed",
            title: "Common Words",
            description: "Build speed through high-frequency words used in everyday writing.",
            duration: 12,
            difficulty: "Intermediate"
        },
        {
            id: 15,
            level: 4,
            category: "Speed",
            title: "Sentence Flow",
            description: "Move from isolated words to smooth, continuous sentences.",
            duration: 12,
            difficulty: "Intermediate"
        },
        {
            id: 16,
            level: 4,
            category: "Speed",
            title: "Building Consistent Speed",
            description: "Learn how to maintain speed without sacrificing accuracy.",
            duration: 15,
            difficulty: "Intermediate"
        },

        {
            id: 17,
            level: 5,
            category: "Real World",
            title: "Typing Emails",
            description: "Practice the patterns, punctuation and formatting commonly used in emails.",
            duration: 12,
            difficulty: "Intermediate"
        },
        {
            id: 18,
            level: 5,
            category: "Real World",
            title: "Documents & Writing",
            description: "Improve typing endurance through longer-form everyday writing.",
            duration: 15,
            difficulty: "Intermediate"
        },
        {
            id: 19,
            level: 5,
            category: "Real World",
            title: "Typing for Coding",
            description: "Practice symbols, brackets and character combinations commonly used in code.",
            duration: 15,
            difficulty: "Advanced"
        },
        {
            id: 20,
            level: 5,
            category: "Real World",
            title: "Numbers & Data Entry",
            description: "Develop reliable number-entry speed and accuracy for practical work.",
            duration: 12,
            difficulty: "Advanced"
        },

        {
            id: 21,
            level: 6,
            category: "Advanced",
            title: "Speed Under Pressure",
            description: "Maintain accuracy while gradually increasing your typing speed.",
            duration: 15,
            difficulty: "Advanced"
        },
        {
            id: 22,
            level: 6,
            category: "Advanced",
            title: "Long-Form Endurance",
            description: "Build the stamina needed for longer writing and work sessions.",
            duration: 18,
            difficulty: "Advanced"
        },
        {
            id: 23,
            level: 6,
            category: "Advanced",
            title: "60+ WPM Training",
            description: "Use structured drills to move beyond intermediate typing speeds.",
            duration: 20,
            difficulty: "Advanced"
        },
        {
            id: 24,
            level: 6,
            category: "Advanced",
            title: "Final Typing Challenge",
            description: "Put everything together in a realistic test of speed, accuracy and consistency.",
            duration: 20,
            difficulty: "Advanced"
        }
    ];

    const levels = [
        {
            id: 1,
            name: "Foundation",
            tag: "Beginner",
            description: "Start here if you're new to touch typing.",
            lessonRange: [1, 4]
        },
        {
            id: 2,
            name: "Core Typing",
            tag: "Beginner",
            description: "Build control across the full keyboard.",
            lessonRange: [5, 8]
        },
        {
            id: 3,
            name: "Accuracy",
            tag: "Intermediate",
            description: "Turn correct technique into reliable typing.",
            lessonRange: [9, 12]
        },
        {
            id: 4,
            name: "Speed",
            tag: "Intermediate",
            description: "Build speed without losing control.",
            lessonRange: [13, 16]
        },
        {
            id: 5,
            name: "Real World",
            tag: "Advanced",
            description: "Apply typing skills to everyday computer work.",
            lessonRange: [17, 20]
        },
        {
            id: 6,
            name: "Advanced",
            tag: "Advanced",
            description: "Push your speed, endurance and consistency.",
            lessonRange: [21, 24]
        }
    ];

    const $ = selector => document.querySelector(selector);

    function getCompleted() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

            if (Array.isArray(saved)) {
                return saved.filter(Boolean).map(Number);
            }

            if (saved && Array.isArray(saved.completed)) {
                return saved.completed.map(Number);
            }
        } catch {
            return [];
        }

        return [];
    }

    function saveCompleted(ids) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                completed: [...new Set(ids)].sort((a, b) => a - b)
            })
        );
    }

    function renderLevels() {
        const container = $("#learningPath");

        if (!container) return;

        const completed = getCompleted();

        container.innerHTML = levels.map(level => {
            const levelLessons = lessons.filter(
                lesson => lesson.level === level.id
            );

            const completedCount = levelLessons.filter(
                lesson => completed.includes(lesson.id)
            ).length;

            const percent = Math.round(
                (completedCount / levelLessons.length) * 100
            );

            return `
                <article class="learning-level">

                    <header class="level-header">

                        <span class="level-number">
                            ${String(level.id).padStart(2, "0")}
                        </span>

                        <div>
                            <div class="level-heading">
                                <h3>${level.name}</h3>
                                <span>${level.tag}</span>
                            </div>

                            <p class="level-description">
                                ${level.description}
                            </p>
                        </div>

                        <div class="level-progress">
                            <div class="level-progress-top">
                                <span>${completedCount}/${levelLessons.length}</span>
                                <span>${percent}%</span>
                            </div>

                            <div class="level-progress-bar">
                                <span style="width:${percent}%"></span>
                            </div>
                        </div>

                    </header>

                    <div class="lesson-list">
                        ${levelLessons.map((lesson, index) => {
                            const isCompleted = completed.includes(lesson.id);

                            return `
                                <article class="lesson ${isCompleted ? "completed" : ""}">

                                    <span class="lesson-number">
                                        ${String(lesson.id).padStart(2, "0")}
                                    </span>

                                    <div class="lesson-info">
                                        <h4>${lesson.title}</h4>

                                        <p>
                                            ${lesson.description}
                                        </p>

                                        <div class="lesson-meta">
                                            <span>${lesson.duration} MIN</span>
                                            <span>${lesson.difficulty.toUpperCase()}</span>
                                        </div>
                                    </div>

                                    <a
                                        href="lesson.html?lesson=${lesson.id}"
                                        class="lesson-action"
                                        aria-label="${isCompleted ? "Review" : "Start"} ${lesson.title}"
                                    >
                                        ${isCompleted ? "✓" : "→"}
                                    </a>

                                </article>
                            `;
                        }).join("")}
                    </div>

                </article>
            `;
        }).join("");
    }

    function updateProgress() {
        const completed = getCompleted();
        const total = lessons.length;

        const count = completed.filter(
            id => lessons.some(lesson => lesson.id === id)
        ).length;

        const percent = Math.round((count / total) * 100);

        const level = getCurrentLevel(count);
        const nextLesson = lessons.find(
            lesson => !completed.includes(lesson.id)
        );

        setText("#heroProgress", `${percent}%`);
        setText("#heroCompleted", count);
        setText("#heroLevel", level);
        setText(
            "#heroNext",
            nextLesson ? nextLesson.title : "All complete"
        );

        setText("#statLessons", `${count} / ${total}`);
        setText("#statCompleted", `${percent}%`);
        setText("#statLevel", level);

        const ring = $("#heroRing");

        if (ring) {
            ring.style.background = `
                conic-gradient(
                    var(--ink) 0 ${percent}%,
                    var(--surface-alt) ${percent}% 100%
                )
            `;
        }
    }

    function getCurrentLevel(completedCount) {
        if (completedCount >= 21) return "Advanced";
        if (completedCount >= 17) return "Real World";
        if (completedCount >= 13) return "Speed";
        if (completedCount >= 9) return "Accuracy";
        if (completedCount >= 5) return "Core Typing";
        return "Foundation";
    }

    function setText(selector, value) {
        const element = $(selector);

        if (element) {
            element.textContent = value;
        }
    }

    function initLessonTracking() {
        document.addEventListener("click", event => {
            const link = event.target.closest(".lesson-action");

            if (!link) return;

            const lessonId = Number(
                new URL(link.href, window.location.href)
                    .searchParams
                    .get("lesson")
            );

            if (!lessonId) return;

            /*
             * A lesson should be marked complete by lesson.js
             * after the learner actually finishes the lesson.
             */
        });
    }

    function init() {
        renderLevels();
        updateProgress();
        initLessonTracking();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
