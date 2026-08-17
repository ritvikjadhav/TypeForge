(() => {
"use strict";

// Lesson data
const lessons = [
    {
        id: 1,
        level: "Foundation",
        difficulty: "Beginner",
        title: "Keyboard Basics",
        description: "Understand the keyboard layout and build your first comfortable typing rhythm.",
        duration: 10,
        guideTitle: "Start with the keyboard.",
        guideText: "Focus on familiarity, accuracy and comfortable movement before trying to type quickly.",
        guideList: [
            "Keep both hands close to the keyboard.",
            "Use your thumbs for Space.",
            "Use Shift for capitals and upper symbols.",
            "Use Enter when required.",
            "Look at the screen instead of constantly looking down."
        ],
        guideImage: "image/keyboard-basics.png",
        exercises: [
            "asdf jkl; asdf jkl; asdf jkl; asdf jkl;",
            "qwer uiop qwer uiop asdf jkl; qwer uiop",
            "zxcv nm,. zxcv nm,. asdf jkl; qwer uiop",
            "Start slowly and keep both hands relaxed while you type each line with control."
        ]
    },

    {
        id: 2,
        level: "Foundation",
        difficulty: "Beginner",
        title: "Typing Posture",
        description: "Build a comfortable position for your body, hands, wrists and screen.",
        duration: 10,
        guideTitle: "Create a comfortable setup.",
        guideText: "Good typing technique begins before the first keystroke.",
        guideList: [
            "Keep your back supported.",
            "Keep elbows comfortably near your body.",
            "Keep wrists straight.",
            "Keep both feet stable.",
            "Look at the screen while typing."
        ],
        guideImage: "assets/images/tutorials/typing-posture.webp",
        exercises: [
            "asdf jkl; asdf jkl; keep your shoulders relaxed",
            "jkl; asdf jkl; asdf keep your wrists straight",
            "sit comfortably keep your feet stable and your eyes on the screen",
            "Good posture makes long typing sessions easier and helps you stay accurate."
        ]
    },

    {
        id: 3,
        level: "Foundation",
        difficulty: "Beginner",
        title: "Finger Placement",
        description: "Learn the home position and give each finger a clear starting point.",
        duration: 12,
        guideTitle: "Find your home position.",
        guideText: "Your fingers should rest lightly instead of hovering far above the keys.",
        guideList: [
            "Left fingers rest on A S D F.",
            "Right fingers rest on J K L ;.",
            "Thumbs stay around Space.",
            "Keep your fingers naturally curved.",
            "Return to home position after movement."
        ],
        guideImage: "assets/images/tutorials/finger-placement.webp",
        exercises: [
            "a s d f j k l ; a s d f j k l ;",
            "fj dk sl a; fj dk sl a; fdsa jkl;",
            "dad asks a lad to fall and add a safe task",
            "Keep your fingers near the home row and return them after every movement."
        ]
    },

    {
        id: 4,
        level: "Foundation",
        difficulty: "Beginner",
        title: "Home Row Control",
        description: "Build accuracy and control before moving across the entire keyboard.",
        duration: 12,
        guideTitle: "Control every movement.",
        guideText: "Keep movements small and deliberate while learning.",
        guideList: [
            "Do not stretch your wrists.",
            "Return fingers to the home row.",
            "Keep your hands relaxed.",
            "Prioritize correct keystrokes.",
            "Increase speed only when accuracy is stable."
        ],
        guideImage: "assets/images/tutorials/home-row.webp",
        exercises: [
            "fff jjj ddd kkk sss lll aaa ;;;",
            "asdf fdsa jkl; ;lkj asdf jkl; fdsa",
            "a sad lad asks dad to add a small salad",
            "Keep every movement controlled and return your fingers to the home row."
        ]
    },

    {
        id: 5,
        level: "Core Typing",
        difficulty: "Beginner",
        title: "Left Hand Reach",
        description: "Strengthen left-hand control across the home, top and bottom rows.",
        duration: 14,
        guideImage: "assets/images/tutorials/left-hand-reach.webp",
        exercises: [
            "aqaz swsx dedc frfv aqaz swsx dedc frfv",
            "qwer asdf zxcv qwer asdf zxcv",
            "we are ready to learn left hand movement",
            "Practice every left hand movement slowly before increasing your speed."
        ]
    },

    {
        id: 6,
        level: "Core Typing",
        difficulty: "Beginner",
        title: "Right Hand Reach",
        description: "Build controlled movement across the right side of the keyboard.",
        duration: 14,
        guideImage: "assets/images/tutorials/right-hand-reach.webp",
        exercises: [
            "jujm kik, lol. jujm kik, lol. yuiop",
            "yuiop hjkl; nm,. yuiop hjkl; nm,.",
            "you will learn to keep your right hand steady",
            "Practice controlled right hand movement and return to the home position."
        ]
    },

    {
        id: 7,
        level: "Core Typing",
        difficulty: "Beginner",
        title: "Top Row",
        description: "Reach upward while keeping your hands connected to the home position.",
        duration: 15,
        guideImage: "assets/images/tutorials/top-row.webp",
        exercises: [
            "qwer tyui qwer tyui opqw erui",
            "write every word clearly while keeping your fingers relaxed",
            "type quiet words with your eyes on the screen",
            "Reach toward the top row without losing your home position or rhythm."
        ]
    },

    {
        id: 8,
        level: "Core Typing",
        difficulty: "Beginner",
        title: "Bottom Row",
        description: "Develop comfortable movement on the bottom row without losing control.",
        duration: 15,
        guideImage: "assets/images/tutorials/bottom-row.webp",
        exercises: [
            "zxcv bnm zxcv bnm zxcv bnm",
            "zinc move next zoom across the bottom row",
            "mix box van and move your fingers carefully",
            "Practice bottom row words while maintaining a steady typing rhythm."
        ]
    },

    {
        id: 9,
        level: "Core Typing",
        difficulty: "Beginner",
        title: "Full Alphabet",
        description: "Connect all three letter rows and type without stopping to search.",
        duration: 15,
        exercises: [
            "quick brown fox jumps over the lazy dog",
            "the quick brown fox moves across the bright field",
            "every letter has a place and every finger has a job",
            "Practice the full alphabet while keeping your typing smooth and controlled."
        ]
    },

    {
        id: 10,
        level: "Accuracy",
        difficulty: "Intermediate",
        title: "Numbers",
        description: "Develop reliable number-row movement for everyday typing.",
        duration: 14,
        exercises: [
            "12345 67890 12345 67890 2468 13579",
            "2026 1947 500 1250 750 360 840",
            "42 users scored 98 points after completing 15 typing tests",
            "Enter numbers carefully and maintain accuracy instead of rushing."
        ]
    },

    {
        id: 11,
        level: "Accuracy",
        difficulty: "Intermediate",
        title: "Capital Letters",
        description: "Use Shift naturally while keeping both hands coordinated.",
        duration: 14,
        exercises: [
            "A S D F J K L A S D F J K L",
            "Hello World This Is A Typing Practice Exercise",
            "Practice Builds Skill When You Repeat Good Habits",
            "Every Good Typist Starts Slowly And Builds Consistent Accuracy."
        ]
    },

    {
        id: 12,
        level: "Accuracy",
        difficulty: "Intermediate",
        title: "Punctuation",
        description: "Practice punctuation used in normal conversations, documents and writing.",
        duration: 15,
        exercises: [
            "hello, world. how are you today? I hope you are doing well.",
            "wait; think; type carefully. accuracy should always come first.",
            "Can you type this sentence correctly? Keep your rhythm steady!",
            "Great! Keep going, stay relaxed, and remember to use punctuation."
        ]
    },

    {
        id: 13,
        level: "Accuracy",
        difficulty: "Intermediate",
        title: "Symbols",
        description: "Build confidence with common symbols used in everyday computer work.",
        duration: 15,
        exercises: [
            "@ # $ % & @ # $ % & * + = - _",
            "email@example.com and support@example.com",
            "$25 + $15 = $40 and $100 - $35 = $65",
            "Use #tags, @mentions, prices, symbols & common keyboard characters."
        ]
    },

    {
        id: 14,
        level: "Accuracy",
        difficulty: "Intermediate",
        title: "Error Control",
        description: "Learn to slow down when accuracy begins to fall and build cleaner typing habits.",
        duration: 15,
        exercises: [
            "accuracy comes first, speed comes after control and consistency",
            "slow typing can be fast learning when every keystroke is correct",
            "relaxed fingers make fewer errors and help maintain a steady rhythm",
            "Clean typing becomes natural when you focus on accuracy instead of rushing."
        ]
    },

    {
        id: 15,
        level: "Speed",
        difficulty: "Intermediate",
        title: "Letter Patterns",
        description: "Train common letter combinations so your fingers begin moving automatically.",
        duration: 15,
        exercises: [
            "th he in er an re on at th he in er",
            "tion ment ing tion ment ing able ible ness",
            "the other thing matters when common patterns become automatic",
            "Practice common letter combinations until your fingers recognize them naturally."
        ]
    },

    {
        id: 16,
        level: "Speed",
        difficulty: "Intermediate",
        title: "Common Words",
        description: "Increase speed by practicing words that appear frequently in everyday writing.",
        duration: 15,
        exercises: [
            "the and you that with have this from they would",
            "your time what when people make work today",
            "because about there could should where every other",
            "Common words become easier when your fingers learn their movement patterns."
        ]
    },

    {
        id: 17,
        level: "Speed",
        difficulty: "Intermediate",
        title: "Sentence Flow",
        description: "Move from individual words into smooth continuous sentences.",
        duration: 16,
        exercises: [
            "The morning starts with quiet practice and a clear goal.",
            "Good typing should feel smooth, controlled, comfortable and natural.",
            "Accuracy gives your speed a strong foundation for longer sentences.",
            "Keep your rhythm steady from start to finish without rushing difficult words."
        ]
    },

    {
        id: 18,
        level: "Speed",
        difficulty: "Intermediate",
        title: "Consistent Speed",
        description: "Maintain a steady rhythm instead of relying on short bursts of speed.",
        duration: 18,
        exercises: [
            "Keep your rhythm steady and avoid sudden bursts of uncontrolled speed.",
            "Do not rush difficult words when the sentence becomes longer.",
            "Stay relaxed and maintain consistent movement from one word to the next.",
            "Consistent speed is better than uncontrolled speed because accuracy builds endurance."
        ]
    },

    {
        id: 19,
        level: "Real World",
        difficulty: "Intermediate",
        title: "Typing Emails",
        description: "Practice the language, spacing and punctuation commonly used in professional emails.",
        duration: 18,
        exercises: [
            "Hello, I hope you are doing well. I am writing to share an update.",
            "Thank you for taking the time to review my message and provide your feedback.",
            "I am writing to follow up on our conversation and discuss the next steps.",
            "Best regards, and thank you for your time. I look forward to hearing from you."
        ]
    },

    {
        id: 20,
        level: "Real World",
        difficulty: "Intermediate",
        title: "Documents",
        description: "Build endurance with realistic professional writing.",
        duration: 20,
        exercises: [
            "Clear writing helps readers understand your ideas and follow important information.",
            "Good documents need accuracy, spacing, structure and consistent punctuation.",
            "A steady typing rhythm helps you focus on the work instead of the keyboard.",
            "Comfortable typing makes longer writing sessions easier and more productive."
        ]
    },

    {
        id: 21,
        level: "Real World",
        difficulty: "Advanced",
        title: "Coding Practice",
        description: "Practice brackets, operators, punctuation and common programming patterns.",
        duration: 20,
        exercises: [
            "const user = { name: 'Alex', age: 21 };",
            "function add(a, b) { return a + b; }",
            "if (score >= 80) { status = 'good'; } else { status = 'practice'; }",
            "let total = price * quantity; console.log('Total:', total);"
        ]
    },

    {
        id: 22,
        level: "Real World",
        difficulty: "Advanced",
        title: "Data Entry",
        description: "Improve accuracy when entering numbers, dates, prices and structured information.",
        duration: 18,
        exercises: [
            "1024 2048 4096 8192 16384 32768",
            "1250.50 980.25 450.00 2750.75 999.99",
            "2026-08-11 10:30 2026-08-12 14:45 2026-08-13 09:15",
            "Invoice 1042 total $1250.50 quantity 25 price $50.02"
        ]
    },

    {
        id: 23,
        level: "Advanced",
        difficulty: "Advanced",
        title: "Speed Under Pressure",
        description: "Maintain accuracy while working at a faster pace.",
        duration: 20,
        exercises: [
            "Speed means nothing without control, accuracy and consistent technique.",
            "Stay calm when the pace increases and keep your eyes ahead of the current word.",
            "Keep your hands relaxed while maintaining a steady rhythm through the sentence.",
            "Accuracy under pressure is a real typing skill that improves through deliberate practice."
        ]
    },

    {
        id: 24,
        level: "Advanced",
        difficulty: "Advanced",
        title: "Final Typing Challenge",
        description: "Combine accuracy, speed, punctuation and endurance in one final challenge.",
        duration: 25,
        exercises: [
            "Typing improves through deliberate and consistent practice every single day.",
            "The goal is to type quickly, accurately and comfortably without losing control.",
            "Keep your hands relaxed, your eyes on the screen and your rhythm consistent.",
            "When technique becomes automatic, you can focus completely on your work and ideas."
        ]
    }
];

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
            
                    
  
