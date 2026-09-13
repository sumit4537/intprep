/* =========================================================
   INTERVIEWPREP
   VANILLA JAVASCRIPT APPLICATION
   =========================================================

   IMPORTANT:
   - No localStorage
   - No sessionStorage
   - No backend
   - All data lives in JavaScript memory
   - Hash routing is used to create multiple app pages

========================================================= */


/* =========================================================
   1. APPLICATION STATE
========================================================= */

const appState = {

    currentRoute: "home",

    currentQuestionIndex: 0,

    questions: [],

    selectedSector: "Software Engineering",

    selectedType: "Behavioral",

    selectedLevel: "Fresher/Entry-level",

    questionTimeSeconds: 120,

    remainingSeconds: 120,

    timerStartedAt: null,

    timerInterval: null,

    questionStartedAt: null,

    currentRating: 0,

    sessionAnswers: [],

    allAnswers: [],

    voiceQuestionIndex: 0,

    voiceTranscript: "",

    isListening: false,

    recognition: null

};


/* =========================================================
   2. QUESTION BANK
=========================================================

   The bank is intentionally structured so you can easily
   add more questions later.

   Each question contains:
   - question
   - tips
   - sampleAnswerOutline
========================================================= */

const questionBank = {

    "Software Engineering": {

        "Behavioral": {

            "Fresher/Entry-level": [
                {
                    question: "Tell me about yourself and your technical background.",
                    tips: "Use a present → past → future structure.",
                    sampleAnswerOutline: "• Education/background\n• Technical skills\n• Projects/internship\n• What you want to do next"
                },
                {
                    question: "Tell me about a challenging project you worked on.",
                    tips: "Focus on your personal contribution.",
                    sampleAnswerOutline: "• Project goal\n• Challenge\n• Your responsibility\n• Solution\n• Result"
                },
                {
                    question: "Describe a time you made a mistake in a project.",
                    tips: "Do not hide the mistake. Focus on learning.",
                    sampleAnswerOutline: "• Situation\n• Mistake\n• Correction\n• Lesson learned"
                },
                {
                    question: "How do you handle tight deadlines?",
                    tips: "Show prioritization rather than simply saying you work harder.",
                    sampleAnswerOutline: "• Understand requirements\n• Prioritize\n• Break work down\n• Communicate blockers\n• Deliver"
                },
                {
                    question: "Tell me about a time you worked in a team.",
                    tips: "Highlight collaboration and communication.",
                    sampleAnswerOutline: "• Team objective\n• Your role\n• Collaboration\n• Challenge\n• Result"
                },
                {
                    question: "How do you learn a new programming language or technology?",
                    tips: "Give a concrete learning process.",
                    sampleAnswerOutline: "• Documentation\n• Small project\n• Practice\n• Debugging\n• Feedback"
                },
                {
                    question: "What motivates you to work in software engineering?",
                    tips: "Connect motivation to problem solving and building products.",
                    sampleAnswerOutline: "• Interest in technology\n• Problem solving\n• Building useful systems\n• Continuous learning"
                },
                {
                    question: "How do you respond when someone criticizes your code?",
                    tips: "Show that you value constructive feedback.",
                    sampleAnswerOutline: "• Listen\n• Understand reasoning\n• Improve code\n• Learn from review"
                },
                {
                    question: "Describe a situation where you had to solve a problem independently.",
                    tips: "Explain your thought process.",
                    sampleAnswerOutline: "• Problem\n• Research\n• Alternatives\n• Decision\n• Outcome"
                },
                {
                    question: "Where do you see yourself in the next three years?",
                    tips: "Keep your answer realistic and role-related.",
                    sampleAnswerOutline: "• Technical growth\n• Responsibilities\n• Contribution\n• Long-term learning"
                }
            ],

            "Mid-level": [
                {
                    question: "Tell me about a difficult engineering decision you made.",
                    tips: "Explain trade-offs.",
                    sampleAnswerOutline: "• Context\n• Options\n• Trade-offs\n• Decision\n• Result"
                },
                {
                    question: "Describe a production incident you handled.",
                    tips: "Show calm troubleshooting and communication.",
                    sampleAnswerOutline: "• Incident\n• Impact\n• Diagnosis\n• Fix\n• Prevention"
                },
                {
                    question: "Tell me about a disagreement with another engineer.",
                    tips: "Focus on technical reasoning rather than personalities.",
                    sampleAnswerOutline: "• Disagreement\n• Evidence\n• Discussion\n• Resolution\n• Lesson"
                },
                {
                    question: "How have you improved engineering processes?",
                    tips: "Quantify improvements where possible.",
                    sampleAnswerOutline: "• Existing problem\n• Proposed improvement\n• Implementation\n• Measurable result"
                },
                {
                    question: "Describe a project where requirements changed significantly.",
                    tips: "Show adaptability.",
                    sampleAnswerOutline: "• Original requirements\n• Change\n• Impact\n• Adaptation\n• Result"
                },
                {
                    question: "How do you mentor junior developers?",
                    tips: "Mention coaching rather than simply solving problems for them.",
                    sampleAnswerOutline: "• Understand gap\n• Explain concepts\n• Pair programming\n• Feedback\n• Growth"
                },
                {
                    question: "Tell me about a time you improved system performance.",
                    tips: "Include measurable impact.",
                    sampleAnswerOutline: "• Bottleneck\n• Investigation\n• Change\n• Measurement\n• Result"
                },
                {
                    question: "How do you balance technical debt with feature development?",
                    tips: "Discuss business and engineering trade-offs.",
                    sampleAnswerOutline: "• Identify debt\n• Risk\n• Prioritize\n• Allocate time\n• Monitor"
                }
            ],

            "Senior": [
                {
                    question: "Tell me about a major architectural decision you led.",
                    tips: "Explain technical and business trade-offs.",
                    sampleAnswerOutline: "• Problem\n• Constraints\n• Architecture options\n• Decision\n• Impact"
                },
                {
                    question: "Describe a major engineering failure and what you learned.",
                    tips: "Take ownership.",
                    sampleAnswerOutline: "• Failure\n• Root cause\n• Leadership response\n• Prevention\n• Lesson"
                },
                {
                    question: "How do you create alignment across engineering teams?",
                    tips: "Discuss communication and shared technical direction.",
                    sampleAnswerOutline: "• Stakeholders\n• Goals\n• Architecture\n• Documentation\n• Alignment"
                },
                {
                    question: "How do you evaluate technical risk?",
                    tips: "Show systematic risk assessment.",
                    sampleAnswerOutline: "• Identify risk\n• Probability\n• Impact\n• Mitigation\n• Monitoring"
                },
                {
                    question: "Tell me about a system you scaled significantly.",
                    tips: "Use measurable scale.",
                    sampleAnswerOutline: "• Starting scale\n• Bottleneck\n• Architecture\n• Changes\n• New scale"
                },
                {
                    question: "How do you handle disagreements among senior engineers?",
                    tips: "Focus on evidence and decision frameworks.",
                    sampleAnswerOutline: "• Understand positions\n• Establish criteria\n• Evidence\n• Decision\n• Alignment"
                },
                {
                    question: "How do you balance engineering quality and delivery speed?",
                    tips: "Explain how you manage risk.",
                    sampleAnswerOutline: "• Quality baseline\n• Risk assessment\n• Prioritization\n• Automation\n• Delivery"
                },
                {
                    question: "What makes a strong engineering culture?",
                    tips: "Discuss behaviors rather than slogans.",
                    sampleAnswerOutline: "• Ownership\n• Psychological safety\n• Code quality\n• Learning\n• Accountability"
                }
            ]
        },

        "Technical": {

            "Fresher/Entry-level": [
                {
                    question: "What are the four main principles of object-oriented programming?",
                    tips: "Define each principle and give a simple example.",
                    sampleAnswerOutline: "• Encapsulation\n• Abstraction\n• Inheritance\n• Polymorphism"
                },
                {
                    question: "What is the difference between an array and a linked list?",
                    tips: "Compare memory layout and operations.",
                    sampleAnswerOutline: "• Memory\n• Access\n• Insert/delete\n• Complexity\n• Use cases"
                },
                {
                    question: "Explain time complexity and Big O notation.",
                    tips: "Use a simple algorithm as an example.",
                    sampleAnswerOutline: "• Definition\n• O(1)\n• O(log n)\n• O(n)\n• O(n²)"
                },
                {
                    question: "What is the difference between a process and a thread?",
                    tips: "Focus on memory and execution.",
                    sampleAnswerOutline: "• Process\n• Thread\n• Memory\n• Context switching\n• Use case"
                },
                {
                    question: "What is an API?",
                    tips: "Explain it as a communication interface.",
                    sampleAnswerOutline: "• Definition\n• Request\n• Response\n• HTTP example\n• Use case"
                },
                {
                    question: "What happens when you type a URL into a browser?",
                    tips: "Walk through networking layers logically.",
                    sampleAnswerOutline: "• DNS\n• TCP/TLS\n• HTTP\n• Server\n• Browser rendering"
                },
                {
                    question: "What is a database index?",
                    tips: "Explain the speed/storage trade-off.",
                    sampleAnswerOutline: "• Purpose\n• Lookup\n• Speed\n• Storage\n• Trade-off"
                },
                {
                    question: "What is Git and why is it used?",
                    tips: "Mention collaboration and version history.",
                    sampleAnswerOutline: "• Version control\n• Branches\n• Commits\n• Collaboration\n• Recovery"
                },
                {
                    question: "Explain the difference between HTTP and HTTPS.",
                    tips: "Focus on encryption and certificates.",
                    sampleAnswerOutline: "• HTTP\n• TLS\n• Encryption\n• Certificates\n• Security"
                },
                {
                    question: "What is exception handling?",
                    tips: "Explain why applications need controlled error handling.",
                    sampleAnswerOutline: "• Runtime errors\n• try/catch\n• Recovery\n• Logging\n• User experience"
                }
            ]
        }
    },


    /* =====================================================
       CLOUD / DEVOPS
    ===================================================== */

    "Cloud/DevOps": {

        "Technical": {

            "Fresher/Entry-level": [
                {
                    question: "What is cloud computing?",
                    tips: "Define it and explain its advantages.",
                    sampleAnswerOutline: "• On-demand resources\n• Internet access\n• Scalability\n• Pay-as-you-go\n• Example"
                },
                {
                    question: "What is the difference between AWS EC2 and S3?",
                    tips: "Compare compute and object storage.",
                    sampleAnswerOutline: "• EC2 = compute\n• S3 = object storage\n• Use cases\n• Example"
                },
                {
                    question: "What is Docker?",
                    tips: "Explain containers in simple terms.",
                    sampleAnswerOutline: "• Containerization\n• Image\n• Container\n• Portability\n• Use case"
                },
                {
                    question: "What is CI/CD?",
                    tips: "Separate continuous integration and delivery/deployment.",
                    sampleAnswerOutline: "• CI\n• Automated tests\n• CD\n• Deployment\n• Benefits"
                },
                {
                    question: "What is a virtual machine?",
                    tips: "Compare virtualized hardware with physical machines.",
                    sampleAnswerOutline: "• Hypervisor\n• Virtual hardware\n• Guest OS\n• Isolation"
                },
                {
                    question: "What is an AWS security group?",
                    tips: "Explain inbound and outbound traffic control.",
                    sampleAnswerOutline: "• Virtual firewall\n• Inbound\n• Outbound\n• Rules\n• EC2"
                },
                {
                    question: "What is a VPC?",
                    tips: "Describe it as an isolated virtual network.",
                    sampleAnswerOutline: "• Network isolation\n• Subnets\n• Routing\n• Security\n• Cloud resources"
                },
                {
                    question: "What is Kubernetes?",
                    tips: "Explain the problem it solves.",
                    sampleAnswerOutline: "• Container orchestration\n• Pods\n• Scaling\n• Scheduling\n• Services"
                },
                {
                    question: "What is infrastructure as code?",
                    tips: "Mention automation and repeatability.",
                    sampleAnswerOutline: "• Infrastructure definition\n• Version control\n• Automation\n• Reproducibility"
                },
                {
                    question: "What is Linux commonly used for in cloud environments?",
                    tips: "Connect Linux administration to servers.",
                    sampleAnswerOutline: "• Servers\n• CLI\n• Packages\n• Permissions\n• Networking"
                }
            ]
        }
    },


    /* =====================================================
       IT / NETWORKING
    ===================================================== */

    "IT/Networking": {

        "Technical": {

            "Fresher/Entry-level": [
                {
                    question: "What is an IP address?",
                    tips: "Explain its purpose in network communication.",
                    sampleAnswerOutline: "• Identifier\n• IPv4/IPv6\n• Network\n• Host"
                },
                {
                    question: "What is subnetting?",
                    tips: "Explain why networks are divided.",
                    sampleAnswerOutline: "• Network division\n• Subnet mask\n• Efficiency\n• Security"
                },
                {
                    question: "What is DNS?",
                    tips: "Use the domain-to-IP analogy.",
                    sampleAnswerOutline: "• Domain name\n• DNS lookup\n• IP address\n• Browser connection"
                },
                {
                    question: "What is DHCP?",
                    tips: "Explain automatic IP configuration.",
                    sampleAnswerOutline: "• Automatic addressing\n• IP\n• Gateway\n• DNS\n• Lease"
                },
                {
                    question: "What is the difference between TCP and UDP?",
                    tips: "Compare reliability and speed.",
                    sampleAnswerOutline: "• Connection\n• Reliability\n• Ordering\n• Speed\n• Use cases"
                },
                {
                    question: "What is a router?",
                    tips: "Explain packet forwarding between networks.",
                    sampleAnswerOutline: "• Network device\n• Routing table\n• Packet forwarding\n• Networks"
                },
                {
                    question: "What is a firewall?",
                    tips: "Explain traffic filtering.",
                    sampleAnswerOutline: "• Security boundary\n• Rules\n• Allow/deny\n• Inbound/outbound"
                },
                {
                    question: "What is the OSI model?",
                    tips: "Mention the seven layers and purpose.",
                    sampleAnswerOutline: "• Physical\n• Data Link\n• Network\n• Transport\n• Session\n• Presentation\n• Application"
                },
                {
                    question: "How would you troubleshoot a computer that cannot access the internet?",
                    tips: "Use a logical troubleshooting sequence.",
                    sampleAnswerOutline: "• Physical connection\n• IP configuration\n• Gateway\n• DNS\n• Ping\n• Browser"
                },
                {
                    question: "What is the difference between a switch and a hub?",
                    tips: "Focus on how traffic is forwarded.",
                    sampleAnswerOutline: "• Hub broadcasts\n• Switch MAC table\n• Collision domains\n• Efficiency"
                }
            ]
        }
    },


    /* =====================================================
       GENERIC / OTHER
    ===================================================== */

    "Generic/Other": {

        "Behavioral": {

            "Fresher/Entry-level": [
                {
                    question: "Tell me about yourself.",
                    tips: "Keep your answer relevant to the job.",
                    sampleAnswerOutline: "• Education\n• Skills\n• Projects\n• Strengths\n• Career goal"
                },
                {
                    question: "Why should we hire you?",
                    tips: "Connect your skills to the company's needs.",
                    sampleAnswerOutline: "• Relevant skills\n• Evidence\n• Learning ability\n• Contribution"
                },
                {
                    question: "What are your strengths?",
                    tips: "Support each strength with evidence.",
                    sampleAnswerOutline: "• Strength\n• Example\n• Result"
                },
                {
                    question: "What is your biggest weakness?",
                    tips: "Choose a real but manageable weakness and show improvement.",
                    sampleAnswerOutline: "• Weakness\n• Impact\n• Improvement plan\n• Progress"
                },
                {
                    question: "Why do you want this job?",
                    tips: "Connect role, company and career goals.",
                    sampleAnswerOutline: "• Role interest\n• Company interest\n• Skills\n• Growth"
                },
                {
                    question: "Tell me about a time you solved a difficult problem.",
                    tips: "Use STAR.",
                    sampleAnswerOutline: "• Situation\n• Task\n• Action\n• Result"
                },
                {
                    question: "How do you handle failure?",
                    tips: "Show accountability and learning.",
                    sampleAnswerOutline: "• Failure\n• Response\n• Learning\n• Improvement"
                },
                {
                    question: "Where do you see yourself in five years?",
                    tips: "Focus on realistic professional growth.",
                    sampleAnswerOutline: "• Skills\n• Responsibility\n• Contribution\n• Learning"
                },
                {
                    question: "How do you prioritize multiple tasks?",
                    tips: "Explain your prioritization criteria.",
                    sampleAnswerOutline: "• Urgency\n• Impact\n• Deadlines\n• Planning\n• Communication"
                },
                {
                    question: "Do you have any questions for us?",
                    tips: "Always prepare thoughtful questions.",
                    sampleAnswerOutline: "• Team\n• Role\n• Success metrics\n• Learning\n• Company"
                }
            ]
        }
    }

};


/* =========================================================
   3. ADD FALLBACK QUESTIONS
========================================================= */

const fallbackQuestions = [
    {
        question: "Tell me about yourself.",
        tips: "Use a concise present → past → future structure.",
        sampleAnswerOutline:
            "• Current background\n• Relevant skills\n• Projects/experience\n• Career direction"
    },
    {
        question: "Why are you interested in this role?",
        tips: "Connect the role to your skills and goals.",
        sampleAnswerOutline:
            "• Role interest\n• Relevant skills\n• Evidence\n• Career goal"
    },
    {
        question: "Describe a challenging problem you solved.",
        tips: "Use the STAR framework.",
        sampleAnswerOutline:
            "• Situation\n• Task\n• Action\n• Result"
    },
    {
        question: "What is one skill you are currently improving?",
        tips: "Show self-awareness and a concrete learning plan.",
        sampleAnswerOutline:
            "• Skill\n• Current level\n• Learning method\n• Progress"
    },
    {
        question: "How do you handle pressure?",
        tips: "Explain your process for staying organized.",
        sampleAnswerOutline:
            "• Assess\n• Prioritize\n• Execute\n• Communicate"
    },
    {
        question: "Tell me about a time you worked with a team.",
        tips: "Highlight your contribution.",
        sampleAnswerOutline:
            "• Goal\n• Role\n• Collaboration\n• Result"
    },
    {
        question: "What motivates you professionally?",
        tips: "Connect your motivation to meaningful work.",
        sampleAnswerOutline:
            "• Motivation\n• Example\n• Impact\n• Growth"
    },
    {
        question: "How do you respond to feedback?",
        tips: "Show that you turn feedback into action.",
        sampleAnswerOutline:
            "• Listen\n• Clarify\n• Apply\n• Improve"
    },
    {
        question: "What are your biggest strengths?",
        tips: "Support strengths with evidence.",
        sampleAnswerOutline:
            "• Strength\n• Example\n• Result"
    },
    {
        question: "Why should we hire you?",
        tips: "Summarize your strongest job-relevant value.",
        sampleAnswerOutline:
            "• Skills\n• Evidence\n• Learning ability\n• Contribution"
    }
];


/* =========================================================
   4. DOM HELPERS
========================================================= */

function $(id) {
    return document.getElementById(id);
}


function showElement(element) {
    element.classList.remove("hidden");
}


function hideElement(element) {
    element.classList.add("hidden");
}


/* =========================================================
   5. ROUTER
========================================================= */

function navigateTo(route) {

    const validRoutes = [
        "home",
        "pressure",
        "voice",
        "progress",
        "summary"
    ];

    if (!validRoutes.includes(route)) {
        route = "home";
    }

    appState.currentRoute = route;

    window.location.hash = route;

    renderPage(route);
}


function renderPage(route) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });


    const page = $(`${route}Page`);

    if (page) {
        page.classList.add("active-page");
    }


    document.querySelectorAll(".main-nav a").forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${route}`) {
            link.classList.add("active");
        }
    });


    if (route === "progress") {
        updateProgressPage();
    }


    if (route === "home") {
        updateHomeStats();
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   HASH ROUTING
========================================================= */

function handleRouteChange() {

    let route = window.location.hash.replace("#", "");

    if (!route) {
        route = "home";
    }

    const validRoutes = [
        "home",
        "pressure",
        "voice",
        "progress",
        "summary"
    ];

    if (!validRoutes.includes(route)) {
        route = "home";
    }

    appState.currentRoute = route;

    renderPage(route);
}


window.addEventListener(
    "hashchange",
    handleRouteChange
);


/* =========================================================
   6. CLICKABLE ROUTE BUTTONS
========================================================= */

document.addEventListener("click", event => {

    const routeElement =
        event.target.closest("[data-route]");

    if (!routeElement) {
        return;
    }

    const route =
        routeElement.dataset.route;

    navigateTo(route);
});


/* =========================================================
   KEYBOARD SUPPORT FOR FEATURE CARDS
========================================================= */

document.querySelectorAll(".clickable-card").forEach(card => {

    card.addEventListener("keydown", event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            navigateTo(card.dataset.route);
        }

    });

});


/* =========================================================
   7. MOBILE NAVIGATION
========================================================= */

$("mobileMenuBtn").addEventListener("click", () => {

    const nav = document.querySelector(".main-nav");

    const isOpen =
        nav.classList.toggle("open");

    $("mobileMenuBtn")
        .setAttribute(
            "aria-expanded",
            isOpen
        );
});


document.querySelectorAll(".main-nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            document
                .querySelector(".main-nav")
                .classList.remove("open");

            $("mobileMenuBtn")
                .setAttribute(
                    "aria-expanded",
                    "false"
                );

        });

    });


/* =========================================================
   8. GET QUESTIONS
========================================================= */

function getQuestions() {

    const sector =
        appState.selectedSector;

    const type =
        appState.selectedType;

    const level =
        appState.selectedLevel;


    const sectorData =
        questionBank[sector];


    if (
        sectorData &&
        sectorData[type] &&
        sectorData[type][level]
    ) {

        return [
            ...sectorData[type][level]
        ];
    }


    /*
       If the exact combination isn't available,
       try another question set from the same sector.
    */

    if (
        sectorData &&
        sectorData[type]
    ) {

        const levels =
            Object.values(
                sectorData[type]
            );

        if (levels.length) {
            return [...levels[0]];
        }
    }


    /*
       Otherwise use generic questions.
    */

    return [...fallbackQuestions];
}


/* =========================================================
   9. SHUFFLE
========================================================= */

function shuffle(array) {

    const copy = [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            copy[i],
            copy[j]
        ] = [
            copy[j],
            copy[i]
        ];
    }

    return copy;
}


/* =========================================================
   10. START INTERVIEW
========================================================= */

$("startPracticeBtn")
    .addEventListener("click", () => {

        navigateTo("pressure");

    });


$("beginInterviewBtn")
    .addEventListener("click", startInterview);


function startInterview() {

    appState.selectedSector =
        $("sectorSelect").value;

    appState.selectedType =
        $("interviewTypeSelect").value;

    appState.selectedLevel =
        $("levelSelect").value;


    const minutes =
        Number($("timerInput").value);


    appState.questionTimeSeconds =
        Math.max(
            60,
            Math.min(
                minutes * 60,
                600
            )
        );


    appState.questions =
        shuffle(
            getQuestions()
        ).slice(0, 10);


    appState.currentQuestionIndex = 0;

    appState.sessionAnswers = [];

    appState.currentRating = 0;


    hideElement($("pressureSetup"));

    showElement($("pressurePractice"));


    loadQuestion();

}


/* =========================================================
   11. LOAD QUESTION
========================================================= */

function loadQuestion() {

    stopTimer();


    const index =
        appState.currentQuestionIndex;

    const question =
        appState.questions[index];


    if (!question) {
        finishSession();
        return;
    }


    $("questionText").textContent =
        question.question;


    $("questionCategory").textContent =
        `${appState.selectedType.toUpperCase()} • ${appState.selectedLevel.toUpperCase()}`;


    $("questionProgress").textContent =
        `Question ${index + 1} of ${appState.questions.length}`;


    $("questionProgressBar").style.width =
        `${((index + 1) / appState.questions.length) * 100}%`;


    $("answerInput").value = "";


    $("wordCount").textContent =
        "0 words";


    hideElement($("tipsPanel"));

    hideElement($("evaluationPanel"));


    $("showTipsBtn").textContent =
        "Show Tips";


    resetRating();


    $("tipText").textContent =
        question.tips;


    $("outlineText").textContent =
        question.sampleAnswerOutline;


    appState.questionStartedAt =
        Date.now();


    startTimer();

}


/* =========================================================
   12. TIMER
========================================================= */

function startTimer() {

    stopTimer();


    appState.remainingSeconds =
        appState.questionTimeSeconds;


    updateTimerDisplay();


    appState.timerStartedAt =
        Date.now();


    appState.timerInterval =
        setInterval(() => {

            appState.remainingSeconds--;

            updateTimerDisplay();


            if (
                appState.remainingSeconds <= 0
            ) {

                stopTimer();

                timeExpired();

            }

        }, 1000);
}


function stopTimer() {

    if (appState.timerInterval) {

        clearInterval(
            appState.timerInterval
        );

        appState.timerInterval = null;
    }
}


function updateTimerDisplay() {

    const seconds =
        Math.max(
            0,
            appState.remainingSeconds
        );


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    $("timerDisplay").textContent =
        `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;


    if (seconds <= 15) {

        $("timerDisplay")
            .classList.add("low-time");

    } else {

        $("timerDisplay")
            .classList.remove("low-time");

    }

}


function timeExpired() {

    saveCurrentAnswer();

    showElement(
        $("evaluationPanel")
    );

    $("ratingText").textContent =
        "Time is up. Rate your answer before continuing.";

}


/* =========================================================
   13. ANSWER WORD COUNT
========================================================= */

$("answerInput")
    .addEventListener("input", () => {

        const text =
            $("answerInput").value.trim();


        const words =
            text
                ? text.split(/\s+/).length
                : 0;


        $("wordCount").textContent =
            `${words} ${words === 1 ? "word" : "words"}`;

    });


/* =========================================================
   14. SHOW TIPS
========================================================= */

$("showTipsBtn")
    .addEventListener("click", () => {

        const panel =
            $("tipsPanel");

        const hidden =
            panel.classList.contains("hidden");


        if (hidden) {

            showElement(panel);

            $("showTipsBtn")
                .textContent =
                "Hide Tips";

        } else {

            hideElement(panel);

            $("showTipsBtn")
                .textContent =
                "Show Tips";

        }

    });


/* =========================================================
   15. RATING
========================================================= */

document
    .querySelectorAll(
        "#ratingStars button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const rating =
                    Number(
                        button.dataset.rating
                    );

                setRating(rating);

            }
        );

    });


function setRating(rating) {

    appState.currentRating =
        rating;


    document
        .querySelectorAll(
            "#ratingStars button"
        )
        .forEach(button => {

            const buttonRating =
                Number(
                    button.dataset.rating
                );


            button.classList.toggle(
                "selected",
                buttonRating <= rating
            );

        });


    const descriptions = {
        1: "Very low confidence",
        2: "Low confidence",
        3: "Moderate confidence",
        4: "Good confidence",
        5: "Very high confidence"
    };


    $("ratingText").textContent =
        descriptions[rating];

}


function resetRating() {

    appState.currentRating = 0;

    document
        .querySelectorAll(
            "#ratingStars button"
        )
        .forEach(button => {

            button.classList.remove(
                "selected"
            );

        });


    $("ratingText").textContent =
        "Select a rating";

}


/* =========================================================
   16. SAVE CURRENT ANSWER
========================================================= */

function saveCurrentAnswer() {

    const question =
        appState.questions[
            appState.currentQuestionIndex
        ];


    if (!question) {
        return;
    }


    const answer =
        $("answerInput").value.trim();


    const existingIndex =
        appState.sessionAnswers
            .findIndex(
                item =>
                    item.questionIndex ===
                    appState.currentQuestionIndex
            );


    const elapsed =
        Math.max(
            0,
            Math.round(
                (Date.now() -
                    appState.questionStartedAt) /
                1000
            )
        );


    const record = {

        questionIndex:
            appState.currentQuestionIndex,

        question:
            question.question,

        answer:
            answer,

        rating:
            appState.currentRating,

        timestamp:
            new Date().toISOString(),

        timeTaken:
            Math.min(
                elapsed,
                appState.questionTimeSeconds
            ),

        sector:
            appState.selectedSector,

        type:
            appState.selectedType,

        level:
            appState.selectedLevel

    };


    if (existingIndex >= 0) {

        appState.sessionAnswers[
            existingIndex
        ] = record;

    } else {

        appState.sessionAnswers.push(
            record
        );

    }


    /*
       Keep a global in-memory record too.
       This resets when the browser page reloads.
    */

    const globalExistingIndex =
        appState.allAnswers.findIndex(
            item =>
                item.question ===
                record.question &&
                item.timestamp ===
                record.timestamp
        );


    if (globalExistingIndex === -1) {

        appState.allAnswers.push(
            record
        );

    }

}


/* =========================================================
   17. NEXT QUESTION
========================================================= */

$("nextQuestionBtn")
    .addEventListener(
        "click",
        nextQuestion
    );


function nextQuestion() {

    if (
        appState.currentRating === 0 &&
        $("answerInput").value.trim()
    ) {

        showElement(
            $("evaluationPanel")
        );

        $("ratingText").textContent =
            "Please select a confidence rating before continuing.";

        return;
    }


    saveCurrentAnswer();


    if (
        appState.currentQuestionIndex <
        appState.questions.length - 1
    ) {

        appState.currentQuestionIndex++;

        loadQuestion();

    } else {

        finishSession();

    }

}


/* =========================================================
   18. PREVIOUS QUESTION
========================================================= */

$("previousQuestionBtn")
    .addEventListener(
        "click",
        previousQuestion
    );


function previousQuestion() {

    saveCurrentAnswer();


    if (
        appState.currentQuestionIndex > 0
    ) {

        appState.currentQuestionIndex--;

        loadQuestion();

    }

}


/* =========================================================
   19. FINISH SESSION
========================================================= */

$("finishSessionBtn")
    .addEventListener(
        "click",
        finishSession
    );


function finishSession() {

    saveCurrentAnswer();

    stopTimer();

    updateSummary();

    navigateTo("summary");

}


/* =========================================================
   20. SUMMARY
========================================================= */

function updateSummary() {

    const answers =
        appState.sessionAnswers;


    const attempted =
        answers.filter(
            item =>
                item.answer.length > 0
        );


    $("summaryAttempts")
        .textContent =
        attempted.length;


    const rated =
        answers.filter(
            item =>
                item.rating > 0
        );


    if (rated.length) {

        const average =
            rated.reduce(
                (sum, item) =>
                    sum + item.rating,
                0
            ) / rated.length;


        $("summaryConfidence")
            .textContent =
            `${average.toFixed(1)} / 5`;

    } else {

        $("summaryConfidence")
            .textContent =
            "--";

    }


    if (attempted.length) {

        const averageTime =
            attempted.reduce(
                (sum, item) =>
                    sum + item.timeTaken,
                0
            ) / attempted.length;


        $("summaryTime")
            .textContent =
            formatSeconds(
                averageTime
            );

    } else {

        $("summaryTime")
            .textContent =
            "--";

    }


    renderChart(
        $("summaryChart"),
        answers
    );


    renderReviewAnswers(
        $("summaryReviewAnswers"),
        answers
    );

}


/* =========================================================
   21. PROGRESS PAGE
========================================================= */

function updateProgressPage() {

    const answers =
        appState.allAnswers;


    const attempted =
        answers.filter(
            item =>
                item.answer.length > 0
        );


    $("progressAttempts")
        .textContent =
        attempted.length;


    const rated =
        attempted.filter(
            item =>
                item.rating > 0
        );


    if (rated.length) {

        const average =
            rated.reduce(
                (sum, item) =>
                    sum + item.rating,
                0
            ) / rated.length;


        $("progressAverage")
            .textContent =
            `${average.toFixed(1)} / 5`;


        $("progressBest")
            .textContent =
            `${Math.max(
                ...rated.map(
                    item =>
                        item.rating
                )
            )} / 5`;

    } else {

        $("progressAverage")
            .textContent =
            "--";

        $("progressBest")
            .textContent =
            "--";

    }


    if (attempted.length) {

        const averageTime =
            attempted.reduce(
                (sum, item) =>
                    sum + item.timeTaken,
                0
            ) / attempted.length;


        $("progressTime")
            .textContent =
            formatSeconds(
                averageTime
            );

    } else {

        $("progressTime")
            .textContent =
            "--";

    }


    renderChart(
        $("progressChart"),
        answers
    );


    renderReviewAnswers(
        $("reviewAnswers"),
        answers
    );

}


/* =========================================================
   22. HOME STATS
========================================================= */

function updateHomeStats() {

    const answers =
        appState.allAnswers;


    const attempted =
        answers.filter(
            item =>
                item.answer.length > 0
        );


    $("totalAttemptsHome")
        .textContent =
        attempted.length;


    const rated =
        attempted.filter(
            item =>
                item.rating > 0
        );


    if (rated.length) {

        const average =
            rated.reduce(
                (sum, item) =>
                    sum + item.rating,
                0
            ) / rated.length;


        $("averageConfidenceHome")
            .textContent =
            `${average.toFixed(1)} / 5`;


        $("bestConfidenceHome")
            .textContent =
            `${Math.max(
                ...rated.map(
                    item =>
                        item.rating
                )
            )} / 5`;


        const readiness =
            Math.round(
                (average / 5) * 100
            );


        $("homeReadiness")
            .textContent =
            readiness;


        $("homeProgressBar")
            .style.width =
            `${readiness}%`;

    } else {

        $("averageConfidenceHome")
            .textContent =
            "--";

        $("bestConfidenceHome")
            .textContent =
            "--";

        $("homeReadiness")
            .textContent =
            "--";

        $("homeProgressBar")
            .style.width =
            "0%";

    }

}


/* =========================================================
   23. BAR CHART
========================================================= */

function renderChart(
    container,
    answers
) {

    container.innerHTML = "";


    const rated =
        answers.filter(
            item =>
                item.rating > 0
        );


    if (!rated.length) {

        container.innerHTML = `
            <div class="empty-chart">
                Complete some questions and rate your answers
                to see your confidence chart.
            </div>
        `;

        return;
    }


    rated.forEach(
        (item, index) => {

            const itemContainer =
                document.createElement(
                    "div"
                );


            itemContainer.className =
                "bar-item";


            const score =
                document.createElement(
                    "span"
                );


            score.className =
                "bar-score";


            score.textContent =
                `${item.rating}/5`;


            const bar =
                document.createElement(
                    "div"
                );


            bar.className =
                "bar";


            bar.style.height =
                `${item.rating * 20}%`;


            const label =
                document.createElement(
                    "span"
                );


            label.className =
                "bar-label";


            label.textContent =
                `Q${index + 1}`;


            itemContainer.appendChild(
                score
            );

            itemContainer.appendChild(
                bar
            );

            itemContainer.appendChild(
                label
            );


            container.appendChild(
                itemContainer
            );

        }
    );

}


/* =========================================================
   24. REVIEW ANSWERS
========================================================= */

function renderReviewAnswers(
    container,
    answers
) {

    container.innerHTML = "";


    if (!answers.length) {

        container.innerHTML = `
            <p class="empty-review">
                No answers have been recorded yet.
            </p>
        `;

        return;
    }


    answers.forEach(
        (item, index) => {

            const review =
                document.createElement(
                    "article"
                );


            review.className =
                "review-item";


            const question =
                document.createElement(
                    "h3"
                );


            question.textContent =
                `Question ${index + 1}: ${item.question}`;


            const answer =
                document.createElement(
                    "p"
                );


            answer.textContent =
                item.answer ||
                "No answer provided.";


            review.appendChild(
                question
            );

            review.appendChild(
                answer
            );


            if (item.rating > 0) {

                const rating =
                    document.createElement(
                        "div"
                    );


                rating.className =
                    "review-rating";


                rating.textContent =
                    `Confidence: ${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}`;


                review.appendChild(
                    rating
                );

            }


            container.appendChild(
                review
            );

        }
    );

}


/* =========================================================
   25. REVIEW TOGGLES
========================================================= */

$("reviewToggle")
    .addEventListener(
        "click",
        () => {

            toggleReview(
                $("reviewAnswers"),
                $("reviewToggle")
            );

        }
    );


$("summaryReviewToggle")
    .addEventListener(
        "click",
        () => {

            toggleReview(
                $("summaryReviewAnswers"),
                $("summaryReviewToggle")
            );

        }
    );


function toggleReview(
    content,
    button
) {

    const isHidden =
        content.classList.contains(
            "hidden"
        );


    if (isHidden) {

        showElement(content);

        button.setAttribute(
            "aria-expanded",
            "true"
        );

        button.lastElementChild
            .textContent =
            "−";

    } else {

        hideElement(content);

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.lastElementChild
            .textContent =
            "＋";

    }

}


/* =========================================================
   26. FORMAT TIME
========================================================= */

function formatSeconds(seconds) {

    const rounded =
        Math.round(seconds);


    if (rounded < 60) {

        return `${rounded}s`;

    }


    const minutes =
        Math.floor(
            rounded / 60
        );


    const remaining =
        rounded % 60;


    return `${minutes}m ${remaining}s`;

}


/* =========================================================
   27. RANDOM QUESTION MODE
========================================================= */

$("randomQuestionBtn")
    .addEventListener(
        "click",
        startRandomQuestion
    );


function startRandomQuestion() {

    const allQuestions = [];


    Object.entries(
        questionBank
    ).forEach(
        ([sector, sectorData]) => {

            Object.entries(
                sectorData
            ).forEach(
                ([type, typeData]) => {

                    Object.entries(
                        typeData
                    ).forEach(
                        ([level, questions]) => {

                            questions.forEach(
                                question => {

                                    allQuestions.push({

                                        ...question,

                                        sector,

                                        type,

                                        level

                                    });

                                }
                            );

                        }
                    );

                }
            );

        }
    );


    const random =
        allQuestions[
            Math.floor(
                Math.random() *
                allQuestions.length
            )
        ];


    if (!random) {
        return;
    }


    appState.selectedSector =
        random.sector;

    appState.selectedType =
        random.type;

    appState.selectedLevel =
        random.level;


    appState.questions = [
        random
    ];


    appState.currentQuestionIndex = 0;

    appState.sessionAnswers = [];


    $("sectorSelect").value =
        random.sector;

    $("interviewTypeSelect").value =
        random.type;

    $("levelSelect").value =
        random.level;


    hideElement(
        $("pressureSetup")
    );

    showElement(
        $("pressurePractice")
    );


    navigateTo("pressure");

    loadQuestion();

}


/* =========================================================
   28. RESTART INTERVIEW
========================================================= */

$("restartInterviewBtn")
    .addEventListener(
        "click",
        () => {

            navigateTo("pressure");

            hideElement(
                $("pressurePractice")
            );

            showElement(
                $("pressureSetup")
            );

        }
    );


/* =========================================================
   29. VOICE PRACTICE
========================================================= */

const voiceQuestions = [

    "Tell me about yourself and your background.",

    "Why are you interested in this role?",

    "What is your biggest professional strength?",

    "Tell me about a challenging project you completed.",

    "Describe a time when you solved a difficult problem.",

    "How do you handle pressure and deadlines?",

    "Tell me about a time you worked successfully in a team.",

    "What technical or professional skill are you currently improving?",

    "Why should we hire you?",

    "Where do you see yourself in the next three years?"

];


function loadVoiceQuestion() {

    const question =
        voiceQuestions[
            appState.voiceQuestionIndex
        ];


    $("voiceQuestionText")
        .textContent =
        question;


    $("voiceTranscript")
        .innerHTML = `
            <span class="transcript-placeholder">
                Your speech transcript will appear here...
            </span>
        `;


    appState.voiceTranscript = "";

    hideElement(
        $("voiceFeedback")
    );

}


/* =========================================================
   VOICE RECOGNITION
========================================================= */

function initializeSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        $("voiceStatus").textContent =
            "Speech recognition is not supported in this browser.";

        $("voiceInstruction").textContent =
            "Try using Google Chrome or Microsoft Edge.";

        return null;
    }


    const recognition =
        new SpeechRecognition();


    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";


    recognition.onstart = () => {

        appState.isListening = true;

        $("voiceStatus").textContent =
            "Listening... speak naturally";

        $("voiceStatusDot")
            .classList.add(
                "recording"
            );

        $("voiceRecordBtn")
            .classList.add(
                "recording"
            );

        $("voiceButtonIcon")
            .textContent =
            "⏹";

        $("voiceVisualizer")
            .classList.add(
                "active"
            );

        $("voiceInstruction")
            .textContent =
            "Speak clearly. Your answer is being transcribed.";

    };


    recognition.onresult = event => {

        let finalTranscript = "";

        let interimTranscript = "";


        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const transcript =
                event.results[i][0].transcript;


            if (
                event.results[i].isFinal
            ) {

                finalTranscript +=
                    transcript + " ";

            } else {

                interimTranscript +=
                    transcript;

            }

        }


        appState.voiceTranscript +=
            finalTranscript;


        $("voiceTranscript").textContent =
            appState.voiceTranscript +
            interimTranscript;

    };


    recognition.onerror = event => {

        console.error(
            "Speech recognition error:",
            event.error
        );


        $("voiceStatus").textContent =
            `Voice recognition error: ${event.error}`;

        stopVoicePractice();

    };


    recognition.onend = () => {

        if (appState.isListening) {

            /*
               Some browsers stop recognition automatically.
               Restart while the user is still recording.
            */

            try {
                recognition.start();
            } catch (error) {
                console.log(error);
            }

        }

    };


    return recognition;

}


appState.recognition =
    initializeSpeechRecognition();


/* =========================================================
   VOICE RECORD BUTTON
========================================================= */

$("voiceRecordBtn")
    .addEventListener(
        "click",
        () => {

            if (!appState.recognition) {

                alert(
                    "Speech recognition is not supported by this browser."
                );

                return;
            }


            if (appState.isListening) {

                stopVoicePractice();

            } else {

                startVoicePractice();

            }

        }
    );


function startVoicePractice() {

    try {

        appState.recognition.start();

    } catch (error) {

        console.log(error);

    }

}


function stopVoicePractice() {

    appState.isListening = false;


    if (appState.recognition) {

        try {
            appState.recognition.stop();
        } catch (error) {
            console.log(error);
        }

    }


    $("voiceStatus").textContent =
        "Recording stopped";


    $("voiceStatusDot")
        .classList.remove(
            "recording"
        );


    $("voiceRecordBtn")
        .classList.remove(
            "recording"
        );


    $("voiceButtonIcon")
        .textContent =
        "🎙";


    $("voiceVisualizer")
        .classList.remove(
            "active"
        );


    $("voiceInstruction")
        .textContent =
        "Review your transcript or evaluate your answer.";

}


/* =========================================================
   NEW VOICE QUESTION
========================================================= */

$("voiceNewQuestionBtn")
    .addEventListener(
        "click",
        () => {

            if (appState.isListening) {
                stopVoicePractice();
            }


            appState.voiceQuestionIndex =
                (
                    appState.voiceQuestionIndex + 1
                ) %
                voiceQuestions.length;


            loadVoiceQuestion();

        }
    );


/* =========================================================
   VOICE EVALUATION
========================================================= */

$("voiceEvaluateBtn")
    .addEventListener(
        "click",
        evaluateVoiceAnswer
    );


function evaluateVoiceAnswer() {

    if (
        !appState.voiceTranscript.trim()
    ) {

        alert(
            "Please record an answer before evaluating it."
        );

        return;
    }


    const words =
        appState.voiceTranscript
            .trim()
            .split(/\s+/)
            .length;


    let confidence =
        3;


    if (words >= 80) {
        confidence = 5;
    } else if (words >= 50) {
        confidence = 4;
    } else if (words >= 25) {
        confidence = 3;
    } else if (words >= 10) {
        confidence = 2;
    } else {
        confidence = 1;
    }


    let lengthFeedback;


    if (words < 20) {

        lengthFeedback =
            "Your answer was quite short. Try adding a specific example or result.";

    } else if (words > 180) {

        lengthFeedback =
            "Your answer was long. Practice making your main point more concise.";

    } else {

        lengthFeedback =
            "Your answer length is reasonable. Focus on structure and clarity.";

    }


    $("voiceWordCount")
        .textContent =
        words;


    $("voiceConfidence")
        .textContent =
        `${confidence}/5`;


    $("voiceLength")
        .textContent =
        lengthFeedback;


    $("voiceFeedbackText")
        .textContent =
        `Practice feedback: ${lengthFeedback} Use a clear structure, avoid unnecessary filler words, and support your claims with specific examples.`;



    showElement(
        $("voiceFeedback")
    );


    /*
       Voice practice also contributes to the
       in-memory progress dashboard.
    */

    appState.allAnswers.push({

        questionIndex:
            appState.voiceQuestionIndex,

        question:
            voiceQuestions[
                appState.voiceQuestionIndex
            ],

        answer:
            appState.voiceTranscript,

        rating:
            confidence,

        timestamp:
            new Date().toISOString(),

        timeTaken:
            0,

        sector:
            "Voice Practice",

        type:
            "Voice",

        level:
            "General"

    });

}


/* =========================================================
   30. VOICE PAGE INITIALIZATION
========================================================= */

loadVoiceQuestion();


/* =========================================================
   31. INITIAL APPLICATION LOAD
========================================================= */

handleRouteChange();

updateHomeStats();


/* =========================================================
   32. CLEANUP
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        stopTimer();

        if (appState.recognition) {

            try {
                appState.recognition.stop();
            } catch (error) {
                console.log(error);
            }

        }

    }
);