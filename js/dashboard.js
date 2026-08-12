/* ========================================
   VELTYPE — DASHBOARD V1
   ======================================== */

(() => {
    "use strict";

    const STORAGE_KEYS = {
        tests: "veltypeTests",
        lessons: "veltypeLessons",
        progress: "veltypeProgress",
        exercises: "veltypeExercises"
    };

    const $ = (selector) => document.querySelector(selector);

    const getData = (key, fallback = []) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch {
            return fallback;
        }
    };

    const setData = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const tests = () => getData(STORAGE_KEYS.tests);
    const lessons = () => getData(STORAGE_KEYS.lessons);

    /* ========================================
       TEST STATISTICS
       ======================================== */

    function getTestStats() {
        const data = tests();

        if (!data.length) {
            return {
                count: 0,
                bestWpm: 0,
                bestAccuracy: 0,
                averageWpm: 0,
                averageAccuracy: 0
            };
        }

        const wpm = data.map(test => Number(test.wpm) || 0);
        const accuracy = data.map(test => Number(test.accuracy) || 0);

        return {
            count: data.length,
            bestWpm: Math.max(...wpm),
            bestAccuracy: Math.max(...accuracy),
            averageWpm: Math.round(
                wpm.reduce((sum, value) => sum + value, 0) / wpm.length
            ),
            averageAccuracy: Math.round(
                accuracy.reduce((sum, value) => sum + value, 0) / accuracy.length
            )
        };
    }

    /* ========================================
       OVERVIEW
       ======================================== */

    function updateOverview() {
        const stats = getTestStats();
        const completedLessons = getCompletedLessons();

        setText("#bestWpm", stats.bestWpm);
        setText("#bestAccuracy", `${stats.bestAccuracy}%`);
        setText("#testsCompleted", stats.count);
        setText("#lessonsCompleted", completedLessons);
    }

    /* ========================================
       PERFORMANCE
       ======================================== */

    function updatePerformance() {
        const stats = getTestStats();

        setText("#averageWpm", stats.averageWpm);
        setText("#averageAccuracy", `${stats.averageAccuracy}%`);
        setText("#totalTests", stats.count);

        const message = $("#performanceMessage");

        if (!message) return;

        if (!stats.count) {
            message.innerHTML = `
                <span>↗</span>
                <div>
                    <h3>Your performance will appear here.</h3>
                    <p>Complete a few tests to start building your typing history.</p>
                </div>
            `;
            return;
        }

        message.innerHTML = `
            <span>↗</span>
            <div>
                <h3>You're building your typing history.</h3>
                <p>
                    Your average is ${stats.averageWpm} WPM with
                    ${stats.averageAccuracy}% accuracy.
                </p>
            </div>
        `;
    }

    /* ========================================
       RECENT TESTS
       ======================================== */

    function updateTestHistory() {
        const container = $("#testHistory");

        if (!container) return;

        const data = tests();

        if (!data.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-mark">⌨</div>
                    <h3>No tests yet</h3>
                    <p>
                        Complete your first typing test and your results will appear here.
                    </p>
                    <a href="test.html" class="dashboard-button button-secondary">
                        Take a Test <span>→</span>
                    </a>
                </div>
            `;
            return;
        }

        const recent = [...data]
            .sort((a, b) => getTimestamp(b) - getTimestamp(a))
            .slice(0, 6);

        container.innerHTML = `
            <div class="history-list">
                ${recent.map(test => `
                    <div class="history-item">
                        <div>
                            <strong>${escapeHTML(test.wpm ?? 0)} WPM</strong>
                            <span>${escapeHTML(test.accuracy ?? 0)}% accuracy</span>
                        </div>

                        <time datetime="${escapeHTML(test.date ?? "")}">
                            ${formatDate(test.date)}
                        </time>
                    </div>
                `).join("")}
            </div>
        `;
    }

    /* ========================================
       ACADEMY PROGRESS
       ======================================== */

    function updateAcademy() {
        const completed = getCompletedLessons();
        const total = getTotalLessons();
        const percent = total
            ? Math.min(100, Math.round((completed / total) * 100))
            : 0;

        setText("#academyPercent", `${percent}%`);
        setText("#academyLevel", getAcademyLevel(percent));

        setText(
            "#academyProgressText",
            completed
                ? `${completed} of ${total} lessons completed. Keep building your typing skills.`
                : "Start your first lesson to build your typing foundation."
        );

        const bar = $("#academyProgressBar");

        if (bar) {
            bar.style.width = `${percent}%`;
        }

        const ring = $(".academy-ring");

        if (ring) {
            ring.style.background = `
                conic-gradient(
                    var(--ink) 0 ${percent}%,
                    var(--surface-alt) ${percent}% 100%
                )
            `;
        }
    }

    function getAcademyLevel(percent) {
        if (percent >= 90) return "Advanced";
        if (percent >= 60) return "Intermediate";
        if (percent >= 30) return "Developing";
        return "Foundation";
    }

    /* ========================================
       NEXT LESSON
       ======================================== */

    function updateCurrentLesson() {
        const completed = getCompletedLessons();
        const next = Math.min(completed + 1, getTotalLessons());

        const lessonData = getLessonData(next);

        if (!lessonData) return;

        setText("#currentLessonTitle", lessonData.title);
        setText("#currentLessonDescription", lessonData.description);

        const button = $("#continueLessonButton");

        if (button) {
            button.href = `lesson.html?level=${lessonData.level}&lesson=${lessonData.lesson}`;
            button.innerHTML = completed >= getTotalLessons()
                ? `Review Lesson <span>→</span>`
                : `Start Lesson <span>→</span>`;
        }
    }

    function getLessonData(number) {
        const lessons = [
            {
                level: 1,
                lesson: 1,
                title: "Home Row Basics",
                description: "Learn correct finger placement and build your touch typing foundation."
            },
            {
                level: 1,
                lesson: 2,
                title: "Top Row Basics",
                description: "Build confidence reaching the top row while maintaining proper finger placement."
            },
            {
                level: 1,
                lesson: 3,
                title: "Bottom Row Basics",
                description: "Practice the bottom row and improve accuracy across the keyboard."
            },
            {
                level: 2,
                lesson: 1,
                title: "Common Words",
                description: "Use common word patterns to improve speed without sacrificing accuracy."
            }
        ];

        return lessons[number - 1] || null;
    }

    /* ========================================
       WEEKLY GOALS
       ======================================== */

    function updateWeeklyGoals() {
        const weekTests = getTestsThisWeek();
        const weekLessons = getLessonsThisWeek();
        const stats = getTestStats();

        const testTarget = 5;
        const lessonTarget = 3;

        const testPercent = Math.min(
            100,
            Math.round((weekTests / testTarget) * 100)
        );

        const lessonPercent = Math.min(
            100,
            Math.round((weekLessons / lessonTarget) * 100)
        );

        const accuracyPercent = Math.min(
            100,
            stats.averageAccuracy
        );

        setText("#weeklyTests", `${weekTests} / ${testTarget}`);
        setText("#weeklyLessons", `${weekLessons} / ${lessonTarget}`);
        setText("#weeklyAccuracy", `${stats.averageAccuracy}%`);

        setWidth("#weeklyTestsBar", testPercent);
        setWidth("#weeklyLessonsBar", lessonPercent);
        setWidth("#weeklyAccuracyBar", accuracyPercent);
    }

    function getTestsThisWeek() {
        const start = getStartOfWeek();

        return tests().filter(test => {
            const date = getTimestamp(test);
            return date >= start;
        }).length;
    }

    function getLessonsThisWeek() {
        const start = getStartOfWeek();

        return lessons().filter(lesson => {
            const date = getTimestamp(lesson);
            return date >= start && isLessonCompleted(lesson);
        }).length;
    }

    function getStartOfWeek() {
        const date = new Date();
        const day = date.getDay();
        const difference = day === 0 ? 6 : day - 1;

        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - difference);

        return date.getTime();
    }

    /* ========================================
       LESSON DATA
       ======================================== */

    function getCompletedLessons() {
        return lessons().filter(isLessonCompleted).length;
    }

    function getTotalLessons() {
        return 4;
    }

    function isLessonCompleted(lesson) {
        return (
            lesson?.completed === true ||
            lesson?.status === "completed"
        );
    }

    /* ========================================
       RESET
       ======================================== */

    let resetType = null;

    function setupResetActions() {
        const resetExercises = $("#resetExercises");
        const resetProgress = $("#resetProgress");
        const cancelReset = $("#cancelReset");
        const confirmReset = $("#confirmReset");
        const modal = $("#resetModal");

        resetExercises?.addEventListener("click", () => {
            resetType = "exercises";
            openResetModal(
                "Reset exercises?",
                "Your saved exercise progress will be removed. Your test history will remain."
            );
        });

        resetProgress?.addEventListener("click", () => {
            resetType = "progress";
            openResetModal(
                "Reset your progress?",
                "This will remove your saved lessons, tests and typing statistics. This action cannot be undone."
            );
        });

        cancelReset?.addEventListener("click", closeResetModal);

        confirmReset?.addEventListener("click", () => {
            if (resetType === "exercises") {
                localStorage.removeItem(STORAGE_KEYS.exercises);
            }

            if (resetType === "progress") {
                localStorage.removeItem(STORAGE_KEYS.tests);
                localStorage.removeItem(STORAGE_KEYS.lessons);
                localStorage.removeItem(STORAGE_KEYS.progress);
                localStorage.removeItem(STORAGE_KEYS.exercises);
            }

            closeResetModal();
            render();
        });

        modal?.querySelector(".reset-modal-backdrop")
            ?.addEventListener("click", closeResetModal);
    }

    function openResetModal(title, message) {
        const modal = $("#resetModal");

        if (!modal) return;

        setText("#resetModalTitle", title);
        setText("#resetModalText", message);

        modal.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeResetModal() {
        const modal = $("#resetModal");

        if (!modal) return;

        modal.hidden = true;
        document.body.style.overflow = "";
        resetType = null;
    }

    /* ========================================
       HELPERS
       ======================================== */

    function setText(selector, value) {
        const element = $(selector);

        if (element) {
            element.textContent = value;
        }
    }

    function setWidth(selector, percent) {
        const element = $(selector);

        if (element) {
            element.style.width = `${percent}%`;
        }
    }

    function getTimestamp(item) {
        if (!item) return 0;

        const value = item.timestamp || item.date || item.createdAt;

        if (!value) return 0;

        const timestamp = new Date(value).getTime();

        return Number.isNaN(timestamp)
            ? Number(value) || 0
            : timestamp;
    }

    function formatDate(value) {
        if (!value) return "Recently";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Recently";
        }

        return new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "short"
        }).format(date);
    }

    function escapeHTML(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    /* ========================================
       RENDER
       ======================================== */

    function render() {
        updateOverview();
        updatePerformance();
        updateTestHistory();
        updateAcademy();
        updateCurrentLesson();
        updateWeeklyGoals();
    }

    /* ========================================
       INIT
       ======================================== */

    document.addEventListener("DOMContentLoaded", () => {
        setupResetActions();
        render();
    });

})();
