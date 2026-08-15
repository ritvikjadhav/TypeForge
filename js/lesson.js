(() => {
    "use strict";

    /* ==================== LESSON DATA ==================== */

    const lessons = [
        {
            id: 1,
            level: "Foundation",
            difficulty: "Beginner",
            title: "Keyboard Basics",
            description: "Understand the keyboard layout and the purpose of the keys you use every day.",
            duration: 8,
            theory: [
                ["Keyboard layout", "The keyboard is organized into rows and functional groups.", "Learn the layout before chasing speed."],
                ["Letter keys", "Most typing starts with the alphabet keys across the three main rows.", "Your fingers will eventually move without thinking."],
                ["Essential keys", "Space, Shift, Enter, Backspace, Tab and Escape each have different roles.", "Knowing these keys makes everyday typing easier."]
            ],
            guideTitle: "Start with the keyboard.",
            guideText: "Your first goal is familiarity, not speed.",
            guideList: [
                "Keep both hands close to the keyboard.",
                "Use your thumbs for Space.",
                "Use Shift for capitals and upper symbols.",
                "Use Enter to create or confirm a line.",
                "Avoid looking down constantly."
            ],
            exercises: [
                "asdf jkl;",
                "qwer uiop",
                "zxcv nm,.",
                "type with both hands"
            ]
        },
        {
            id: 2,
            level: "Foundation",
            difficulty: "Beginner",
            title: "Typing Posture",
            description: "Build a comfortable position for your body, hands, wrists and screen.",
            duration: 7,
            theory: [
                ["Shoulders", "Keep your shoulders relaxed instead of lifting or tightening them.", "Relaxation reduces unnecessary fatigue."],
                ["Wrists", "Keep your wrists neutral and let your fingers do most of the movement.", "Avoid pressing your wrists heavily into the desk."],
                ["Screen position", "Your screen should allow you to look forward without bending your neck.", "Comfort helps you practice longer."]
            ],
            guideTitle: "Create a comfortable setup.",
            guideText: "Good typing technique begins before the first keystroke.",
            guideList: [
                "Keep your back supported.",
                "Keep elbows comfortably near your body.",
                "Keep wrists straight.",
                "Keep both feet stable.",
                "Look at the screen while typing."
            ],
            exercises: [
                "asdf fdsa",
                "jkl; ;lkj",
                "sad lad fall",
                "a calm hand types"
            ]
        },
        {
            id: 3,
            level: "Foundation",
            difficulty: "Beginner",
            title: "Finger Placement",
            description: "Learn the home position and give each finger a clear starting point.",
            duration: 10,
            theory: [
                ["Left hand", "The left hand begins around A, S, D and F.", "Each finger is responsible for a movement zone."],
                ["Right hand", "The right hand begins around J, K, L and semicolon.", "Return your fingers to these positions after reaching."],
                ["F and J", "The small bumps on F and J provide tactile reference points.", "They help you position your hands without looking."]
            ],
            guideTitle: "Find your home position.",
            guideText: "Your fingers should rest lightly instead of hovering far above the keys.",
            guideList: [
                "Left fingers rest on A S D F.",
                "Right fingers rest on J K L ;.",
                "Thumbs stay around Space.",
                "Keep your fingers curved naturally.",
                "Return to home position after movement."
            ],
            exercises: [
                "a s d f j k l ;",
                "fj dk sl a;",
                "fdsa jkl; asdf ;lkj",
                "dad asks a lad"
            ]
        },
        {
            id: 4,
            level: "Foundation",
            difficulty: "Beginner",
            title: "Home Row Control",
            description: "Build accuracy and control before moving across the entire keyboard.",
            duration: 10,
            theory: [
                ["Home row", "The home row provides the base position for touch typing.", "Start and return here naturally."],
                ["Index fingers", "The index fingers cover more keys than the other fingers.", "Keep them ready for wider movement."],
                ["Accuracy", "Slow, correct repetitions build stronger muscle memory than rushed mistakes.", "Control comes before speed."]
            ],
            guideTitle: "Control every movement.",
            guideText: "Keep movements small and deliberate while learning.",
            guideList: [
                "Do not stretch your wrists.",
                "Return fingers to the home row.",
                "Keep your hands relaxed.",
                "Prioritize correct keystrokes.",
                "Increase speed only when accuracy is stable."
            ],
            exercises: [
                "fff jjj ddd kkk",
                "sss lll aaa ;;;",
                "asdf fdsa jkl; ;lkj",
                "a sad lad asks dad"
            ]
        },
        {
            id: 5,
            level: "Core Typing",
            difficulty: "Beginner",
            title: "Left Hand Reach",
            description: "Strengthen left-hand control across the home, top and bottom rows.",
            duration: 10,
            exercises: [
                "aqaz swsx dedc frfv",
                "qwer asdf zxcv",
                "we are ready",
                "fast hands stay calm"
            ]
        },
        {
            id: 6,
            level: "Core Typing",
            difficulty: "Beginner",
            title: "Right Hand Reach",
            description: "Build controlled movement across the right side of the keyboard.",
            duration: 10,
            exercises: [
                "jujm kik, lol.",
                "yuiop hjkl; nm,.",
                "you will learn",
                "keep your right hand steady"
            ]
        },
        {
            id: 7,
            level: "Core Typing",
            difficulty: "Beginner",
            title: "Top Row",
            description: "Reach upward while keeping your hands connected to the home position.",
            duration: 12,
            exercises: [
                "qwer tyui",
                "opqw erui",
                "type quiet words",
                "write every word clearly"
            ]
        },
        {
            id: 8,
            level: "Core Typing",
            difficulty: "Beginner",
            title: "Bottom Row",
            description: "Develop comfortable movement on the bottom row without losing control.",
            duration: 12,
            exercises: [
                "zxcv bnm",
                "zinc move next",
                "mix box van",
                "zoom across the bottom row"
            ]
        },
        {
            id: 9,
            level: "Core Typing",
            difficulty: "Beginner",
            title: "Full Alphabet",
            description: "Connect all three letter rows and type without stopping to search.",
            duration: 12,
            exercises: [
                "quick brown",
                "lazy dog jumps",
                "bright fox moves quickly",
                "every letter has a place"
            ]
        },
        {
            id: 10,
            level: "Accuracy",
            difficulty: "Intermediate",
            title: "Numbers",
            description: "Develop reliable number-row movement for everyday typing.",
            duration: 10,
            exercises: [
                "12345 67890",
                "2468 13579",
                "2026 1947 500",
                "42 users scored 98 points"
            ]
        },
        {
            id: 11,
            level: "Accuracy",
            difficulty: "Intermediate",
            title: "Capital Letters",
            description: "Use Shift naturally while keeping both hands coordinated.",
            duration: 10,
            exercises: [
                "A S D F J K",
                "Hello World",
                "Practice Builds Skill",
                "Every Good Habit Starts Small"
            ]
        },
        {
            id: 12,
            level: "Accuracy",
            difficulty: "Intermediate",
            title: "Punctuation",
            description: "Practice the punctuation used in normal conversations and writing.",
            duration: 12,
            exercises: [
                "hello, world.",
                "wait; think; type.",
                "Can you type this?",
                "Great! Keep going."
            ]
        },
        {
            id: 13,
            level: "Accuracy",
            difficulty: "Intermediate",
            title: "Symbols",
            description: "Build confidence with common symbols used in everyday computer work.",
            duration: 12,
            exercises: [
                "@ # $ % &",
                "email@example.com",
                "$25 + $15 = $40",
                "Use #tags & @mentions"
            ]
        },
        {
            id: 14,
            level: "Accuracy",
            difficulty: "Intermediate",
            title: "Error Control",
            description: "Learn to slow down when accuracy begins to fall.",
            duration: 10,
            exercises: [
                "accuracy comes first",
                "slow typing can be fast learning",
                "relaxed fingers make fewer errors",
                "clean typing becomes natural"
            ]
        },
        {
            id: 15,
            level: "Speed",
            difficulty: "Intermediate",
            title: "Letter Patterns",
            description: "Train common letter combinations so your fingers begin moving automatically.",
            duration: 12,
            exercises: [
                "th he in er",
                "an re on at",
                "tion ment ing",
                "the other thing matters"
            ]
        },
        {
            id: 16,
            level: "Speed",
            difficulty: "Intermediate",
            title: "Common Words",
            description: "Increase speed by practicing words that appear frequently in everyday writing.",
            duration: 12,
            exercises: [
                "the and you that",
                "with have this from",
                "your time what when",
                "people make work today"
            ]
        },
        {
            id: 17,
            level: "Speed",
            difficulty: "Intermediate",
            title: "Sentence Flow",
            description: "Move from individual words into smooth continuous sentences.",
            duration: 12,
            exercises: [
                "The morning starts with quiet practice.",
                "Good typing should feel smooth and controlled.",
                "Accuracy gives your speed a strong foundation.",
                "Keep your rhythm steady from start to finish."
            ]
        },
        {
            id: 18,
            level: "Speed",
            difficulty: "Intermediate",
            title: "Consistent Speed",
            description: "Maintain a steady rhythm instead of relying on short bursts of speed.",
            duration: 15,
            exercises: [
                "Keep your rhythm steady.",
                "Do not rush difficult words.",
                "Stay relaxed as the sentence becomes longer.",
                "Consistent speed is better than uncontrolled speed."
            ]
        },
        {
            id: 19,
            level: "Real World",
            difficulty: "Intermediate",
            title: "Typing Emails",
            description: "Practice the language, spacing and punctuation commonly used in emails.",
            duration: 12,
            exercises: [
                "Hello, I hope you are doing well.",
                "Thank you for taking the time to reply.",
                "I am writing to follow up on our conversation.",
                "Best regards, and thank you for your help."
            ]
        },
        {
            id: 20,
            level: "Real World",
            difficulty: "Intermediate",
            title: "Documents",
            description: "Build endurance with realistic professional writing.",
            duration: 15,
            exercises: [
                "Clear writing helps readers understand your ideas.",
                "Good documents need accuracy, spacing and consistent punctuation.",
                "A steady typing rhythm helps you focus on the work.",
                "Comfortable typing makes longer writing sessions easier."
            ]
        },
        {
            id: 21,
            level: "Real World",
            difficulty: "Advanced",
            title: "Coding Practice",
            description: "Practice brackets, operators, punctuation and common programming patterns.",
            duration: 15,
            exercises: [
                "const user = { name: 'Alex' };",
                "function add(a, b) { return a + b; }",
                "if (score >= 80) { status = 'good'; }",
                "let total = price * quantity;"
            ]
        },
        {
            id: 22,
            level: "Real World",
            difficulty: "Advanced",
            title: "Data Entry",
            description: "Improve accuracy when entering numbers, dates, prices and structured information.",
            duration: 12,
            exercises: [
                "1024 2048 4096",
                "1250.50 980.25 450.00",
                "2026-08-11 10:30",
                "Invoice 1042 total $1250.50"
            ]
        },
        {
            id: 23,
            level: "Advanced",
            difficulty: "Advanced",
            title: "Speed Under Pressure",
            description: "Maintain accuracy while working at a faster pace.",
            duration: 15,
            exercises: [
                "Speed means nothing without control.",
                "Stay calm when the pace increases.",
                "Keep your eyes ahead of the current word.",
                "Accuracy under pressure is a real typing skill."
            ]
        },
        {
            id: 24,
            level: "Advanced",
            difficulty: "Advanced",
            title: "Final Typing Challenge",
            description: "Combine accuracy, speed, punctuation and endurance in one final challenge.",
            duration: 20,
            exercises: [
                "Typing improves through deliberate and consistent practice.",
                "The goal is to type quickly, accurately and comfortably.",
                "Keep your hands relaxed and your eyes on the screen.",
                "When technique becomes automatic, you can focus completely on your work."
            ]
        }
    ];

    /* ==================== KEYBOARD ==================== */

    const keyboardRows = [
        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
        ["shift", "space", "enter"]
    ];

    const shiftedSymbols = {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        "[": "{",
        "]": "}",
        ";": ":",
        "'": "\"",
        ",": "<",
        ".": ">",
        "/": "?"
    };

    /* ==================== DOM ==================== */

    const $ = id => document.getElementById(id);

    const els = {
        level: $("lessonLevel"),
        number: $("lessonNumber"),
        title: $("lessonTitle"),
        description: $("lessonDescription"),
        difficulty: $("lessonDifficulty"),
        duration: $("lessonDuration"),

        theory: $("theoryContent"),
        theorySection: $("theorySection"),

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

        keyboard: $("keyboard"),

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

    /* ==================== URL + LESSON ==================== */

    const params = new URLSearchParams(window.location.search);
    const requestedLesson = Number.parseInt(params.get("lesson"), 10);

    const lessonId = Number.isInteger(requestedLesson) && requestedLesson > 0
        ? requestedLesson
        : 1;

    const lesson = lessons.find(item => item.id === lessonId) || lessons[0];

    /* ==================== STATE ==================== */

    let exerciseIndex = 0;
    let currentText = "";
    let position = 0;

    let errors = 0;
    let correct = 0;

    let startedAt = null;
    let timerId = null;

    let finished = false;
    let completionShown = false;

    let inputBridge = null;

    /* ==================== INITIALIZATION ==================== */

    function init() {
        if (!els.display || !els.tabs || !els.keyboard) {
            console.warn("VelType: required lesson elements are missing.");
            return;
        }

        renderLesson();
        renderExercises();
        renderKeyboard();
        createMobileInputBridge();
        setupEvents();
        setupNavigation();
        loadExercise(0);
    }

    /* ==================== LESSON CONTENT ==================== */

    function renderLesson() {
        setText(els.level, lesson.level);
        setText(els.number, `LESSON ${String(lesson.id).padStart(2, "0")}`);
        setText(els.title, lesson.title);
        setText(els.description, lesson.description);
        setText(els.difficulty, lesson.difficulty.toUpperCase());
        setText(els.duration, `${lesson.duration} MIN`);
        setText(els.practiceTitle, lesson.title);

        renderTheory();
        renderGuide();
    }

    function renderTheory() {
        if (!els.theorySection || !els.theory) return;

        if (!Array.isArray(lesson.theory) || lesson.theory.length === 0) {
            els.theorySection.hidden = true;
            return;
        }

        els.theorySection.hidden = false;

        els.theory.innerHTML = `
            <div class="theory-grid">
                ${lesson.theory.map(item => `
                    <article class="info-block">
                        <span>${escapeHTML(item[0])}</span>
                        <h3>${escapeHTML(item[1])}</h3>
                        <p>${escapeHTML(item[2])}</p>
                    </article>
                    `).join("")}
            </div>
        `;
    }

    function renderGuide() {
        if (!els.guideSection || !els.guide) return;

        if (!lesson.guideList?.length) {
            els.guideSection.hidden = true;
            return;
        }

        els.guideSection.hidden = false;

        const title = lesson.guideTitle || "Build your technique.";

        setText(els.guideTitle, title);

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
                        ${lesson.guideList.map(item => `
                            <li>${escapeHTML(item)}</li>
                        `).join("")}
                    </ul>
                </div>

                <div class="guide-visual">
                    <div class="guide-visual-placeholder">
                        <strong>VelType technique</strong>
                        <span>
                            Relax your hands, keep your posture comfortable
                            and focus on accuracy.
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    /* ==================== EXERCISES ==================== */

    function renderExercises() {
        if (!els.tabs) return;

        els.tabs.innerHTML = lesson.exercises.map((_, index) => `
            <button
                type="button"
                class="exercise-tab ${index === 0 ? "active" : ""}"
                data-index="${index}"
                aria-label="Exercise ${index + 1}"
            >
                Exercise ${String(index + 1).padStart(2, "0")}
            </button>
        `).join("");

        els.tabs.querySelectorAll(".exercise-tab").forEach(button => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.index);

                if (Number.isInteger(index)) {
                    loadExercise(index);
                }
            });
        });
    }

    function loadExercise(index) {
        if (!lesson.exercises[index]) return;

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
        clearKeyboard();

        focusTypingArea();
    }

    function renderText() {
        if (!els.display) return;

        els.display.innerHTML = [...currentText]
            .map((character, index) => `
                <span
                    class="char ${index === 0 ? "current" : ""}"
                    data-index="${index}"
                >${formatCharacter(character)}</span>
            `)
            .join("");

        setText(
            els.count,
            `0 / ${currentText.length}`
        );

        highlightKey();
    }

    /* ==================== TYPING INPUT ==================== */

    function handleKey(event) {
        if (finished) return;

        const key = normalizeEventKey(event);

        if (!key) return;

        if (["Backspace", "Delete", "Tab"].includes(key)) {
            event.preventDefault();

            if (key === "Backspace" || key === "Delete") {
                showMessage("Backspace is disabled during lessons.");
            }

            return;
        }

        if (key === "Escape") {
            event.preventDefault();
            stopTyping();
            return;
        }

        if (key === "Enter" && currentText[position] !== "\n") {
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

    function processCharacter(key) {
        if (finished) return;

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
        highlightKey();
    }

    /* ==================== CHARACTER STATES ==================== */

    function markCorrect() {
        const character = getCharacter(position);

        if (!character) return;

        character.classList.remove("current", "wrong");
        character.classList.add("correct");
    }

    function markWrong() {
        const character = getCharacter(position);

        if (!character) return;

        character.classList.remove("wrong");
        void character.offsetWidth;
        character.classList.add("wrong");

        setTimeout(() => {
            if (!finished && position === Number(character.dataset.index)) {
                character.classList.remove("wrong");
                character.classList.add("current");
            }
        }, 260);
    }

    function markCurrent() {
        els.display?.querySelectorAll(".char").forEach(character => {
            character.classList.remove("current");
        });

        const current = getCharacter(position);

        if (current) {
            current.classList.add("current");
        }
    }

    function getCharacter(index) {
        return els.display?.querySelector(
            `[data-index="${index}"]`
        );
    }

    /* ==================== KEYBOARD ==================== */

    function renderKeyboard() {
        if (!els.keyboard) return;

        els.keyboard.innerHTML = keyboardRows
            .map(row => `
                <div class="key-row">
                    ${row.map(renderKey).join("")}
                </div>
            `)
            .join("");

        els.keyboard.querySelectorAll(".key").forEach(key => {
            key.addEventListener("click", event => {
                event.preventDefault();

                const value = key.dataset.key;

                if (!value) return;

                focusTypingArea();

                if (value === "shift") return;

                if (value === "space") {
                    processCharacter(" ");
                    return;
                }

                if (value === "enter") {
                    processCharacter("\n");
                    return;
                }

                processCharacter(value);
            });
        });
    }

    function renderKey(key) {
        const label = {
            space: "SPACE",
            shift: "SHIFT",
            enter: "ENTER"
        }[key] || key.toUpperCase();

        const extraClass = [
            key === "space" ? "space" : "",
            key === "shift" ? "shift" : "",
            key === "enter" ? "enter" : ""
        ].filter(Boolean).join(" ");

        return `
            <button
                type="button"
                class="key ${extraClass}"
                data-key="${escapeHTML(key)}"
                tabindex="-1"
                aria-label="${escapeHTML(label)}"
            >
                ${escapeHTML(label)}
            </button>
        `;
    }

    function highlightKey() {
        clearKeyboard();

        const expected = currentText[position];

        if (!expected) return;

        const lower = expected.toLowerCase();

        if (/^[a-z]$/.test(lower)) {
            highlightKeyButton(lower);

            if (expected !== lower) {
                highlightKeyButton("shift");
            }

            return;
        }

        if (expected === " ") {
            highlightKeyButton("space");
            return;
        }

        if (expected === "\n") {
            highlightKeyButton("enter");
            return;
        }

        if (shiftedSymbols[lower]) {
            highlightKeyButton("shift");
            highlightKeyButton(lower);
            return;
        }

        highlightKeyButton(lower);
    }

    function highlightKeyButton(key) {
        const button = els.keyboard?.querySelector(
            `[data-key="${CSS.escape(key)}"]`
        );

        button?.classList.add("active");
    }

    function clearKeyboard() {
        els.keyboard?.querySelectorAll(".key").forEach(key => {
            key.classList.remove("active", "wrong");
        });
    }

    /* ==================== STATS ==================== */

    function updateStats() {
        const elapsed = getElapsedSeconds();
        const typed = correct + errors;

        const minutes = elapsed / 60;

        const wpm = minutes > 0
            ? Math.round((correct / 5) / minutes)
            : 0;

        const accuracy = typed > 0
            ? Math.round((correct / typed) * 100)
            : 100;

        setText(els.wpm, String(wpm));
        setText(els.accuracy, `${accuracy}%`);
        setText(els.errors, String(errors));

        setText(
            els.count,
            `${Math.min(position, currentText.length)} / ${currentText.length}`
        );
    }

    function getElapsedSeconds() {
        if (!startedAt) return 0;

        return Math.max(
            (Date.now() - startedAt) / 1000,
            0
        );
    }

    /* ==================== TIMER ==================== */

    function startTimer() {
        clearTimer();

        timerId = window.setInterval(() => {
            updateStats();

            const seconds = Math.floor(
                getElapsedSeconds()
            );

            setText(
                els.timer,
                formatTime(seconds)
            );
        }, 250);
    }

    function clearTimer() {
        if (!timerId) return;

        clearInterval(timerId);
        timerId = null;
    }

    /* ==================== EXERCISE COMPLETION ==================== */

    function finishExercise() {
        if (finished) return;

        finished = true;
        clearTimer();

        const elapsed = Math.max(
            getElapsedSeconds(),
            1
        );

        const wpm = Math.round(
            (correct / 5) /
            (elapsed / 60)
        );

        const accuracy = Math.round(
            (correct / Math.max(correct + errors, 1)) * 100
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

        if (exerciseIndex < lesson.exercises.length - 1) {
            window.setTimeout(() => {
                loadExercise(exerciseIndex + 1);
            }, 650);

            return;
        }

        finishLesson(wpm, accuracy);
    }

    function markAllComplete() {
        els.display?.querySelectorAll(".char").forEach(character => {
            character.classList.remove("current", "wrong");
            character.classList.add("correct");
        });

        els.tabs
            ?.querySelector(`[data-index="${exerciseIndex}"]`)
            ?.classList.add("complete");
    }

    /* ==================== LESSON COMPLETION ==================== */

    function finishLesson(wpm, accuracy) {
        if (completionShown) return;

        completionShown = true;

        clearTimer();

        setText(els.finalWpm, String(wpm));
        setText(els.finalAccuracy, `${accuracy}%`);
        setText(els.finalErrors, String(errors));

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

            requestAnimationFrame(() => {
                els.completion.classList.remove("lesson-complete-enter");
                void els.completion.offsetWidth;
                els.completion.classList.add("lesson-complete-enter");
            });
        }

        saveLessonCompletion(wpm, accuracy);

        updateExerciseProgress();

        window.setTimeout(() => {
            els.completion?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 80);
    }

    /* ==================== PROGRESS ==================== */

    function updateExerciseProgress() {
        const total = lesson.exercises.length;
        const completed = finished
            ? exerciseIndex + 1
            : exerciseIndex;

        const percentage = total
            ? Math.min((completed / total) * 100, 100)
            : 0;

        setText(
            els.exerciseProgress,
            `${completed} / ${total}`
        );

        if (els.progress) {
            els.progress.style.width = `${percentage}%`;
        }
    }

    function updateTabs() {
        els.tabs?.querySelectorAll(".exercise-tab")
            .forEach((tab, index) => {
                tab.classList.toggle(
                    "active",
                    index === exerciseIndex
                );
            });
    }

    /* ==================== LOCAL STORAGE ==================== */

    function getLessonStorageKey() {
        return `veltype_lesson_${lesson.id}`;
    }

    function saveExerciseProgress(wpm, accuracy) {
        const key = getLessonStorageKey();

        const data = readStorage(key);

        if (!Array.isArray(data.exercises)) {
            data.exercises = [];
        }

        data.exercises[exerciseIndex] = {
            completed: true,
            wpm,
            accuracy,
            errors,
            completedAt: new Date().toISOString()
        };

        writeStorage(key, data);
    }

    function saveLessonCompletion(wpm, accuracy) {
        const progress = readStorage(
            "veltypeLessonProgress"
        );

        progress[lesson.id] = {
            completed: true,
            wpm,
            accuracy,
            errors,
            completedAt: new Date().toISOString()
                };

        writeStorage(
            "veltypeLessonProgress",
            progress
        );
    }

    function readStorage(key) {
        try {
            return JSON.parse(
                localStorage.getItem(key) || "{}"
            );
        } catch {
            return {};
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch {
            console.warn("VelType: unable to save progress.");
        }
    }

    /* ==================== NAVIGATION ==================== */

    function setupNavigation() {
        const previous = lessons.find(
            item => item.id === lesson.id - 1
        );

        const next = lessons.find(
            item => item.id === lesson.id + 1
        );

        if (previous) {
            const url =
                `lesson.html?level=${encodeURIComponent(previous.level)}&lesson=${previous.id}`;

            setLink(els.previous, url);
            setText(els.previousTitle, previous.title);
        } else {
            setLink(els.previous, "learn.html");
            setText(els.previousTitle, "Learning path");
        }

        if (next) {
            const url =
                `lesson.html?level=${encodeURIComponent(next.level)}&lesson=${next.id}`;

            setLink(els.next, url);
            setLink(els.nextBottom, url);

            setText(
                els.nextTitle,
                next.title
            );
        } else {
            setLink(els.next, "learn.html");
            setLink(els.nextBottom, "learn.html");

            setText(
                els.nextTitle,
                "Finish learning"
            );
        }
    }

    /* ==================== BUTTON EVENTS ==================== */

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
            () => loadExercise(exerciseIndex)
        );

        els.retry?.addEventListener(
            "click",
            () => {
                loadExercise(0);

                window.setTimeout(() => {
                    document
                        .querySelector(".practice-card")
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
                if (event.key === "Escape") {
                    stopTyping();
                }
            }
        );
    }

    /* ==================== MOBILE INPUT ==================== */

    function createMobileInputBridge() {
        if (inputBridge || !els.display) return;

        inputBridge = document.createElement("textarea");

        inputBridge.setAttribute(
            "aria-hidden",
            "true"
        );

        inputBridge.setAttribute(
            "autocomplete",
            "off"
        );

        inputBridge.setAttribute(
            "autocorrect",
            "off"
        );

        inputBridge.setAttribute(
            "autocapitalize",
            "off"
        );

        inputBridge.setAttribute(
            "spellcheck",
            "false"
        );

        inputBridge.style.position = "fixed";
        inputBridge.style.width = "1px";
        inputBridge.style.height = "1px";
        inputBridge.style.opacity = "0";
        inputBridge.style.pointerEvents = "none";
        inputBridge.style.left = "-100px";
        inputBridge.style.bottom = "0";
        inputBridge.style.resize = "none";

        document.body.appendChild(inputBridge);

        inputBridge.addEventListener(
            "keydown",
            event => {
                handleKey(event);
            }
        );

        inputBridge.addEventListener(
            "input",
            () => {
                if (!inputBridge) return;

                inputBridge.value = "";
            }
        );
    }

    function focusTypingArea() {
        if (finished) return;

        if (window.matchMedia("(pointer: coarse)").matches) {
            inputBridge?.focus({
                preventScroll: true
            });

            return;
        }

        els.display?.focus();
    }

    function stopTyping() {
        clearTimer();

        inputBridge?.blur();
        els.display?.blur();

        if (!finished && startedAt) {
            setStatus(
                "",
                "Paused"
            );
        }
    }

    /* ==================== UI FEEDBACK ==================== */

    function startTypingIfNeeded() {
        if (startedAt) return;

        startedAt = Date.now();

        startTimer();

        setStatus(
            "active",
            "Typing..."
        );
    }

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

    function setStatus(type, message) {
        if (els.status) {
            els.status.className =
                `practice-status ${type}`.trim();
        }

        setText(
            els.message,
            message
        );
    }

    function showMessage(message) {
        setText(
            els.message,
            message
        );
    }

    function pulseTypingArea() {
        if (!els.display) return;

        els.display.classList.remove(
            "typing-error-pulse"
        );

        void els.display.offsetWidth;

        els.display.classList.add(
            "typing-error-pulse"
        );
    }

    /* ==================== HELPERS ==================== */

    function normalizeEventKey(event) {
        if (event.key === "Spacebar") {
            return " ";
        }

        return event.key;
    }

    function displayKey(key) {
        if (key === " ") return "SPACE";
        if (key === "\n") return "ENTER";

        return key;
    }

    function formatCharacter(character) {
        if (character === " ") {
            return "&nbsp;";
        }

        if (character === "\n") {
            return "↵";
        }

        return escapeHTML(character);
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    function setText(element, value) {
        if (element) {
            element.textContent = value;
        }
    }

    function setLink(element, href) {
        if (element) {
            element.href = href;
        }
    }

    /* ==================== START ==================== */

    init();

})();
                    
        
