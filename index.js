const questions = [
    {
        question: "Who won the first World Cup in history?",
        options: ["Argentina", "Brazil", "Uruguay", "Germany"],
        correct: 2
    },
    {
        question: "Which club has won the highest Champions League?",
        options: ["Real Madrid", "Manchester United", "Liverpool", "Bayern Munich"],
        correct: 0
    },
    {
        question: "Who has the most Ballon d'Ors?",
        options: ['Cristiano Ronaldo', 'Pele', 'Lionel Messi', 'Gerd Muller'],
        correct: 2
    }
]

const questionNumber = document.getElementById('quiz-question-number');
const questionsAmount = document.getElementById('quiz-question-amount');
const quizTotalPoints = document.getElementById('quiz-points-number');
const questionText = document.getElementById('quiz-question');
const answersWrapper = document.getElementById('quiz-answers-wrapper');
const quizTopBlock = document.querySelector('.quiz-top-block');
const nextBtn = document.getElementById('quiz-next-button');
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-icon');
const menuLinks = document.querySelectorAll('.menu-item-link');

let questionIndex = 1;
let totalPoints = 0;
let answered = false;

function handleAnswer(index) {
    const answerButtons = document.querySelectorAll('.quiz-answer-button');
    answerButtons.forEach(btn => btn.classList.add('quiz-answer-button-disabled'));
    nextBtn.removeAttribute('disabled');
    const isCorrect = index === questions[questionIndex - 1].correct;
    if (isCorrect) {
        answerButtons[index].classList.add('quiz-answer-correct');
        totalPoints += 3;
        quizTotalPoints.innerText = totalPoints;
    } else {
        answerButtons[index].classList.add('quiz-answer-incorrect');
        answerButtons[questions[questionIndex - 1].correct].classList.add('quiz-answer-correct');
    }
    answered = true;
    questionIndex++;
}

function generateQuestion() {
    if (!questions || questions.length === 0) return

    if (questionIndex > questions.length) {
        questionText.innerText = `Congrats on finishing this football quiz! Your score is ${totalPoints} / ${questions.length * 3} points`;
        answersWrapper.style.display = 'none';
        quizTopBlock.style.display = 'none';
        nextBtn.style.display = 'none';
        return
    }

    answered = false;

    const answerButtons = document.querySelectorAll('.quiz-answer-button');
    answerButtons.forEach(btn => btn.remove());

    questionNumber.innerText = questionIndex;
    questionText.innerText = questions[questionIndex - 1].question;
    nextBtn.setAttribute('disabled', 'true');
    if (questionIndex === questions.length) {
        nextBtn.innerText = 'Finish';
    }

    for (let i = 0; i < questions[questionIndex - 1].options.length; i++) {
        const answerButton = document.createElement('button');
        answerButton.setAttribute('type', 'button');
        answerButton.classList.add('quiz-answer-button');
        answerButton.innerText = questions[questionIndex - 1].options[i];
        answerButton.addEventListener('click', event => {
            event.preventDefault();
            if (answered) return;
            handleAnswer(i);
        });
        answersWrapper.appendChild(answerButton);
    }
}

nextBtn.addEventListener('click', generateQuestion);

menuLinks.forEach(link => link.addEventListener('click', () => {
    menuBtn.classList.remove('opened');
    menu.classList.remove('opened');
}));

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('opened');
    menu.classList.toggle('opened');
});

document.addEventListener('DOMContentLoaded', () => {
    questionsAmount.innerText = `/${questions.length}`;
    quizTotalPoints.innerText = totalPoints;
    generateQuestion();
});