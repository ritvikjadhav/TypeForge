// VelType V1 — typing test engine

document.addEventListener("DOMContentLoaded", () => {
    const test = document.querySelector("#typingTest");
    if (test) new TypingTest();
});

class TypingTest {
    constructor() {
        this.passage = document.querySelector("#passage");
        this.input = document.querySelector("#typingInput");
        this.timer = document.querySelector("#timer");
        this.wpm = document.querySelector("#wpm");
        this.accuracy = document.querySelector("#accuracy");
        this.errors = document.querySelector("#errors");
        this.progressBar = document.querySelector("#progressBar");
        this.progressPercent = document.querySelector("#progressPercent");
        this.message = document.querySelector("#testMessage");
        this.modeLabel = document.querySelector("#testModeLabel");

        this.result = document.querySelector("#testResult");
        this.resultWpm = document.querySelector("#resultWpm");
        this.resultAccuracy = document.querySelector("#resultAccuracy");
        this.resultErrors = document.querySelector("#resultErrors");
        this.resultRawWpm = document.querySelector("#resultRawWpm");

        this.restartButton = document.querySelector("#restartTest");
        this.resultRestart = document.querySelector("#resultRestart");
        this.modeButtons = document.querySelectorAll(".mode-button");

        this.passages = [
            "Success in typing comes from accuracy, rhythm, consistency, and regular practice. Focus on every letter and allow your speed to improve naturally.",
            "Technology changes every day, but clear communication remains important. Good typing skills help you work faster, write better, and stay focused on your ideas.",
            "Fast typing is not about pressing the keys harder. It is about rhythm, accuracy, and allowing your fingers to move naturally across the keyboard.",
            "Learning to type properly is a small investment that can save hundreds of hours over time. Practice regularly, stay relaxed, and focus on accuracy before speed.",
            "Every great skill begins with repetition. Your typing speed improves when you practice consistently and learn from mistakes instead of chasing speed."
        ];

        this.timeLimit = 30;
        this.timeLeft = 30;
        this.text = "";
        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.timerId = null;
        this.typed = 0;
        this.correct = 0;
        this.errorsCount = 0;

        this.init();
    }

    // Initialize the typing test.
    init() {
        this.createPassage();
        this.bindEvents();
        this.updateDisplay();
        this.updateProgress();
        this.focusInput();
    }

    // Create a fresh random passage.
    createPassage() {
        this.text =
            this.passages[
                Math.floor(Math.random() * this.passages.length)
            ];

        this.passage.textContent = "";

        [...this.text].forEach((character, index) => {
            const span = document.createElement("span");

            span.textContent = character;
            span.dataset.index = index;

            if (index === 0) {
                span.classList.add("current");
            }

            this.passage.appendChild(span);
        });

        this.updateModeLabel();
    }

    // Connect all test controls.
    bindEvents() {
        this.input.addEventListener("input", () => {
            this.handleInput();
        });

        this.input.addEventListener("keydown", event => {
            if (
                event.key === "Backspace" ||
                event.key === "Delete"
            ) {
                event.preventDefault();
            }

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

        this.resultRestart?.addEventListener("click", () => {
            this.restart();
        });

        this.modeButtons.forEach(button => {
            button.addEventListener("click", () => {
                this.modeButtons.forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");
                this.timeLimit = Number(button.dataset.time);

                this.restart();
            });
        });

        document.addEventListener("keydown", event => {
            if (
                event.key.length === 1 ||
                event.key === " "
            ) {
                this.focusInput();
            }
        });
    }

    // Process every typed character.
    handleInput() {
        if (this.finished) return;

        const value = this.input.value;

        if (!this.started && value.length) {
            this.start();
        }

        this.typed = value.length;
        this.correct = 0;
        this.errorsCount = 0;

        const characters = this.passage.querySelectorAll("span");

        characters.forEach((character, index) => {
            character.classList.remove("correct", "wrong", "current");

            if (index < this.typed) {
                if (value[index] === this.text[index]) {
                    character.classList.add("correct");
                    this.correct++;
                } else {
                    character.classList.add("wrong");
                    this.errorsCount++;
                }
            }

            if (index === this.typed && !this.finished) {
                character.classList.add("current");
            }
        });

        this.updateDisplay();
        this.updateProgress();

        if (this.typed >= this.text.length) {
            this.finish();
        }
    }

    // Start the countdown.
    start() {
        if (this.started) return;

        this.started = true;
        this.startTime = Date.now();

        this.message.textContent = "Keep your rhythm. Accuracy comes first.";

        this.timerId = setInterval(() => {
            this.timeLeft--;

            this.updateDisplay();

            if (this.timeLeft <= 0) {
                this.finish();
            }
        }, 1000);
    }

    // Update live test statistics.
    updateDisplay() {
        this.timer.textContent = `${this.timeLeft}s`;

        if (!this.started || !this.startTime) {
            this.wpm.textContent = "0";
            this.accuracy.textContent = "100%";
            this.errors.textContent = "0";
            return;
        }

        const elapsed = Math.max(
            (Date.now() - this.startTime) / 1000,
            1
        );

        const minutes = elapsed / 60;
        const wpm = Math.round((this.correct / 5) / minutes);

        const accuracy = this.typed
            ? Math.round((this.correct / this.typed) * 100)
            : 100;

        this.wpm.textContent = Math.max(wpm, 0);
        this.accuracy.textContent = `${Math.min(accuracy, 100)}%`;
        this.errors.textContent = this.errorsCount;
    }

    // Update passage completion progress.
    updateProgress() {
        const progress = this.text.length
            ? (this.typed / this.text.length) * 100
            : 0;

        const value = Math.min(progress, 100);

        this.progressBar.style.width = `${value}%`;
        this.progressPercent.textContent = `${Math.round(value)}%`;
    }

    // Update the selected test duration label.
    updateModeLabel() {
        if (this.modeLabel) {
            this.modeLabel.textContent = `${this.timeLimit} SEC`;
        }
    }

    // Finish the current test.
    finish() {
        if (this.finished) return;

        this.finished = true;
        this.started = false;

        clearInterval(this.timerId);

        this.input.blur();

        this.showResult();
        this.saveResult();
    }

    // Calculate and display the final result.
    showResult() {
        const elapsed = this.getElapsedTime();
        const minutes = Math.max(elapsed / 60, 1 / 60);

        const finalWpm = Math.round(
            (this.correct / 5) / minutes
        );

        const rawWpm = Math.round(
            (this.typed / 5) / minutes
        );

        const finalAccuracy = this.typed
            ? Math.round((this.correct / this.typed) * 100)
            : 100;

        this.resultWpm.textContent = Math.max(finalWpm, 0);
        this.resultAccuracy.textContent = `${finalAccuracy}%`;
        this.resultErrors.textContent = this.errorsCount;
        this.resultRawWpm.textContent = Math.max(rawWpm, 0);

        this.result.hidden = false;

        this.message.textContent = "Test complete — great work!";

        this.result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // Save the completed test for the dashboard.
    saveResult() {
        const history = JSON.parse(
            localStorage.getItem("veltype-history") || "[]"
        );

        const elapsed = this.getElapsedTime();
        const minutes = Math.max(elapsed / 60, 1 / 60);

        const wpm = Math.round(
            (this.correct / 5) / minutes
        );

        const rawWpm = Math.round(
            (this.typed / 5) / minutes
        );

        const accuracy = this.typed
            ? Math.round((this.correct / this.typed) * 100)
            : 100;

        history.unshift({
            wpm: Math.max(wpm, 0),
            rawWpm: Math.max(rawWpm, 0),
            accuracy,
            errors: this.errorsCount,
            characters: this.typed,
            correctCharacters: this.correct,
            duration: elapsed,
            testDuration: this.timeLimit,
            date: new Date().toISOString()
        });

        localStorage.setItem(
            "veltype-history",
            JSON.stringify(history.slice(0, 50))
        );
    }

    // Return elapsed test time.
    getElapsedTime() {
        if (!this.startTime) return 0;

        return Math.max(
            Math.round((Date.now() - this.startTime) / 1000),
            1
        );
    }

    // Reset the test without reloading the page.
    restart() {
        clearInterval(this.timerId);

        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.timerId = null;

        this.timeLeft = this.timeLimit;
        this.typed = 0;
        this.correct = 0;
        this.errorsCount = 0;

        this.input.value = "";
        this.result.hidden = true;

        this.createPassage();
        this.updateDisplay();
        this.updateProgress();

        this.message.textContent =
            "Click the passage and start typing";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        this.focusInput();
    }

    // Keep the hidden input ready for typing.
    focusInput() {
        if (!this.finished) {
            this.input.focus();
        }
    }
           }
