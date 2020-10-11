var questions = [
	{
		questionsTitle: "JavaScript is a ____ -side programming language.",
		choices: ["Client", "Server", "Both", "None"],
		correctAnswer: "Both",
	},

	{
		questionsTitle:
			"The external JavaScript file must contain the <script> tag.",
		choices: ["True", "False"],
		correctAnswer: "False",
	},

	{
		questionsTitle:
			"Which of the following will write the message “Hello DataFlair!” in an alert box?",
		choices: [
			"alertBox(“Hello DataFlair!”);",
			"alert(Hello DataFlair!);",
			"msgAlert(“Hello DataFlair!”);",
			"alert(“Hello DataFlair!”);",
		],
		correctAnswer: "alert(“Hello DataFlair!”);",
	},
	{
		questionsTitle: "Which of the following statements will throw an error?",
		choices: [
			"var fun = function bar( ){ }",
			"var fun = function bar{ }",
			"function fun( ){ }",
			"function fun( )[]",
		],
		correctAnswer: "var fun = function bar{ }",
	},
	{
		questionsTitle: "How do you find the minimum of x and y using JavaScript? ",
		choices: ["min(x,y);", "Math.min(xy)", " min(xy);", "Math.min(x,y)"],
		correctAnswer: "Math.min(x,y)",
	},
	{
		questionsTitle: "Inside which HTML element do we put the JavaScript?",
		choices: ["<script>", "<javascript", "js", "None"],
		correctAnswer: "<script>",
	},
];

var currentTime = document.querySelector("#currentTime");
var startTime = document.querySelector("#startTime");
var questionsSection = document.querySelector("#questionsSection");
var wrapper = document.querySelector("#wrapper");

var timeRemaining;

var score = 0;
var questionIndex = 0;
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var addNewuL = document.createElement("ul");

window.addEventListener(
	"load",

	function () {
		if (holdInterval === 0) {
			holdInterval = setInterval(function () {
				secondsLeft--;
				currentTime.textContent = "Time : " + secondsLeft;

				if (secondsLeft <= 0) {
					clearInterval(holdInterval);
					allDone();
					currentTime.textContent = "Time's up!";
				}
			}, 1000);
		}
	}
);

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
				"WRONG! 😮  The answer is:  " + questions[questionIndex].correctAnswer;
		}
		setTimeout(function () {
			addNewDiv.textContent = "";
		}, 1500);
	}

	questionIndex++;

	if (questionIndex >= questions.length) {
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
		setTimeout(function () {
			render(questionIndex);
		}, 1500);
	}
	questionsSection.appendChild(addNewDiv);
}

function allDone() {
	questionsSection.innerHTML = "";
	currentTime.innerHTML = "";

	var addNewH1 = document.createElement("h1");
	addNewH1.setAttribute("id", "addNewH1");
	addNewH1.textContent = "Game Over!!";

	questionsSection.appendChild(addNewH1);

	var addNewP = document.createElement("p");
	addNewP.setAttribute("id", "addNewP");

	questionsSection.appendChild(addNewP);

	if (secondsLeft >= 0) {
		timeRemaining = secondsLeft;
		var addNewP2 = document.createElement("p");
		clearInterval(holdInterval);
		addNewP.textContent = "Your final score is: " + timeRemaining;

		questionsSection.appendChild(addNewP2);
	}

	var addNewLabel = document.createElement("label");
	addNewLabel.setAttribute("id", "addNewLabel");
	addNewLabel.textContent = "Enter your initials: ";

	questionsSection.appendChild(addNewLabel);

	var createInput = document.createElement("input");
	createInput.setAttribute("type", "text");
	createInput.setAttribute("id", "initials");
	createInput.textContent = "";

	questionsSection.appendChild(createInput);

	var addSubmitButton = document.createElement("button");
	addSubmitButton.setAttribute("type", "submit");
	addSubmitButton.setAttribute("id", "Submit");
	addSubmitButton.textContent = "Submit";

	questionsSection.appendChild(addSubmitButton);

	addSubmitButton.addEventListener("click", function () {
		var initials = createInput.value;

		if (initials === null) {
			console.log("No value entered!");
		} else {
			var finalScore = {
				initials: initials,
				score: timeRemaining,
			};
			console.log(finalScore);
			var allScores = localStorage.getItem("allScores");
			if (allScores === null) {
				allScores = [];
			} else {
				allScores = JSON.parse(allScores);
			}
			allScores.push(finalScore);
			var newScore = JSON.stringify(allScores);
			localStorage.setItem("allScores", newScore);
			// Travels to final page
			window.location.replace("highScores.html");
		}
	});
}
render(questionIndex);
