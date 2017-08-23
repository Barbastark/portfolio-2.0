function init() {
	var canvas = document.querySelector('canvas');
	var c = canvas.getContext('2d');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	var circleArr = [];

	function Circle(x,y,dx,dy,r,rgbArr) {
		this.xPos = x;
		this.yPos = y;
		this.dx = dx;
		this.dy = dy;
		this.r = r;
		this.check = [];
		this.rgbArr = rgbArr;
		this.color = 'rgba(' + this.rgbArr[0] + ',' + this.rgbArr[1] + ',' + this.rgbArr[2] + ',' + this.rgbArr[3] + ')';

		for(var i = 0; i < this.rgbArr.length -1; i++){
			this.rgbArr[i] > 0 ? this.check.push(true) : this.check.push(false);
		}
		
		
	}
	Circle.prototype.draw = function() {
		c.beginPath();
		c.arc(this.xPos, this.yPos, this.r, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.fillStyle = this.color;
		c.stroke();
		c.fill();
	}
	Circle.prototype.update = function() {
		for(var i = 0; i < this.rgbArr.length -1; i++){
			if(this.check[i] === true) {
				this.rgbArr[i] += 1;
				if(this.rgbArr[i] === 255) {
					this.check[i] = false;
				}
			} else {
				this.rgbArr[i] -= 1;
				if(this.rgbArr[i] <= 0) {
					this.check[i] = true;
				}
			}
		}
		
		if(this.xPos + this.r > innerWidth || this.xPos - this.r < 0) {
			this.dx = -this.dx;
		}
		if(this.yPos + this.r > innerHeight || this.yPos - this.r < 0) {
			this.dy = -this.dy;
		}
		this.color = 'rgba(' + this.rgbArr[0] + ',' + this.rgbArr[1] + ',' + this.rgbArr[2] + ',' + this.rgbArr[3] + ')';
		this.xPos += this.dx;
		this.yPos += this.dy;

		this.draw();
	}

	for(var i = 0; i < 100; i++) {
			var rgbArr = [
				Math.floor(Math.random() * 256),
				Math.floor(Math.random() * 256),
				Math.floor(Math.random() * 256),
				0.5
			];
			var r = Math.floor(Math.random() * 30);
			var xPos = Math.random() * (innerWidth - r * 2) + r;
			var yPos = Math.random() * (innerHeight - r * 2) + r;
			var dx = (Math.random() -0.5) * 2;
			var dy = (Math.random() -0.5) * 2;
			
			circleArr.push(new Circle(xPos, yPos, dx, dy, r, rgbArr));	
		}

	function animate(){
		requestAnimationFrame(animate);
		c.clearRect(0, 0, innerWidth, innerHeight);

		for(var i = 0; i < circleArr.length; i++) {
			circleArr[i].update();
		}
	}
	animate();

}

window.addEventListener('resize',function() {
	console.log('resize')
	init();
});
init();

