// VelType — Typing Test
"use strict";

// Initialize typing test
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#typingTest")) {
        new TypingTest();
    }
});

class TypingTest {
    constructor() {
        // Typing elements
        this.passage = document.querySelector("#passage");
        this.input = document.querySelector("#typingInput");

        // Live statistics
        this.timerDisplay = document.querySelector("#timer");
        this.wpmDisplay = document.querySelector("#wpm");
        this.accuracyDisplay = document.querySelector("#accuracy");
        this.errorsDisplay = document.querySelector("#errors");
        this.testModeLabel = document.querySelector("#testModeLabel");

        // Buttons
        this.restartButton = document.querySelector("#restartTest");
        this.resultRestart = document.querySelector("#resultRestart");
        this.modeButtons = document.querySelectorAll(".mode-button");

        // Result elements
        this.result = document.querySelector("#testResult");
        this.resultWpm = document.querySelector("#resultWpm");
        this.resultAccuracy = document.querySelector("#resultAccuracy");
        this.resultErrors = document.querySelector("#resultErrors");
        this.resultRawWpm = document.querySelector("#resultRawWpm");

        // Test passages
        this.passages = [
            "Success in typing does not come from rushing. It comes from accuracy, rhythm, consistency, and regular practice. Focus on every letter and let your speed improve naturally.",
            "Technology changes every day, but the ability to communicate clearly remains important. Good typing skills help you work faster, write better, and stay focused on your ideas.",
            "The fastest typists are not always the people who press the keys hardest. They understand rhythm and accuracy, allowing their fingers to move naturally across the keyboard.",
            "Learning to type properly is a small investment that can save hundreds of hours over time. Practice regularly, keep your hands relaxed, and concentrate on accuracy before speed.",
            "Every great skill begins with repetition. Your typing speed will improve when you practice consistently and learn from your mistakes instead of trying to become fast immediately."
        ];

        // Test state
        this.timeLimit = 30;
        this.timeLeft = 30;
        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.timer = null;
        this.text = "";
        this.typed = 0;
        this.correct = 0;
        this.errors = 0;

        // Start setup
        this.init();
    }

    // Initialize test
    init() {
        this.bindEvents();
        this.restart();
    }

    // Generate random passage
    generatePassage() {
        const index = Math.floor(
            Math.random() * this.passages.length
        );

        this.text = this.passages[index];
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

    // Bind test events
    bindEvents() {
        // Typing input
        this.input.addEventListener("input", () => {
            this.handleInput();
        });

        // Prevent navigation keys
        this.input.addEventListener("keydown", event => {
            const blockedKeys = [
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown"
            ];

            if (blockedKeys.includes(event.key)) {
                event.preventDefault();
            }
        });

        // Focus input from passage
        this.passage.addEventListener("click", () => {
            this.focusInput();
        });

        // Focus input from typing surface
        document
            .querySelector("#typingSurface")
            ?.addEventListener("click", event => {
                if (
                    event.target.closest(".typing-box-header") ||
                    event.target.closest(".typing-hint") ||
                    event.target === this.passage
                ) {
                    this.focusInput();
                }
            });

        // Restart button
        this.restartButton?.addEventListener("click", () => {
            this.restart();
        });

        // Result restart button
        this.resultRestart?.addEventListener("click", () => {
            this.restart();
        });

        // Test mode buttons
        this.modeButtons.forEach(button => {
            button.addEventListener("click", () => {
                this.modeButtons.forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                this.timeLimit = Number(button.dataset.time) || 30;
                this.restart();
            });
        });
    }

    // Process typed text
    handleInput() {
        if (this.finished) {
            return;
        }

        let value = this.input.value;

        // Limit input to passage length
        if (value.length > this.text.length) {
            value = value.slice(0, this.text.length);
            this.input.value = value;
        }

        // Start timer on first character
        if (!this.started && value.length > 0) {
            this.start();
        }

        this.typed = value.length;
        this.correct = 0;
        this.errors = 0;

        const characters = this.passage.querySelectorAll("span");

        // Update character states
        characters.forEach((character, index) => {
            character.classList.remove(
                "correct",
                "wrong",
                "current"
            );

            if (index < value.length) {
                if (value[index] === this.text[index]) {
                    character.classList.add("correct");
                    this.correct++;
                } else {
                    character.classList.add("wrong");
                    this.errors++;
                }
            }

            if (index === value.length) {
                character.classList.add("current");
            }
        });

        // Update live statistics
        this.updateStats();

        // Finish when passage is completed
        if (value.length === this.text.length) {
            this.finish();
        }
    }

    // Start timer
    start() {
        if (this.started || this.finished) {
            return;
        }

        this.started = true;
        this.startTime = Date.now();
        this.timeLeft = this.timeLimit;

        clearInterval(this.timer);

        // Update timer every 100 milliseconds
        this.timer = setInterval(() => {
            const elapsed =
                (Date.now() - this.startTime) / 1000;

            this.timeLeft = Math.max(
                this.timeLimit - Math.floor(elapsed),
                0
            );

            this.updateTimer();
            this.updateStats();

            // Finish when time expires
            if (elapsed >= this.timeLimit) {
                this.finish();
            }
        }, 100);

        this.updateTimer();
    }

    // Update timer display
    updateTimer() {
        if (this.timerDisplay) {
            this.timerDisplay.textContent = `${this.timeLeft}s`;
        }

        if (this.testModeLabel) {
            this.testModeLabel.textContent =
                `${this.timeLimit} SEC`;
        }
    }

    // Update live statistics
    updateStats() {
        if (!this.started && !this.finished) {
            if (this.wpmDisplay) {
                this.wpmDisplay.textContent = "0";
            }

            if (this.accuracyDisplay) {
                this.accuracyDisplay.textContent = "100%";
            }

            if (this.errorsDisplay) {
                this.errorsDisplay.textContent = "0";
            }

            return;
        }

        const elapsed = this.getElapsedTime();
        const minutes = Math.max(elapsed / 60, 1 / 60);

        const wpm = Math.round(
            (this.correct / 5) / minutes
        );

        const accuracy = this.typed > 0
            ? Math.round(
                (this.correct / this.typed) * 100
            )
            : 100;

        if (this.wpmDisplay) {
            this.wpmDisplay.textContent =
                Math.max(wpm, 0);
        }

        if (this.accuracyDisplay) {
            this.accuracyDisplay.textContent =
                `${Math.min(100, accuracy)}%`;
        }

        if (this.errorsDisplay) {
            this.errorsDisplay.textContent =
                this.errors;
        }
    }

    // Calculate elapsed time
    getElapsedTime() {
        if (!this.startTime) {
            return 0;
        }

        return Math.max(
            (Date.now() - this.startTime) / 1000,
            0.1
        );
    }

    // Finish test
    finish() {
        if (this.finished) {
            return;
        }

        this.finished = true;

        clearInterval(this.timer);
        this.timer = null;

        // Set timer to zero when time expires
        if (
            this.getElapsedTime() >= this.timeLimit &&
            this.timeLeft <= 0
        ) {
            this.timeLeft = 0;
            this.updateTimer();
        }

        // Update final statistics
        this.updateStats();

        // Save result
        this.saveResult();

        // Show result
        this.showResult();

        this.input.blur();
    }

    // Show test result
    showResult() {
        if (!this.result) {
            return;
        }

        const elapsed = this.getElapsedTime();
        const minutes = Math.max(elapsed / 60, 1 / 60);

        const wpm = Math.round(
            (this.correct / 5) / minutes
        );

        const rawWpm = Math.round(
            (this.typed / 5) / minutes
        );

        const accuracy = this.typed > 0
            ? Math.round(
                (this.correct / this.typed) * 100
            )
            : 100;

        if (this.resultWpm) {
            this.resultWpm.textContent =
                Math.max(wpm, 0);
        }

        if (this.resultAccuracy) {
            this.resultAccuracy.textContent =
                `${Math.min(100, accuracy)}%`;
        }

        if (this.resultErrors) {
            this.resultErrors.textContent =
                this.errors;
        }

        if (this.resultRawWpm) {
            this.resultRawWpm.textContent =
                Math.max(rawWpm, 0);
        }

        this.result.hidden = false;

        requestAnimationFrame(() => {
            this.result.classList.add("show");
        });

        setTimeout(() => {
            this.result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    }

    // Save test result to localStorage
    saveResult() {
    const elapsed = Math.max(1, Math.round(this.getElapsedTime()));
    const minutes = elapsed / 60;

    const wpm = Math.round((this.correct / 5) / minutes);
    const rawWpm = Math.round((this.typed / 5) / minutes);
    const accuracy = this.typed > 0
        ? Math.round((this.correct / this.typed) * 100)
        : 100;

    const result = {
        wpm: Math.max(wpm, 0),
        rawWpm: Math.max(rawWpm, 0),
        accuracy: Math.min(100, accuracy),
        errors: this.errors,
        characters: this.typed,
        correctCharacters: this.correct,
        duration: elapsed,
        mode: this.timeLimit,
        date: new Date().toISOString(),
        timestamp: Date.now()
    };

    try {
        const history = JSON.parse(
            localStorage.getItem("veltypeTests") || "[]"
        );

        const tests = Array.isArray(history) ? history : [];

        tests.unshift(result);

        localStorage.setItem(
            "veltypeTests",
            JSON.stringify(tests.slice(0, 50))
        );

        console.log("VelType test saved:", result);
        console.log(
            "VelType test history:",
            JSON.parse(localStorage.getItem("veltypeTests"))
        );

    } catch (error) {
        console.error("VelType could not save test:", error);
    }
        }

        // Add current test
        history.unshift({
            wpm: Math.max(wpm, 0),
            rawWpm: Math.max(rawWpm, 0),
            accuracy: Math.min(100, accuracy),
            errors: this.errors,
            characters: this.typed,
            correctCharacters: this.correct,
            duration: elapsed,
            mode: this.timeLimit,
            date: new Date().toISOString(),
            timestamp: Date.now()
        });

        // Keep latest 50 tests
        localStorage.setItem(
            "veltypeTests",
            JSON.stringify(history.slice(0, 50))
        );
    }

    // Reset current test
    reset() {
        clearInterval(this.timer);
        this.timer = null;

        this.timeLeft = this.timeLimit;
        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.typed = 0;
        this.correct = 0;
        this.errors = 0;

        this.input.value = "";

        this.updateTimer();

        if (this.wpmDisplay) {
            this.wpmDisplay.textContent = "0";
        }

        if (this.accuracyDisplay) {
            this.accuracyDisplay.textContent = "100%";
        }

        if (this.errorsDisplay) {
            this.errorsDisplay.textContent = "0";
        }

        // Reset passage character states
        const characters =
            this.passage.querySelectorAll("span");

        characters.forEach((character, index) => {
            character.classList.remove(
                "correct",
                "wrong",
                "current"
            );

            if (index === 0) {
                character.classList.add("current");
            }
        });
    }

    // Restart test
    restart() {
        clearInterval(this.timer);
        this.timer = null;

        if (this.result) {
            this.result.classList.remove("show");
            this.result.hidden = true;
        }

        this.generatePassage();
        this.reset();
        this.focusInput();
    }

    // Focus typing input
    focusInput() {
        if (this.finished || !this.input) {
            return;
        }

        this.input.focus({
            preventScroll: true
        });
    }
    }
