const questions = [
    {
        question: "What does HTML stands for?",
        answers: [
            { text: "Hyper Type Multiple Language", correct: false },
            { text: "Hyper Text Multiple Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Text Multi Language", correct: false }
        ]
    },
    {
        question: "How do you concatenate two strings in Python?",
        answers: [
            { text: "A.str1 . str2", correct: false },
            { text: "B.str1 + str2", correct: true },
            { text: "C.str1 , str2", correct: false },
            { text: "D.concat(str1, str2)", correct: false }
        ]
    },
    {
        question: "How do you find the length of a list in Python?",
        answers: [
            { text: "len(list)", correct: true },
            { text: "length(list)", correct: false },
            { text: "list.length()", correct: false },
            { text: "count(list)", correct: false }
        ]
    },
    {
        question: "What is a variable in Python?",
        answers: [
            { text: "reserved word", correct: false },
            { text: "A data type", correct: false },
            { text: "A location in memory to store data", correct: true },
            { text: "A function", correct: false }
        ]
    },
    {
        question: "In Python, can a while loop have multiple else blocks?",
        answers: [
            { text: "Yes", correct: false },
            { text: "No", correct: true },
            { text: "Only if the loop has multiple conditions.", correct: false },
            { text: "Only if the loop uses nested if statements.", correct: false }
        ]
    },
    {
        question: "What is the default value of a boolean in Java?",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true },
            { text: "null", correct: false },
            { text: "0", correct: false }
        ]
    },
    {
        question: "What is the size of the char type in Java?",
        answers: [
            { text: "8 bits", correct: false },
            { text: "32 bits", correct: false },
            { text: "16 bits", correct: true },
            { text: "Depends on the platform", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT an OOP concept in Java?",
        answers: [
            { text: "Encapsulation", correct: false },
            { text: "Inheritance", correct: false },
            { text: "Polymorphism", correct: false },
            { text: "Compilation", correct: true }
        ]
    },
    {
        question: "CSS is written in which language?",
        answers: [
            { text: "PHP", correct: false },
            { text: "HTML", correct: true }, // ❌ This should be CSS (fix later if needed)
            { text: "JAVA", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which of the following CSS Property sets the stacking order of positioned elements?",
        answers: [
            { text: "y-index", correct: false },
            { text: "z-index", correct: true },
            { text: "x-index", correct: false },
            { text: "none of the above", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

function startQuiz() {
    userName = document.getElementById("username").value;
    if (userName.trim() === "") {
        alert("Please enter your name!");
        return;
    }

    document.getElementById("start-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";
    document.getElementById("welcome-text").innerText = `Hello, ${userName}! Let's start our quiz!`;

    showQuestion();
    updateScore();
}

function showQuestion() {
    resetState();
    let questionObj = questions[currentQuestionIndex];
    document.getElementById("question-container").innerText = questionObj.question;
    document.getElementById("progress").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionObj.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.onclick = () => selectAnswer(button, answer.correct);
        document.getElementById("answer-buttons").appendChild(button);
    });
}

function resetState() {
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("answer-buttons").innerHTML = "";
}

function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("correct");
        score++;
        updateScore();
    } else {
        button.classList.add("wrong");
    }

    Array.from(document.getElementById("answer-buttons").children).forEach(btn => {
        btn.disabled = true;
        if (questions[currentQuestionIndex].answers.find(a => a.correct).text === btn.innerText) {
            btn.classList.add("correct");
        }
    });

    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";
    document.getElementById("score-text").innerText = `${userName}, your score is ${score} / ${questions.length}`;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "block";
    document.getElementById("username").value = "";
}

// ✅ FIX: move updateScore() outside
function updateScore() {
    document.getElementById("live-score").innerText = `Score: ${score} / ${questions.length}`;
}
