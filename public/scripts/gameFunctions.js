function resetOff() {
	 
	resetGameVar.disabled = true;
	resetGameVar.style.display = 'none'; 
	
}

function resetOn() {
	 
	resetGameVar.disabled = false;
	resetGameVar.style.display = 'initial'; 
	
}

function startOff() {
	 
	startGameVar.disabled = true;
	startGameVar.style.display = 'none';
	
}

function startOn() {
	 
	startGameVar.disabled = false;
	startGameVar.style.display = 'initial';
	
}

function continueOff() {
	 
	continueVar.disabled = true;
	
}

function continueOn() {
	 
	continueVar.disabled = false;
	
	continueVar.focus(); 
	
}

function problemContainerOff() {
	
	problemContainerVar.style.display = 'none';
	
}

function problemContainerOn() {
	
	problemContainerVar.style.display = 'block';
	
}

//TIMER FUNCTIONS

function setUpTimer() {
	
	//timer 
	timerVar.innerHTML = '01:00'; 
	timerVar.style.display = "block"; 
	setTimer = setInterval(countDown, 1000); 
	
	//timer circle
	perimeter = timerCircle.getAttribute('r') * 2 * Math.PI; 
	timerCircle.setAttribute('stroke-dasharray', perimeter); 
	timerDiv.style.display = "block"; 
	
	remainingTime = startTime; 
	
}

function endTimer() {
	
	//stop screen timer
	clearInterval(setTimer); 
	
}

function clearTimer() {
	
	timerVar.style.display = "none"; 
	
}

function countDown() {
			
	//startTime--; 
	remainingTime--; 
	
	tick(); 
			
	//if(startTime > 9)
	if(remainingTime > 9)
		{
			//timerVar.innerHTML = '00:' + startTime; 
			timerVar.innerHTML = '00:' + remainingTime; 
		}
	else
		{
			//timerVar.innerHTML = '00:0' + startTime; 
			timerVar.innerHTML = '00:0' + remainingTime;
		}
	//if(startTime < 1)
	if(remainingTime < 1)
		{
			timeout(); 
		}
			
}

function tick() {
	
	timerCircle.setAttribute('stroke-dashoffset', 
		perimeter * remainingTime / startTime - perimeter
	);
	
}

function wrongAnswer(amount) {
	
	finalScore -= amount;
	continueVar.style.backgroundColor = 'rgba(255,80,50,0.10)';
	document.getElementById('popup').innerHTML = '<div class="incorrectAnswer"><i class="fas fa-thumbs-down"></i>' + ' -' + amount + '</div>';
	
}

function wrongAnswerNoScore() {
	
	continueVar.style.backgroundColor = 'rgba(255,80,50,0.10)';
	document.getElementById('popup').innerHTML = '<div class="incorrectAnswer"><i class="fas fa-thumbs-down"></i>' + ' ' + '</div>';
	
}

function correctAnswer(amount) {
	
	finalScore += amount;
	continueVar.style.backgroundColor = 'rgba(80,255,150,0.10)';
	document.getElementById('popup').innerHTML = '<div class="correctAnswer"><i class="fas fa-thumbs-up"></i>' + ' +' + amount + '</div>';
     
}

function showAnswer() {
	
	document.getElementById('showAnswer').innerHTML += problem + ' = ' + answer + '<br>';
	
}

function showAnswerWithRemainder() {
	
	document.getElementById('showAnswer').innerHTML += problem + ' = ' + answer + 'r' + remainder + '<br>';
	
}

function showCurrentScore() {
	
	document.getElementById('score').innerHTML = 'Current Score: ' + finalScore;
	
}

function createNewScore() {
	
	document.getElementById("inputGame").value = gameName; 
	document.getElementById("inputScore").value = finalScore; 
	document.getElementById("submitScore").style.display = "block"; 
	
}

function resetVariables() {
	
	finalScore = 0;
	startTime = 60; 
	
}

function createPracticeProblemsButton() {
	
	document.getElementById('showPracticeProblems').innerHTML = ''; 
	let newButton = document.createElement("button");
	document.getElementById('showPracticeProblems').appendChild(newButton);
	newButton.class = "btn btn-lg btn-success btn-inline"; 
	newButton.type = "submit"; 
	newButton.innerHTML = "View Problems";
	
}