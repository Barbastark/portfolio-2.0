(function(){

function toggleSiteNav() {

	let target = document.querySelector("#nav-icon");
	let el = document.querySelector(".sitenav-sm"); 
	let header = document.querySelector('.site-header');
	target.addEventListener('click', function(){
		if(el.classList.contains('sitenav-sm-show')) {
			el.classList.remove('sitenav-sm-show');
			target.classList.remove('open');
			header.classList.remove('site-header-fade')
		} else {
			el.classList.add('sitenav-sm-show');
			target.classList.add('open');
			header.classList.add('site-header-fade')
		}
	});
}

function siteNavHide() {
	
	let target = document.getElementsByClassName("navigation-link");
	let el = document.querySelector(".sitenav-sm"); 
	let navBtn = document.querySelector("#nav-icon");
	let header = document.querySelector('.site-header');
	
	for(var i = 0; i < target.length; i++) {
		target[i].addEventListener('click', function(){
			if(el.classList.contains('sitenav-sm-show')) {
				el.classList.remove('sitenav-sm-show');
				navBtn.classList.remove('open');
				header.classList.remove('site-header-fade')
			} else {
				el.classList.add('sitenav-sm-show');
				navBtn.classList.add('open');
			}
	  });
	}
}

function hideNavOnScroll() {

	let lastScrollTop = 0;
	let siteNav = document.querySelector('.site-header');

	window.addEventListener("scroll", () => { 
		if(window.pageYOffset > 150) {
			let offset = window.pageYOffset; 
			offset > lastScrollTop ? siteNav.classList.add('site-header-hidden') : siteNav.classList.remove('site-header-hidden')
			lastScrollTop = offset;
		}
	});
}

toggleSiteNav();
siteNavHide();
hideNavOnScroll();
}());


	
