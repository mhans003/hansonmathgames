let problemList = []; 
		
function Problem(problem, answer) {
		
    this.problem = problem;
    this.answer = answer;
	this.numbersentence = problem + ' = ' + answer; 
	
}

function populatePracticeProblems() {
		
	let numberOfProblems = 0;
			
	for(let i = 0; i < problemList.length; i++)
		{
			let thisInput =  document.createElement("input");
			document.getElementById('showPracticeProblems').appendChild(thisInput);
			thisInput.name = 'problem'; 
			thisInput.value = problemList[i]; 
			thisInput.placeholder = problemList[i]; 
			thisInput.style.display = 'none'; 
			console.log(thisInput); 
			numberOfProblems++; 
			//document.getElementById('practiceProblemsInput').value += '<h2>' + problemList[i][0] + ' = ' + problemList[i][1] + '</h2>' + '<br>';  
		}
			
	//determine number of problems to be passed into post route 
	let numberOfProblemsInput = document.createElement("input"); 
	document.getElementById('showPracticeProblems').appendChild(numberOfProblemsInput); 
	numberOfProblemsInput.name = 'numberOfProblems';
	numberOfProblemsInput.type = 'number';
	numberOfProblemsInput.value = numberOfProblems; 
	numberOfProblemsInput.placeholder = numberOfProblems; 
	numberOfProblemsInput.style.display = 'none'; 
		
}	
			