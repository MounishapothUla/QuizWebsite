// Quiz data
const quizData = {
    science: [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe", "Cu"],
            correct: 0
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1
        },
        // Add more questions
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "Who was the first President of the United States?",
            options: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "George Washington"],
            correct: 3
        },
        // Add more questions
    ],
    geography: [
        {
            question: "What is the capital of Japan?",
            options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
            correct: 2
        },
        {
            question: "Which is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correct: 3
        },
        // Add more questions
    ]
};

let currentQuiz = null;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function startQuiz(category) {
    currentQuiz = category;
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    document.querySelector('.quiz-categories').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('quiz-title').textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Quiz`;
    
    showQuestion();
}

function showQuestion() {
    const questionData = quizData[currentQuiz][currentQuestion];
    document.getElementById('question-text').textContent = questionData.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    document.getElementById('submit-answer').classList.remove('hidden');
    document.getElementById('next-question').classList.add('hidden');
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    selectedAnswer = index;
}

document.getElementById('submit-answer').addEventListener('click', () => {
    if (selectedAnswer === null) {
        alert('Please select an answer');
        return;
    }
    
    const correct = quizData[currentQuiz][currentQuestion].correct === selectedAnswer;
    if (correct) score++;
    
    document.getElementById('submit-answer').classList.add('hidden');
    document.getElementById('next-question').classList.remove('hidden');
});

document.getElementById('next-question').addEventListener('click', () => {
    currentQuestion++;
    selectedAnswer = null;
    
    if (currentQuestion < quizData[currentQuiz].length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    const percentage = (score / quizData[currentQuiz].length) * 100;
    document.getElementById('quiz-container').innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your score: ${score}/${quizData[currentQuiz].length} (${percentage}%)</p>
        <button onclick="location.reload()">Try Another Quiz</button>
    `;
    
    // Save score to leaderboard
    saveScore(currentQuiz, score);
}