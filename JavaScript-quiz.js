let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0;
let totalQuestions = 0;
let answered = false;
let selectedOption = null;
let timerInterval = null;
let timeLeft = 0;

async function fetchQuestions() {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    if (!email || !password) {
        alert('Please log in to access the quiz section.');
        window.location.href = 'login.html';
        return;
    }

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    headers.append('Content-Type', 'application/json');

    try {
        const response = await fetch('http://localhost:8081/api/java-script-questions', {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        questions = await response.json();
        totalQuestions = questions.length;
        document.getElementById('total-questions').textContent = totalQuestions;

        // Start the timer here
        startTimer(totalQuestions * 30);

        displayQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
        document.getElementById('question-text').textContent = "Failed to load questions. Please try again.";
    }
}

function displayQuestion() {
    if (questions.length === 0) return;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestion = questions[currentQuestionIndex];

    answered = false;
    selectedOption = null;

    questionText.textContent = currentQuestion.javaScript_Question;
    optionsContainer.innerHTML = '';

    currentQuestion.javaScript_options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => selectOption(button, option);
        optionsContainer.appendChild(button);
    });

    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
}

function selectOption(button, option) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }

    selectedOption = button;
    selectedOption.classList.add('selected');

    if (!answered) {
        answered = true;
        if (option === currentQuestion.javaScript_correct_option) {
            correctAnswers++;
            selectedOption.classList.add('correct');
        } else {
            selectedOption.classList.add('incorrect');
        }
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        clearInterval(timerInterval); // Stop timer on quiz finish
        sessionStorage.setItem('quizScore', correctAnswers);
        sessionStorage.setItem('totalQuestions', totalQuestions);
        window.location.href = 'result.html';
    }
}

function startTimer(durationInSeconds) {
    timeLeft = durationInSeconds;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuizDueToTimeout();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function finishQuizDueToTimeout() {
    alert("⏰ Time's up! Submitting your quiz.");
    sessionStorage.setItem('quizScore', correctAnswers);
    sessionStorage.setItem('totalQuestions', totalQuestions);
    window.location.href = 'result.html';
}

window.onload = fetchQuestions;
