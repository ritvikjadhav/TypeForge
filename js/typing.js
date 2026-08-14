document.addEventListener("DOMContentLoaded", () => {
    const test = document.querySelector("#typingTest");
    if (test) new TypingTest();
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
        this.resultWpm = document.querySelector("#resultWpm");
        this.resultAccuracy = document.querySelector("#resultAccuracy");
        this.resultErrors = document.querySelector("#resultErrors");
        this.resultRawWpm = document.querySelector("#resultRawWpm");

        this.passages = [
            "Success in typing does not come from rushing. It comes from accuracy, rhythm, consistency, and regular practice. Focus on every letter and let your speed improve naturally.",
            "Technology changes every day, but the ability to communicate clearly remains important. Good typing skills help you work faster, write better, and stay focused on your ideas.",
            "The fastest typists are not always the people who press the keys hardest. They understand rhythm and accuracy, allowing their fingers to move naturally across the keyboard.",
            "Learning to type properly is a small investment that can save hundreds of hours over time. Practice regularly, keep your hands relaxed, and concentrate on accuracy before speed.",
            "Every great skill begins with repetition. Your typing speed will improve when you practice consistently and learn from your mistakes instead of trying to become fast immediately."
        ];

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

        this.init();
    }

    init() {
        this.generatePassage();
        this.bindEvents();
        this.reset();
        this.focusInput();
    }

    generatePassage() {
        this.text = this.passages[
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

    bindEvents() {
        this.input.addEventListener("input", () => this.handleInput());

        this.input.addEventListener("keydown", event => {
            if (
                event.key === "Tab" ||
                event.key === "ArrowLeft" ||
                event.key === "ArrowRight" ||
                event.key === "ArrowUp" ||
                event.key === "ArrowDown"
            ) {
                event.preventDefault();
            }
        });

        this.passage.addEventListener("click", () => this.focusInput());

        this.restartButton?.addEventListener("click", () => this.restart());

        this.resultRestart?.addEventListener("click", () => this.restart());

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
                event.key === "Backspace" ||
                event.key === " "
            ) {
                this.focusInput();
            }
        });
    }

    handleInput() {
        if (this.finished) return;

        let value = this.input.value;

        if (value.length > this.text.length) {
            value = value.slice(0, this.text.length);
            this.input.value = value;
        }

        if (!this.started && value.length > 0) {
            this.start();
        }

        this.typed = value.length;
        this.correct = 0;
        this.errors = 0;

        const characters = this.passage.querySelectorAll("span");

        characters.forEach((character, index) => {
            character.classList.remove("correct", "wrong", "current");

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

        this.updateStats();
        this.updateProgress();

        if (value.length === this.text.length) {
            this.finish();
        }
    }

    start() {
        if (this.started || this.finished) return;

        this.started = true;
        this.startTime = Date.now();

        this.testMessage.textContent = "Keep your rhythm...";

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            this.updateStats();

            if (this.timeLeft <= 0) {
                this.finish();
            }
        }, 1000);
    }

    finish() {
        if (this.finished) return;

        this.finished = true;
        clearInterval(this.timer);

        this.updateStats();
        this.saveResult();
        this.showResult();

        this.testMessage.textContent = "Test complete — great work!";
        this.input.blur();
    }

    updateTimer() {
        if (this.timerDisplay) {
            this.timerDisplay.textContent = `${this.timeLeft}s`;
        }

        if (this.testModeLabel) {
            this.testModeLabel.textContent = `${this.timeLimit} SEC`;
        }
    }

    updateStats() {
        if (!this.started && !this.finished) {
            this.wpmDisplay.textContent = "0";
            this.accuracyDisplay.textContent = "100%";
            this.errorsDisplay.textContent = "0";
            return;
        }

        const elapsed = this.getElapsedTime();
        const minutes = Math.max(elapsed / 60, 1 / 60);
        const wpm = Math.round((this.correct / 5) / minutes);
        const accuracy = this.typed
            ? Math.round((this.correct / this.typed) * 100)
            : 100;

        this.wpmDisplay.textContent = Math.max(wpm, 0);
        this.accuracyDisplay.textContent = `${Math.min(100, accuracy)}%`;
        this.errorsDisplay.textContent = this.errors;
    }

    updateProgress() {
        const progress = this.text.length
            ? (this.typed / this.text.length) * 100
            : 0;

        const value = Math.min(progress, 100);

        if (this.progressBar) {
            this.progressBar.style.width = `${value}%`;
        }

        if (this.progressPercent) {
            this.progressPercent.textContent = `${Math.round(value)}%`;
        }
    }

    getElapsedTime() {
        if (!this.startTime) return 0;

        return Math.max(
            (Date.now() - this.startTime) / 1000,
            0.1
        );
    }

    showResult() {
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

        if (this.resultWpm) {
            this.resultWpm.textContent = Math.max(wpm, 0);
        }

        if (this.resultAccuracy) {
            this.resultAccuracy.textContent = `${accuracy}%`;
        }

        if (this.resultErrors) {
            this.resultErrors.textContent = this.errors;
        }

        if (this.resultRawWpm) {
            this.resultRawWpm.textContent = Math.max(rawWpm, 0);
        }

        if (!this.result) return;

        this.result.hidden = false;

        requestAnimationFrame(() => {
            this.result.classList.add("show");
        });

        this.result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    saveResult() {
        const elapsed = Math.round(this.getElapsedTime());
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

        const history = JSON.parse(
            localStorage.getItem("veltype-history") || "[]"
        );

        history.unshift({
            wpm: Math.max(wpm, 0),
            rawWpm: Math.max(rawWpm, 0),
            accuracy,
            errors: this.errors,
            characters: this.typed,
            correctCharacters: this.correct,
            duration: elapsed,
            mode: this.timeLimit,
            date: new Date().toISOString()
        });

        localStorage.setItem(
            "veltype-history",
            JSON.stringify(history.slice(0, 50))
        );
    }

    reset() {
        clearInterval(this.timer);

        this.timeLeft = this.timeLimit;
        this.started = false;
        this.finished = false;
        this.startTime = null;
        this.typed = 0;
        this.correct = 0;
        this.errors = 0;

        this.input.value = "";

        this.updateTimer();
        this.updateProgress();

        this.wpmDisplay.textContent = "0";
        this.accuracyDisplay.textContent = "100%";
        this.errorsDisplay.textContent = "0";

        if (this.testMessage) {
            this.testMessage.textContent =
                "Click the passage and start typing";
        }
    }

    restart() {
        if (this.result) {
            this.result.classList.remove("show");
            this.result.hidden = true;
        }

        this.generatePassage();
        this.reset();
        this.focusInput();
    }

    focusInput() {
        if (!this.finished && this.input) {
            this.input.focus();
        }
    }
    }
