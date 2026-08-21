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
        guideImage: "image/typing-posture.png",
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
        guideImage: "image/finger-placement.png",
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
        guideImage: "image/home-row.png",
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
        guideImage: "image/left-hand-reach.png",
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
        guideImage: "image/right-hand-reach.png",
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
        guideImage: "image/top-row.png",
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
        guideImage: "image/bottom-row.png",
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
