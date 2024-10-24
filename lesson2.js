const checkButton = document.getElementById('check-answer');
const userAnswerInput = document.getElementById('user-answer');
const feedback = document.getElementById('feedback');
const nextQuestionButton = document.getElementById('next-question');
const finishButton = document.getElementById('finish-quiz');
const completionMessage = document.getElementById('completion-message');

// List of correct answers for each question
const correctAnswers = ["The weather is lovely", "Today is rainy"];

// Current question number, load from localStorage if available
let currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 0;

// Load progress on page load
window.onload = () => {
    loadProgress();
};

// Function to check the user's answer
checkButton.addEventListener('click', () => {
    let userAnswer = userAnswerInput.value.trim().toLowerCase();
    let correctAnswer = correctAnswers[currentQuestion].toLowerCase();

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Correct! Well done!";
        feedback.style.color = "green";

        // Save progress to localStorage
        localStorage.setItem('currentQuestion', currentQuestion);

        // Show 'Next Question' or 'Finish' button depending on question number
        if (currentQuestion < correctAnswers.length - 1) {
            nextQuestionButton.classList.remove('hidden');
        } else {
            showCompletionMessage();
            finishButton.classList.remove('hidden');
            finishButton.classList.add('show');;
            scrollToFinishButton(); 
            checkButton.classList.add('hidden');
        }
    } else {
        feedback.textContent = "Incorrect, try again!";
        feedback.style.color = "red";
    }
});

// Function to move to the next question
nextQuestionButton.addEventListener('click', () => {
    currentQuestion++;
    loadNextQuestion();
    // Save progress after moving to next question
    localStorage.setItem('currentQuestion', currentQuestion);
});

function loadNextQuestion() {
    // Clear previous feedback and answer
    feedback.textContent = "";
    userAnswerInput.value = "";
    
    // Update question and audio source
    document.getElementById('question-number').textContent = (currentQuestion + 1) + ".";
    document.getElementById('lesson-audio').src = `assets/audio${currentQuestion + 1}.mp3`;

    // Hide 'Next Question' button
    nextQuestionButton.classList.add('hidden');
}

function loadProgress() {
    currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 0;
    
    // Load the question and audio based on saved progress
    document.getElementById('question-number').textContent = (currentQuestion + 1) + ".";
    document.getElementById('lesson-audio').src = `assets/audio${currentQuestion + 1}.mp3`;

    if (currentQuestion >= correctAnswers.length) {
        showCompletionMessage();  // Show completion if all questions are done
    }
}

// Event listener for 'Finish Lesson' button
finishButton.addEventListener('click', () => {
    localStorage.removeItem('currentQuestion');
    window.location.href = 'index.html';
});

function scrollToFinishButton() {
    finishButton.scrollIntoView({ behavior: 'smooth' }); // Gulir dengan efek smooth
}

function showCompletionMessage() {
    completionMessage.classList.remove('hidden');
    
    // Add class 'show' for transition effect
    setTimeout(() => {
        completionMessage.classList.add('show');
    }, 100);
}
