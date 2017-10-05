
	let levelUp = 0;
	let score = 0;
	let level = 1;
	let errors = 0;
	let num1;
	let num2;
	let answer;
	let userGuess;
	
	const multiChar = "&times";
	const userGuessInput = document.getElementById("answer");
	const scoreContainer = document.getElementById("score");
	const errorsContainer = document.getElementById("errors");
	const levelContainer = document.getElementById("level");
	const question = document.getElementById("question");
	const audio = new Audio('haha.wav');
	const error = document.getElementById("error");

	function rand() {
		num1 = Math.floor(Math.random()*10)+1;
		num2 = Math.floor(Math.random()*10)+1;
		question.innerHTML = `${num1}${multiChar}${num2}`;	
	}
	
	document.addEventListener('keyup', e => {
		if(e.keyCode === 13) {
			userGuess = parseInt(userGuessInput.value);
			answer = num1 * num2;
			if(!isNaN(userGuess)) {
				if(answer === userGuess) {
					score++;
					levelUp++;
					scoreContainer.innerHTML = score; 
					userGuessInput.value = "";
					error.innerHTML = "";	
					rand();
				} else {
					question.innerHTML = '<img src="nelson.jpg" style="margin:18px 0 18px 0;" />';
					audio.play();
					error.innerHTML = "Fel svar!!";
					setTimeout(function(){
						errors++;
						errorsContainer.innerHTML = errors;
						level--;
						levelContainer.innerHTML = level;
						userGuessInput.value = "";	
						error.innerHTML = "";
						rand();
					},1000)
				}
				if(levelUp === 10) {
					level++;
					levelContainer.innerHTML = level;
					levelUp = 0;
				}
			} else {
				error.innerHTML = "Men jag vill ju ha en siffra ju &#128550;";
				userGuessInput.value = "";
			}	
		}
	});
	rand();
