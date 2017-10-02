function LightBox() {
	this.lightBox = document.querySelector("#lightbox");
	this.target = document.querySelector("#site-wrapper");
	this.images = ["img/niki1.jpg", 
				   "img/niki2.jpg", 
				   "img/niki3.jpg",
				   "img/niki4.jpg", 
				   "img/niki5.jpg", 
				   "img/niki6.jpg",
				   "img/niki7.jpg", 
				   "img/niki8.jpg"
				   ]
	this.imageContainer;
	this.imageNodes = [];
	this.imageNodeIndex = 0;
}

LightBox.prototype.initImageContainer = function() {

	let imageBox = document.createElement("div");
		imageBox.setAttribute("id", "image-container");
		this.lightBox.appendChild(imageBox);
		this.imageContainer = document.querySelector("#image-container");
}

LightBox.prototype.addImages = function() {

	for(let i = 0; i < this.images.length; i++) {

		let imageNode = document.createElement("img");
			imageNode.setAttribute("class", "image");
			imageNode.setAttribute("src", this.images[i]);
			imageNode.setAttribute("style", "width: 100%;");
			imageNode.setAttribute("style", "opacity:0");
			this.imageNodes.push(imageNode);
	}

	this.imageContainer.appendChild(this.imageNodes[0]);
	this.fadeIn(this.imageNodes[0]);

}

LightBox.prototype.fadeIn = function(el) {

	let opacity = 0;
	let interval = setInterval(function() {

		el.setAttribute("style", "opacity:"+opacity+";")
		

		if(opacity > 1) {
			clearInterval(interval);
		}
		opacity+=0.025;
	},10);

	for(let i = 0; i < this.imageNodes.length; i++) {
		this.imageNodes[i].setAttribute("style", "opacity: 0;")
	}

}

LightBox.prototype.addButtons = function() {

	let changeImage = () => {
		
		this.imageContainer.scrollTop = 0;
		this.imageContainer.removeChild(this.imageContainer.childNodes[2]);
		this.imageContainer.appendChild(this.imageNodes[this.imageNodeIndex]);
		this.fadeIn(this.imageNodes[this.imageNodeIndex]);

	}	

	let prev = document.createElement("button");
		prev.setAttribute("id", "btn-prev");
		prev.innerHTML = "&lsaquo;";

	let next = document.createElement("button");
		next.setAttribute("id", "btn-next");
		next.innerHTML = "&rsaquo;";

	this.imageContainer.appendChild(prev);
	this.imageContainer.appendChild(next);

	let btnPrev = document.querySelector("#btn-prev");
	let btnNext = document.querySelector("#btn-next");

	btnNext.addEventListener("click", () =>{
		
		this.imageNodeIndex++;

		if(this.imageNodeIndex > this.imageNodes.length-1) {
			this.imageNodeIndex = 0;
		}

		changeImage();

	});
	
	btnPrev.addEventListener("click", () => {

		this.imageNodeIndex--;

		if(this.imageNodeIndex < 0) {
			this.imageNodeIndex = this.imageNodes.length-1;
		}

		changeImage();

	});
}

LightBox.prototype.closeLightBox = function() {
	document.getElementsByTagName("body")[0].removeAttribute("style", "overflow: hidden;");
	this.lightBox.addEventListener("click", function(e) {

		if(e.target.id === "lightbox") {

			this.classList.remove("lightbox-show")

			while(this.hasChildNodes()) {
				this.removeChild(this.lastChild);
			}

			this.imageNodes = [];
			this.imageNodeIndex = 0;

		}
	});
}

LightBox.prototype.scrollFix = function() {

	let imgContainer = document.querySelector("#image-container");
	let btnLeft = document.querySelector("#btn-prev");
	let btnRight = document.querySelector("#btn-next");

	imgContainer.addEventListener("scroll", function() {
		yOffset = imgContainer.scrollTop;
		
		btnLeft.setAttribute("style", "top:"+ yOffset +"px;");
		btnRight.setAttribute("style", "top:"+ yOffset +"px;");
	});
}
LightBox.prototype.initLightBox = function() {
	
	this.target.addEventListener("click", () => {
		document.getElementsByTagName("body")[0].setAttribute("style", "overflow: hidden;");
		this.lightBox.classList.add("lightbox-show");
		this.initImageContainer();
		this.addButtons();
		this.addImages();
		this.closeLightBox();
		this.scrollFix();

	});
}



