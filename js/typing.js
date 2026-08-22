/* VELTYPE — TYPING TEST */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#typingTest")) {
        new TypingTest();
    }
});

class TypingTest {

    constructor() {
        /* Elements */
        this.passage = document.querySelector("#passage");
        this.input = document.querySelector("#typingInput");

        this.timerDisplay = document.querySelector("#timer");
        this.wpmDisplay = document.querySelector("#wpm");
        this.accuracyDisplay = document.querySelector("#accuracy");
        this.errorsDisplay = document.querySelector("#errors");

        this.testModeLabel = document.querySelector("#testModeLabel");

        this.restartButton = document.querySelector("#restartTest");
        this.resultRestart = document.querySelector("#resultRestart");
        this.modeButtons = document.querySelectorAll(".mode-button");

        /* Result section */
        this.result = document.querySelector("#testResult");
        this.resultWpm = document.querySelector("#resultWpm");
        this.resultAccuracy = document.querySelector("#resultAccuracy");
        this.resultErrors = document.querySelector("#resultErrors");
        this.resultRawWpm = document.querySelector("#resultRawWpm");

        /* Passages */
        this.passages = [
            "Success in typing does not come from rushing. It comes from accuracy, rhythm, consistency, and regular practice. Focus on every letter and let your speed improve naturally.",

            "Technology changes every day, but the ability to communicate clearly remains important. Good typing skills help you work faster, write better, and stay focused on your ideas.",

            "The fastest typists are not always the people who press the keys hardest. They understand rhythm and accuracy, allowing their fingers to move naturally across the keyboard.",

            "Learning to type properly is a small investment that can save hundreds of hours over time. Practice regularly, keep your hands relaxed, and concentrate on accuracy before speed.",

            "Every great skill begins with repetition. Your typing speed will improve when you practice consistently and learn from your mistakes instead of trying to become fast immediately."
        ];

        /* Test state */
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


    /* ================================
       INITIALIZATION
    ================================= */

    init() {
        this.bindEvents();
        this.restart();
    }


    /* ================================
       PASSAGE
    ================================= */

    generatePassage() {
        const randomIndex = Math.floor(
            Math.random() * this.passages.length
        );

        this.text = this.passages[randomIndex];

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


    /* ================================
       EVENTS
    ================================= */

    bindEvents() {

        /* Typing */
        this.input.addEventListener("input", () => {
            this.handleInput();
        });


        /* Keyboard restrictions */
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


        /* Passage click */
        this.passage.addEventListener("click", () => {
            this.focusInput();
        });


        /* Typing surface click */
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


        /* Restart */
        this.restartButton?.addEventListener("click", () => {
            this.restart();
        });


        /* Result restart */
        this.resultRestart?.addEventListener("click", () => {
            this.restart();
        });


        /* Time buttons */
        this.modeButtons.forEach(button => {

            button.addEventListener("click", () => {

                this.modeButtons.forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                this.timeLimit = Number(
                    button.dataset.time
                );

                this.restart();
            });

        });
    }


    /* ================================
       INPUT
    ================================= */

    handleInput() {

        if (this.finished) {
            return;
        }

        let value = this.input.value;


        /* Don't allow typing beyond passage */
        if (value.length > this.text.length) {

            value = value.slice(
                0,
                this.text.length
            );

            this.input.value = value;
        }


        /* Start timer on first character */
        if (!this.started && value.length > 0) {
            this.start();
        }


        this.typed = value.length;

        this.correct = 0;
        this.errors = 0;


        /* Update passage characters */
        const characters =
            this.passage.querySelectorAll("span");


        characters.forEach((character, index) => {

            character.classList.remove(
                "correct",
                "wrong",
                "current"
            );


            if (index < value.length) {

                if (
                    value[index] ===
                    this.text[index]
                ) {
                    character.classList.add(
                        "correct"
                    );

                    this.correct++;

                } else {

                    character.classList.add(
                        "wrong"
                    );

                    this.errors++;
                }
            }


            /* Current character */
            if (index === value.length) {
                character.classList.add("current");
            }

        });


        this.updateStats();


        /* Passage completed */
        if (value.length === this.text.length) {
            this.finish();
        }
    }


    /* ================================
       TIMER
    ================================= */

    start() {

        if (
            this.started ||
            this.finished
        ) {
            return;
        }


        this.started = true;

        this.startTime = Date.now();


        /* Clear any old timer */
        clearInterval(this.timer);


        /*
         * Update immediately and then
         * check elapsed time every 100ms.
         */
        this.timer = setInterval(() => {

            const elapsed =
                (Date.now() - this.startTime) / 1000;


            this.timeLeft = Math.max(
                this.timeLimit -
                Math.floor(elapsed),
                0
            );


            this.updateTimer();
            this.updateStats();


            if (elapsed >= this.timeLimit) {
                this.finish();
            }

        }, 100);


        this.updateTimer();
    }


    updateTimer() {

        if (this.timerDisplay) {

            this.timerDisplay.textContent =
                this.timeLeft;
        }


        if (this.testModeLabel) {

            this.testModeLabel.textContent =
                `${this.timeLimit} SEC`;
        }
    }


    /* ================================
       STATISTICS
    ================================= */

    updateStats() {

        if (
            !this.started &&
            !this.finished
        ) {

            this.wpmDisplay.textContent = "0";
            this.accuracyDisplay.textContent = "100%";
            this.errorsDisplay.textContent = "0";

            return;
        }


        const elapsed =
            this.getElapsedTime();


        const minutes =
            Math.max(
                elapsed / 60,
                1 / 60
            );


        const wpm = Math.round(
            (this.correct / 5) /
            minutes
        );


        const accuracy =
            this.typed > 0
                ? Math.round(
                    (this.correct /
                        this.typed) * 100
                )
                : 100;


        this.wpmDisplay.textContent =
            Math.max(wpm, 0);


        this.accuracyDisplay.textContent =
            `${Math.min(100, accuracy)}%`;


        this.errorsDisplay.textContent =
            this.errors;
    }


    /* ================================
       ELAPSED TIME
    ================================= */

    getElapsedTime() {

        if (!this.startTime) {
            return 0;
        }


        const elapsed =
            (Date.now() - this.startTime) /
            1000;


        return Math.max(
            elapsed,
            0.1
        );
    }


    /* ================================
       FINISH
    ================================= */

    finish() {

        if (this.finished) {
            return;
        }


        this.finished = true;


        clearInterval(this.timer);

        this.timer = null;


        /* Show 0 when time expires */
        if (
            this.timeLeft <= 0 &&
            this.getElapsedTime() >= this.timeLimit
        ) {
            this.timeLeft = 0;
            this.updateTimer();
        }


        this.updateStats();

        this.saveResult();

        this.showResult();


        this.input.blur();
    }


    /* ================================
       RESULT
    ================================= */

    showResult() {

        if (!this.result) {
            return;
        }


        const elapsed =
            this.getElapsedTime();


        const minutes =
            Math.max(
                elapsed / 60,
                1 / 60
            );


        const wpm = Math.round(
            (this.correct / 5) /
            minutes
        );


        const rawWpm = Math.round(
            (this.typed / 5) /
            minutes
        );


        const accuracy =
            this.typed > 0
                ? Math.round(
                    (this.correct /
                        this.typed) * 100
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


    /* ================================
       SAVE RESULT
    ================================= */

    saveResult() {

        const elapsed =
            Math.round(
                this.getElapsedTime()
            );


        const minutes =
            Math.max(
                elapsed / 60,
                1 / 60
            );


        const wpm = Math.round(
            (this.correct / 5) /
            minutes
        );


        const rawWpm = Math.round(
            (this.typed / 5) /
            minutes
        );


        const accuracy =
            this.typed > 0
                ? Math.round(
                    (this.correct /
                        this.typed) * 100
                )
                : 100;


        let history = [];


        try {

            const stored =
                localStorage.getItem(
                    "veltypeTests"
                );


            history =
                stored
                    ? JSON.parse(stored)
                    : [];


            if (!Array.isArray(history)) {
                history = [];
            }

        } catch {

            history = [];
        }


        history.unshift({

            wpm: Math.max(wpm, 0),

            rawWpm:
                Math.max(rawWpm, 0),

            accuracy:
                Math.min(100, accuracy),

            errors: this.errors,

            characters: this.typed,

            correctCharacters:
                this.correct,

            duration: elapsed,

            mode: this.timeLimit,

            date:
                new Date().toISOString(),

            timestamp:
                Date.now()
        });


        localStorage.setItem(
            "veltypeTests",
            JSON.stringify(
                history.slice(0, 50)
            )
        );
    }


    /* ================================
       RESET
    ================================= */

    reset() {

        clearInterval(this.timer);

        this.timer = null;


        this.timeLeft =
            this.timeLimit;


        this.started = false;
        this.finished = false;

        this.startTime = null;

        this.typed = 0;
        this.correct = 0;
        this.errors = 0;


        this.input.value = "";


        this.updateTimer();


        this.wpmDisplay.textContent =
            "0";

        this.accuracyDisplay.textContent =
            "100%";

        this.errorsDisplay.textContent =
            "0";


        /* Reset passage colours */
        const characters =
            this.passage.querySelectorAll("span");


        characters.forEach(
            (character, index) => {

                character.classList.remove(
                    "correct",
                    "wrong",
                    "current"
                );


                if (index === 0) {
                    character.classList.add(
                        "current"
                    );
                }
            }
        );
    }


    /* ================================
       RESTART
    ================================= */

    restart() {

        clearInterval(this.timer);

        this.timer = null;


        if (this.result) {

            this.result.classList.remove(
                "show"
            );

            this.result.hidden = true;
        }


        this.generatePassage();

        this.reset();


        /* Put cursor back into typing area */
        this.focusInput();
    }


    /* ================================
       FOCUS INPUT
    ================================= */

    focusInput() {

        if (
            this.finished ||
            !this.input
        ) {
            return;
        }


        this.input.focus({
            preventScroll: true
        });
    }
   }
