function allDone() {




	questionsSection.innerHTML = "";
	timer.innerHTML = "";

	var addNewH1 = document.createElement("h1");
	addNewH1.setAttribute("id", "addNewH1");
	addNewH1.textContent = "Game Over!!";

	questionsSection.appendChild(addNewH1);

	var addNewP = document.createElement("p");
	addNewP.setAttribute("id", "addNewP");

	questionsSection.appendChild(addNewP);

	if (secondsLeft >= 0) {
		var timeRemaining = secondsLeft;
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
			window.location.replace("./HighScores.html");
		}
	});
}






