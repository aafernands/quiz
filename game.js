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
			"Which of the following will write the message “Hello World!” in an alert box?",
		choices: [
			"alertBox(“Hello World!”);",
			"alert(Hello World!);",
			"msgAlert(“Hello World!”);",
			"alert(“Hello World!”);",
		],
		correctAnswer: "alert(“Hello World!”);",
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
var questionResult = document.querySelector("#questionResult");

var score = 0;
var questionIndex = 0;
var penalty = 10;
// var choiceList = document.createElement("ul"); // use this if you are not creating the html
var choiceList = document.querySelector("#choicesUl");
var countDown = 75;
var holdInterval;

function checkAnswer(event) {
	// li element, because you click on the li
	var element = event.target;

	// pause timmer
	stopTimmer();

	// compare current click li text to current question answer
	if (element.textContent === questions[questionIndex].correctAnswer) {
		// correct
		score++; // increment the score by 1

		// let the user know that it's correct
		questionResult.textContent =
			"CORRECT! 😃  The correct answer is:  " +
			questions[questionIndex].correctAnswer;

		questionResult.style.cssText =
			"color: green; padding: 10px; font-weight: bold; margin: 5px;textAlign: center";
		// apply style when it's correct
	} else {
		// incorrect
		countDown -= penalty; // decrement the score by 1

		// update the count down view
		currentTime.innerHTML = "Time : " + countDown;

		// let the user know that it's incorrect
		questionResult.textContent =
			"WRONG! 😮  The answer is:  " + questions[questionIndex].correctAnswer;

		questionResult.style.cssText =
			"color: red; padding: 10px; font-weight: bold; margin: 5px;textAlign: center;"; // apply style when it's wrong
	}

	// increment the question index to the next question
	questionIndex++;

	// wait 2 sec to show the result then render the next question
	setTimeout(function () {
		// clear result
		questionResult.textContent = "";

		// check if the next index is greater than the question length; you are over the question
		if (questionIndex >= questions.length) {
			allDone();
		} else {
			// continue timer
			startTimmer();

			// if there still question left to display
			renderQuizQuestion(questionIndex);
		}
	}, 2000);
}

function allDone() {
	// clear question
	questionsSection.innerHTML = "";

	// clear timmer
	currentTime.innerHTML = "";

	// create h1 with text "Game Over!!"
	var addNewH1 = document.createElement("h2");
	addNewH1.textContent = "Game Over!!";

	// append h1 to the question section
	questionsSection.appendChild(addNewH1);

	// create p tag with with id of addNewP - * addNewP have css style to change font size
	var addNewP = document.createElement("p");
	addNewP.setAttribute("id", "addNewP");
	addNewP.textContent =
		"Your final score is: " + score + "/" + questions.length;
	// <p id="addNewP">Your final score is [score]/[question lenght]</p>

	// append p to question section
	questionsSection.appendChild(addNewP);

	setTimeout(function () {
		// prompt user for initial
		initials = window.prompt("Please enter initial");

		// if canceled then go to high score
		if (null) {
			window.location.replace("highScores.html");
		}

		var finalScore = {
			initials: initials || "Amymous",
			score: score,
		};

		// get high score from local storage
		var allScores = localStorage.getItem("allScores");

		if (allScores === null) {
			allScores = [];
		} else {
			allScores = JSON.parse(allScores);
		}

		allScores.push(finalScore);
		var newScore = JSON.stringify(allScores);

		// save high score to local stroage
		localStorage.setItem("allScores", newScore);

		// redirect to high score page
		// window.location.href = 'highScores.html'
		window.location.replace("highScores.html");
	}, 3000);
}

function startTimmer() {
	holdInterval = setInterval(function () {
		countDown--;
		currentTime.textContent = "Time : " + countDown;

		if (countDown <= 0) {
			clearInterval(holdInterval);
			allDone();
			currentTime.textContent = "Time's up!";
		}
	}, 1000);
}

function stopTimmer() {
	clearInterval(holdInterval);
}

function renderQuizQuestion(questionIndex) {
	// clearing the list in the UL
	choiceList.innerHTML = "";

	// grab the question from the array by the index
	// question[question1, question2];
	var quizChoices = questions[questionIndex].choices;
	questionsSection.textContent = questions[questionIndex].questionsTitle;

	// for each choice in the question create a li with click event and append to the choice list
	quizChoices.forEach(function (choice) {
		var listItem = document.createElement("li");
		listItem.textContent = choice;
		choiceList.appendChild(listItem);
		listItem.addEventListener("click", checkAnswer); // when the li is clicked, checkAnswer the question with answer
	});

	// append the list to the question selection
	questionsSection.appendChild(choiceList);
}

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function randomizeQuiz() {
	questions = shuffle(questions);
}

function startQuiz() {
	// randomlize quiz
	randomizeQuiz();

	// start timmer
	startTimmer();

	// render first question by passing in 0 index of the array
	renderQuizQuestion(0);
}

// when page load run start quizk
window.addEventListener("load", startQuiz);

// when user switch to a different tab then stop timmer
window.addEventListener("blur", stopTimmer);

// when user switch back to quiz tab then start timmer
window.addEventListener("focus", startTimmer);
