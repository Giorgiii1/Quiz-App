const questions = [
    {
        question: "What is a variable in programming?",
        answers: [
            { text: "A storage location for data", correct: true },
            { text: "A type of function", correct: false },
            { text: "A loop structure", correct: false },
            { text: "A conditional statement", correct: false }
        ]
    },
    {
        question: "Which programming language is mainly used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighText Machine Language", correct: false },
            { text: "HyperTransfer Markup Language", correct: false },
            { text: "HyperTool Multi Language", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Google", correct: false },
            { text: "Apple", correct: false }
        ]
    },
    {
        question: "What year was JavaScript first released?",
        answers: [
            { text: "1995", correct: true },
            { text: "2000", correct: false },
            { text: "1990", correct: false },
            { text: "2005", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
};

const showQuestion = () => {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;

    questionElement.textContent = `${questionNumber}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.dataset.correct = String(answer.correct);
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
};

const resetState = () => {
    nextButton.style.display = "none";
    // Clear any existing answer buttons before rendering the next question.
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

const selectAnswer = (event) => {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    selectedButton.classList.add(isCorrect ? "correct" : "incorrect");
    if (isCorrect) {
        score += 1;
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
};

const showScore = () => {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
};

const handleNextButton = () => {
    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();