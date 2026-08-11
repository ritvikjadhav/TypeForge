/* ========================================
   VELTYPE — DASHBOARD
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".dashboard-main")) return;
    initDashboard();
});

/* ========================================
   INITIALIZE
   ======================================== */

function initDashboard() {
    const history = getHistory();
    const stats = getStats(history);

    updateStats(stats, history);
    renderRecentTests(history);
    renderPerformanceChart(history);
    updateGoals(history);
    updateLearningProgress();
}

/* ========================================
   STORAGE
   ======================================== */

function getHistory() {
    try {
        const data = JSON.parse(localStorage.getItem("veltype-history"));
        if (Array.isArray(data)) return data;

        // Fallback for older TypeForge data
        const oldData = JSON.parse(localStorage.getItem("typeforge-history"));
        return Array.isArray(oldData) ? oldData : [];
    } catch {
        return [];
    }
}

function getStats(history) {
    try {
        const stored =
            JSON.parse(localStorage.getItem("veltype-stats")) ||
            JSON.parse(localStorage.getItem("typeforge-stats"));

        if (stored) return stored;
    } catch {}

    const tests = history.length;

    const totalWpm = history.reduce(
        (sum, result) => sum + Number(result.wpm || 0),
        0
    );

    const bestWpm = history.length
        ? Math.max(...history.map(result => Number(result.wpm || 0)))
        : 0;

    const averageWpm = tests
        ? Math.round(totalWpm / tests)
        : 0;

    const averageAccuracy = tests
        ? Math.round(
            history.reduce(
                (sum, result) => sum + Number(result.accuracy || 0),
                0
            ) / tests
        )
        : 0;

    return {
        tests,
        bestWpm,
        averageWpm,
        averageAccuracy
    };
}

/* ========================================
   OVERVIEW STATS
   ======================================== */

function updateStats(stats, history) {
    const averageAccuracy = history.length
        ? Math.round(
            history.reduce(
                (sum, result) => sum + Number(result.accuracy || 0),
                0
            ) / history.length
        )
        : 0;

    setValue("[data-dashboard='average-wpm']", stats.averageWpm || 0);
    setValue("[data-dashboard='best-wpm']", stats.bestWpm || 0);
    setValue("[data-dashboard='tests']", stats.tests || history.length);
    setValue("[data-dashboard='accuracy']", `${averageAccuracy}%`);

    const date = document.querySelector("[data-dashboard-date]");

    if (date) {
        date.textContent = new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric"
        });
    }
}

/* ========================================
   RECENT TESTS
   ======================================== */

function renderRecentTests(history) {
    const container = document.querySelector("[data-recent-tests]");

    if (!container) return;

    if (!history.length) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-keyboard"></i>
                <p>No typing tests yet.</p>
                <a href="test.html">Take your first test →</a>
            </div>
        `;
        return;
    }

    container.innerHTML = history
        .slice(0, 5)
        .map(result => {
            const date = formatDate(result.date);

            return `
                <div class="test-history-row">
                    <div class="test-history-info">
                        <div class="test-history-icon">
                            <i class="fa-solid fa-keyboard"></i>
                        </div>
                        <div>
                            <strong>${escapeHTML(formatMode(result.mode))}</strong>
                            <span>${date}</span>
                        </div>
                    </div>
                    <div class="test-history-speed">
                        ${Number(result.wpm || 0)}
                        <small>WPM</small>
                    </div>
                    <div class="test-history-accuracy">
                        ${Number(result.accuracy || 0)}%
                    </div>
                </div>
            `;
        })
        .join("");
}

/* ========================================
   PERFORMANCE CHART
   ======================================== */

function renderPerformanceChart(history) {
    const svg = document.querySelector("[data-speed-chart]");

    if (!svg) return;

    const results = history
        .slice(0, 10)
        .reverse();

    if (!results.length) {
        svg.innerHTML = "";
        return;
    }

    const values = results.map(
        result => Number(result.wpm || 0)
    );

    const width = 600;
    const height = 230;
    const padding = 15;

    const max = Math.max(...values, 40);
    const min = 0;
    const range = Math.max(max - min, 1);

    const points = values.map((value, index) => {
        const x = values.length === 1
            ? width / 2
            : padding +
              (index / (values.length - 1)) *
              (width - padding * 2);

        const y =
            height -
            padding -
            ((value - min) / range) *
            (height - padding * 2);

        return { x, y };
    });

    const polyline = points
        .map(point => `${point.x},${point.y}`)
        .join(" ");

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    svg.innerHTML = `
        <polyline points="${polyline}"></polyline>
        ${points.map(point => `
            <circle
                cx="${point.x}"
                cy="${point.y}"
                r="5"
            ></circle>
        `).join("")}
    `;
}

/* ========================================
   GOALS
   ======================================== */

function updateGoals(history) {
    const weeklyTests = getWeeklyTests(history);
    const weeklyGoal = 10;

    const percentage = Math.min(
        100,
        Math.round((weeklyTests / weeklyGoal) * 100)
    );

    setValue("[data-weekly-current]", weeklyTests);
    setValue("[data-weekly-goal]", weeklyGoal);
    setValue("[data-weekly-percent]", `${percentage}%`);

    document
        .querySelectorAll(".goal-progress-bar span")
        .forEach(bar => {
            bar.style.width = `${percentage}%`;
        });

    document
        .querySelectorAll(".goal-ring")
        .forEach(ring => {
            ring.style.background = `
                conic-gradient(
                    var(--accent) 0 ${percentage}%,
                    var(--surface-light) ${percentage}% 100%
                )
            `;
        });
}

function getWeeklyTests(history) {
    const now = new Date();

    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const difference = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(
        startOfWeek.getDate() - difference
    );

    startOfWeek.setHours(0, 0, 0, 0);

    return history.filter(result => {
        const date = new Date(result.date);
        return date >= startOfWeek;
    }).length;
}

/* ========================================
   LEARNING PROGRESS
   ======================================== */

function updateLearningProgress() {
    const progress = Number(
        localStorage.getItem("veltype-learning-progress") || 0
    );

    setValue(
        "[data-learning-progress]",
        `${progress}%`
    );

    document
        .querySelectorAll("[data-learning-bar]")
        .forEach(bar => {
            bar.style.width = `${progress}%`;
        });
}

/* ========================================
   DATE
   ======================================== */

function formatDate(date) {
    if (!date) return "Recently";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return "Recently";
    }

    const today = new Date();

    const isToday =
        parsed.toDateString() === today.toDateString();

    if (isToday) return "Today";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (parsed.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    return parsed.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
    });
}

/* ========================================
   TEST MODE
   ======================================== */

function formatMode(mode) {
    if (mode === "words") {
        return "25 Words";
    }

    const seconds = Number(mode);

    if (Number.isFinite(seconds)) {
        return `${seconds} Seconds`;
    }

    return "Typing Test";
}

/* ========================================
   HELPERS
   ======================================== */

function setValue(selector, value) {
    document
        .querySelectorAll(selector)
        .forEach(element => {
            element.textContent = value;
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
