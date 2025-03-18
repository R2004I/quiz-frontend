function startQuiz(quizType) {
    alert(`Starting ${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz!`);
    
    // Redirecting to the corresponding quiz page based on the selected type
    window.location.href = `${quizType}-quiz.html`; // Assumes pages are named quiz-java.html, quiz-python.html, etc.
}

function moveTo() {
     const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    if (!email || !password) {
        window.location.href = 'login.html';
        return;
    }
    else {
        window.location.href = 'index.html#quiz-packages';
    }
}

 function redirectToQuiz() {
        let topic = document.getElementById("quiz-topic").value.trim();
        if (topic) {
            window.location.href = `custom-quiz.html?topic=${encodeURIComponent(topic)}`;
        } else {
            alert("Please enter a topic before proceeding!");
        }
    }




