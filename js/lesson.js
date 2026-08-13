(() => {
    "use strict";

    const lessons = [
        {
            id:1,
            level:"Foundation",
            difficulty:"Beginner",
            title:"Keyboard Basics",
            description:"Understand the keyboard, key groups and the role of the most important keys.",
            duration:8,
            theory:[
                ["Start simple","You don't need to memorize the whole keyboard at once. Learn where the important key groups live.","Build familiarity before speed."],
                ["Main area","Letters are arranged in three rows. Your fingers should return to the home row after reaching other keys.","F and J help you find the correct position."],
                ["Important keys","Space, Shift, Enter, Backspace, Tab and Escape are used constantly in real computer work.","Learn their position and purpose."]
            ],
            guideTitle:"Get familiar with the keyboard.",
            guideText:"Before practicing speed, understand what each major key does.",
            guideList:["Letter keys are used for words.","Space separates words.","Shift creates capital letters and upper symbols.","Enter confirms or creates a new line.","Backspace normally removes text, but VelType lessons disable it during drills."],
            exercises:[
                "asdf jkl;",
                "a s d f j k l ;",
                "asdf asdf jkl; jkl;",
                "fj fj dk dk sl sl a; d; f;"
            ]
        },
        {
            id:2,
            level:"Foundation",
            difficulty:"Beginner",
            title:"Correct Sitting Position",
            description:"Set up your hands, wrists, posture and screen position for comfortable typing.",
            duration:7,
            theory:[
                ["Sit back","Keep your back supported and shoulders relaxed instead of leaning toward the keyboard.","Comfort matters more than speed."],
                ["Wrists","Keep wrists neutral and avoid pressing them heavily into the desk.","Let your fingers move instead."],
                ["Screen","Keep the screen at a comfortable viewing height and distance.","Your neck should remain relaxed."]
            ],
            guideTitle:"Build a comfortable typing position.",
            guideText:"Good technique starts before your fingers touch a key.",
            guideList:["Keep shoulders relaxed.","Keep elbows comfortably near your body.","Keep wrists straight.","Keep both feet stable.","Look at the screen instead of constantly looking down."],
            exercises:[
                "asdf jkl;",
                "fj dk sl a;",
                "sad lad fall ask",
                "all dads ask a lad"
            ]
        },
        {
            id:3,
            level:"Foundation",
            difficulty:"Beginner",
            title:"Finger Placement",
            description:"Learn which finger controls each part of the keyboard and why position matters.",
            duration:10,
            theory:[
                ["Left hand","The left little, ring, middle and index fingers begin around A, S, D and F.","Each finger has a movement zone."],
                ["Right hand","The right index, middle, ring and little fingers begin around J, K, L and ;.","Return to these keys after reaching."],
                ["Home position","F and J normally have tactile bumps that help you locate the home row without looking.","Use them as navigation anchors."]
            ],
            guideTitle:"Place your hands correctly.",
            guideText:"Your fingers should rest lightly on the home row.",
            guideList:["Left hand: A S D F.","Right hand: J K L ;.","Thumbs rest naturally around Space.","Do not stretch your wrists toward the keyboard.","Return fingers to home position after movement."],
            exercises:[
                "asdf jkl;",
                "fj fj dk dk sl sl",
                "asdf fdsa jkl; ;lkj",
                "sad ask lad fall dad"
            ]
        },
        {
            id:4,
            level:"Foundation",
            difficulty:"Beginner",
            title:"Home Row Basics",
            description:"Master the home row and use F and J as your navigation anchors.",
            duration:10,
            theory:[
                ["Home row","The home row is the base position for touch typing.","Start and return here."],
                ["Index fingers","Your index fingers have the widest movement responsibility.","F and J keep both hands aligned."],
                ["Control first","Accuracy is more important than speed at this stage.","Slow correct repetitions create muscle memory."]
            ],
            guideTitle:"Build your home-row foundation.",
            guideText:"Keep your fingers close to their starting positions.",
            guideList:["Left: A S D F.","Right: J K L ;.","Use thumbs for Space.","Keep movement small and controlled."],
            exercises:[
                "asdf jkl;",
                "fff jjj ddd kkk sss lll aaa ;;;",
                "asdf fdsa jkl; ;lkj",
                "a sad lad asks a dad"
            ]
        },
        {
            id:5,
            level:"Core Typing",
            difficulty:"Beginner",
            title:"Left Hand Practice",
            description:"Build muscle memory across the left side of the keyboard.",
            duration:10,
            exercises:[
                "asdf",
                "asdf asdf fdsa",
                "sad dad fad",
                "a dad had a salad"
            ]
        },
        {
            id:6,
            level:"Core Typing",
            difficulty:"Beginner",
            title:"Right Hand Practice",
            description:"Strengthen right-hand movement while maintaining correct finger placement.",
            duration:10,
            exercises:[
                "jkl;",
                "jkl; jkl; ;lkj",
                "jill kills",
                "jill had a skill"
            ]
        },
        {
            id:7,
            level:"Core Typing",
            difficulty:"Beginner",
            title:"Top Row",
            description:"Reach the top row naturally without losing your home-row position.",
            duration:12,
            exercises:[
                "qwer uiop",
                "qwer qwer uiop uiop",
                "we were quiet",
                "write your word"
            ]
        },
        {
            id:8,
            level:"Core Typing",
            difficulty:"Beginner",
            title:"Bottom Row",
            description:"Learn the bottom row and improve accuracy across the full alphabet.",
            duration:12,
            exercises:[
                "zxcv nm",
                "zxcv zxcv nm nm",
                "mix max fix",
                "zoom and move"
            ]
        },
        {
            id:9,
            level:"Accuracy",
            difficulty:"Intermediate",
            title:"Numbers & Symbols",
            description:"Learn efficient movement for numbers, punctuation and common symbols.",
            duration:12,
            exercises:[
                "1234 5678 90",
                "12 34 56 78 90",
                "2026 100 50 25",
                "price $25.50"
            ]
        },
        {
            id:10,
            level:"Accuracy",
            difficulty:"Intermediate",
            title:"Capital Letters",
            description:"Use Shift correctly and build clean capitalization habits.",
            duration:8,
            exercises:[
                "A S D F J K L",
                "This Is A Test",
                "VelType Helps You Type",
                "Practice Makes Progress"
            ]
        },
        {
            id:11,
            level:"Accuracy",
            difficulty:"Intermediate",
            title:"Punctuation",
            description:"Practice commas, periods, quotes, brackets and everyday punctuation.",
            duration:12,
            exercises:[
                "hello, world.",
                "wait, stop, go.",
                "Can you type this?",
                "Write clearly; stay accurate."
            ]
        },
        {
            id:12,
            level:"Accuracy",
            difficulty:"Intermediate",
            title:"Fixing Common Errors",
            description:"Identify repeated mistakes and build cleaner typing habits.",
            duration:10,
            exercises:[
                "accuracy before speed",
                "slow down when needed",
                "keep your hands relaxed",
                "correct typing becomes fast typing"
            ]
        },
        {
            id:13,
            level:"Speed",
            difficulty:"Intermediate",
            title:"Common Letter Patterns",
            description:"Practice frequently used letter combinations to reduce unnecessary movement.",
            duration:12,
            exercises:[
                "th he in er an re",
                "tion ment ing",
                "the other thing",
                "learning typing patterns"
            ]
        },
        {
            id:14,
            level:"Speed",
            difficulty:"Intermediate",
            title:"Common Words",
            description:"Build speed through high-frequency words used in everyday writing.",
            duration:12,
            exercises:[
                "the and you that",
                "with have this from",
                "your time what when",
                "people work make good"
            ]
        },
        {
            id:15,
            level:"Speed",
            difficulty:"Intermediate",
            title:"Sentence Flow",
            description:"Move from isolated words to smooth, continuous sentences.",
            duration:12,
            exercises:[
                "The quick brown fox moves fast.",
                "Practice every day to improve.",
                "Good typing feels smooth and controlled.",
                "Accuracy gives speed a strong foundation."
            ]
        },
        {
            id:16,
            level:"Speed",
            difficulty:"Intermediate",
            title:"Building Consistent Speed",
            description:"Learn how to maintain speed without sacrificing accuracy.",
            duration:15,
            exercises:[
                "Keep your rhythm steady.",
                "Do not rush difficult words.",
                "Stay relaxed while typing.",
                "Consistent speed beats short bursts of speed."
            ]
        },
        {
            id:17,
            level:"Real World",
            difficulty:"Intermediate",
            title:"Typing Emails",
            description:"Practice the patterns, punctuation and formatting commonly used in emails.",
            duration:12,
            exercises:[
                "Hello, I hope you are doing well.",
                "Thank you for your time.",
                "I am writing to follow up.",
                "Best regards, VelType"
            ]
        },
        {
            id:18,
            level:"Real World",
            difficulty:"Intermediate",
            title:"Documents & Writing",
            description:"Improve typing endurance through longer-form everyday writing.",
            duration:15,
            exercises:[
                "Writing clearly helps people understand your ideas.",
                "Good documents require accuracy, spacing and punctuation.",
                "Keep a steady rhythm while working through longer paragraphs.",
                "Comfortable typing lets you focus on the work instead of the keyboard."
            ]
        },
        {
            id:19,
            level:"Real World",
            difficulty:"Advanced",
            title:"Typing for Coding",
            description:"Practice symbols, brackets and character combinations commonly used in code.",
            duration:15,
            exercises:[
                "const user = { name: 'Alex' };",
                "function add(a, b) { return a + b; }",
                "if (score >= 80) { status = 'good'; }",
                "let total = price * quantity;"
            ]
        },
        {
            id:20,
            level:"Real World",
            difficulty:"Advanced",
            title:"Numbers & Data Entry",
            description:"Develop reliable number-entry speed and accuracy for practical work.",
            duration:12,
            exercises:[
                "1024 2048 4096",
                "1250.50 980.25 450.00",
                "2026-08-11 10:30",
                "Invoice 1042 total $1250.50"
            ]
        },
        {
            id:21,
            level:"Advanced",
            difficulty:"Advanced",
            title:"Speed Under Pressure",
            description:"Maintain accuracy while gradually increasing your typing speed.",
            duration:15,
            exercises:[
                "Speed means nothing without control.",
                "Stay calm when the pace increases.",
                "Keep your eyes ahead of your current word.",
                "Accuracy under pressure is a real typing skill."
            ]
        },
        {
            id:22,
            level:"Advanced",
            difficulty:"Advanced",
            title:"Long-Form Endurance",
            description:"Build the stamina needed for longer writing and work sessions.",
            duration:18,
            exercises:[
                "Typing for longer periods requires relaxed shoulders, stable posture and consistent finger movement.",
                "Do not chase speed during long sessions. Focus on maintaining a comfortable rhythm.",
                "When fatigue appears, slow down slightly and keep your technique clean.",
                "Strong typing endurance comes from efficient movement rather than unnecessary effort."
            ]
        },
        {
            id:23,
            level:"Advanced",
            difficulty:"Advanced",
            title:"60+ WPM Training",
            description:"Use structured drills to move beyond intermediate typing speeds.",
            duration:20,
            exercises:[
                "Fast typing comes from automatic movement and accurate anticipation.",
                "Train difficult patterns until your fingers no longer search for the keys.",
                "Keep mistakes low while gradually increasing your pace.",
                "Push your speed only when your accuracy remains stable."
            ]
        },
        {
            id:24,
            level:"Advanced",
            difficulty:"Advanced",
            title:"Final Typing Challenge",
            description:"Put everything together in a realistic test of speed, accuracy and consistency.",
            duration:20,
            exercises:[
                "Typing is a practical skill that improves through deliberate practice.",
                "The goal is not simply to type quickly but to type accurately, comfortably and consistently.",
                "Use the keyboard without looking down and keep your hands relaxed throughout the exercise.",
                "When your technique becomes automatic, you can focus completely on the work in front of you."
            ]
        }
    ];

    const keyboardRows = [
        ["1","2","3","4","5","6","7","8","9","0"],
        ["q","w","e","r","t","y","u","i","o","p"],
        ["a","s","d","f","g","h","j","k","l"],
        ["z","x","c","v","b","n","m"],
        ["shift","space","enter"]
    ];

    const params = new URLSearchParams(location.search);
    let lessonId = Number(params.get("lesson")) || 1;

    const lesson = lessons.find(item => item.id === lessonId) || lessons[0];

    const $ = id => document.getElementById(id);

    const els = {
        level:$("lessonLevel"),
        number:$("lessonNumber"),
        title:$("lessonTitle"),
        description:$("lessonDescription"),
        difficulty:$("lessonDifficulty"),
        duration:$("lessonDuration"),
        theory:$("theoryContent"),
        theorySection:$("theorySection"),
        guide:$("guideContent"),
        guideSection:$("guideSection"),
        guideTitle:$("guideTitle"),
        practiceTitle:$("practiceTitle"),
        tabs:$("exerciseTabs"),
        display:$("typingDisplay"),
        count:$("characterCount"),
        wpm:$("wpm"),
        accuracy:$("accuracy"),
        errors:$("errors"),
        timer:$("timer"),
        status:$("practiceStatus"),
        message:$("practiceMessage"),
        progress:$("lessonProgressBar"),
        exerciseProgress:$("exerciseProgress"),
        keyboard:$("keyboard"),
        reset:$("resetExercise"),
        completion:$("completionCard"),
        finalWpm:$("finalWpm"),
        finalAccuracy:$("finalAccuracy"),
        finalErrors:$("finalErrors"),
        retry:$("retryLesson"),
        next:$("nextLesson"),
        previous:$("previousLesson"),
        nextBottom:$("nextLessonBottom"),
        previousTitle:$("previousTitle"),
        nextTitle:$("nextTitle")
    };

    let exerciseIndex = 0;
    let currentText = "";
    let position = 0;
    let errors = 0;
    let correct = 0;
    let startedAt = null;
    let timerId = null;
    let finished = false;

    function init(){
        renderLesson();
        renderExercises();
        renderKeyboard();
        loadExercise(0);
        setupNavigation();
    }

    function renderLesson(){
        els.level.textContent = lesson.level;
        els.number.textContent = `LESSON ${String(lesson.id).padStart(2,"0")}`;
        els.title.textContent = lesson.title;
        els.description.textContent = lesson.description;
        els.difficulty.textContent = lesson.difficulty.toUpperCase();
        els.duration.textContent = `${lesson.duration} MIN`;

        if(lesson.theory){
            els.theory.innerHTML = `
                <div class="theory-grid">
                    ${lesson.theory.map(item => `
                        <article class="info-block">
                            <span>${item[0]}</span>
                            <h3>${item[1]}</h3>
                            <p>${item[2]}</p>
                        </article>
                    `).join("")}
                </div>
            `;
        }else{
            els.theorySection.hidden = true;
        }

        if(lesson.guideList){
            els.guideTitle.textContent = lesson.guideTitle || "Keyboard guide";

            els.guide.innerHTML = `
                <div class="guide-grid">
                    <div class="guide-copy">
                        <h3>${lesson.guideTitle || "Build your technique."}</h3>
                        <p>${lesson.guideText || ""}</p>
                        <ul class="guide-list">
                            ${lesson.guideList.map(item => `<li>${item}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="guide-visual">
                        <div class="guide-visual-placeholder">
                            <strong>VelType technique guide</strong>
                            <span>Keep your hands relaxed and return to your natural position.</span>
                        </div>
                    </div>
                </div>
            `;
        }else{
            els.guideSection.hidden = true;
        }

        els.practiceTitle.textContent = lesson.title;
    }

    function renderExercises(){
        els.tabs.innerHTML = lesson.exercises.map((_,index) => `
            <button class="exercise-tab ${index === 0 ? "active" : ""}" data-index="${index}" type="button">
                Exercise ${String(index + 1).padStart(2,"0")}
            </button>
        `).join("");

        els.tabs.querySelectorAll(".exercise-tab").forEach(button => {
            button.addEventListener("click",() => {
                loadExercise(Number(button.dataset.index));
            });
        });
    }

    function renderKeyboard(){
        els.keyboard.innerHTML = keyboardRows.map(row => `
            <div class="key-row">
                ${row.map(key => `
                    <button
                        type="button"
                        class="key ${key === "space" ? "space" : ""} ${key === "shift" ? "shift" : ""}"
                        data-key="${key}"
                        tabindex="-1"
                    >${key === "space" ? "SPACE" : key.toUpperCase()}</button>
                `).join("")}
            </div>
        `).join("");

        els.keyboard.querySelectorAll(".key").forEach(key => {
            key.addEventListener("click",() => {
                els.display.focus();
            });
        });
    }

    function loadExercise(index){
        clearTimer();

        exerciseIndex = index;
        currentText = lesson.exercises[index];
        position = 0;
        errors = 0;
        correct = 0;
        startedAt = null;
        finished = false;

        els.completion.hidden = true;
        els.display.hidden = false;
        els.reset.disabled = false;

        updateStats();
        renderText();
        updateTabs();
        updateExerciseProgress();
        clearKeyboard();
        els.status.className = "practice-status";
        els.message.textContent = "Waiting for input";
        els.display.focus();
    }

    function renderText(){
        els.display.innerHTML = [...currentText].map((char,index) => {
            const safe = escapeHTML(char);

            return `
                <span class="char ${index === 0 ? "current" : ""}" data-index="${index}">
                    ${safe === " " ? "&nbsp;" : safe}
                </span>
            `;
        }).join("");

        els.count.textContent = `0 / ${currentText.length}`;
        highlightKey();
    }

    function handleInput(event){
        if(finished) return;

        const key = event.key;

        if(key === "Backspace" || key === "Delete"){
            event.preventDefault();
            showMessage("Backspace is disabled in lessons.");
            return;
        }

        if(key === "Tab"){
            event.preventDefault();
            return;
        }

        if(key.length !== 1 && key !== "Enter" && key !== " "){
            return;
        }

        event.preventDefault();

        if(!startedAt){
            startedAt = Date.now();
            startTimer();
            els.status.className = "practice-status active";
            els.message.textContent = "Typing...";
        }

        const expected = currentText[position];

        if(key === expected){
            correct++;
            markCorrect();
            position++;

            if(position >= currentText.length){
                finishExercise();
                return;
            }

            markCurrent();
        }else{
            errors++;
            markWrong();
            els.status.className = "practice-status error";
            els.message.textContent = `Expected "${displayKey(expected)}"`;
            setTimeout(() => {
                if(!finished){
                    els.status.className = "practice-status active";
                    els.message.textContent = "Keep going";
                }
            },350);
        }

        updateStats();
        updateExerciseProgress();
        highlightKey();
    }

    function markCorrect(){
        const char = els.display.querySelector(`[data-index="${position}"]`);
        if(char){
            char.classList.remove("current");
            char.classList.add("correct");
        }
    }

    function markWrong(){
        const char = els.display.querySelector(`[data-index="${position}"]`);
        if(!char) return;

        char.classList.remove("wrong");
        void char.offsetWidth;
        char.classList.add("wrong");

        setTimeout(() => {
            char.classList.remove("wrong");
            if(!finished) char.classList.add("current");
        },250);
    }

    function markCurrent(){
        els.display.querySelectorAll(".char").forEach(char => {
            char.classList.remove("current");
        });

        const current = els.display.querySelector(`[data-index="${position}"]`);
        if(current) current.classList.add("current");
    }

    function highlightKey(){
        clearKeyboard();

        const expected = currentText[position];

        if(!expected) return;

        const key = expected.toLowerCase();

        if(/[a-z0-9]/.test(key)){
            const target = els.keyboard.querySelector(`[data-key="${key}"]`);
            if(target) target.classList.add("active");
        }else if(expected === " "){
            els.keyboard.querySelector('[data-key="space"]')?.classList.add("active");
        }else if(expected === "\n"){
            els.keyboard.querySelector('[data-key="enter"]')?.classList.add("active");
        }else if(expected === expected.toUpperCase() && /[A-Z]/.test(expected)){
            els.keyboard.querySelector('[data-key="shift"]')?.classList.add("active");
            els.keyboard.querySelector(`[data-key="${expected.toLowerCase()}"]`)?.classList.add("active");
        }
    }

    function clearKeyboard(){
        els.keyboard.querySelectorAll(".key").forEach(key => {
            key.classList.remove("active","wrong");
        });
    }

    function updateStats(){
        const elapsed = startedAt ? Math.max((Date.now() - startedAt) / 1000,1) : 0;

        const typed = correct + errors;
        const minutes = elapsed / 60;

        const wpm = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
        const accuracy = typed > 0 ? Math.round((correct / typed) * 100) : 100;

        els.wpm.textContent = wpm;
        els.accuracy.textContent = `${accuracy}%`;
        els.errors.textContent = errors;
    }

    function startTimer(){
        clearTimer();

        timerId = setInterval(() => {
            updateStats();

            const elapsed = startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0;
            els.timer.textContent = formatTime(elapsed);
        },250);
    }

    function clearTimer(){
        if(timerId){
            clearInterval(timerId);
            timerId = null;
        }
    }

    function finishExercise(){
        finished = true;
        clearTimer();

        const elapsed = Math.max((Date.now() - startedAt) / 1000,1);
        const wpm = Math.round((correct / 5) / (elapsed / 60));
        const accuracy = Math.round((correct / (correct + errors || 1)) * 100);

        els.status.className = "practice-status active";
        els.message.textContent = "Exercise complete ✓";

        els.tabs.querySelector(`[data-index="${exerciseIndex}"]`)?.classList.add("complete");

        saveExerciseProgress();

        if(exerciseIndex < lesson.exercises.length - 1){
            setTimeout(() => {
                loadExercise(exerciseIndex + 1);
            },700);
        }else{
            finishLesson(wpm,accuracy);
        }
    }

    function finishLesson(wpm,accuracy){
        els.finalWpm.textContent = wpm;
        els.finalAccuracy.textContent = `${accuracy}%`;
        els.finalErrors.textContent = errors;

        els.completionText.textContent =
            accuracy >= 95
                ? "Excellent control. Your accuracy is strong enough to build speed from here."
                : "Good work. Repeat the lesson if you want to make the movement more consistent.";

        els.display.hidden = true;
        els.completion.hidden = false;

        saveLessonCompletion();

        window.scrollTo({
            top:els.completion.offsetTop - 100,
            behavior:"smooth"
        });
    }

    function saveExerciseProgress(){
        const key = `veltype_lesson_${lesson.id}`;
        const data = JSON.parse(localStorage.getItem(key) || "{}");

        data.exercises = data.exercises || [];
        data.exercises[exerciseIndex] = {
            completed:true,
            errors,
            completedAt:new Date().toISOString()
        };

        localStorage.setItem(key,JSON.stringify(data));
    }

    function saveLessonCompletion(){
        const progress = JSON.parse(localStorage.getItem("veltypeLessonProgress") || "{}");

        progress[lesson.id] = {
            completed:true,
            completedAt:new Date().toISOString()
        };

        localStorage.setItem("veltypeLessonProgress",JSON.stringify(progress));
    }

    function updateTabs(){
        els.tabs.querySelectorAll(".exercise-tab").forEach((tab,index) => {
            tab.classList.toggle("active",index === exerciseIndex);
        });
    }

    function updateExerciseProgress(){
        els.exerciseProgress.textContent =
            `${exerciseIndex + (finished ? 1 : 0)} / ${lesson.exercises.length}`;

        const progress =
            ((exerciseIndex + (finished ? 1 : 0)) / lesson.exercises.length) * 100;

        els.progress.style.width = `${Math.min(progress,100)}%`;
    }

    function setupNavigation(){
        const previous = lessons.find(item => item.id === lesson.id - 1);
        const next = lessons.find(item => item.id === lesson.id + 1);

        if(previous){
            const url = `lesson.html?level=${encodeURIComponent(previous.level)}&lesson=${previous.id}`;

            els.previous.href = url;
            els.previousTitle.textContent = previous.title;
        }else{
            els.previous.href = "learn.html";
            els.previousTitle.textContent = "Learning path";
        }

        if(next){
            const url = `lesson.html?level=${encodeURIComponent(next.level)}&lesson=${next.id}`;

            els.next.href = url;
            els.nextBottom.href = url;
            els.nextTitle.textContent = next.title;
        }else{
            els.next.href = "learn.html";
            els.nextBottom.href = "learn.html";
            els.nextTitle.textContent = "Finish learning";
        }
    }

    function reset(){
        loadExercise(exerciseIndex);
    }

    function retryLesson(){
        loadExercise(0);
        window.scrollTo({
            top:document.querySelector(".practice-card").offsetTop - 90,
            behavior:"smooth"
        });
    }

    function showMessage(message){
        els.message.textContent = message;
    }

    function formatTime(seconds){
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
    }

    function displayKey(key){
        if(key === " ") return "SPACE";
        if(key === "\n") return "ENTER";
        return key;
    }

    function escapeHTML(value){
        return value
            .replace(/&/g,"&amp;")
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;")
            .replace(/'/g,"&#039;");
    }

    els.display.addEventListener("keydown",handleInput);
    els.display.addEventListener("click",() => els.display.focus());
    els.reset.addEventListener("click",reset);
    els.retry.addEventListener("click",retryLesson);

    document.addEventListener("keydown",event => {
        if(event.key === "Escape"){
            els.display.blur();
        }
    });

    init();
})();
