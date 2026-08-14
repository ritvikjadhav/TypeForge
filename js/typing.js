document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#typingTest")) {
        new TypingTest();
    }
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
        this.progressPercent = document.querySelector("#progressPercent");
        this.testMessage = document.querySelector("#testMessage");
        this.testModeLabel = document.querySelector("#testModeLabel");
        this.restartButton = document.querySelector("#restartTest");
        this.resultRestart = document.querySelector("#resultRestart");
        this.modeButtons = document.querySelectorAll("[data-time]");
        this.result = document.querySelector("#testResult");

        this.text =
            "Success in typing does not come from rushing. It comes from accuracy, rhythm, consistency, and regular practice. Focus on every letter and let your speed improve naturally.";

        this.timeLimit = 30;
        this.timeLeft = 30;
        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.timer = null;
        this.typed = 0;
        this.correct = 0;
        this.errors = 0;
        this.lastInputLength = 0;

        this.init();
    }

    init() {
        this.renderPassage();
        this.bindEvents();
        this.resetStats();
        this.updateTimer();
        this.updateModeLabel();
    }

    renderPassage() {
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

    bindEvents() {
        this.input.addEventListener("input", () => {
            this.handleInput();
        });

        this.input.addEventListener("keydown", event => {
            if (
                event.key === "Backspace" ||
                event.key === "Delete" ||
                event.key === "ArrowLeft" ||
                event.key === "ArrowRight" ||
                event.key === "ArrowUp" ||
                event.key === "ArrowDown"
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
    }

    handleInput() {
        if (this.finished) return;

        let typedText = this.input.value;

        if (typedText.length < this.lastInputLength) {
            this.input.value = this.input.value.slice(
                0,
                this.lastInputLength
            );

            typedText = this.input.value;
        }

        if (typedText.length > this.text.length) {
            typedText = typedText.slice(0, this.text.length);
            this.input.value = typedText;
        }

        this.lastInputLength = typedText.length;

        if (!this.started && typedText.length > 0) {
            this.start();
        }

        this.typed = typedText.length;
        this.correct = 0;
        this.errors = 0;

        const characters = this.passage.querySelectorAll("span");

        characters.forEach((character, index) => {
            character.classList.remove(
                "correct",
                "wrong",
                "current"
            );

            if (index < typedText.length) {
                if (typedText[index] === this.text[index]) {
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

        if (typedText.length === this.text.length) {
            this.finish();
        }
    }

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

        this.testMessage.textContent = "Keep your rhythm...";
    }

    updateTimer() {
        this.timerDisplay.textContent = `${this.timeLeft}s`;
    }

    updateModeLabel() {
        if (this.testModeLabel) {
            this.testModeLabel.textContent =
                `${this.timeLimit} SEC`;
        }
    }

    updateStats() {
        if (!this.started) {
            this.wpmDisplay.textContent = "0";
            this.accuracyDisplay.textContent = "100%";
            this.errorsDisplay.textContent = "0";
            return;
        }

        const elapsed = Math.max(
            (Date.now() - this.startTime) / 1000,
            1
        );

        const minutes = elapsed / 60;

        const wpm = Math.round(
            (this.correct / 5) / minutes
        );

        const accuracy = this.typed
            ? Math.round(
                (this.correct / this.typed) * 100
            )
            : 100;

        this.wpmDisplay.textContent = Math.max(wpm, 0);

        this.accuracyDisplay.textContent =
            `${Math.min(100, Math.max(0, accuracy))}%`;

        this.errorsDisplay.textContent = this.errors;
    }

    updateProgress() {
        const progress = this.text.length
            ? (this.typed / this.text.length) * 100
            : 0;

        const value = Math.min(progress, 100);

        this.progressBar.style.width = `${value}%`;

        if (this.progressPercent) {
            this.progressPercent.textContent =
                `${Math.round(value)}%`;
        }
    }

    finish() {
        if (this.finished) return;

        this.finished = true;
        this.started = false;

        clearInterval(this.timer);

        this.input.blur();

        this.showResult();

        this.testMessage.textContent =
            "Test complete — great work!";
    }

    showResult() {
        if (!this.result) return;

        const elapsed = this.startTime
            ? Math.max(
                (Date.now() - this.startTime) / 1000,
                1
            )
            : 1;

        const wpm = Math.round(
            (this.correct / 5) / (elapsed / 60)
        );

        const accuracy = this.typed
            ? Math.round(
                (this.correct / this.typed) * 100
            )
            : 100;

        const resultWpm = document.querySelector("#resultWpm");
        const resultAccuracy =
            document.querySelector("#resultAccuracy");
        const resultErrors =
            document.querySelector("#resultErrors");
        const resultRawWpm =
            document.querySelector("#resultRawWpm");

        if (resultWpm) {
            resultWpm.textContent = Math.max(wpm, 0);
        }

        if (resultAccuracy) {
            resultAccuracy.textContent = `${accuracy}%`;
        }

        if (resultErrors) {
            resultErrors.textContent = this.errors;
        }

        if (resultRawWpm) {
            resultRawWpm.textContent = Math.round(
                (this.typed / 5) / (elapsed / 60)
            );
        }

        this.result.hidden = false;

        requestAnimationFrame(() => {
            this.result.classList.add("show");
        });

        this.result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    resetStats() {
        this.timeLeft = this.timeLimit;
        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.typed = 0;
        this.correct = 0;
        this.errors = 0;
        this.lastInputLength = 0;

        clearInterval(this.timer);

        this.input.value = "";

        this.wpmDisplay.textContent = "0";
        this.accuracyDisplay.textContent = "100%";
        this.errorsDisplay.textContent = "0";

        this.updateProgress();
    }

    restart() {
        this.resetStats();
        this.renderPassage();
        this.updateTimer();
        this.updateModeLabel();

        if (this.result) {
            this.result.classList.remove("show");
            this.result.hidden = true;
        }

        if (this.testMessage) {
            this.testMessage.textContent =
                "Click the passage and start typing";
        }

        this.focusInput();
    }

    focusInput() {
        if (!this.finished) {
            this.input.focus();
        }
    }
                               }
