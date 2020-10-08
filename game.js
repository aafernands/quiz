const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressTest = document.querySelector("#progressTest");
const scoreText = document.querySelector("#score");
const progresssBarFull = document.querySelector("#progresssBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
var timerEl = document.querySelector("#timer");

let questions = [
	{
		question: "Commonly used data types DO NOT include:",
		choice1: "strings",
		choice2: "booleans",
		choice3: "alerts",
		choice4: "numbers",
		answer: 2,
	},
	{
		question: "Whta the biggest City in the World?",
		choice1: "NYC",
		choice2: "Sao Paulo",
		choice3: "Dubai",
		choice4: "Las Vegas",
		answer: 3,
	},
	{
		question: "The condition in an if / else statement is enclosed?",
		choice1: "NYC",
		choice2: "Sao Paulo",
		choice3: "Dubai",
		choice4: "Las Vegas",
		answer: 4,
	},
	{
		question: "The condition in an if / else statement is enclosed?",
		choice1: "NYC",
		choice2: "Sao Paulo",
		choice3: "Dubai",
		choice4: "Las Vegas",
		answer: 4,
	},
];

var intervalId;
var time = 20;

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem("mostRecentScore", score);

		return window.location.assign("end.html");
	}

	questionCounter++;
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
	// progresssBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionsIndex];
	question.innerText = currentQuestion.question;

	choices.forEach((choice) => {
		const number = choice.dataset["number"];
		choice.innerText = currentQuestion["choice" + number];
	});

	availableQuestions.splice(questionsIndex, 1);

	acceptingAnswers = true;
};

choices.forEach((choice) => {
	choice.addEventListener("click", (e) => {
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];

		let classToApply =
			selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

		if (classToApply === "correct") {
			incrementScore(SCORE_POINTS);
		}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
};

startGame();
