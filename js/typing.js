/* ========================================
   TYPEFORGE — TYPING TEST ENGINE
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const typingTest = document.querySelector("#typingTest");
    if (!typingTest) return;
    new TypingTest();
});

class TypingTest {
    constructor() {
        this.passage = document.querySelector("#passage");
        this.input = document.querySelector("#typingInput");
        this.timerDisplay = document.querySelector("#timer");
        this.wpmDisplay = document.querySelector("#wpm");
        this.accuracyDisplay = document.querySelector("#accuracy");
        this.errorsDisplay = document.querySelector("#errors");
        this.progressBar = document.querySelector("#progressBar");
        this.restartButton = document.querySelector("#restartTest");
        this.modeButtons = document.querySelectorAll("[data-time]");

        this.text = "";
        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.timer = null;
        this.timeLimit = 30;
        this.timeLeft = 30;
        this.errors = 0;
        this.correct = 0;
        this.typed = 0;

        this.passages = [
            "Success in typing does not come from rushing. It comes from accuracy, rhythm, consistency, and regular practice. Focus on every letter and let your speed improve naturally.",
            "Technology changes every day, but the ability to communicate clearly remains important. Good typing skills help you work faster, write better, and stay focused on your ideas.",
            "The fastest typists are not always the people who press the keys hardest. They understand rhythm and accuracy, allowing their fingers to move naturally across the keyboard.",
            "Learning to type properly is a small investment that can save hundreds of hours over time. Practice regularly, keep your hands relaxed, and concentrate on accuracy before speed.",
            "Every great skill begins with repetition. Your typing speed will improve when you practice consistently and learn from your mistakes instead of trying to become fast immediately."
        ];

        this.init();
    }

    /* ========================================
       INITIALIZATION
       ======================================== */

    init() {
        this.generatePassage();
        this.setupEvents();
        this.updateStats();
        this.updateTimer();
        this.focusInput();
    }

    /* ========================================
       GENERATE PASSAGE
       ======================================== */

    generatePassage() {
        this.text =
            this.passages[
                Math.floor(Math.random() * this.passages.length)
            ];

        this.passage.innerHTML = "";

        [...this.text].forEach((character, index) => {
            const span = document.createElement("span");

            span.textContent = character;
            span.dataset.index = index;

            if (index === 0) {
                span.classList.add("current");
            }

            this.passage.appendChild(span);
        });
    }

    /* ========================================
       EVENTS
       ======================================== */

    setupEvents() {
        this.input.addEventListener("input", () => {
            this.handleTyping();
        });

        this.input.addEventListener("keydown", event => {
            if (event.key === "Tab") {
                event.preventDefault();
            }
        });

        this.passage.addEventListener("click", () => {
            this.focusInput();
        });

        this.restartButton?.addEventListener("click", () => {
            this.restart();
        });

        this.modeButtons.forEach(button => {
            button.addEventListener("click", () => {
                this.modeButtons.forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                this.timeLimit =
                    Number(button.dataset.time);

                this.restart();
            });
        });

        document.addEventListener("keydown", event => {
            if (
                event.key.length === 1 ||
                event.key === "Backspace" ||
                event.key === " "
            ) {
                this.focusInput();
            }
        });
    }

    /* ========================================
       TYPING
       ======================================== */

    handleTyping() {
        if (this.finished) return;

        const typedText = this.input.value;

        if (!this.started && typedText.length > 0) {
            this.start();
        }

        this.typed = typedText.length;
        this.correct = 0;
        this.errors = 0;

        const characters =
            this.passage.querySelectorAll("span");

        characters.forEach((character, index) => {
            character.classList.remove(
                "correct",
                "wrong",
                "current"
            );

            if (index < typedText.length) {
                if (
                    typedText[index] ===
                    this.text[index]
                ) {
                    character.classList.add("correct");
                    this.correct++;
                } else {
                    character.classList.add("wrong");
                    this.errors++;
                }
            }

            if (index === typedText.length) {
                character.classList.add("current");
            }
        });

        this.updateStats();
        this.updateProgress();

        if (
            typedText.length >=
            this.text.length
        ) {
            this.finish();
        }
    }

    /* ========================================
       TIMER
       ======================================== */

    start() {
        this.started = true;
        this.startTime = Date.now();

        this.timer = setInterval(() => {
            this.timeLeft--;

            this.updateTimer();
            this.updateStats();

            if (this.timeLeft <= 0) {
                this.finish();
            }
        }, 1000);
    }

    updateTimer() {
        if (!this.timerDisplay) return;

        this.timerDisplay.textContent =
            `${this.timeLeft}s`;
    }

    /* ========================================
       STATISTICS
       ======================================== */

    updateStats() {
        if (!this.started) {
            this.wpmDisplay.textContent = "0";
            this.accuracyDisplay.textContent = "100%";
            this.errorsDisplay.textContent = "0";
            return;
        }

        const elapsed =
            Math.max(
                (Date.now() - this.startTime) / 1000,
                1
            );

        const minutes = elapsed / 60;

        const wpm =
            Math.round(
                (this.correct / 5) /
                minutes
            );

        const accuracy =
            this.typed > 0
                ? Math.round(
                    (this.correct /
                        this.typed) *
                    100
                )
                : 100;

        this.wpmDisplay.textContent =
            Math.max(wpm, 0);

        this.accuracyDisplay.textContent =
            `${Math.max(
                0,
                Math.min(100, accuracy)
            )}%`;

        this.errorsDisplay.textContent =
            this.errors;
    }

    /* ========================================
       PROGRESS
       ======================================== */

    updateProgress() {
        if (!this.progressBar) return;

        const progress =
            (this.typed /
                this.text.length) *
            100;

        this.progressBar.style.width =
            `${Math.min(progress, 100)}%`;
    }

    /* ========================================
       FINISH
       ======================================== */

    finish() {
        if (this.finished) return;

        this.finished = true;
        this.started = false;

        clearInterval(this.timer);

        this.input.blur();

        this.saveResult();
    }

    /* ========================================
       SAVE RESULT
       ======================================== */

    saveResult() {
        const history =
            JSON.parse(
                localStorage.getItem(
                    "typeforge-history"
                ) || "[]"
            );

        const elapsed =
            this.startTime
                ? Math.round(
                    (Date.now() -
                        this.startTime) /
                    1000
                )
                : 0;

        const minutes =
            Math.max(elapsed / 60, 1 / 60);

        const wpm =
            Math.round(
                (this.correct / 5) /
                minutes
            );

        const accuracy =
            this.typed > 0
                ? Math.round(
                    (this.correct /
                        this.typed) *
                    100
                )
                : 100;

        history.unshift({
            wpm: Math.max(wpm, 0),
            accuracy,
            errors: this.errors,
            characters: this.typed,
            correctCharacters: this.correct,
            duration: elapsed,
            date: new Date().toISOString()
        });

        localStorage.setItem(
            "typeforge-history",
            JSON.stringify(
                history.slice(0, 50)
            )
        );

        this.showFinishedMessage();
    }

    /* ========================================
       FINISHED MESSAGE
       ======================================== */

    showFinishedMessage() {
        const message =
            document.querySelector(
                "#testMessage"
            );

        if (message) {
            message.textContent =
                "Test complete — great work!";
        }
    }

    /* ========================================
       RESTART
       ======================================== */

    restart() {
        clearInterval(this.timer);

        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.errors = 0;
        this.correct = 0;
        this.typed = 0;
        this.timeLeft = this.timeLimit;

        this.input.value = "";

        this.generatePassage();
        this.updateTimer();
        this.updateStats();
        this.updateProgress();

        const message =
            document.querySelector(
                "#testMessage"
            );

        if (message) {
            message.textContent =
                "Click the passage and start typing";
        }

        this.focusInput();
    }

    /* ========================================
       FOCUS
       ======================================== */

    focusInput() {
        if (!this.finished) {
            this.input.focus();
        }
    }
}
