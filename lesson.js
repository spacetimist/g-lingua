const checkButton = document.getElementById('check-answer');
const tryAgainButton = document.getElementById('try-again');
const feedback = document.getElementById('feedback');
const finishButton = document.getElementById('finish-quiz');
const completionMessage = document.getElementById('completion-message');
const nextButton = document.getElementById('next-question');
const questionText = document.getElementById('question-text');
const wordBank = document.getElementById('word-bank');
const questionNumber = document.getElementById('question-number');
const sentenceContainer = document.getElementById('sentence-container');

// Load the current question index from LocalStorage or default to 0 (first question)
let currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;
let draggedWord = null;
const progressBar = document.getElementById('progress-bar');

// List of questions and correct answers
const questions = [
    { text: '"Cuacanya indah"', words: ['The', 'weather', 'is', 'lovely'], answer: ['The', 'weather', 'is', 'lovely'] },
    { text: '"Aku suka hari-hari cerah"', words: ['sunny', 'days', 'like', 'I'], answer: ['I', 'like', 'sunny', 'days'] },
    { text: '"Hari ini hujan"', words: ['is', 'Today', 'rainy'], answer: ['Today', 'is', 'rainy'] },
    { text: '"Di luar sedang panas"', words: ['hot', 'It\'s', 'outside'], answer: ['It\'s', 'hot', 'outside'] }
];

// Event listener untuk 'dragstart' pada word bank
function addWordEventListeners() {
    const wordElements = document.querySelectorAll('.word');
    wordElements.forEach(word => {
        word.addEventListener('dragstart', (e) => {
            draggedWord = e.target;
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 0);
        });
        word.addEventListener('dragend', (e) => {
            setTimeout(() => {
                e.target.style.display = 'inline-block';
                draggedWord = null;
            }, 0);
        });
    });
}

// Function to create the appropriate number of drop zones
function createDropZones(numZones) {
    sentenceContainer.innerHTML = '';  // Clear any existing drop zones
    for (let i = 0; i < numZones; i++) {
        const dropZone = document.createElement('div');
        dropZone.classList.add('drop-zone');
        dropZone.setAttribute('data-order', i + 1);
        sentenceContainer.appendChild(dropZone);
    }

    const dropZones = document.querySelectorAll('.drop-zone');

    // Event listener untuk 'dragover' dan 'drop' pada drop zone
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            if (!zone.hasChildNodes()) {
                zone.appendChild(draggedWord);
                checkIfSentenceFull(); // Cek jika semua drop zone terisi
            }
        });
    });
}

// Logic untuk mengecek apakah semua drop zone terisi
function checkIfSentenceFull() {
    const dropZones = document.querySelectorAll('.drop-zone');
    const allFilled = Array.from(dropZones).every(zone => zone.children.length > 0);
    checkButton.disabled = !allFilled; // Aktifkan atau nonaktifkan tombol Check Answer
}

// Logic untuk mengecek jawaban pengguna
checkButton.addEventListener('click', () => {
    const correctOrder = questions[currentQuestionIndex].answer; 
    let userAnswer = [];
    
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        if (zone.children.length > 0) {
            userAnswer.push(zone.children[0].textContent);
        } else {
            userAnswer.push('');
        }
    });

    // Cek apakah jawaban benar (hanya untuk drop zone yang berisi kata)
    const filteredUserAnswer = userAnswer.filter(answer => answer !== '');

    if (JSON.stringify(filteredUserAnswer) === JSON.stringify(correctOrder)) {
        feedback.textContent = "Correct! Well done!";
        feedback.style.color = "green";
        if (currentQuestionIndex === questions.length - 1) {
            showCompletionMessage(); // Tampilkan pesan penyelesaian
            finishButton.classList.remove('hidden');
            finishButton.classList.add('show');;
            scrollToFinishButton(); 
            checkButton.classList.add('hidden');
            updateProgressBar();
        } else {
            nextButton.classList.add('show'); // Tampilkan tombol "Next Question" jika belum soal terakhir
        }
        tryAgainButton.classList.add('hidden'); // Sembunyikan tombol "Try Again"
    } else {
        feedback.textContent = "Incorrect, try again!";
        feedback.style.color = "red";
        tryAgainButton.classList.remove('hidden'); // Tampilkan tombol "Try Again"
    }
});

tryAgainButton.addEventListener('click', () => {
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.innerHTML = ''; // Kosongkan drop zone
    });

    // Kembalikan kata-kata ke word bank
    loadWordBank(currentQuestionIndex);
    
    feedback.textContent = ""; // Reset feedback
    tryAgainButton.classList.add('hidden'); // Sembunyikan tombol "Try Again"
    checkButton.disabled = true; // Nonaktifkan tombol Check Answer
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    // Save progress to LocalStorage
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    loadQuestion(currentQuestionIndex);
    nextButton.classList.remove('show'); 
    feedback.textContent = ""; // Reset feedback
    updateProgressBar();
});

// Function to load question
function loadQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.text;
    questionNumber.textContent = index + 1 + '.';

    // Create the appropriate number of drop zones
    createDropZones(question.words.length);

    // Load word bank
    loadWordBank(index);
}

// Function to load word bank
function loadWordBank(index) {
    const question = questions[index];
    wordBank.innerHTML = '';
    question.words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.setAttribute('draggable', 'true');
        wordDiv.textContent = word;
        wordBank.appendChild(wordDiv);
    });

    // Re-apply event listeners to new word elements
    addWordEventListeners();
}

// Function to show completion message
function showCompletionMessage() {
    completionMessage.classList.remove('hidden');
    setTimeout(() => {
        completionMessage.classList.add('show');
    }, 100);
}

// Event listener untuk 'Finish Lesson' button
finishButton.addEventListener('click', () => {
    // Clear the progress in LocalStorage upon finishing
    localStorage.removeItem('currentQuestionIndex');
    window.location.href = 'index.html';
});

// Function to scroll to the completion message
function scrollToFinishButton() {
    finishButton.scrollIntoView({ behavior: 'smooth' }); // Gulir dengan efek smooth
}

function updateProgressBar() {
    const totalQuestions = questions.length;
    const progress = (currentQuestionIndex / (totalQuestions)) * 100; // Hitung persentase progress
    progressBar.style.width = `${progress}%`; // Perbarui lebar progress bar
}

window.onload = () => {
    loadQuestion(currentQuestionIndex);
    updateProgressBar(); // Perbarui progress bar sesuai posisi soal saat ini
};

// Load the saved question on page load
loadQuestion(currentQuestionIndex);
addWordEventListeners();
