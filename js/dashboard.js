
/* ========================================
   TYPEFORGE — DASHBOARD
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".dashboard-main, .summary-grid")) return;
    initDashboard();
});

/* ========================================
   INITIALIZE
   ======================================== */

function initDashboard() {
    loadDashboardStats();
    renderRecentTests();
    renderPersonalRecords();
    renderSpeedChart();
    renderAccuracy();
    renderWeeklyGoal();
}

/* ========================================
   DATA
   ======================================== */

function getHistory() {
    try {
        return JSON.parse(
            localStorage.getItem("typeforge-history")
        ) || [];
    } catch {
        return [];
    }
}

function getStats() {
    try {
        return JSON.parse(
            localStorage.getItem("typeforge-stats")
        ) || {
            tests: 0,
            totalCharacters: 0,
            totalCorrect: 0,
            bestWpm: 0,
            averageWpm: 0
        };
    } catch {
        return {
            tests: 0,
            totalCharacters: 0,
            totalCorrect: 0,
            bestWpm: 0,
            averageWpm: 0
        };
    }
}

/* ========================================
   SUMMARY STATS
   ======================================== */

function loadDashboardStats() {
    const stats = getStats();
    const history = getHistory();

    const averageAccuracy = history.length
        ? Math.round(
              history.reduce(
                  (sum, result) =>
                      sum + Number(result.accuracy || 0),
                  0
              ) / history.length
          )
        : 0;

    setValue(
        "[data-dashboard='tests']",
        stats.tests
    );

    setValue(
        "[data-dashboard='best-wpm']",
        stats.bestWpm || 0
    );

    setValue(
        "[data-dashboard='average-wpm']",
        stats.averageWpm || 0
    );

    setValue(
        "[data-dashboard='accuracy']",
        `${averageAccuracy}%`
    );

    setValue(
        "[data-dashboard='characters']",
        formatCompactNumber(stats.totalCharacters)
    );

    const dateElement =
        document.querySelector("[data-dashboard-date]");

    if (dateElement) {
        dateElement.textContent =
            new Date().toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                }
            );
    }
}

/* ========================================
   RECENT TESTS
   ======================================== */

function renderRecentTests() {
    const container =
        document.querySelector("[data-recent-tests]");

    if (!container) return;

    const history = getHistory();

    if (!history.length) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-keyboard"></i>
                <p>No tests yet. Complete your first typing test.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = history
        .slice(0, 6)
        .map(result => {
            const date =
                new Date(result.date).toLocaleDateString(
                    undefined,
                    {
                        month: "short",
                        day: "numeric"
                    }
                );

            return `
                <div class="test-history-row">
                    <div class="test-history-info">
                        <div class="test-history-icon">
                            <i class="fa-solid fa-keyboard"></i>
                        </div>
                        <div>
                            <strong>${escapeHTML(
                                formatMode(result.mode)
                            )}</strong>
                            <span>${date}</span>
                        </div>
                    </div>
                    <div class="test-history-speed">
                        ${result.wpm}
                        <small>WPM</small>
                    </div>
                    <div class="test-history-accuracy">
                        ${result.accuracy}%
                    </div>
                </div>
            `;
        })
        .join("");
}

/* ========================================
   PERSONAL RECORDS
   ======================================== */

function renderPersonalRecords() {
    const container =
        document.querySelector("[data-personal-records]");

    if (!container) return;

    const history = getHistory();

    if (!history.length) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Your records will appear here.</p>
            </div>
        `;
        return;
    }

    const bestWpm = Math.max(
        ...history.map(result => Number(result.wpm || 0))
    );

    const bestAccuracy = Math.max(
        ...history.map(
            result => Number(result.accuracy || 0)
        )
    );

    const fastestRaw = Math.max(
        ...history.map(
            result => Number(result.rawWpm || 0)
        )
    );

    const longestTest = Math.max(
        ...history.map(
            result => Number(result.duration || 0)
        )
    );

    const records = [
        {
            icon: "fa-solid fa-bolt",
            title: "Best Speed",
            subtitle: "Highest WPM",
            value: bestWpm,
            unit: "WPM"
        },
        {
            icon: "fa-solid fa-bullseye",
            title: "Best Accuracy",
            subtitle: "Most accurate test",
            value: bestAccuracy,
            unit: "%"
        },
        {
            icon: "fa-solid fa-gauge-high",
            title: "Raw Speed",
            subtitle: "Highest uncorrected WPM",
            value: fastestRaw,
            unit: "WPM"
        },
        {
            icon: "fa-solid fa-clock",
            title: "Longest Session",
            subtitle: "Longest completed test",
            value: longestTest,
            unit: "sec"
        }
    ];

    container.innerHTML = records
        .map(record => `
            <div class="record-row">
                <div class="record-icon">
                    <i class="${record.icon}"></i>
                </div>
                <div class="record-info">
                    <strong>${record.title}</strong>
                    <span>${record.subtitle}</span>
                </div>
                <div class="record-value">
                    ${record.value}
                    <small>${record.unit}</small>
                </div>
            </div>
        `)
        .join("");
}

/* ========================================
   SPEED CHART
   ======================================== */

function renderSpeedChart() {
    const svg =
        document.querySelector("[data-speed-chart]");

    if (!svg) return;

    const history = getHistory()
        .slice(0, 10)
        .reverse();

    if (!history.length) {
        svg.innerHTML = "";
        return;
    }

    const values = history.map(
        result => Number(result.wpm || 0)
    );

    const width = 600;
    const height = 230;
    const padding = 15;

    const max = Math.max(...values, 40);
    const min = Math.min(...values, 0);
    const range = Math.max(max - min, 1);

    const points = values.map((value, index) => {
        const x =
            values.length === 1
                ? width / 2
                : padding +
                  (index / (values.length - 1)) *
                      (width - padding * 2);

        const y =
            height -
            padding -
            ((value - min) / range) *
                (height - padding * 2);

        return {
            x,
            y,
            value
        };
    });

    const polyline = points
        .map(point => `${point.x},${point.y}`)
        .join(" ");

    svg.setAttribute(
        "viewBox",
        `0 0 ${width} ${height}`
    );

    svg.innerHTML = `
        <polyline points="${polyline}"></polyline>
        ${points
            .map(
                point => `
                    <circle
                        cx="${point.x}"
                        cy="${point.y}"
                        r="5"
                    ></circle>
                `
            )
            .join("")}
    `;
}

/* ========================================
   ACCURACY
   ======================================== */

function renderAccuracy() {
    const history = getHistory();

    if (!history.length) return;

    const accuracy =
        Math.round(
            history.reduce(
                (sum, result) =>
                    sum + Number(result.accuracy || 0),
                0
            ) / history.length
        );

    const circle =
        document.querySelector(".accuracy-circle");

    if (circle) {
        circle.style.background =
            `conic-gradient(
                var(--success) 0 ${accuracy}%,
                var(--surface-light) ${accuracy}% 100%
            )`;
    }

    setValue(
        "[data-accuracy-value]",
        `${accuracy}%`
    );

    const correct =
        history.reduce(
            (sum, result) =>
                sum + Number(result.correctCharacters || 0),
            0
        );

    const total =
        history.reduce(
            (sum, result) =>
                sum + Number(result.characters || 0),
            0
        );

    setValue(
        "[data-accuracy-correct]",
        formatCompactNumber(correct)
    );

    setValue(
        "[data-accuracy-errors]",
        formatCompactNumber(
            Math.max(total - correct, 0)
        )
    );
}

/* ========================================
   WEEKLY GOAL
   ======================================== */

function renderWeeklyGoal() {
    const history = getHistory();

    const now = new Date();

    const startOfWeek = new Date(now);

    const day =
        startOfWeek.getDay();

    const difference =
        day === 0 ? 6 : day - 1;

    startOfWeek.setDate(
        startOfWeek.getDate() - difference
    );

    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyTests =
        history.filter(result => {
            return new Date(result.date) >= startOfWeek;
        }).length;

    const goal = 10;

    const percentage =
        Math.min(
            100,
            Math.round((weeklyTests / goal) * 100)
        );

    setValue(
        "[data-weekly-current]",
        weeklyTests
    );

    setValue(
        "[data-weekly-goal]",
        goal
    );

    setValue(
        "[data-weekly-percent]",
        `${percentage}%`
    );

    document
        .querySelectorAll(
            ".goal-progress-bar span"
        )
        .forEach(bar => {
            bar.style.width =
                `${percentage}%`;
        });

    document
        .querySelectorAll(".goal-ring")
        .forEach(ring => {
            ring.style.background =
                `conic-gradient(
                    var(--accent) 0 ${percentage}%,
                    var(--surface-light) ${percentage}% 100%
                )`;
        });
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

function formatCompactNumber(number) {
    const value = Number(number || 0);

    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }

    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }

    return value.toString();
}

function formatMode(mode) {
    if (mode === "words") return "25 Words";

    const seconds = Number(mode);

    if (Number.isFinite(seconds)) {
        return `${seconds} Seconds`;
    }

    return "Typing Test";
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
