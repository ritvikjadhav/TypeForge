/* VELTYPE — DASHBOARD V1 */

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

    const tests = () => getData(STORAGE_KEYS.tests);
    const lessons = () => getData(STORAGE_KEYS.lessons);

    function setText(selector, value) {
        const element = $(selector);

        if (element) {
            element.textContent = value;
        }
    }

    function setWidth(selector, percent) {
        const element = $(selector);

        if (element) {
            requestAnimationFrame(() => {
                element.style.width = `${percent}%`;
            });
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

    function animateNumber(selector, target, suffix = "") {
        const element = $(selector);

        if (!element) return;

        const end = Number(target) || 0;
        const duration = 700;
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(end * eased);

            element.textContent = `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function updateOverview() {
        const stats = getTestStats();
        const completedLessons = getCompletedLessons();

        animateNumber("#bestWpm", stats.bestWpm);
        animateNumber("#bestAccuracy", stats.bestAccuracy, "%");
        animateNumber("#testsCompleted", stats.count);
        animateNumber("#lessonsCompleted", completedLessons);
    }

    function updatePerformance() {
        const stats = getTestStats();

        animateNumber("#averageWpm", stats.averageWpm);
        animateNumber("#averageAccuracy", stats.averageAccuracy, "%");
        animateNumber("#totalTests", stats.count);

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

        setWidth("#academyProgressBar", percent);

        const ring = $(".academy-ring");

        if (ring) {
            requestAnimationFrame(() => {
                ring.style.background = `
                    conic-gradient(
                        var(--ink) 0 ${percent}%,
                        var(--surface-alt) ${percent}% 100%
                    )
                `;
            });
        }
    }

    function getAcademyLevel(percent) {
        if (percent >= 90) return "Advanced";
        if (percent >= 60) return "Intermediate";
        if (percent >= 30) return "Developing";
        return "Foundation";
    }

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

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeResetModal();
            }
        });
    }

    function openResetModal(title, message) {
        const modal = $("#resetModal");

        if (!modal) return;

        setText("#resetModalTitle", title);
        setText("#resetModalText", message);

        modal.hidden = false;
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            modal.classList.add("is-visible");
        });
    }

    function closeResetModal() {
        const modal = $("#resetModal");

        if (!modal) return;

        modal.classList.remove("is-visible");

        setTimeout(() => {
            modal.hidden = true;
            document.body.style.overflow = "";
        }, 220);

        resetType = null;
    }

    function revealDashboard() {
        const elements = document.querySelectorAll(
            ".dashboard-header, .stats-grid, .dashboard-card"
        );

        elements.forEach((element, index) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(14px)";

            setTimeout(() => {
                element.style.transition =
                    "opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1)";

                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }, 70 + index * 70);
        });
    }

    function render() {
        updateOverview();
        updatePerformance();
        updateTestHistory();
        updateAcademy();
    }

    document.addEventListener("DOMContentLoaded", () => {
        setupResetActions();
        render();
        revealDashboard();
    });
})();
