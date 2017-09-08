(function(){
"use strict";
function toggleSiteNav() {

	let navBtn = document.querySelector('#nav-icon');
	let nav = document.querySelector('.sitenav-sm');
	let body = document.querySelector('body'); 
	let header = document.querySelector('.site-header');
	let navLink = document.querySelectorAll('.navigation-link');

	for(var i = 0; i < navLink.length; i++) {
	  	navLink[i].addEventListener('click', () => {
	  		body.removeAttribute('style','overflow: hidden;');
			nav.classList.remove('sitenav-sm-show');
			navBtn.classList.remove('open');
			header.classList.remove('site-header-fade')
		});
	}
	
	navBtn.addEventListener('click', () => {
		if(nav.classList.contains('sitenav-sm-show')) {
			body.removeAttribute('style','overflow: hidden;');
			nav.classList.remove('sitenav-sm-show');
			navBtn.classList.remove('open');
			header.classList.remove('site-header-fade')
		} else {
			body.setAttribute('style','overflow: hidden;');
			nav.classList.add('sitenav-sm-show');
			navBtn.classList.add('open');
			header.classList.add('site-header-fade')
		}
	});
}
function hideNavOnScroll() {

	let lastScrollTop = 0;
	let siteNav = document.querySelector('.site-header');

	window.addEventListener('scroll', () => { 
		if(window.pageYOffset > 150) {
			let offset = window.pageYOffset; 
			offset > lastScrollTop ? siteNav.classList.add('site-header-hidden') : siteNav.classList.remove('site-header-hidden')
			lastScrollTop = offset;
		}
	});
}
toggleSiteNav();
hideNavOnScroll();
}());


	
