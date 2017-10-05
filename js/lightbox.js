function LightBox(lightbox, target, images, scrollbar ) {

	this.lightBox = lightbox;
	this.target = target;
	this.images = images;
	this.scrollbar = scrollbar || false;
	this.imageContainer;
	this.imageNodes = [];
	this.imageNodeIndex = 0;
	
}

LightBox.prototype.addImageContainer = function() {

	let imageBox = document.createElement("div");
		imageBox.setAttribute("id", "image-container");

		if(!this.scrollbar) {
			imageBox.setAttribute("style", "overflow: hidden;");
		}

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

	this.imageContainer.appendChild(this.imageNodes[this.imageNodeIndex]);
	this.fadeIn(this.imageNodes[this.imageNodeIndex]);

}

LightBox.prototype.addButtons = function() {

	let buttons = {};
	let btnData = [["btn-prev","&lsaquo;","prev"],["btn-next", "&rsaquo;", "next"]];
		
	for(let i = 0; i < btnData.length; i++) {

		let btn = document.createElement("button");
			btn.setAttribute("id", btnData[i][0])
			btn.innerHTML = btnData[i][1];

		buttons[btnData[i][2]] = btn;
		this.imageContainer.appendChild(buttons[btnData[i][2]]);

	}
	
	this.imageContainer.addEventListener("scroll", () => {
			
			let yOffset = this.imageContainer.scrollTop;
			
			buttons.prev.setAttribute("style", "top:"+ yOffset +"px;");
			buttons.next.setAttribute("style", "top:"+ yOffset +"px;");
	});

	buttons.next.addEventListener("click", () => {
		
		this.imageNodeIndex++;

		if(this.imageNodeIndex > this.imageNodes.length-1) {
			this.imageNodeIndex = 0;
		}

		this.changeImage();

	});
	
	buttons.prev.addEventListener("click", () => {

		this.imageNodeIndex--;

		if(this.imageNodeIndex < 0) {
			this.imageNodeIndex = this.imageNodes.length-1;
		}

		this.changeImage();

	});
}

LightBox.prototype.changeImage = function() {

	this.imageContainer.scrollTop = 0;
	this.imageContainer.removeChild(this.imageContainer.childNodes[2]);
	this.imageContainer.appendChild(this.imageNodes[this.imageNodeIndex]);
	this.fadeIn(this.imageNodes[this.imageNodeIndex]);

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

LightBox.prototype.closeLightBox = function() {

	let self = this;

	this.lightBox.addEventListener("click", function(e) {
		
		if(e.target.id === "lightbox") {

			this.classList.remove("lightbox-show")
			
			while(this.hasChildNodes()) {
				this.removeChild(this.lastChild);
			}
						
			self.imageNodes = [];
			self.imageNodeIndex = 0;
			document.getElementsByTagName("body")[0].classList.remove("disable-scroll");

		}
	});
}

LightBox.prototype.initLightBox = function() {
	console.log(window.innerHeight)
	this.target.addEventListener("click", () => {
		
		this.lightBox.classList.add("lightbox-show");
		this.addImageContainer();
		this.addButtons();
		this.addImages();
		this.closeLightBox();
		
		document.getElementsByTagName("body")[0].classList.add("disable-scroll");

	});
}


