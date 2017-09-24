'use strict';
(function() {
let canvas = document.querySelector('#canvas');
	canvas.width = 960; //0.5625
	canvas.height = 540;
	canvas.style.cursor = "none";
let c = canvas.getContext('2d');

let paddleHeight = canvas.height/50;
let paddleWidth = canvas.width/10;
let paddleXpos = (canvas.width - paddleWidth)/2;
let moveLeft = false;
let moveRight = false;
let paddleSpeed = 5;

let brickRowCount = 4;
let brickColCount = 10;

let brickPadding = 5;
let brickOffsetTop = 100;
let brickOffsetLeft = 5;
let brickWidth = 90.5//canvas.width/10 - brickPadding;
let brickHeight = canvas.height/17.5;
let bricks = [];

let ballRadius = canvas.width/100;
let xPos = canvas.width / 2;
let yPos = canvas.height - paddleHeight - ballRadius;
let dx = 2;
let dy = -2;

let score = 0;
let level = 1;
let isStarted = false;
let hasBricks = true;
let toggleAnimation;

function brickCoordinates() {
	for(let col = 0; col < brickColCount; col++) {
		bricks[col] = [];
		for(let row = 0; row < brickRowCount; row++) {
			let check = [];
			let colorArr = [Math.floor(Math.random()*186+70),
						    Math.floor(Math.random()*186+70),
						    Math.floor(Math.random()*186+70)
						   ];
			for(let i = 0; i < colorArr.length; i++) {
				colorArr[i] === 255 ? check.push(false) : check.push(true);
			}
			bricks[col][row] = {x:0, 
								y:0,
								colorArr: colorArr,
								check: check,
								color: `rgba(${colorArr[0]},${colorArr[1]},${colorArr[2]},1.0)`,
								status: 1
							   };
							   
		}
	}
}

function displayBricks() {
	hasBricks = false;
	for(let col = 0; col < brickColCount; col++) {
		for(let row = 0; row < brickRowCount; row++) {
			if(bricks[col][row].status === 1) {
				hasBricks = true;
				break;
			} 
		}
	}
	if(hasBricks) {
		for(let col = 0; col < brickColCount; col++) {
			for(let row = 0; row < brickRowCount; row++) {
				if(bricks[col][row].status === 1) {

					let colorArr = bricks[col][row].colorArr;
					let check = bricks[col][row].check;
					
					for(let i = 0; i < colorArr.length; i++) {
						if(check[i] === true) {
							colorArr[i]++;
							if(colorArr[i] === 255) {
								check[i] = false;
							}
						} else {
							colorArr[i]--;
							if(colorArr[i] <= 70) {
								check[i] = true;
							}
						}
					}
					bricks[col][row].color = `rgba(${colorArr[0]},${colorArr[1]},${colorArr[2]},1.0)`;
					let brickX = (col * (brickWidth + brickPadding) + brickOffsetLeft);
			 		let brickY = (row * (brickHeight + brickPadding) + brickOffsetTop);
					bricks[col][row].x = brickX;
					bricks[col][row].y = brickY;
					c.beginPath();
					c.rect(brickX, brickY, brickWidth, brickHeight);
					c.fillStyle = bricks[col][row].color;
					c.fill();
					c.closePath();
				}
			}
		}
	}
}

function displayBall() {
	c.beginPath();
	c.arc(xPos, yPos, ballRadius, 0, Math.PI*2);
	c.fillStyle =  "#996699";
	c.fill()
	c.closePath();
}

function displayPaddle() {
	c.beginPath();
	c.rect(paddleXpos, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	c.fillStyle = "#996699";
	c.fill();
	c.closePath();
}

function displayScore() {
	c.font = "30px arial";
	c.fillStyle = "#996699";
	c.fillText("Score: " + score, 70,35);
}

function displayLevel() {
	c.font = "30px arial";
	c.fillStyle = "#996699";
	c.fillText("Level: " + level, canvas.width -120 ,35);
}

function collisionDetect() {
	for(let col = 0; col < brickColCount; col++) {
		for(let row = 0; row < brickRowCount; row++) {
			let brickPos = bricks[col][row];
			if(brickPos.status === 1) {
				if(xPos - ballRadius > brickPos.x && 
					xPos + ballRadius < brickPos.x  + brickWidth && 
					yPos - ballRadius < brickPos.y + brickHeight && 
					yPos + ballRadius > brickPos.y) {
					dy = -dy;
					brickPos.status = 0;
					score++;
				}
			}
		}
	}
}

function gameOver() {
  /*c.clearRect(0, 50, canvas.width, canvas.height);
  c.textAlign = "center";
	c.font = "50px arial";
	c.fillStyle = "#996699";
	c.fillText("Game Over", canvas.width/2 ,canvas.height/2);*/
	toggleAnimation();
}

function startGame() {
	c.font = "50px arial";
	c.fillStyle="#996699";
	c.textAlign="center";
	c.fillText("Hit space to start game", canvas.width/2,canvas.height/2);
}

function setAnimationInterval(ms) {
	let interval = setInterval(function(){
		animate();
	},ms); 
	return function() {
		if(!isStarted) {
			isStarted = true;
		} else {
			clearInterval(interval);
			isStarted = false;
		}
	}
}
function levelUp() {
	brickCoordinates();
	level++;
	displayLevel();
	paddleSpeed++;
	dx < 0 ? dx-=0.5 : dx+=0.5;
	dy < 0 ? dy-=0.5 : dy+=0.5;
}
function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	displayBall();
	displayPaddle();
	displayBricks();
	collisionDetect();
	displayScore();
	displayLevel();

	let y = (dy < 0 ? dy*(-1):dy);
	if(dy % 2 === 0) {}
	if(yPos + ballRadius + y >= canvas.height){
		gameOver();
	}
	if(yPos + dy < ballRadius) {
		dy = -dy;
	}
	if(xPos >= paddleXpos && 
		xPos <= paddleXpos + ballRadius && 
		yPos >= canvas.height - paddleHeight - ballRadius - y) {
		yPos -= paddleHeight - ballRadius + y;
		if(dx > 0){
			dy = -dy;
			dx = -dx;
		} else {
			dy = -dy;
		}
		if(!hasBricks) {
			levelUp();
		}
	}
	if(xPos <= paddleXpos + paddleWidth && 
	   xPos >= paddleXpos + paddleWidth - ballRadius &&
	   yPos >= canvas.height - paddleHeight - ballRadius - y) {

	   yPos -= paddleHeight - ballRadius + y;
	   if(dx < 0) {
	   		dy = -dy;
			dx = -dx;
	   } else {
	   		dy = -dy;
	   }
	   if(!hasBricks) {
			levelUp();
		}
	}
	if(xPos > paddleXpos + ballRadius && 
	   xPos < paddleXpos + paddleWidth - ballRadius && 
	   yPos >= canvas.height - paddleHeight - ballRadius - y) {
		yPos -= paddleHeight - ballRadius + y;
		dy = -dy;
		if(!hasBricks) {
			levelUp();
		}
	}
	
	if(xPos + dx > canvas.width - ballRadius || xPos + dx < ballRadius) {
		dx = -dx;
	}
	if(moveRight && paddleXpos < canvas.width - paddleWidth) {
		paddleXpos += paddleSpeed;
	}
	if (moveLeft && paddleXpos > 0) {
		paddleXpos -= paddleSpeed;
	}
	xPos += dx;
	yPos += dy;
}

document.addEventListener('keydown', (e) => {
	if(e.keyCode === 39) {
		moveRight = true;
	}
	if(e.keyCode === 37) {
		moveLeft = true;
	}
});

document.addEventListener('keyup', (e) => {
	if(e.keyCode === 39) {
		moveRight = false;
	}
	if(e.keyCode === 37) {
		moveLeft = false;
	}
	if(e.keyCode === 32 && !isStarted) {
		brickCoordinates();
		toggleAnimation = setAnimationInterval(10);
		toggleAnimation();
	}
	if(e.keyCode === 122) {
		setTimeout(() =>{
			location.reload();
		},100);
	} 
});

startGame();
displayScore();
displayLevel();
displayPaddle();
}());



