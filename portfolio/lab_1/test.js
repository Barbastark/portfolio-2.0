var tdArr = document.getElementsByTagName("td");
var cell;
var row = 0;
var tries = 0;
var seconds = 0
var minutes = 0
var hours = 0
var t;


for (var i = 0; i < 5; i++) {
	cell = 0;
	var tr = document.createElement("TR");
	document.getElementById("myTable").appendChild(tr);
	
	for (var j = 0; j < 5; j++) {
		var randomNumber = Math.round(Math.random());
		
		if (randomNumber === 0) {
			var td = document.createElement("TD");
			td.setAttribute("class", "black");
			td.setAttribute("id", parseInt(row.toString() + cell.toString()));
			document.getElementById("myTable").appendChild(td);
		}
		
		else {
			var td = document.createElement("TD");
			td.setAttribute("class", "white");
			td.setAttribute("id",parseInt(row.toString() + cell.toString()));
			document.getElementById("myTable").appendChild(td);
		}
		cell++;
	}
	row++;
}
document.getElementById("moves").innerHTML = "Moves: " + tries;

for (var i = 0; i < tdArr.length; i++) {
		tdArr[i].addEventListener("click", whatIsThis);//Endast för teständamål
		tdArr[i].addEventListener("click", colorToggler);
		tdArr[i].addEventListener("click", timer);
		
	}

//Endast för teständamål	
function whatIsThis () {
		console.log(this);
		console.log(tries);
	}

function colorToggler() {
	tries++;
	var y = parseInt(this.id - 10);
	var z = y + 20;
	if(tries > 1) {
		for (var i = 0; i < tdArr.length; i++) {
			tdArr[i].removeEventListener("click", timer);
		}
	}
	if (this.className === "white" ) {
		this.setAttribute("class", "black");
	}
	
	else {
		this.setAttribute("class", "white");
	}
		
	if(this.previousSibling.className === "white"){
		this.previousSibling.setAttribute("class", "black");
	}
	
	else{
		this.previousSibling.setAttribute("class", "white");
	}
	
	if (this.id !== "44") {
		if(this.nextSibling.className === "white"){
			this.nextSibling.setAttribute("class", "black");
		}
		else{
			this.nextSibling.setAttribute("class", "white");
		}
	}
	
	if (y >= 0){
		if(document.getElementById(y).className === "white"){
			document.getElementById(y).setAttribute("class", "black");
		}
		else{
			document.getElementById(y).setAttribute("class", "white");
		}
	}
	
	if (z < 45) {
		if(document.getElementById(z).className === "white"){
			document.getElementById(z).setAttribute("class", "black");
		}
		
		else{
			document.getElementById(z).setAttribute("class", "white");
		}
	}
	document.getElementById("moves").innerHTML = "Moves: " + tries;
	checkWinner();
}

function checkWinner() {
	
	var winner = true;
	for (i in tdArr) {
		if (tdArr[i].className === "white") {
			winner = false;
			break;
		}
	}
	if (winner) {
		alert("Du Vann");
		stopTimer();
	}
}

function reload() {
	location.reload();
}

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    document.getElementById("timer").innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function stopTimer() {
	clearTimeout(t);
}


	