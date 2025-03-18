let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0;
let totalQuestions = 0;
let answered = false;
let selectedOption = null;

async function fetchQuestions() {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    if (!email || !password) {
        alert('Please log in to access the quiz section.');
        window.location.href = 'login.html';
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

    answered = false; // Reset the answered flag for the new question
    selectedOption = null; // Reset the selected option for the new question

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
        // Reset previous selection
        selectedOption.classList.remove('selected');
    }

    selectedOption = button; // Update selected option
    selectedOption.classList.add('selected'); // Apply selected class for persistent color change

    if (!answered) { // Ensure correctAnswers is updated only once per question
        answered = true;
        if (option === currentQuestion.javaScript_correct_option) {
            correctAnswers++;
            selectedOption.classList.add('correct'); // Apply correct styling
        } else {
            selectedOption.classList.add('incorrect'); // Apply incorrect styling
        }
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Quiz Completed: Save score and redirect to results page
        sessionStorage.setItem('quizScore', correctAnswers);
        sessionStorage.setItem('totalQuestions', totalQuestions);
        window.location.href = 'result.html';
    }
}

window.onload = fetchQuestions;
