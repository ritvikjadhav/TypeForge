/* ========================================
   TYPEFORGE — TYPING ENGINE
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".typing-box")) return;

    new TypeForgeTypingTest();
});

class TypeForgeTypingTest {
    constructor() {
        this.textElement = document.querySelector(".typing-text");
        this.inputElement = document.querySelector(".typing-input");
        this.progressElement = document.querySelector(".typing-progress span");
        this.statusIndicator = document.querySelector(".status-indicator");
        this.statusText = document.querySelector(".typing-status span:last-child");

        this.wpmElement = document.querySelector("[data-stat='wpm']");
        this.accuracyElement = document.querySelector("[data-stat='accuracy']");
        this.timeElement = document.querySelector("[data-stat='time']");
        this.errorsElement = document.querySelector("[data-stat='errors']");

        this.resultPanel = document.querySelector(".result-panel");

        this.modeButtons = document.querySelectorAll(".mode-button");
        this.optionButtons = document.querySelectorAll(".option-button");

        this.restartButton = document.querySelector("[data-action='restart']");
        this.settingsButton = document.querySelector("[data-action='settings']");
        this.helpButton = document.querySelector("[data-action='help']");

        this.currentIndex = 0;
        this.errors = 0;
        this.correctCharacters = 0;
        this.totalTyped = 0;
        this.startTime = null;
        this.timer = null;
        this.remainingTime = 30;
        this.testDuration = 30;
        this.testMode = "time";
        this.wordLimit = 25;
        this.isRunning = false;
        this.isFinished = false;

        this.textPool = [
            "Great typing comes from accuracy before speed. Keep your hands relaxed and let every keystroke become natural.",
            "The best way to improve your typing speed is to practice consistently while maintaining control and accuracy.",
            "Technology moves quickly, but strong fundamentals remain important. Learn the keyboard and the speed will follow.",
            "A good typist does not rush every letter. Instead, they develop rhythm, accuracy, and confidence through repetition.",
            "Small improvements become impressive results when you practice every day and focus on correcting your weakest habits.",
            "Programming requires patience and precision. Clean typing helps you think clearly and turn ideas into working code.",
            "Your speed is not defined by one test. Track your progress over time and focus on becoming better than yesterday.",
            "Consistent practice creates muscle memory. The more accurately you type, the less attention you need to give each key."
        ];

        this.currentText = "";

        this.init();
    }

    /* ========================================
       INITIALIZATION
       ======================================== */

    init() {
        this.bindEvents();
        this.generateText();
        this.updateStats();
        this.updateTimeDisplay();
    }

    bindEvents() {
        if (this.inputElement) {
            this.inputElement.addEventListener(
                "input",
                event => this.handleInput(event)
            );

            this.inputElement.addEventListener(
                "keydown",
                event => this.handleKeyDown(event)
            );

            this.inputElement.addEventListener(
                "blur",
                () => {
                    if (this.isRunning && !this.isFinished) {
                        this.inputElement.focus();
                    }
                }
            );
        }

        this.textElement?.addEventListener("click", () => {
            this.focusInput();
        });

        this.modeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const mode = button.dataset.mode;

                this.modeButtons.forEach(item =>
                    item.classList.remove("active")
                );

                button.classList.add("active");

                this.setMode(mode);
            });
        });

        this.restartButton?.addEventListener("click", () => {
            this.restart();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                this.closeModals();
            }

            if (
                event.key === "Tab" &&
                document.activeElement !== this.inputElement
            ) {
                event.preventDefault();
                this.focusInput();
            }
        });

        this.initKeyboard();
        this.initSettings();
        this.initHelp();
    }

    /* ========================================
       TEST MODES
       ======================================== */

    setMode(mode) {
        this.testMode = mode;

        if (mode === "words") {
            this.wordLimit = 25;
            this.remainingTime = 0;
        } else {
            this.testDuration = Number(mode) || 30;
            this.remainingTime = this.testDuration;
        }

        this.restart();
    }

    /* ========================================
       TEXT GENERATION
       ======================================== */

    generateText() {
        if (!this.textElement) return;

        let text = "";

        if (this.testMode === "words") {
            const words = [];

            while (words.length < this.wordLimit) {
                const sentence =
                    this.textPool[
                        Math.floor(Math.random() * this.textPool.length)
                    ];

                words.push(...sentence.split(" "));
            }

            text = words.slice(0, this.wordLimit).join(" ");
        } else {
            const sentences = [];

            while (sentences.join(" ").length < 650) {
                sentences.push(
                    this.textPool[
                        Math.floor(Math.random() * this.textPool.length)
                    ]
                );
            }

            text = sentences.join(" ");
        }

        this.currentText = text;

        this.renderText();
    }

    renderText() {
        if (!this.textElement) return;

        this.textElement.innerHTML = "";

        [...this.currentText].forEach((character, index) => {
            const span = document.createElement("span");

            span.textContent = character;
            span.dataset.index = index;

            if (index === 0) {
                span.classList.add("current");
            }

            this.textElement.appendChild(span);
        });
    }

    /* ========================================
       INPUT HANDLING
       ======================================== */

    handleInput(event) {
        if (this.isFinished) return;

        const value = event.target.value;

        if (!this.isRunning && value.length > 0) {
            this.startTest();
        }

        if (value.length > this.currentText.length) {
            event.target.value = value.substring(
                0,
                this.currentText.length
            );
        }

        this.updateCharacters(value);
        this.updateStats();

        if (this.testMode === "words") {
            if (value.length >= this.currentText.length) {
                this.finishTest();
            }

            return;
        }

        if (this.currentIndex >= this.currentText.length) {
            this.finishTest();
        }
    }

    updateCharacters(value) {
        const characters = this.textElement.querySelectorAll("span");

        this.errors = 0;
        this.correctCharacters = 0;
        this.totalTyped = value.length;
        this.currentIndex = value.length;

        characters.forEach((character, index) => {
            character.classList.remove(
                "correct",
                "incorrect",
                "current"
            );

            if (index < value.length) {
                if (value[index] === this.currentText[index]) {
                    character.classList.add("correct");
                    this.correctCharacters++;
                } else {
                    character.classList.add("incorrect");
                    this.errors++;
                }
            }

            if (index === value.length) {
                character.classList.add("current");
            }
        });

        this.updateProgress();
        this.highlightCurrentKey();
    }

    /* ========================================
       START / TIMER
       ======================================== */

    startTest() {
        if (this.isRunning || this.isFinished) return;

        this.isRunning = true;
        this.startTime = Date.now();

        this.setStatus("Typing...", true);

        if (this.testMode !== "words") {
            this.timer = setInterval(() => {
                this.remainingTime--;

                this.updateTimeDisplay();
                this.updateStats();

                if (this.remainingTime <= 0) {
                    this.finishTest();
                }
            }, 1000);
        }
    }

    /* ========================================
       FINISH
       ======================================== */

    finishTest() {
        if (this.isFinished) return;

        this.isFinished = true;
        this.isRunning = false;

        clearInterval(this.timer);

        const result = this.calculateResults();

        this.saveResult(result);
        this.showResult(result);

        this.setStatus("Test complete", false);
        this.removeCurrentHighlight();
    }

    /* ========================================
       CALCULATIONS
       ======================================== */

    calculateResults() {
        const elapsedSeconds = this.getElapsedSeconds();
        const elapsedMinutes = Math.max(elapsedSeconds / 60, 1 / 60);

        const wpm = Math.round(
            (this.correctCharacters / 5) / elapsedMinutes
        );

        const accuracy =
            this.totalTyped > 0
                ? Math.round(
                      (this.correctCharacters / this.totalTyped) * 100
                  )
                : 100;

        const rawWpm = Math.round(
            (this.totalTyped / 5) / elapsedMinutes
        );

        return {
            wpm: Math.max(0, wpm),
            rawWpm: Math.max(0, rawWpm),
            accuracy: Math.max(0, Math.min(100, accuracy)),
            errors: this.errors,
            characters: this.totalTyped,
            correctCharacters: this.correctCharacters,
            duration: elapsedSeconds,
            mode: this.testMode,
            date: new Date().toISOString()
        };
    }

    getElapsedSeconds() {
        if (!this.startTime) return 0;

        return Math.max(
            1,
            Math.round((Date.now() - this.startTime) / 1000)
        );
    }

    /* ========================================
       LIVE STATS
       ======================================== */

    updateStats() {
        const elapsedSeconds = this.getElapsedSeconds();
        const minutes = Math.max(elapsedSeconds / 60, 1 / 60);

        const wpm = Math.round(
            (this.correctCharacters / 5) / minutes
        );

        const accuracy =
            this.totalTyped > 0
                ? Math.round(
                      (this.correctCharacters / this.totalTyped) * 100
                  )
                : 100;

        this.setText(this.wpmElement, Math.max(0, wpm));
        this.setText(
            this.accuracyElement,
            `${accuracy}%`
        );
        this.setText(
            this.errorsElement,
            this.errors
        );
    }

    updateTimeDisplay() {
        if (!this.timeElement) return;

        if (this.testMode === "words") {
            this.timeElement.textContent =
                this.getElapsedSeconds() + "s";
            return;
        }

        this.timeElement.textContent =
            `${this.remainingTime}s`;
    }

    updateProgress() {
        if (!this.progressElement) return;

        let progress = 0;

        if (this.testMode === "words") {
            progress =
                (this.currentIndex / this.currentText.length) * 100;
        } else {
            progress =
                (this.currentIndex / this.currentText.length) * 100;
        }

        this.progressElement.style.width =
            `${Math.min(100, progress)}%`;
    }

    /* ========================================
       KEYBOARD
       ======================================== */

    initKeyboard() {
        this.keyboardKeys = document.querySelectorAll(".key");

        if (!this.keyboardKeys.length) return;

        this.keyboardKeys.forEach(key => {
            key.addEventListener("mousedown", event => {
                event.preventDefault();
                this.focusInput();
            });
        });
    }

    handleKeyDown(event) {
        this.highlightKey(event.key);

        if (event.key === "Tab") {
            event.preventDefault();
        }
    }

    highlightKey(keyValue) {
        if (!this.keyboardKeys?.length) return;

        this.keyboardKeys.forEach(key => {
            key.classList.remove("active");

            const keyData = key.dataset.key;

            if (
                keyData &&
                keyData.toLowerCase() === keyValue.toLowerCase()
            ) {
                key.classList.add("active");

                setTimeout(() => {
                    key.classList.remove("active");
                }, 100);
            }
        });
    }

    highlightCurrentKey() {
        if (!this.keyboardKeys?.length) return;

        const nextCharacter =
            this.currentText[this.currentIndex];

        if (!nextCharacter) return;

        const keyValue =
            nextCharacter === " "
                ? " "
                : nextCharacter.toLowerCase();

        this.keyboardKeys.forEach(key => {
            key.classList.remove("active");

            if (
                key.dataset.key &&
                key.dataset.key.toLowerCase() === keyValue
            ) {
                key.classList.add("active");
            }
        });
    }

    removeCurrentHighlight() {
        this.keyboardKeys?.forEach(key =>
            key.classList.remove("active")
        );
    }

    /* ========================================
       RESTART
       ======================================== */

    restart() {
        clearInterval(this.timer);

        this.currentIndex = 0;
        this.errors = 0;
        this.correctCharacters = 0;
        this.totalTyped = 0;
        this.startTime = null;
        this.isRunning = false;
        this.isFinished = false;

        if (this.testMode !== "words") {
            this.remainingTime = this.testDuration;
        }

        if (this.inputElement) {
            this.inputElement.value = "";
        }

        this.hideResult();
        this.generateText();
        this.updateStats();
        this.updateTimeDisplay();
        this.updateProgress();
        this.setStatus("Ready to type", false);
        this.removeCurrentHighlight();

        setTimeout(() => this.focusInput(), 100);
    }

    focusInput() {
        if (!this.inputElement || this.isFinished) return;

        this.inputElement.focus();
    }

    /* ========================================
       STATUS
       ======================================== */

    setStatus(text, active = false) {
        if (this.statusText) {
            this.statusText.textContent = text;
        }

        if (this.statusIndicator) {
            this.statusIndicator.classList.toggle(
                "active",
                active
            );
        }
    }

    /* ========================================
       RESULT PANEL
       ======================================== */

    showResult(result) {
        if (!this.resultPanel) return;

        this.setResultValue(
            "[data-result='wpm']",
            result.wpm
        );

        this.setResultValue(
            "[data-result='accuracy']",
            `${result.accuracy}%`
        );

        this.setResultValue(
            "[data-result='errors']",
            result.errors
        );

        this.setResultValue(
            "[data-result='raw']",
            result.rawWpm
        );

        this.resultPanel.hidden = false;

        this.resultPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    hideResult() {
        if (this.resultPanel) {
            this.resultPanel.hidden = true;
        }
    }

    setResultValue(selector, value) {
        const element =
            this.resultPanel?.querySelector(selector);

        if (element) {
            element.textContent = value;
        }
    }

    /* ========================================
       LOCAL STORAGE
       ======================================== */

    saveResult(result) {
        const history = this.getHistory();

        history.unshift(result);

        const trimmedHistory = history.slice(0, 50);

        localStorage.setItem(
            "typeforge-history",
            JSON.stringify(trimmedHistory)
        );

        const best = Number(
            localStorage.getItem("typeforge-best-wpm") || 0
        );

        if (result.wpm > best) {
            localStorage.setItem(
                "typeforge-best-wpm",
                result.wpm
            );
        }

        this.updateDashboardStats(result);
    }

    getHistory() {
        try {
            return JSON.parse(
                localStorage.getItem("typeforge-history")
            ) || [];
        } catch {
            return [];
        }
    }

    updateDashboardStats(result) {
        const stats = this.getDashboardStats();

        stats.tests++;
        stats.totalCharacters += result.characters;
        stats.totalCorrect += result.correctCharacters;

        if (result.wpm > stats.bestWpm) {
            stats.bestWpm = result.wpm;
        }

        stats.averageWpm =
            stats.averageWpm === 0
                ? result.wpm
                : Math.round(
                      (stats.averageWpm * (stats.tests - 1) +
                          result.wpm) /
                          stats.tests
                  );

        localStorage.setItem(
            "typeforge-stats",
            JSON.stringify(stats)
        );
    }

    getDashboardStats() {
        try {
            return JSON.parse(
                localStorage.getItem("typeforge-stats")
            ) || {
                tests: 0,
                totalCharacters: 0,
                totalCorrect: 0,
                bestWpm: 0,
                averageWpm: 0
            };
        } catch {
            return {
                tests: 0,
                totalCharacters: 0,
                totalCorrect: 0,
                bestWpm: 0,
                averageWpm: 0
            };
        }
    }

    /* ========================================
       SETTINGS
       ======================================== */

    initSettings() {
        if (!this.settingsButton) return;

        this.settingsButton.addEventListener("click", () => {
            const modal = document.querySelector("#settingsModal");

            if (modal) {
                modal.hidden = false;
            }
        });
    }

    /* ========================================
       HELP
       ======================================== */

    initHelp() {
        if (!this.helpButton) return;

        this.helpButton.addEventListener("click", () => {
            const modal = document.querySelector("#helpModal");

            if (modal) {
                modal.hidden = false;
            }
        });
    }

    closeModals() {
    
