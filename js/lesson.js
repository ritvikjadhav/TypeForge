(() => {
"use strict";

// DOM elements
const $ = id => document.getElementById(id);

const els = {
    level: $("lessonLevel"),
    number: $("lessonNumber"),
    title: $("lessonTitle"),
    description: $("lessonDescription"),
    difficulty: $("lessonDifficulty"),
    duration: $("lessonDuration"),

    guide: $("guideContent"),
    guideSection: $("guideSection"),
    guideTitle: $("guideTitle"),

    practiceTitle: $("practiceTitle"),
    tabs: $("exerciseTabs"),
    display: $("typingDisplay"),

    count: $("characterCount"),
    wpm: $("wpm"),
    accuracy: $("accuracy"),
    errors: $("errors"),
    timer: $("timer"),

    status: $("practiceStatus"),
    message: $("practiceMessage"),

    progress: $("lessonProgressBar"),
    exerciseProgress: $("exerciseProgress"),

    reset: $("resetExercise"),

    completion: $("completionCard"),
    completionText: $("completionText"),
    finalWpm: $("finalWpm"),
    finalAccuracy: $("finalAccuracy"),
    finalErrors: $("finalErrors"),

    retry: $("retryLesson"),

    next: $("nextLesson"),
    previous: $("previousLesson"),
    nextBottom: $("nextLessonBottom"),

    previousTitle: $("previousTitle"),
    nextTitle: $("nextTitle")
};

// Current lesson
const params = new URLSearchParams(window.location.search);
const requestedLesson = Number.parseInt(params.get("lesson"), 10);

const lessonId =
    Number.isInteger(requestedLesson) && requestedLesson > 0
        ? requestedLesson
        : 1;

const lesson =
    lessons.find(item => item.id === lessonId) || lessons[0];

// Typing state
let exerciseIndex = 0;
let currentText = "";
let position = 0;
let errors = 0;
let correct = 0;
let startedAt = null;
let timerId = null;
let finished = false;
let completionShown = false;

// Storage keys
const STORAGE_KEYS = {
    lessons: "veltypeLessons",
    lessonProgress: "veltypeLessonProgress"
};

// Initialize lesson
function init() {
    if (!els.display || !els.tabs) {
        console.warn("VelType: required lesson elements are missing.");
        return;
    }

    renderLesson();
    renderExercises();
    setupEvents();
    setupNavigation();
    loadExercise(0);
}

// Render lesson information
function renderLesson() {
    setText(els.level, lesson.level);
    setText(
        els.number,
        `LESSON ${String(lesson.id).padStart(2, "0")}`
    );
    setText(els.title, lesson.title);
    setText(els.description, lesson.description);
    setText(els.difficulty, lesson.difficulty.toUpperCase());
    setText(els.duration, `${lesson.duration} MIN`);
    setText(els.practiceTitle, lesson.title);

    renderGuide();
}

// Render guide section
function renderGuide() {
    if (!els.guideSection || !els.guide) {
        return;
    }

    if (
        !Array.isArray(lesson.guideList) ||
        lesson.guideList.length === 0
    ) {
        els.guideSection.hidden = true;
        return;
    }

    els.guideSection.hidden = false;

    const title =
        lesson.guideTitle || "Build your technique.";

    setText(els.guideTitle, title);

    const image = lesson.guideImage
        ? `
            <img
                class="guide-image"
                src="${escapeHTML(lesson.guideImage)}"
                alt="${escapeHTML(lesson.title)} typing tutorial"
                loading="lazy"
            >
        `
        : "";

    els.guide.innerHTML = `
        <div class="guide-grid">
            <div class="guide-copy">
                <h3>${escapeHTML(title)}</h3>

                <p>
                    ${escapeHTML(
                        lesson.guideText ||
                        "Build correct habits before increasing your typing speed."
                    )}
                </p>

                <ul class="guide-list">
                    ${lesson.guideList
                        .map(
                            item =>
                                `<li>${escapeHTML(item)}</li>`
                        )
                        .join("")}
                </ul>
            </div>

            <div class="guide-visual">
                ${image}
            </div>
        </div>
    `;
}

// Render exercise tabs
function renderExercises() {
    els.tabs.innerHTML = lesson.exercises
        .map(
            (_, index) => `
                <button
                    type="button"
                    class="exercise-tab${index === 0 ? " active" : ""}"
                    data-index="${index}"
                    aria-label="Exercise ${index + 1}"
                >
                    Exercise ${String(index + 1).padStart(2, "0")}
                </button>
            `
        )
        .join("");

    els.tabs
        .querySelectorAll(".exercise-tab")
        .forEach(button => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.index);

                if (
                    Number.isInteger(index) &&
                    index <= exerciseIndex
                ) {
                    loadExercise(index);
                }
            });
        });
}

// Load exercise
function loadExercise(index) {
    if (!lesson.exercises[index]) {
        return;
    }

    clearTimer();

    exerciseIndex = index;
    currentText = lesson.exercises[index];

    position = 0;
    errors = 0;
    correct = 0;

    startedAt = null;
    finished = false;
    completionShown = false;

    if (els.display) {
        els.display.hidden = false;
    }

    if (els.completion) {
        els.completion.hidden = true;
    }

    if (els.reset) {
        els.reset.disabled = false;
    }

    resetStatus();
    renderText();
    updateTabs();
    updateStats();
    updateExerciseProgress();

    focusTypingArea();
}

// Render typing text
function renderText() {
    if (!els.display) {
        return;
    }

    els.display.innerHTML = [...currentText]
        .map(
            (character, index) => `
                <span
                    class="char${index === 0 ? " current" : ""}"
                    data-index="${index}"
                >
                    ${formatCharacter(character)}
                </span>
            `
        )
        .join("");

    setText(
        els.count,
        `0 / ${currentText.length}`
    );
}

// Handle keyboard input
function handleKey(event) {
    if (finished) {
        return;
    }

    const key = normalizeEventKey(event);

    if (!key) {
        return;
    }

    if (
        ["Backspace", "Delete", "Tab"].includes(key)
    ) {
        event.preventDefault();

        if (
            key === "Backspace" ||
            key === "Delete"
        ) {
            showMessage(
                "Backspace is disabled during lessons."
            );
        }

        return;
    }

    if (key === "Escape") {
        event.preventDefault();
        stopTyping();
        return;
    }

    if (key === "Enter") {
        event.preventDefault();
        processCharacter("\n");
        return;
    }

    if (key.length !== 1 && key !== " ") {
        return;
    }

    event.preventDefault();
    processCharacter(key);
}

// Process typed character
function processCharacter(key) {
    if (finished) {
        return;
    }

    startTypingIfNeeded();

    const expected = currentText[position];

    if (key === expected) {
        correct++;

        markCorrect();

        position++;

        if (position >= currentText.length) {
            finishExercise();
            return;
        }

        markCurrent();

        setStatus(
            "active",
            "Typing..."
        );
    } else {
        errors++;

        markWrong();

        setStatus(
            "error",
            `Expected "${displayKey(expected)}"`
        );

        pulseTypingArea();
    }

    updateStats();
    updateExerciseProgress();
}

// Mark correct character
function markCorrect() {
    const character = getCharacter(position);

    if (!character) {
        return;
    }

    character.classList.remove(
        "current",
        "wrong"
    );

    character.classList.add("correct");
}

// Mark incorrect character
function markWrong() {
    const character = getCharacter(position);

    if (!character) {
        return;
    }

    character.classList.remove("wrong");

    void character.offsetWidth;

    character.classList.add("wrong");

    setTimeout(() => {
        if (
            !finished &&
            position === Number(character.dataset.index)
        ) {
            character.classList.remove("wrong");
            character.classList.add("current");
        }
    }, 260);
}

// Move typing cursor
function markCurrent() {
    els.display
        ?.querySelectorAll(".char")
        .forEach(character => {
            character.classList.remove("current");
        });

    const current = getCharacter(position);

    if (current) {
        current.classList.add("current");
    }
}

// Get character element
function getCharacter(index) {
    return els.display?.querySelector(
        `[data-index="${index}"]`
    );
}

// Update typing statistics
function updateStats() {
    const elapsed = getElapsedSeconds();
    const typed = correct + errors;
    const minutes = elapsed / 60;

    const wpm =
        minutes > 0
            ? Math.round(
                  (correct / 5) / minutes
              )
            : 0;

    const accuracy =
        typed > 0
            ? Math.round(
                  (correct / typed) * 100
              )
            : 100;

    setText(
        els.wpm,
        String(wpm)
    );

    setText(
        els.accuracy,
        `${accuracy}%`
    );

    setText(
        els.errors,
        String(errors)
    );

    setText(
        els.count,
        `${Math.min(
            position,
            currentText.length
        )} / ${currentText.length}`
    );
}

// Calculate elapsed time
function getElapsedSeconds() {
    if (!startedAt) {
        return 0;
    }

    return Math.max(
        (Date.now() - startedAt) / 1000,
        0
    );
}

// Start timer
function startTimer() {
    clearTimer();

    timerId = window.setInterval(() => {
        updateStats();

        setText(
            els.timer,
            formatTime(
                Math.floor(
                    getElapsedSeconds()
                )
            )
        );
    }, 250);
}

// Stop timer
function clearTimer() {
    if (!timerId) {
        return;
    }

    clearInterval(timerId);
    timerId = null;
}

// Start typing
function startTypingIfNeeded() {
    if (startedAt) {
        return;
    }

    startedAt = Date.now();

    startTimer();

    setStatus(
        "active",
        "Typing..."
    );
}

// Stop typing
function stopTyping() {
    clearTimer();

    els.display?.blur();

    if (
        !finished &&
        startedAt
    ) {
        setStatus(
            "",
            "Paused"
        );
    }
}

// Complete current exercise
function finishExercise() {
    if (finished) {
        return;
    }

    finished = true;

    clearTimer();

    const elapsed =
        Math.max(
            getElapsedSeconds(),
            1
        );

    const wpm =
        Math.round(
            (correct / 5) /
            (elapsed / 60)
        );

    const accuracy =
        Math.round(
            (correct /
                Math.max(
                    correct + errors,
                    1
                )) *
            100
        );

    markAllComplete();

    updateStats();

    setStatus(
        "active",
        "Exercise complete ✓"
    );

    saveExerciseProgress(
        wpm,
        accuracy
    );

    updateExerciseProgress();

    // Automatically load next exercise
    if (
        exerciseIndex <
        lesson.exercises.length - 1
    ) {
        window.setTimeout(() => {
            loadExercise(
                exerciseIndex + 1
            );
        }, 700);

        return;
    }

    finishLesson(
        wpm,
        accuracy
    );
}

// Mark exercise complete
function markAllComplete() {
    els.display
        ?.querySelectorAll(".char")
        .forEach(character => {
            character.classList.remove(
                "current",
                "wrong"
            );

            character.classList.add(
                "correct"
            );
        });

    const tab =
        els.tabs?.querySelector(
            `[data-index="${exerciseIndex}"]`
        );

    if (tab) {
        tab.classList.add("complete");
    }
}

// Complete lesson
function finishLesson(
    wpm,
    accuracy
) {
    if (completionShown) {
        return;
    }

    completionShown = true;

    clearTimer();

    setText(
        els.finalWpm,
        String(wpm)
    );

    setText(
        els.finalAccuracy,
        `${accuracy}%`
    );

    setText(
        els.finalErrors,
        String(errors)
    );

    if (els.completionText) {
        els.completionText.textContent =
            accuracy >= 97
                ? "Excellent control. Your accuracy is strong and your technique is ready for the next level."
                : accuracy >= 90
                    ? "Good work. Your foundation is developing well. Repeat the lesson when you want to make it cleaner."
                    : "Keep practicing. Slow down slightly, focus on accuracy and build consistency before pushing speed.";
    }

    if (els.display) {
        els.display.hidden = true;
    }

    if (els.completion) {
        els.completion.hidden = false;
    }

    saveLessonCompletion(
        wpm,
        accuracy
    );

    updateExerciseProgress();

    window.setTimeout(() => {
        els.completion?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 80);
            }
    // Update lesson progress
function updateExerciseProgress() {
    const total =
        lesson.exercises.length;

    const completed =
        finished
            ? exerciseIndex + 1
            : exerciseIndex;

    const percentage =
        total
            ? Math.min(
                  (completed / total) * 100,
                  100
              )
            : 0;

    setText(
        els.exerciseProgress,
        `${completed} / ${total}`
    );

    if (els.progress) {
        els.progress.style.width =
            `${percentage}%`;
    }
}

// Update exercise tabs
function updateTabs() {
    els.tabs
        ?.querySelectorAll(".exercise-tab")
        .forEach((tab, index) => {
            tab.classList.toggle(
                "active",
                index === exerciseIndex
            );

            tab.disabled =
                index > exerciseIndex;
        });
}

// Read saved data
function readStorage(
    key,
    fallback = {}
) {
    try {
        const value =
            localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return (
            JSON.parse(value) ??
            fallback
        );
    } catch {
        return fallback;
    }
}

// Write saved data
function writeStorage(
    key,
    value
) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;
    } catch {
        console.warn(
            `VelType: unable to save "${key}".`
        );

        return false;
    }
}

// Get current lesson storage key
function getLessonStorageKey() {
    return `veltype_lesson_${lesson.id}`;
}

// Save exercise progress
function saveExerciseProgress(
    wpm,
    accuracy
) {
    const key =
        getLessonStorageKey();

    const data =
        readStorage(key, {});

    if (
        !Array.isArray(
            data.exercises
        )
    ) {
        data.exercises = [];
    }

    const now =
        new Date().toISOString();

    data.lessonId =
        lesson.id;

    data.lessonTitle =
        lesson.title;

    data.level =
        lesson.level;

    data.difficulty =
        lesson.difficulty;

    data.lastUpdated =
        now;

    data.exercises[
        exerciseIndex
    ] = {
        exerciseNumber:
            exerciseIndex + 1,

        completed: true,

        wpm: Math.max(
            0,
            Number(wpm) || 0
        ),

        accuracy: Math.min(
            100,
            Math.max(
                0,
                Number(accuracy) || 0
            )
        ),

        errors: Math.max(
            0,
            Number(errors) || 0
        ),

        completedAt: now
    };

    writeStorage(
        key,
        data
    );
}

// Save completed lesson
function saveLessonCompletion(
    wpm,
    accuracy
) {
    const now =
        new Date().toISOString();

    const result = {
        lessonId: lesson.id,
        title: lesson.title,
        level: lesson.level,
        difficulty: lesson.difficulty,
        completed: true,

        wpm: Math.max(
            0,
            Number(wpm) || 0
        ),

        accuracy: Math.min(
            100,
            Math.max(
                0,
                Number(accuracy) || 0
            )
        ),

        errors: Math.max(
            0,
            Number(errors) || 0
        ),

        completedAt: now
    };

    const progress =
        readStorage(
            STORAGE_KEYS.lessonProgress,
            {}
        );

    progress[lesson.id] =
        result;

    writeStorage(
        STORAGE_KEYS.lessonProgress,
        progress
    );

    const lessonsData =
        readStorage(
            STORAGE_KEYS.lessons,
            {}
        );

    lessonsData[lesson.id] =
        result;

    writeStorage(
        STORAGE_KEYS.lessons,
        lessonsData
    );
}

// Reset saved lesson progress
function resetSavedLessonProgress() {
    localStorage.removeItem(
        getLessonStorageKey()
    );

    const progress =
        readStorage(
            STORAGE_KEYS.lessonProgress,
            {}
        );

    delete progress[lesson.id];

    writeStorage(
        STORAGE_KEYS.lessonProgress,
        progress
    );

    const lessonsData =
        readStorage(
            STORAGE_KEYS.lessons,
            {}
        );

    delete lessonsData[lesson.id];

    writeStorage(
        STORAGE_KEYS.lessons,
        lessonsData
    );
}

// Setup lesson navigation
function setupNavigation() {
    const previous =
        lessons.find(
            item =>
                item.id ===
                lesson.id - 1
        );

    const next =
        lessons.find(
            item =>
                item.id ===
                lesson.id + 1
        );

    if (previous) {
        const url =
            `lesson.html?level=${encodeURIComponent(
                previous.level
            )}&lesson=${previous.id}`;

        setLink(
            els.previous,
            url
        );

        setText(
            els.previousTitle,
            previous.title
        );
    } else {
        setLink(
            els.previous,
            "learn.html"
        );

        setText(
            els.previousTitle,
            "Learning path"
        );
    }

    if (next) {
        const url =
            `lesson.html?level=${encodeURIComponent(
                next.level
            )}&lesson=${next.id}`;

        setLink(
            els.next,
            url
        );

        setLink(
            els.nextBottom,
            url
        );

        setText(
            els.nextTitle,
            next.title
        );
    } else {
        setLink(
            els.next,
            "learn.html"
        );

        setLink(
            els.nextBottom,
            "learn.html"
        );

        setText(
            els.nextTitle,
            "Finish learning"
        );
    }
}

// Setup event listeners
function setupEvents() {
    els.display?.addEventListener(
        "keydown",
        handleKey
    );

    els.display?.addEventListener(
        "click",
        focusTypingArea
    );

    els.reset?.addEventListener(
        "click",
        () => {
            loadExercise(
                exerciseIndex
            );
        }
    );

    els.retry?.addEventListener(
        "click",
        () => {
            loadExercise(0);

            window.setTimeout(() => {
                document
                    .querySelector(
                        ".practice-card"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
            }, 50);
        }
    );

    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key ===
                "Escape"
            ) {
                stopTyping();
            }
        }
    );
}

// Focus typing area
function focusTypingArea() {
    if (!finished) {
        els.display?.focus();
    }
}

// Reset typing status
function resetStatus() {
    setStatus(
        "",
        "Waiting for input"
    );

    setText(
        els.timer,
        "00:00"
    );
}

// Set typing status
function setStatus(
    type,
    message
) {
    if (els.status) {
        els.status.className =
            `practice-status ${type}`.trim();
    }

    setText(
        els.message,
        message
    );
}

// Show temporary message
function showMessage(message) {
    setText(
        els.message,
        message
    );
}

// Animate typing error
function pulseTypingArea() {
    if (!els.display) {
        return;
    }

    els.display.classList.remove(
        "typing-error-pulse"
    );

    void els.display.offsetWidth;

    els.display.classList.add(
        "typing-error-pulse"
    );
}

// Normalize keyboard key
function normalizeEventKey(event) {
    if (
        event.key ===
        "Spacebar"
    ) {
        return " ";
    }

    return event.key;
}

// Display expected key
function displayKey(key) {
    if (key === " ") {
        return "SPACE";
    }

    if (key === "\n") {
        return "ENTER";
    }

    return key;
}

// Format typing character
function formatCharacter(character) {
    if (character === " ") {
        return "&nbsp;";
    }

    if (character === "\n") {
        return "↵";
    }

    return escapeHTML(character);
}

// Escape HTML
function escapeHTML(value) {
    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}

// Format timer
function formatTime(seconds) {
    const minutes =
        Math.floor(
            seconds / 60
        );

    const secs =
        seconds % 60;

    return `${String(
        minutes
    ).padStart(
        2,
        "0"
    )}:${String(
        secs
    ).padStart(
        2,
        "0"
    )}`;
}

// Set text content
function setText(
    element,
    value
) {
    if (element) {
        element.textContent =
            value;
    }
}

// Set link destination
function setLink(
    element,
    href
) {
    if (element) {
        element.href =
            href;
    }
}

// Start lesson
init();

})();
            
                    
  
