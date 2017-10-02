"use strict";
(function(){
function toggleSiteNav() {

	let navBtn = document.querySelector('#nav-icon');
	let nav = document.querySelector('.sitenav-sm');
	let body = document.querySelector('body'); 
	let navContainer = document.querySelector('.nav-container');
	let navLink = document.querySelectorAll('.navigation-link');
	let logo = document.querySelector('#logo span');

	for(let i = 0; i < navLink.length; i++) {
	  	navLink[i].addEventListener('click', () => {
	  		body.removeAttribute('style','overflow: hidden;');
			nav.classList.remove('sitenav-sm-show');
			navBtn.classList.remove('open');
		});
	}
	
	navBtn.addEventListener('click', () => {
		if(nav.classList.contains('sitenav-sm-show')) {
			body.removeAttribute('style','overflow: hidden;');
			nav.classList.remove('sitenav-sm-show');
			navBtn.classList.remove('open');
			if(window.pageYOffset > window.innerHeight - navContainer.clientHeight){
				navContainer.setAttribute('style','background:#fff;');
				logo.setAttribute('style','color:#be2835;');
			}
		} else {
			body.setAttribute('style','overflow: hidden;');
			nav.classList.add('sitenav-sm-show');
			navBtn.classList.add('open');
			if(window.pageYOffset > window.innerHeight - navContainer.clientHeight){
				navContainer.setAttribute('style','background:transparent;');
				logo.setAttribute('style','color:#fff;');
			}
		}
	});
}
function toggleNavContainerOnScroll() {

	let offset;
	let lastScrollTop = 0;
	let navContainer = document.querySelector('.nav-container');
	let logo = document.querySelector('#logo span');
	let navBtn = document.querySelectorAll('#nav-icon span');

	window.addEventListener('scroll', () => { 
		if(window.pageYOffset > 150) {
			offset = window.pageYOffset; 
			if(offset > lastScrollTop + 100) {
				navContainer.classList.add('nav-container-hidden');
				lastScrollTop = offset;
			}
			if(offset < lastScrollTop - 100) {
				navContainer.classList.remove('nav-container-hidden');
				lastScrollTop = offset;
			}
		}
		if(window.pageYOffset < window.innerHeight - navContainer.clientHeight && window.innerWidth > 800) {
			navContainer.setAttribute('style', 'background-color: transparent;');
			logo.setAttribute('style', 'color: #fff;');
		}
		if(window.pageYOffset > window.innerHeight - navContainer.clientHeight && window.innerWidth > 800) {
			navContainer.setAttribute('style', 'background-color: #fff;)');
			logo.setAttribute('style', 'color: #be2835;');
		}
		if(window.pageYOffset < window.innerHeight - navContainer.clientHeight && window.innerWidth < 800) {
			navContainer.setAttribute('style', 'background-color: transparent;');
			logo.setAttribute('style', 'color: #fff;');
			for (let i = 0; i < navBtn.length; i++) {
				navBtn[i].setAttribute('style', 'background-color: #558ab6;');
			}
			
		}
		if(window.pageYOffset > window.innerHeight - navContainer.clientHeight && window.innerWidth < 800) {
			navContainer.setAttribute('style', 'background-color: #fff;');
			logo.setAttribute('style', 'color: #be2835;');
			for (let i = 0; i < navBtn.length; i++) {
				navBtn[i].setAttribute('style', 'background-color: #be2835;');
			}
			
		}
	});
}
function fadeIn() {

	let target = document.querySelector('#hero-text h2');
	let text = ["JavaScript Utvecklare", "HTML Utvecklare", "CSS Utvecklare","Frontend Utvecklare"];
	let i = 0;
	let val = 0;
	
	target.setAttribute('style', `opacity:${val};`);
	target.innerHTML = text[3];	
	
	setTimeout( () => {
		setInterval( () => {
			if(i === text.length) {
				i = 0;
			}
			val = 0;
			target.innerHTML = text[i];
			target.setAttribute('style', `opacity:${val};`);
			i++;
		},5000);

		setInterval( () => {
			if(val < 1) {
				val+=0.04;
				target.setAttribute('style', `opacity:${val};`);
			}
			
		},80);
	},1500);	
}
function parallax() {
	var bg = document.querySelectorAll('section[data-type="background"]')
	
	for(var i = 0; i < bg.length; i++) {
		window.addEventListener('scroll', () => {
			var index = i-1;
			var yPos = -(window.pageYOffset / parseInt(bg[index].dataset.speed));
			var coords = '0% ' +yPos + 'px;';
			bg[index].setAttribute('style', 'background-position:'+coords);
		})
	}
}
parallax();
fadeIn();
toggleSiteNav();
toggleNavContainerOnScroll();
}());


	
