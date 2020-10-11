var questions = [
	{
		questionsTitle: "What is the Italian word for pie?",
		choices: ["pizza", "pasta", "alerts", "macarroni"],
		correctAnswer: "pizza",
	},
	{
		questionsTitle: "What animals are pearls found in?",
		choices: ["octupus", "whale", "oysters", "crab"],
		correctAnswer: "oysters",
	},
	{
		questionsTitle: "Which email service is owned by Microsoft?",
		choices: ["gmail", "hotmail", "yahoo", "net"],
		correctAnswer: "hotmail",
	},
	{
		questionsTitle: "Which ocean surrounds the Maldives? ",
		choices: ["Indic Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"],
		correctAnswer: "Indic Ocean",
	},
	{
		questionsTitle: "What is one quarter of 1,000?",
		choices: ["200", "230", "150", "250"],
		correctAnswer: "250",
	},
];

var timer = document.querySelector("#timer");
var startTime = document.querySelector("#startTime");
var questionsSection = document.querySelector("#questionsSection");
var wrapper = document.querySelector("#wrapper");

var score = 0;
var questionIndex = 0;
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var addNewuL = document.createElement("ul");

timer.addEventListener("click", function () {
	// We are checking zero because its originally set to zero
	if (holdInterval === 0) {
		holdInterval = setInterval(function () {
			secondsLeft--;
			timer.textContent = "Time : " + secondsLeft;

			if (secondsLeft <= 0) {
				clearInterval(holdInterval);
				allDone();
				timer.textContent = "Time's up!";
			}
		}, 1000);
	}
});

function render(questionIndex) {
	questionsSection.innerHTML = "";
	addNewuL.innerHTML = "";
	for (var i = 0; i < questions.length; i++) {
		var userQuestion = questions[questionIndex].questionsTitle;
		var userChoices = questions[questionIndex].choices;
		questionsSection.textContent = userQuestion;
	}
	userChoices.forEach(function (newItem) {
		var listItem = document.createElement("li");
		listItem.textContent = newItem;
		questionsSection.appendChild(addNewuL);
		addNewuL.appendChild(listItem);
		listItem.addEventListener("click", compare);
	});
}

function compare(event) {
	var element = event.target;

	if (element.matches("li")) {
		var addNewDiv = document.createElement("div");
		addNewDiv.setAttribute("id", "addNewDiv");
		if (element.textContent == questions[questionIndex].correctAnswer) {
			score++;
			addNewDiv.textContent =
				"CORRECT! 😃  The correct answer is:  " +
				questions[questionIndex].correctAnswer;
		} else {
			secondsLeft = secondsLeft - penalty;
			addNewDiv.textContent =
				"WRONG! 😮  The Answer is:  " +
				questions[questionIndex].correctAnswer;
		}
	}
	questionIndex++;

	if (questionIndex >= questions.length) {
		// All done will append last page with user stats
		allDone();
		addNewDiv.textContent =
			"End of quiz!" +
			" " +
			"You got  " +
			score +
			"/" +
			questions.length +
			" Correct!";
	} else {
		render(questionIndex);
	}
	questionsSection.appendChild(addNewDiv);
} // All done will append last page - end.js

render(questionIndex);
