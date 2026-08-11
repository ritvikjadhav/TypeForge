/* ========================================
   VELTYPE — LESSON ENGINE
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initLesson();
});

/* ========================================
   LESSON DATA
   ======================================== */

const LESSONS = {
    1: {
        stage: "LEVEL 01",
        title: "Home Row",
        emphasis: "Fundamentals.",
        description:
            "Build accurate finger placement and control with focused home-row practice.",
        category: "TYPING ACADEMY",
        exercises: [
            {
                title: "Home Row Warm-up",
                level: "BEGINNER",
                time: "2 MIN",
                text: "asdf jkl; asdf jkl; fjdk slaj"
            },
            {
                title: "Left Hand Control",
                level: "BEGINNER",
                time: "2 MIN",
                text: "asdf fdsa asdf fdsa sad fad dad"
            },
            {
                title: "Right Hand Control",
                level: "BEGINNER",
                time: "2 MIN",
                text: "jkl; lkj; jkl; jkl; kill like"
            },
            {
                title: "Home Row Rhythm",
                level: "BEGINNER",
                time: "2 MIN",
                text: "asdf jkl; sad lad ask fall flask"
            },
            {
                title: "Home Row Challenge",
                level: "BEGINNER",
                time: "2 MIN",
                text: "a sad lad asks a skilled jkl; flasks"
            }
        ]
    },

    2: {
        stage: "LEVEL 02",
        title: "Letter",
        emphasis: "Control.",
        description:
            "Improve accuracy by reaching different keys while maintaining consistent finger control.",
        category: "TYPING ACADEMY",
        exercises: [
            {
                title: "Top Row Introduction",
                level: "BEGINNER",
                time: "2 MIN",
                text: "qwer uiop qwer uiop"
            },
            {
                title: "Top Row Control",
                level: "BEGINNER",
                time: "2 MIN",
                text: "we were quiet we were quick"
            },
            {
                title: "Mixed Letters",
                level: "INTERMEDIATE",
                time: "2 MIN",
                text: "fast work requires quiet focus"
            },
            {
                title: "Letter Combinations",
                level: "INTERMEDIATE",
                time: "2 MIN",
                text: "type write quiet power quality"
            },
            {
                title: "Letter Control Challenge",
                level: "INTERMEDIATE",
                time: "2 MIN",
                text: "quick typing requires accurate finger control"
            }
        ]
    },

    3: {
        stage: "LEVEL 03",
        title: "Word",
        emphasis: "Flow.",
        description:
            "Connect letters naturally and develop a smoother, more consistent typing rhythm.",
        category: "TYPING ACADEMY",
        exercises: [
            {
                title: "Simple Words",
                level: "INTERMEDIATE",
                time: "2 MIN",
                text: "time type word work fast slow"
            },
            {
                title: "Short Sentences",
                level: "INTERMEDIATE",
                time: "2 MIN",
                text: "typing becomes easier with steady practice"
            },
            {
                title: "Rhythm Practice",
                level: "INTERMEDIATE",
                time: "2 MIN",
                text: "keep your fingers relaxed and maintain a steady rhythm"
            },
            {
                title: "Flow Builder",
                level: "INTERMEDIATE",
                time: "2 MIN",
                text: "smooth typing comes from accuracy before speed"
            },
            {
                title: "Word Flow Challenge",
                level: "INTERMEDIATE",
                time: "2 MIN",
                text: "practice every day and your typing will become smoother"
            }
        ]
    },

    4: {
        stage: "LEVEL 04",
        title: "Speed",
        emphasis: "Training.",
        description:
            "Increase your typing speed while keeping accuracy high and your rhythm consistent.",
        category: "TYPING ACADEMY",
        exercises: [
            {
                title: "Speed Warm-up",
                level: "ADVANCED",
                time: "2 MIN",
                text: "speed comes naturally when accuracy becomes consistent"
            },
            {
                title: "Quick Words",
                level: "ADVANCED",
                time: "2 MIN",
                text: "quick brown fox jumps over the lazy dog"
            },
            {
                title: "Speed Rhythm",
                level: "ADVANCED",
                time: "2 MIN",
                text: "keep moving forward without rushing every keystroke"
            },
            {
                title: "Accuracy Sprint",
                level: "ADVANCED",
                time: "2 MIN",
                text: "fast typing is useful only when every word remains accurate"
            },
            {
                title: "Final Speed Challenge",
                level: "ADVANCED",
                time: "2 MIN",
                text: "build speed slowly maintain accuracy stay relaxed and keep typing"
            }
        ]
    }
};

/* ========================================
   STATE
   ======================================== */

let currentLesson = 1;
let currentExercise = 0;

let started = false;
let finished = false;
let startTime = null;
let timerInterval = null;

let typedCharacters = 0;
let correctCharacters = 0;
let errors = 0;

let exerciseResults = [];

/* ========================================
   INIT
   ======================================== */

function initLesson() {
    const params = new URLSearchParams(window.location.search);

    currentLesson = Number(params.get("level")) || 1;

    if (!LESSONS[currentLesson]) {
        currentLesson = 1;
    }

    buildExerciseDots();
    loadExercise(0);
    initControls();
    initKeyboard();
}

/* ========================================
   DOM HELPERS
   ======================================== */

const $ = id => document.getElementById(id);

/* ========================================
   LOAD EXERCISE
   ======================================== */

function loadExercise(index) {
    const lesson = LESSONS[currentLesson];

    if (!lesson || !lesson.exercises[index]) return;

    stopTimer();

    currentExercise = index;
    started = false;
    finished = false;

    typedCharacters = 0;
    correctCharacters = 0;
    errors = 0;
    startTime = null;

    const exercise = lesson.exercises[index];

    $("lessonStage").textContent = lesson.stage;
    $("lessonCategory").textContent = lesson.category;

    $("lessonTitle").innerHTML =
        `${lesson.title} <em>${lesson.emphasis}</em>`;

    $("lessonDescription").textContent =
        lesson.description;

    $("exerciseTitle").textContent =
        exercise.title;

    $("exerciseLevel").textContent =
        exercise.level;

    $("exerciseTime").textContent =
        exercise.time;

    $("exerciseCount").textContent =
        `Exercise ${index + 1} of ${lesson.exercises.length}`;

    $("exerciseStatus").textContent = "Ready";

    $("wpm").textContent = "0";
    $("accuracy").textContent = "100%";
    $("errors").textContent = "0";
    $("timer").textContent = "00:00";

    $("passageProgress").textContent =
        `0 / ${exercise.text.length}`;

    $("typingHint").textContent =
        "Start typing to begin the exercise";

    $("liveStatus").textContent =
        "Waiting for input";

    renderPassage(exercise.text);
    updateProgress();
    updateDots();

    $("previousExercise").disabled =
        index === 0;

    $("nextExercise").disabled = false;

    $("lessonComplete").hidden = true;

    focusTypingArea();
}

/* ========================================
   PASSAGE
   ======================================== */

function renderPassage(text) {
    const passage = $("typingPassage");

    passage.innerHTML = "";

    [...text].forEach((character, index) => {
        const span = document.createElement("span");

        span.textContent = character;
        span.dataset.index = index;

        passage.appendChild(span);
    });

    highlightCurrent();
}

/* ========================================
   TYPING
   ======================================== */

function handleTyping(event) {
    if (finished) return;

    /*
       Ignore navigation/function keys.
    */
    if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        event.key.length !== 1
    ) {
        return;
    }

    event.preventDefault();

    const lesson = LESSONS[currentLesson];
    const text = lesson.exercises[currentExercise].text;

    const index = typedCharacters;

    if (index >= text.length) return;

    if (!started) {
        startExercise();
    }

    const expected = text[index];
    const actual = event.key;

    const character =
        $("typingPassage").children[index];

    if (actual === expected) {
        character.classList.add("correct");
        correctCharacters++;
    } else {
        character.classList.add("incorrect");
        errors++;
    }

    typedCharacters++;

    $("passageProgress").textContent =
        `${typedCharacters} / ${text.length}`;

    updateStats();
    highlightCurrent();

    if (typedCharacters >= text.length) {
        finishExercise();
    }
}

/* ========================================
   START
   ======================================== */

function startExercise() {
    started = true;
    startTime = Date.now();

    $("exerciseStatus").textContent =
        "In progress";

    $("liveStatus").textContent =
        "Typing...";

    $("typingHint").textContent =
        "Keep your rhythm steady";

    $("typingPanel")?.classList.add("running");

    timerInterval = setInterval(updateTimer, 1000);
}

/* ========================================
   TIMER
   ======================================== */

function updateTimer() {
    if (!startTime) return;

    const seconds =
        Math.floor((Date.now() - startTime) / 1000);

    const minutes =
        Math.floor(seconds / 60);

    const remaining =
        seconds % 60;

    $("timer").textContent =
        `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;

    updateStats();
}

/* ========================================
   STATS
   ======================================== */

function updateStats() {
    const elapsed =
        startTime
            ? Math.max(1, (Date.now() - startTime) / 1000)
            : 1;

    const minutes =
        elapsed / 60;

    const wpm =
        Math.round(
            (correctCharacters / 5) / minutes
        );

    const accuracy =
        typedCharacters
            ? Math.round(
                (correctCharacters / typedCharacters) * 100
            )
            : 100;

    $("wpm").textContent =
        Number.isFinite(wpm) ? wpm : 0;

    $("accuracy").textContent =
        `${accuracy}%`;

    $("errors").textContent =
        errors;
}

/* ========================================
   FINISH EXERCISE
   ======================================== */

function finishExercise() {
    finished = true;

    stopTimer();
    updateStats();

    $("exerciseStatus").textContent =
        "Complete";

    $("liveStatus").textContent =
        "Exercise complete";

    $("typingHint").textContent =
        "Great work — continue to the next exercise";

    $("nextExercise").disabled = false;

    const result = {
        wpm: Number($("wpm").textContent) || 0,
        accuracy:
            Number(
                $("accuracy").textContent.replace("%", "")
            ) || 0
    };

    exerciseResults[currentExercise] = result;

    saveExerciseResult(result);

    updateProgress();
    updateDots();

    if (
        currentExercise ===
        LESSONS[currentLesson].exercises.length - 1
    ) {
        completeLesson();
    }
}

/* ========================================
   NEXT
   ======================================== */

function nextExercise() {
    const total =
        LESSONS[currentLesson].exercises.length;

    if (currentExercise < total - 1) {
        loadExercise(currentExercise + 1);
        return;
    }

    completeLesson();
}

/* ========================================
   PREVIOUS
   ======================================== */

function previousExercise() {
    if (currentExercise > 0) {
        loadExercise(currentExercise - 1);
    }
}

/* ========================================
   RESET
   ======================================== */

function resetExercise() {
    loadExercise(currentExercise);
}

/* ========================================
   PROGRESS
   ======================================== */

function updateProgress() {
    const total =
        LESSONS[currentLesson].exercises.length;

    const completed =
        exerciseResults.filter(Boolean).length;

    const percentage =
        Math.round((completed / total) * 100);

    $("lessonProgress").textContent =
        `${percentage}%`;

    $("lessonProgressBar").style.width =
        `${percentage}%`;
}

/* ========================================
   DOTS
   ======================================== */

function buildExerciseDots() {
    const container =
        $("exerciseDots");

    if (!container) return;

    container.innerHTML = "";

    const total =
        LESSONS[currentLesson].exercises.length;

    for (let i = 0; i < total; i++) {
        const dot =
            document.createElement("button");

        dot.type = "button";
        dot.className = "exercise-dot";
        dot.dataset.index = i;
        dot.setAttribute(
            "aria-label",
            `Exercise ${i + 1}`
        );

        dot.addEventListener("click", () => {
            loadExercise(i);
        });

        container.appendChild(dot);
    }
}

function updateDots() {
    document
        .querySelectorAll(".exercise-dot")
        .forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === currentExercise
            );

            dot.classList.toggle(
                "completed",
                Boolean(exerciseResults[index])
            );
        });
}

/* ========================================
   KEYBOARD
   ======================================== */

function initKeyboard() {
    document.addEventListener("keydown", event => {

        /*
           Let browser shortcuts work.
        */
        if (
            event.ctrlKey ||
            event.altKey ||
            event.metaKey
        ) {
            return;
        }

        const key =
            event.key.toLowerCase();

        const virtualKey =
            document.querySelector(
                `[data-key="${CSS.escape(key)}"]`
            );

        if (virtualKey) {
            virtualKey.classList.add("active");

            setTimeout(() => {
                virtualKey.classList.remove("active");
            }, 120);
        }

        if (event.key.length === 1) {
            handleTyping(event);
        }
    });

    $("typingPassage").addEventListener(
        "click",
        focusTypingArea
    );
}

/* ========================================
   FOCUS
   ======================================== */

function focusTypingArea() {
    $("typingPassage")?.focus();
}

/* ========================================
   CURRENT CHARACTER
   ======================================== */

function highlightCurrent() {
    document
        .querySelectorAll(
            "#typingPassage span"
        )
        .forEach(span =>
            span.classList.remove("current")
        );

    const current =
        $("typingPassage").children[
            typedCharacters
        ];

    if (current) {
        current.classList.add("current");
    }
}

/* ========================================
   TIMER STOP
   ======================================== */

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

/* ========================================
   SAVE
   ======================================== */

function saveExerciseResult(result) {
    const key =
        `veltype-lesson-${currentLesson}`;

    let saved = {};

    try {
        saved =
            JSON.parse(
                localStorage.getItem(key)
            ) || {};
    } catch {
        saved = {};
    }

    saved[currentExercise] = {
        ...result,
        completedAt: new Date().toISOString()
    };

    localStorage.setItem(
        key,
        JSON.stringify(saved)
    );
}

/* ========================================
   COMPLETE LESSON
   ======================================== */

function completeLesson() {
    const total =
        LESSONS[currentLesson].exercises.length;

    const results =
        exerciseResults.filter(Boolean);

    if (!results.length) return;

    const averageWpm =
        Math.round(
            results.reduce(
                (sum, result) => sum + result.wpm,
                0
            ) / results.length
        );

    const averageAccuracy =
        Math.round(
            results.reduce(
                (sum, result) => sum + result.accuracy,
                0
            ) / results.length
        );

    $("finalWpm").textContent =
        averageWpm;

    $("finalAccuracy").textContent =
        `${averageAccuracy}%`;

    $("finalExercises").textContent =
        `${results.length}/${total}`;

    $("completionMessage").textContent =
        "Excellent work. Your exercise results have been saved.";

    $("lessonComplete").hidden = false;
    $("lessonComplete").classList.add("visible");

    $("lessonComplete").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    saveLessonCompletion(
        averageWpm,
        averageAccuracy
    );
}

/* ========================================
   SAVE LESSON COMPLETION
   ======================================== */

function saveLessonCompletion(wpm, accuracy) {
    let progress = {};

    try {
        progress =
            JSON.parse(
                localStorage.getItem(
                    "veltype-learning-progress"
                )
            ) || {};
    } catch {
        progress = {};
    }

    progress[currentLesson] = {
        completed: true,
        wpm,
        accuracy,
        completedAt: new Date().toISOString()
    };

    localStorage.setItem(
        "veltype-learning-progress",
        JSON.stringify(progress)
    );
}

/* ========================================
   CONTROLS
   ======================================== */

function initControls() {

    $("nextExercise")
        ?.addEventListener(
            "click",
            nextExercise
        );

    $("previousExercise")
        ?.addEventListener(
            "click",
            previousExercise
        );

    $("resetExercise")
        ?.addEventListener(
            "click",
            resetExercise
        );

    $("retryLesson")
        ?.addEventListener(
            "click",
            () => {
                exerciseResults = [];
                loadExercise(0);
            }
        );
}

/* ========================================
   CLEANUP
   ======================================== */

window.addEventListener(
    "beforeunload",
    stopTimer
);
