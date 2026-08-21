(() => {
    "use strict";
    
    const STORAGE_KEYS = {
        tests: "veltypeTests",
        lessons: "veltypeLessons",
        progress: "veltypeProgress",
        exercises: "veltypeExercises"
    };

    const TOTAL_LESSONS = 24;

    const $ = selector =>
        document.querySelector(selector);

    /* STORAGE */

    function getData(key, fallback = []) {
        try {
            const stored =
                localStorage.getItem(key);

            if (!stored) {
                return fallback;
            }

            const data =
                JSON.parse(stored);

            return data ?? fallback;
        } catch {
            return fallback;
        }
    }

    function getTests() {
        const data =
            getData(
                STORAGE_KEYS.tests,
                []
            );

        return Array.isArray(data)
            ? data
            : [];
    }

    function getLessons() {
        return getData(
            STORAGE_KEYS.lessons,
            []
        );
    }

    /* UI HELPERS */

    function setText(
        selector,
        value
    ) {
        const element = $(selector);

        if (element) {
            element.textContent =
                value;
        }
    }

    function setWidth(
        selector,
        percentage
    ) {
        const element = $(selector);

        if (!element) {
            return;
        }

        const value = Math.max(
            0,
            Math.min(
                100,
                Number(percentage) || 0
            )
        );

        requestAnimationFrame(() => {
            element.style.width =
                `${value}%`;
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

    /* TEST HISTORY */

    function getTestTimestamp(test) {
        if (!test) {
            return 0;
        }

        if (
            Number(test.timestamp) > 0
        ) {
            return Number(
                test.timestamp
            );
        }

        const date =
            new Date(
                test.date ||
                test.createdAt ||
                0
            ).getTime();

        return Number.isNaN(date)
            ? 0
            : date;
    }

    function formatDate(value) {
        if (!value) {
            return "Recently";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "Recently";
        }

        return new Intl.DateTimeFormat(
            "en",
            {
                day: "numeric",
                month: "short"
            }
        ).format(date);
    }

    /* =========================================================
       TEST STATISTICS
       ========================================================= */

    function getTestStats() {
        const data =
            getTests();

        if (!data.length) {
            return {
                count: 0,
                bestWpm: 0,
                bestAccuracy: 0
            };
        }

        const wpm =
            data.map(test =>
                Number(test.wpm) || 0
            );

        const accuracy =
            data.map(test =>
                Number(test.accuracy) || 0
            );

        return {
            count: data.length,

            bestWpm:
                Math.max(...wpm),

            bestAccuracy:
                Math.max(...accuracy)
        };
    }

    /* =========================================================
       NUMBER ANIMATION
       ========================================================= */

    function animateNumber(
        selector,
        target,
        suffix = ""
    ) {
        const element =
            $(selector);

        if (!element) {
            return;
        }

        const end =
            Number(target) || 0;

        const duration = 600;

        const startTime =
            performance.now();

        function update(
            currentTime
        ) {
            const progress =
                Math.min(
                    (
                        currentTime -
                        startTime
                    ) / duration,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const value =
                Math.round(
                    end * eased
                );

            element.textContent =
                `${value}${suffix}`;

            if (
                progress < 1
            ) {
                requestAnimationFrame(
                    update
                );
            }
        }

        requestAnimationFrame(
            update
        );
    }

    /* =========================================================
       LESSON HELPERS
       ========================================================= */

    function normalizePercent(
        value
    ) {
        const number =
            Number(value);

        if (
            !Number.isFinite(
                number
            )
        ) {
            return 0;
        }

        return Math.max(
            0,
            Math.min(
                100,
                Math.round(number)
            )
        );
    }

    function getLessonId(
        lesson,
        index
    ) {
        if (
            lesson &&
            typeof lesson ===
                "object"
        ) {
            const id =
                Number(
                    lesson.id ??
                    lesson.lessonId ??
                    lesson.lessonNumber ??
                    lesson.number
                );

            if (
                Number.isInteger(id) &&
                id >= 1 &&
                id <= TOTAL_LESSONS
            ) {
                return id;
            }
        }

        return index + 1;
    }

    function getLessonTitle(
        lesson,
        lessonId
    ) {
        if (
            lesson &&
            typeof lesson ===
                "object"
        ) {
            if (
                typeof lesson.title ===
                    "string" &&
                lesson.title.trim()
            ) {
                return lesson.title;
            }

            if (
                typeof lesson.name ===
                    "string" &&
                lesson.name.trim()
            ) {
                return lesson.name;
            }
        }

        return `Lesson ${String(
            lessonId
        ).padStart(2, "0")}`;
    }

    function isCompleted(
        lesson
    ) {
        if (!lesson) {
            return false;
        }

        return (
            lesson.completed ===
                true ||
            lesson.status ===
                "completed"
        );
    }

    /* =========================================================
       GET LESSON PROGRESS
       ========================================================= */

    function getLessonProgress(
        lesson,
        lessonId
    ) {
        if (!lesson) {
            return {
                id: lessonId,
                title:
                    `Lesson ${String(
                        lessonId
                    ).padStart(2, "0")}`,
                percent: 0
            };
        }

        if (
            isCompleted(lesson)
        ) {
            return {
                id: lessonId,
                title:
                    getLessonTitle(
                        lesson,
                        lessonId
                    ),
                percent: 100
            };
        }

        let percent = null;

        if (
            lesson.percentage !==
            undefined
        ) {
            percent =
                lesson.percentage;
        }

        if (
            percent === null &&
            lesson.percent !==
                undefined
        ) {
            percent =
                lesson.percent;
        }

        if (
            percent === null &&
            typeof lesson.progress ===
                "number"
        ) {
            percent =
                lesson.progress;
        }

        /*
         * If lesson.js stores exercises
         * as an array, calculate progress
         * from completed exercises.
         */

        const exercises =
            Array.isArray(
                lesson.exercises
            )
                ? lesson.exercises
                : null;

        if (
            exercises &&
            exercises.length
        ) {
            const completed =
                exercises.filter(
                    exercise =>
                        exercise ===
                            true ||
                        exercise?.completed ===
                            true ||
                        exercise?.status ===
                            "completed"
                ).length;

            const exercisePercent =
                Math.round(
                    (
                        completed /
                        exercises.length
                    ) * 100
                );

            percent =
                Math.max(
                    normalizePercent(
                        percent
                    ),
                    exercisePercent
                );
        }

        return {
            id: lessonId,

            title:
                getLessonTitle(
                    lesson,
                    lessonId
                ),

            percent:
                normalizePercent(
                    percent
                )
        };
    }

    /* =========================================================
       ALL 24 LESSONS
       ========================================================= */

    function getAllLessons() {
        const stored =
            getLessons();

        const lessons = [];

        for (
            let id = 1;
            id <= TOTAL_LESSONS;
            id++
        ) {
            let lesson = null;

            if (
                Array.isArray(
                    stored
                )
            ) {
                lesson =
                    stored.find(
                        (item, index) =>
                            getLessonId(
                                item,
                                index
                            ) === id
                    );
            } else if (
                stored &&
                typeof stored ===
                    "object"
            ) {
                lesson =
                    stored[id] ||
                    stored[
                        `lesson${id}`
                    ] ||
                    stored[
                        `lesson${String(
                            id
                        ).padStart(
                            2,
                            "0"
                        )}`
                    ];
            }

            lessons.push(
                getLessonProgress(
                    lesson,
                    id
                )
            );
        }

        return lessons;
    }

    /* =========================================================
       COMPLETED LESSON COUNT
       ========================================================= */

    function getCompletedLessons() {
        return getAllLessons()
            .filter(
                lesson =>
                    lesson.percent >=
                    100
            ).length;
    }

    /* =========================================================
       CURRENT LESSON
       First lesson below 100%
       ========================================================= */

    function getCurrentLesson() {
        const lessons =
            getAllLessons();

        return (
            lessons.find(
                lesson =>
                    lesson.percent <
                    100
            ) ||
            lessons[
                lessons.length - 1
            ]
        );
    }

    /* =========================================================
       OVERALL ACADEMY PROGRESS
       ========================================================= */

    function getAcademyPercent() {
        const lessons =
            getAllLessons();

        if (!lessons.length) {
            return 0;
        }

        const total =
            lessons.reduce(
                (
                    sum,
                    lesson
                ) =>
                    sum +
                    lesson.percent,
                0
            );

        return Math.round(
            total /
                TOTAL_LESSONS
        );
    }

    /* =========================================================
       ACADEMY LEVEL
       ========================================================= */

    function getAcademyLevel(
        percent
    ) {
        if (
            percent >= 90
        ) {
            return "Advanced";
        }

        if (
            percent >= 60
        ) {
            return "Intermediate";
        }

        if (
            percent >= 30
        ) {
            return "Developing";
        }

        return "Foundation";
    }

    /* =========================================================
       UPDATE OVERVIEW
       ========================================================= */

    function updateOverview() {
        const stats =
            getTestStats();

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
            getCompletedLessons()
        );
    }

    /* =========================================================
       UPDATE TEST HISTORY
       ========================================================= */

    function updateTestHistory() {
        const container =
            $("#testHistory");

        if (!container) {
            return;
        }

        const data =
            getTests();

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
                        Complete your first typing test
                        and your results will appear here.
                    </p>

                    <a
                        href="test.html"
                        class="dashboard-button button-secondary"
                    >
                        Take a Test
                        <span>→</span>
                    </a>

                </div>
            `;

            return;
        }

        const recent =
            [...data]
                .sort(
                    (a, b) =>
                        getTestTimestamp(b) -
                        getTestTimestamp(a)
                )
                .slice(0, 6);

        container.innerHTML = `
            <div class="history-list">

                ${recent
                    .map(test => {

                        const wpm =
                            Number(
                                test.wpm
                            ) || 0;

                        const accuracy =
                            Number(
                                test.accuracy
                            ) || 0;

                        const date =
                            test.date ||
                            test.createdAt ||
                            test.timestamp;

                        return `
                            <div class="history-item">

                                <div>

                                    <strong>
                                        ${escapeHTML(
                                            wpm
                                        )}
                                        WPM
                                    </strong>

                                    <span>
                                        ${escapeHTML(
                                            accuracy
                                        )}% accuracy
                                    </span>

                                </div>

                                <time
                                    datetime="${escapeHTML(
                                        date ||
                                        ""
                                    )}"
                                >
                                    ${formatDate(
                                        date
                                    )}
                                </time>

                            </div>
                        `;
                    })
                    .join("")}

            </div>
        `;
    }

    /* =========================================================
       UPDATE ACADEMY
       ========================================================= */

    function updateAcademy() {
        const percent =
            getAcademyPercent();

        const completed =
            getCompletedLessons();

        const current =
            getCurrentLesson();

        setText(
            "#academyPercent",
            `${percent}%`
        );

        setText(
            "#academyLevel",
            getAcademyLevel(
                percent
            )
        );

        setWidth(
            "#academyProgressBar",
            percent
        );

        const ring =
            $(".academy-ring");

        if (ring) {
            requestAnimationFrame(
                () => {
                    ring.style.background =
                        `
                        conic-gradient(
                            var(--ink)
                            0 ${percent}%,
                            var(--surface-alt)
                            ${percent}% 100%
                        )
                    `;
                }
            );
        }

        if (!current) {
            setText(
                "#academyProgressText",
                "All lessons completed. Great work!"
            );

            return;
        }

        const lessonNumber =
            String(
                current.id
            ).padStart(
                2,
                "0"
            );

        if (
            current.percent >=
            100
        ) {
            setText(
                "#academyProgressText",
                "All lessons completed. Great work!"
            );

            return;
        }

        setText(
            "#academyProgressText",
            `${current.title} — ${current.percent}% complete. Continue building your typing skills.`
        );
    }

    /* =========================================================
       RESET*/
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

        requestAnimationFrame(
            () => {
                modal.classList.add(
                    "is-visible"
                );
            }
        );
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

        setTimeout(
            () => {
                modal.hidden =
                    true;

                document.body.style.overflow =
                    "";
            },
            220
        );

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
            (
                element,
                index
            ) => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(14px)";

                setTimeout(
                    () => {

                        element.style.transition =
                            "opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1)";

                        element.style.opacity =
                            "1";

                        element.style.transform =
                            "translateY(0)";

                    },
                    70 +
                    index * 70
                );
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
       INIT
       ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            setupResetActions();

            render();

            revealDashboard();

        }
    );

})();
