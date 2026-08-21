VelType V1 Dashboard JavaScript

/* VELTYPE — DASHBOARD V1 */

(() => {
    "use strict";

    /* =========================================================
       STORAGE
       ========================================================= */

    const STORAGE_KEYS = {
        tests: "veltypeTests",
        lessons: "veltypeLessons",
        progress: "veltypeProgress",
        exercises: "veltypeExercises"
    };

    const $ = selector => document.querySelector(selector);


    /* =========================================================
       LOCAL STORAGE HELPERS
       ========================================================= */

    function getData(key, fallback = []) {
        try {
            const value = localStorage.getItem(key);

            if (!value) {
                return fallback;
            }

            const data = JSON.parse(value);

            return data ?? fallback;
        } catch {
            return fallback;
        }
    }

    function getTests() {
        const data = getData(STORAGE_KEYS.tests, []);

        return Array.isArray(data) ? data : [];
    }

    function getLessons() {
        const data = getData(STORAGE_KEYS.lessons, []);

        return Array.isArray(data) ? data : [];
    }


    /* =========================================================
       BASIC UI HELPERS
       ========================================================= */

    function setText(selector, value) {
        const element = $(selector);

        if (element) {
            element.textContent = value;
        }
    }

    function setWidth(selector, percent) {
        const element = $(selector);

        if (!element) return;

        const value = Math.max(0, Math.min(100, Number(percent) || 0));

        requestAnimationFrame(() => {
            element.style.width = `${value}%`;
        });
    }

    function escapeHTML(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    /* =========================================================
       TEST TIMESTAMP
       ========================================================= */

    function getTimestamp(test) {
        if (!test) return 0;

        const value =
            test.timestamp ||
            test.date ||
            test.createdAt;

        if (!value) return 0;

        if (typeof value === "number") {
            return value;
        }

        const timestamp = new Date(value).getTime();

        return Number.isNaN(timestamp)
            ? Number(value) || 0
            : timestamp;
    }


    /* =========================================================
       DATE FORMAT
       ========================================================= */

    function formatDate(value) {
        if (!value) {
            return "Recently";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Recently";
        }

        return new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "short"
        }).format(date);
    }


    /* =========================================================
       TEST STATISTICS
       ========================================================= */

    function getTestStats() {
        const data = getTests();

        if (!data.length) {
            return {
                count: 0,
                bestWpm: 0,
                bestAccuracy: 0,
                averageWpm: 0,
                averageAccuracy: 0
            };
        }

        const wpm = data.map(test =>
            Number(test.wpm) || 0
        );

        const accuracy = data.map(test =>
            Number(test.accuracy) || 0
        );

        return {
            count: data.length,

            bestWpm: Math.max(...wpm),

            bestAccuracy: Math.max(...accuracy),

            averageWpm: Math.round(
                wpm.reduce(
                    (sum, value) => sum + value,
                    0
                ) / wpm.length
            ),

            averageAccuracy: Math.round(
                accuracy.reduce(
                    (sum, value) => sum + value,
                    0
                ) / accuracy.length
            )
        };
    }


    /* =========================================================
       NUMBER ANIMATION
       ========================================================= */

    function animateNumber(selector, target, suffix = "") {
        const element = $(selector);

        if (!element) return;

        const end = Number(target) || 0;
        const duration = 600;
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const value = Math.round(
                end * eased
            );

            element.textContent =
                `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }


    /* =========================================================
       LESSON PROGRESS
       =========================================================

       Supports different lesson.js storage formats.

       Examples:

       {
           id: 1,
           progress: 50
       }

       {
           lesson: 1,
           progress: 50
       }

       {
           id: "lesson-01",
           progress: 0.5
       }

       {
           id: 1,
           completed: true
       }
    */

    function getLessonNumber(lesson) {
        if (!lesson) return null;

        const value =
            lesson.id ??
            lesson.lessonId ??
            lesson.lesson ??
            lesson.number ??
            lesson.lessonNumber;

        if (value === undefined || value === null) {
            return null;
        }

        const match =
            String(value).match(/\d+/);

        if (!match) {
            return null;
        }

        return Number(match[0]);
    }


    function getLessonProgress(lesson) {
        if (!lesson) {
            return 0;
        }

        /* Fully completed lesson */

        if (
            lesson.completed === true ||
            lesson.status === "completed"
        ) {
            return 100;
        }


        /* Possible progress property names */

        let progress =
            lesson.progress ??
            lesson.percent ??
            lesson.percentage ??
            lesson.completion ??
            0;


        /* Convert strings such as "50%" */

        if (typeof progress === "string") {
            progress = progress.replace("%", "");
        }

        progress = Number(progress);


        /* Support decimal progress: 0.5 = 50% */

        if (
            progress > 0 &&
            progress <= 1
        ) {
            progress *= 100;
        }


        if (!Number.isFinite(progress)) {
            return 0;
        }

        return Math.max(
            0,
            Math.min(
                100,
                Math.round(progress)
            )
        );
    }


    /* =========================================================
       SORT LESSONS
       ========================================================= */

    function getSortedLessons() {
        return getLessons()
            .map(lesson => ({
                lesson,
                number: getLessonNumber(lesson),
                progress: getLessonProgress(lesson)
            }))
            .filter(item =>
                item.number !== null
            )
            .sort((a, b) =>
                a.number - b.number
            );
    }


    /* =========================================================
       TOTAL LESSONS
       =========================================================

       VelType currently has 24 learning lessons.
    */

    function getTotalLessons() {
        return 24;
    }


    /* =========================================================
       COMPLETED LESSONS
       ========================================================= */

    function getCompletedLessons() {
        return getSortedLessons()
            .filter(item =>
                item.progress >= 100
            ).length;
    }


    /* =========================================================
       CURRENT LESSON
       =========================================================

       If Lesson 01 is complete:
           show Lesson 02

       If Lesson 01 is 50%:
           show Lesson 01

       If Lesson 01 and 02 are complete
       but 03 is 40%:
           show Lesson 03
    */

    function getCurrentLesson() {
        const lessons = getSortedLessons();

        if (!lessons.length) {
            return {
                number: 1,
                progress: 0
            };
        }


        const firstIncomplete =
            lessons.find(
                item => item.progress < 100
            );

        if (firstIncomplete) {
            return firstIncomplete;
        }


        /* All saved lessons are complete */

        const last =
            lessons[lessons.length - 1];

        return {
            number: last.number + 1,
            progress: 0
        };
    }


    /* =========================================================
       OVERVIEW
       ========================================================= */

    function updateOverview() {
        const stats = getTestStats();
        const completed =
            getCompletedLessons();

        animateNumber(
            "#bestWpm",
            stats.bestWpm
        );

        animateNumber(
            "#bestAccuracy",
            stats.bestAccuracy,
            "%"
        );

        animateNumber(
            "#testsCompleted",
            stats.count
        );

        animateNumber(
            "#lessonsCompleted",
            completed
        );
    }


    /* =========================================================
       ACADEMY PROGRESS
       ========================================================= */

    function updateAcademy() {
        const completed =
            getCompletedLessons();

        const total =
            getTotalLessons();

        /*
         * A lesson that is 50% complete
         * also contributes to overall academy
         * progress.
         */

        const lessons =
            getSortedLessons();

        const partialProgress =
            lessons.reduce(
                (totalProgress, item) =>
                    totalProgress + item.progress,
                0
            );

        const percent = total
            ? Math.min(
                100,
                Math.round(
                    (partialProgress /
                        (total * 100)) *
                    100
                )
            )
            : 0;


        /* Ring percentage */

        setText(
            "#academyPercent",
            `${percent}%`
        );


        /* Current level */

        setText(
            "#academyLevel",
            getAcademyLevel(percent)
        );


        /* Current lesson */

        const current =
            getCurrentLesson();


        if (current.progress > 0) {

            setText(
                "#academyProgressText",
                `Lesson ${String(current.number).padStart(2, "0")} is ${current.progress}% complete.`
            );

        } else {

            setText(
                "#academyProgressText",
                `Continue with Lesson ${String(current.number).padStart(2, "0")} to build your typing skills.`
            );
        }


        /* Progress bar */

        setWidth(
            "#academyProgressBar",
            percent
        );


        /* Progress ring */

        const ring =
            $(".academy-ring");

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


    /* =========================================================
       ACADEMY LEVEL
       ========================================================= */

    function getAcademyLevel(percent) {

        if (percent >= 90) {
            return "Advanced";
        }

        if (percent >= 60) {
            return "Intermediate";
        }

        if (percent >= 30) {
            return "Developing";
        }

        return "Foundation";
    }


    /* =========================================================
       TEST HISTORY
       ========================================================= */

    function updateTestHistory() {

        const container =
            $("#testHistory");

        if (!container) {
            return;
        }


        const data =
            getTests();


        /* No history */

        if (!data.length) {

            container.innerHTML = `
                <div class="empty-state">

                    <div class="empty-mark">
                        ⌨
                    </div>

                    <h3>
                        No tests yet
                    </h3>

                    <p>
                        Complete your first typing test and your results will appear here.
                    </p>

                    <a
                        href="test.html"
                        class="dashboard-button button-secondary"
                    >
                        Take a Test <span>→</span>
                    </a>

                </div>
            `;

            return;
        }


        /* Latest tests first */

        const recent =
            [...data]
                .sort(
                    (a, b) =>
                        getTimestamp(b) -
                        getTimestamp(a)
                )
                .slice(0, 6);


        container.innerHTML = `

            <div class="history-list">

                ${recent.map(test => {

                    const wpm =
                        Number(test.wpm) || 0;

                    const accuracy =
                        Number(test.accuracy) || 0;

                    const errors =
                        Number(test.errors) || 0;

                    const mode =
                        Number(test.mode) ||
                        Number(test.duration) ||
                        30;

                    const date =
                        test.date ||
                        test.timestamp ||
                        test.createdAt;


                    return `

                        <div class="history-item">

                            <div class="history-main">

                                <strong>
                                    ${escapeHTML(wpm)} WPM
                                </strong>

                                <span>
                                    ${escapeHTML(accuracy)}% accuracy
                                </span>

                            </div>


                            <div class="history-details">

                                <span>
                                    ${escapeHTML(errors)} errors
                                </span>

                                <span>
                                    ${escapeHTML(mode)}s
                                </span>

                                <time
                                    datetime="${escapeHTML(date || "")}"
                                >
                                    ${formatDate(date)}
                                </time>

                            </div>

                        </div>

                    `;

                }).join("")}

            </div>
        `;
    }


    /* =========================================================
       RESET
       ========================================================= */

    let resetType = null;


    function setupResetActions() {

        const resetExercises =
            $("#resetExercises");

        const resetProgress =
            $("#resetProgress");

        const cancelReset =
            $("#cancelReset");

        const confirmReset =
            $("#confirmReset");

        const modal =
            $("#resetModal");


        resetExercises?.addEventListener(
            "click",
            () => {

                resetType =
                    "exercises";

                openResetModal(
                    "Reset exercises?",
                    "Your saved exercise progress will be removed. Your test history will remain."
                );

            }
        );


        resetProgress?.addEventListener(
            "click",
            () => {

                resetType =
                    "progress";

                openResetModal(
                    "Reset your progress?",
                    "This will remove your saved lessons, tests and typing statistics. This action cannot be undone."
                );

            }
        );


        cancelReset?.addEventListener(
            "click",
            closeResetModal
        );


        confirmReset?.addEventListener(
            "click",
            () => {

                if (
                    resetType ===
                    "exercises"
                ) {

                    localStorage.removeItem(
                        STORAGE_KEYS.exercises
                    );

                }


                if (
                    resetType ===
                    "progress"
                ) {

                    localStorage.removeItem(
                        STORAGE_KEYS.tests
                    );

                    localStorage.removeItem(
                        STORAGE_KEYS.lessons
                    );

                    localStorage.removeItem(
                        STORAGE_KEYS.progress
                    );

                    localStorage.removeItem(
                        STORAGE_KEYS.exercises
                    );

                }


                closeResetModal();

                render();

            }
        );


        modal
            ?.querySelector(
                ".reset-modal-backdrop"
            )
            ?.addEventListener(
                "click",
                closeResetModal
            );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeResetModal();

                }

            }
        );
    }


    /* =========================================================
       RESET MODAL
       ========================================================= */

    function openResetModal(
        title,
        message
    ) {

        const modal =
            $("#resetModal");

        if (!modal) {
            return;
        }

        setText(
            "#resetModalTitle",
            title
        );

        setText(
            "#resetModalText",
            message
        );

        modal.hidden = false;

        document.body.style.overflow =
            "hidden";

        requestAnimationFrame(() => {

            modal.classList.add(
                "is-visible"
            );

        });
    }


    function closeResetModal() {

        const modal =
            $("#resetModal");

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "is-visible"
        );

        setTimeout(() => {

            modal.hidden = true;

            document.body.style.overflow =
                "";

        }, 220);

        resetType = null;
    }


    /* =========================================================
       DASHBOARD ANIMATION
       ========================================================= */

    function revealDashboard() {

        const elements =
            document.querySelectorAll(
                ".dashboard-header, .stats-grid, .dashboard-card"
            );


        elements.forEach(
            (element, index) => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(14px)";


                setTimeout(() => {

                    element.style.transition =
                        "opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1)";

                    element.style.opacity =
                        "1";

                    element.style.transform =
                        "translateY(0)";

                }, 70 + index * 70);

            }
        );
    }


    /* =========================================================
       RENDER
       ========================================================= */

    function render() {

        updateOverview();

        updateTestHistory();

        updateAcademy();
    }


    /* =========================================================
       INITIALIZATION
       ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            setupResetActions();

            render();

            revealDashboard();

        }
    );

})()
