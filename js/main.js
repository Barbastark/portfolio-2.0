"use strict";
(function(){
function toggleSiteNav() {

	let navBtn = document.querySelector('#nav-icon');
	let nav = document.querySelector('.sitenav-sm');
	let body = document.querySelector('body'); 
	let navContainer = document.querySelector('.nav-container');
	let navLink = document.querySelectorAll('.navigation-link');

	for(var i = 0; i < navLink.length; i++) {
	  	navLink[i].addEventListener('click', () => {
	  		body.removeAttribute('style','overflow: hidden;');
			nav.classList.remove('sitenav-sm-show');
			navBtn.classList.remove('open');
			navContainer.classList.remove('nav-container-fade');
		});
	}
	
	navBtn.addEventListener('click', () => {
		if(nav.classList.contains('sitenav-sm-show')) {
			body.removeAttribute('style','overflow: hidden;');
			nav.classList.remove('sitenav-sm-show');
			navBtn.classList.remove('open');
			navContainer.classList.remove('nav-container-fade');
		} else {
			body.setAttribute('style','overflow: hidden;');
			nav.classList.add('sitenav-sm-show');
			navBtn.classList.add('open');
			navContainer.classList.add('nav-container-fade');
		}
	});
}
function toggleNavContainerOnScroll() {

	let offset;
	let lastScrollTop = 0;
	let navContainer = document.querySelector('.nav-container');

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
	});
}
toggleSiteNav();
toggleNavContainerOnScroll();
}());


	
