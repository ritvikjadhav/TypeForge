/* ========================================
   VELTYPE — LESSON SYSTEM
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".lesson-main")) return;
    initLesson();
});

/* ========================================
   LESSON DATA
   ======================================== */

const VELTYPE_LESSONS = {
    1: {
        title: "Home Row Fundamentals",
        subtitle: "Build your typing foundation.",
        description: "Learn proper finger placement and develop accuracy with the keys your fingers naturally rest on.",
        level: "Beginner",
        exercises: [
            {
                title: "Home Row Warmup",
                text: "asdf jkl; asdf jkl; fjdk slaj"
            },
            {
                title: "Finger Control",
                text: "a sad lad asks dad; fall flask; all ask"
            },
            {
                title: "Home Row Words",
                text: "fall ask flask salad glad hall all"
            },
            {
                title: "Home Row Flow",
                text: "a fall lad asks all dads; salad falls"
            },
            {
                title: "Foundation Challenge",
                text: "all flags fall as a glad lad asks for salad"
            }
        ]
    },
    2: {
        title: "Letter Control",
        subtitle: "Control every keystroke.",
        description: "Move beyond the home row and improve accuracy across the upper and lower keyboard rows.",
        level: "Beginner",
        exercises: [
            {
                title: "Top Row Practice",
                text: "qwerty uiop qwerty uiop"
            },
            {
                title: "Upper Row Words",
                text: "type write quiet power tower water"
            },
            {
                title: "Lower Row Practice",
                text: "zxcv bnm zxcv bnm"
            },
            {
                title: "Mixed Letters",
                text: "quick brown fox jumps over lazy dog"
            },
            {
                title: "Control Challenge",
                text: "every letter deserves a clean and accurate keystroke"
            }
        ]
    },
    3: {
        title: "Word Flow",
        subtitle: "Turn letters into rhythm.",
        description: "Connect letters and words naturally while building a smoother, more consistent typing rhythm.",
        level: "Intermediate",
        exercises: [
            {
                title: "Simple Flow",
                text: "the quick brown fox jumps over the lazy dog"
            },
            {
                title: "Word Rhythm",
                text: "typing becomes easier when every movement feels natural"
            },
            {
                title: "Smooth Transitions",
                text: "practice makes your fingers move with less hesitation"
            },
            {
                title: "Sentence Flow",
                text: "a steady rhythm helps you type faster without losing control"
            },
            {
                title: "Flow Challenge",
                text: "focus on smooth movement rather than rushing through every word"
            }
        ]
    },
    4: {
        title: "Speed Training",
        subtitle: "Push your velocity.",
        description: "Increase your typing speed while protecting the accuracy and consistency you've already built.",
        level: "Advanced",
        exercises: [
            {
                title: "Speed Warmup",
                text: "speed comes from control consistency and efficient movement"
            },
            {
                title: "Quick Words",
                text: "fast typing starts with accurate movements repeated naturally"
            },
            {
                title: "Speed Rhythm",
                text: "keep your hands relaxed and let your fingers follow the rhythm"
            },
            {
                title: "Velocity Test",
                text: "do not chase speed chase clean keystrokes and speed will follow"
            },
            {
                title: "Final Challenge",
                text: "the fastest typists stay accurate calm consistent and focused"
            }
        ]
    }
};

/* ========================================
   STATE
   ======================================== */

let currentLevel = 1;
let currentExercise = 0;
let currentText = "";
let currentIndex = 0;
let startTime = null;
let timerInterval = null;
let correctCharacters = 0;
let incorrectCharacters = 0;
let totalCharacters = 0;
let isTyping = false;
let completed = false;

/* ========================================
   INITIALIZE
   ======================================== */

function initLesson() {
    currentLevel = getLevelFromURL();
    currentExercise = getExerciseFromURL();

    if (!VELTYPE_LESSONS[currentLevel]) {
        currentLevel = 1;
    }

    const lesson = VELTYPE_LESSONS[currentLevel];

    if (
        currentExercise < 0 ||
        currentExercise >= lesson.exercises.length
    ) {
        currentExercise = 0;
    }

    renderLesson();
    createLessonSteps();
    bindLessonEvents();
    updateNavigation();
}

/* ========================================
   URL
   ======================================== */

function getLevelFromURL() {
    const params = new URLSearchParams(window.location.search);

    const level =
        Number(params.get("level")) ||
        Number(params.get("lesson")) ||
        1;

    return Math.min(Math.max(level, 1), 4);
}

function getExerciseFromURL() {
    const params = new URLSearchParams(window.location.search);
    const exercise = Number(params.get("exercise"));

    return Number.isFinite(exercise) && exercise > 0
        ? exercise - 1
        : 0;
}

function updateURL() {
    const params = new URLSearchParams();

    params.set("level", currentLevel);
    params.set("exercise", currentExercise + 1);

    window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
    );
}

/* ========================================
   RENDER LESSON
   ======================================== */

function renderLesson() {
    const lesson = VELTYPE_LESSONS[currentLevel];
    const exercise = lesson.exercises[currentExercise];

    document.title =
        `${lesson.title} — VelType`;

    setText("[data-lesson-title]", lesson.title);
    setText("[data-lesson-subtitle]", lesson.subtitle);
    setText("[data-lesson-description]", lesson.description);
    setText("[data-lesson-level]", lesson.level);

    setText(
        "[data-exercise-number]",
        `Exercise ${currentExercise + 1}`
    );

    setText(
        "[data-exercise-title]",
        exercise.title
    );

    const passage =
        document.querySelector("[data-typing-passage]");

    if (!passage) return;

    currentText = exercise.text;
    currentIndex = 0;
    correctCharacters = 0;
    incorrectCharacters = 0;
    totalCharacters = 0;
    startTime = null;
    isTyping = false;
    completed = false;

    clearInterval(timerInterval);

    passage.innerHTML = "";

    [...currentText].forEach((character, index) => {
        const span = document.createElement("span");

        span.textContent =
            character === " "
                ? "\u00A0"
                : character;

        span.dataset.index = index;

        if (index === 0) {
            span.classList.add("current");
        }

        passage.appendChild(span);
    });

    resetStats();
    updateLessonProgress();
    updateExerciseUI();
}

/* ========================================
   TEXT HELPERS
   ======================================== */

function setText(selector, value) {
    const element =
        document.querySelector(selector);

    if (element) {
        element.textContent = value;
    }
}

/* ========================================
   CREATE STEP NAVIGATION
   ======================================== */

function createLessonSteps() {
    const container =
        document.querySelector("[data-lesson-steps]");

    if (!container) return;

    const lesson =
        VELTYPE_LESSONS[currentLevel];

    container.innerHTML = "";

    lesson.exercises.forEach((exercise, index) => {
        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "lesson-step";

        if (index === currentExercise) {
            button.classList.add("active");
        }

        if (isExerciseComplete(currentLevel, index)) {
            button.classList.add("completed");
        }

        button.dataset.exercise = index;

        button.innerHTML = `
            <span class="step-number">
                ${isExerciseComplete(currentLevel, index) ? "✓" : String(index + 1).padStart(2, "0")}
            </span>
            <span class="step-text">
                <strong>${exercise.title}</strong>
                <small>Exercise ${index + 1}</small>
            </span>
        `;

        button.addEventListener("click", () => {
            loadExercise(index);
        });

        container.appendChild(button);
    });
}

/* ========================================
   EVENTS
   ======================================== */

function bindLessonEvents() {
    const typingArea =
        document.querySelector("[data-typing-area]");

    if (typingArea) {
        typingArea.addEventListener("click", focusTyping);
    }

    document.addEventListener("keydown", handleTyping);

    const restartButton =
        document.querySelector("[data-restart-lesson]");

    if (restartButton) {
        restartButton.addEventListener(
            "click",
            restartExercise
        );
    }

    const nextButton =
        document.querySelector("[data-next-exercise]");

    if (nextButton) {
        nextButton.addEventListener(
            "click",
            nextExercise
        );
    }

    const previousButton =
        document.querySelector("[data-previous-exercise]");

    if (previousButton) {
        previousButton.addEventListener(
            "click",
            previousExercise
        );
    }

    const continueButton =
        document.querySelector("[data-continue-lesson]");

    if (continueButton) {
        continueButton.addEventListener(
            "click",
            nextExercise
        );
    }
}

/* ========================================
   KEYBOARD INPUT
   ======================================== */

function handleTyping(event) {
    if (completed) return;

    if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
    ) {
        return;
    }

    if (
        event.key === "Shift" ||
        event.key === "CapsLock" ||
        event.key === "Tab" ||
        event.key === "Escape"
    ) {
        return;
    }

    if (event.key.length !== 1) {
        return;
    }

    event.preventDefault();

    if (!isTyping) {
        startTyping();
    }

    const expected =
        currentText[currentIndex];

    const typed =
        event.key;

    const currentSpan =
        document.querySelector(
            `[data-typing-passage] span[data-index="${currentIndex}"]`
        );

    if (!currentSpan) return;

    totalCharacters++;

    if (typed === expected) {
        currentSpan.classList.remove("current");
        currentSpan.classList.add("correct");

        correctCharacters++;
        currentIndex++;

        playKeyFeedback(true);
    } else {
        currentSpan.classList.add("incorrect");

        incorrectCharacters++;
        playKeyFeedback(false);

        updateStats();
        return;
    }

    if (currentIndex < currentText.length) {
        const nextSpan =
            document.querySelector(
                `[data-typing-passage] span[data-index="${currentIndex}"]`
            );

        if (nextSpan) {
            nextSpan.classList.add("current");
        }
    }

    updateStats();
    updateKeyboard(typed);

    if (currentIndex >= currentText.length) {
        finishExercise();
    }
}

/* ========================================
   START TIMER
   ======================================== */

function startTyping() {
    isTyping = true;
    startTime = Date.now();

    const card =
        document.querySelector(".exercise-card");

    if (card) {
        card.classList.add("running");
    }

    timerInterval =
        setInterval(updateStats, 500);
}

/* ========================================
   STATS
   ======================================== */

function updateStats() {
    const elapsed =
        startTime
            ? (Date.now() - startTime) / 1000
            : 0;

    const minutes =
        elapsed > 0
            ? elapsed / 60
            : 0;

    const wpm =
        minutes > 0
            ? Math.round(
                (correctCharacters / 5) /
                minutes
            )
            : 0;

    const accuracy =
        totalCharacters > 0
            ? Math.round(
                (correctCharacters /
                    totalCharacters) *
                100
            )
            : 100;

    setText(
        "[data-stat-wpm]",
        wpm
    );

    setText(
        "[data-stat-accuracy]",
        `${accuracy}%`
    );

    setText(
        "[data-stat-errors]",
        incorrectCharacters
    );

    setText(
        "[data-stat-time]",
        formatTime(elapsed)
    );
}

function resetStats() {
    setText("[data-stat-wpm]", "0");
    setText("[data-stat-accuracy]", "100%");
    setText("[data-stat-errors]", "0");
    setText("[data-stat-time]", "0:00");
}

function formatTime(seconds) {
    const totalSeconds =
        Math.floor(seconds);

    const minutes =
        Math.floor(totalSeconds / 60);

    const remaining =
        totalSeconds % 60;

    return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

/* ========================================
   FINISH EXERCISE
   ======================================== */

function finishExercise() {
    completed = true;
    isTyping = false;

    clearInterval(timerInterval);

    const card =
        document.querySelector(".exercise-card");

    if (card) {
        card.classList.remove("running");
    }

    const elapsed =
        startTime
            ? (Date.now() - startTime) / 1000
            : 0;

    const minutes =
        elapsed > 0
            ? elapsed / 60
            : 1;

    const wpm =
        Math.round(
            (correctCharacters / 5) /
            minutes
        );

    const accuracy =
        totalCharacters > 0
            ? Math.round(
                (correctCharacters /
                    totalCharacters) *
                100
            )
            : 100;

    saveExerciseProgress(
        currentLevel,
        currentExercise,
        wpm,
        accuracy
    );

    updateStats();
    updateLessonProgress();
    showCompletion(wpm, accuracy);
    createLessonSteps();
    updateNavigation();
}

/* ========================================
   COMPLETION
   ======================================== */

function showCompletion(wpm, accuracy) {
    const completion =
        document.querySelector(
            "[data-lesson-complete]"
        );

    if (!completion) return;

    completion.classList.add("visible");

    setText(
        "[data-complete-wpm]",
        `${wpm} WPM`
    );

    setText(
        "[data-complete-accuracy]",
        `${accuracy}% accuracy`
    );

    const nextButton =
        document.querySelector(
            "[data-next-exercise]"
        );

    if (nextButton) {
        nextButton.disabled = false;
    }
}

/* ========================================
   LOAD EXERCISE
   ======================================== */

function loadExercise(index) {
    const lesson =
        VELTYPE_LESSONS[currentLevel];

    if (
        index < 0 ||
        index >= lesson.exercises.length
    ) {
        return;
    }

    currentExercise = index;

    updateURL();
    renderLesson();
    createLessonSteps();
    updateNavigation();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* ========================================
   NEXT / PREVIOUS
   ======================================== */

function nextExercise() {
    const lesson =
        VELTYPE_LESSONS[currentLevel];

    if (!completed) return;

    if (
        currentExercise <
        lesson.exercises.length - 1
    ) {
        loadExercise(
            currentExercise + 1
        );
        return;
    }

    completeLesson();
}

function previousExercise() {
    if (currentExercise > 0) {
        loadExercise(
            currentExercise - 1
        );
    }
}

/* ========================================
   RESTART
   ======================================== */

function restartExercise() {
    renderLesson();
    createLessonSteps();
    updateNavigation();
    focusTyping();
}

/* ========================================
   FOCUS
   ======================================== */

function focusTyping() {
    const input =
        document.querySelector(
            ".typing-input"
        );

    if (input) {
        input.focus();
    }
}

/* ========================================
   KEYBOARD VISUAL
   ======================================== */

function updateKeyboard(key) {
    document
        .querySelectorAll(".key.active")
        .forEach(element =>
            element.classList.remove("active")
        );

    const keyboardKey =
        document.querySelector(
            `.key[data-key="${key.toLowerCase()}"]`
        );

    if (!keyboardKey) return;

    keyboardKey.classList.add("active");

    setTimeout(() => {
        keyboardKey.classList.remove("active");
    }, 180);
}

function playKeyFeedback(correct) {
    document.body.classList.remove(
        "key-correct",
        "key-error"
    );

    void document.body.offsetWidth;

    document.body.classList.add(
        correct
            ? "key-correct"
            : "key-error"
    );
}

/* ========================================
   PROGRESS STORAGE
   ======================================== */

function getProgress() {
    try {
        return JSON.parse(
            localStorage.getItem(
                "veltype-learning-progress"
            )
        ) || {};
    } catch {
        return {};
    }
}

function saveProgress(progress) {
    localStorage.setItem(
        "veltype-learning-progress",
        JSON.stringify(progress)
    );
}

function getExerciseKey(level, exercise) {
    return `level-${level}-exercise-${exercise}`;
}

function saveExerciseProgress(
    level,
    exercise,
    wpm,
    accuracy
) {
    const progress =
        getProgress();

    const key =
        getExerciseKey(
            level,
            exercise
        );

    progress[key] = {
        completed: true,
        wpm,
        accuracy,
        completedAt:
            new Date().toISOString()
    };

    saveProgress(progress);
}

function isExerciseComplete(
    level,
    exercise
) {
    const progress =
        getProgress();

    const key =
        getExerciseKey(
            level,
            exercise
        );

    return Boolean(
        progress[key]?.completed
    );
}

/* ========================================
   LESSON COMPLETION
   ======================================== */

function completeLesson() {
    const lesson =
        VELTYPE_LESSONS[currentLevel];

    const allCompleted =
        lesson.exercises.every(
            (_, index) =>
                isExerciseComplete(
                    currentLevel,
                    index
                )
        );

    if (!allCompleted) {
        return;
    }

    const progress =
        getProgress();

    progress[`level-${currentLevel}`] = {
        completed: true,
        completedAt:
            new Date().toISOString()
    };

    saveProgress(progress);

    showLevelComplete();
}

function showLevelComplete() {
    const completion =
        document.querySelector(
            "[data-level-complete]"
        );

    if (completion) {
        completion.classList.add("visible");
    }

    const nextLevel =
        document.querySelector(
            "[data-next-level]"
        );

    if (
        nextLevel &&
        currentLevel < 4
    ) {
        nextLevel.href =
            `lesson.html?level=${currentLevel + 1}`;
    }
}

/* ========================================
   PROGRESS BAR
   ======================================== */

function updateLessonProgress() {
    const lesson =
        VELTYPE_LESSONS[currentLevel];

    const completedExercises =
        lesson.exercises.filter(
            (_, index) =>
                isExerciseComplete(
                    currentLevel,
                    index
                )
        ).length;

    const percentage =
        Math.round(
            (completedExercises /
                lesson.exercises.length) *
            100
        );

    document
        .querySelectorAll(
            "[data-lesson-progress]"
        )
        .forEach(element => {
            element.textContent =
                `${percentage}%`;
        });

    document
        .querySelectorAll(
            ".lesson-progress-bar span"
        )
        .forEach(bar => {
            bar.style.width =
                `${Math.max(percentage, 5)}%`;
        });
}

/* ========================================
   NAVIGATION STATE
   ======================================== */

function updateNavigation() {
    const previous =
        document.querySelector(
            "[data-previous-exercise]"
        );

    const next =
        document.querySelector(
            "[data-next-exercise]"
        );

    if (previous) {
        previous.disabled =
            currentExercise === 0;
    }

    if (next) {
        next.disabled =
            !completed;

        next.innerHTML =
            currentExercise ===
            VELTYPE_LESSONS[currentLevel]
                .exercises.length - 1
                ? "Complete lesson →"
                : "Next exercise →";
    }

    const current =
        document.querySelector(
            "[data-current-exercise]"
        );

    if (current) {
        current.textContent =
            `${currentExercise + 1} / ${
                VELTYPE_LESSONS[currentLevel]
                    .exercises.length
            }`;
    }
}

/* ========================================
   PUBLIC API
   ======================================== */

window.VelTypeLesson = {
    lessons: VELTYPE_LESSONS,
    getProgress,
    isExerciseComplete,
    loadExercise,
    restartExercise
};
