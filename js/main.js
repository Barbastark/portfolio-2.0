/*Togglar menyknapp och navigation små viewports*/
function toggleSiteNav() {

	let target = document.querySelector("#nav-icon");
	let el = document.querySelector(".sitenav"); 

	target.addEventListener('click', function(){
		if(el.classList.contains('sitenav-show')) {
			el.classList.remove('sitenav-show');
			target.classList.remove('open');
		} else {
			el.classList.add('sitenav-show');
			target.classList.add('open');
		}
	});
}
/*Gömmer navigation små viewports*/
function siteNavHide() {
	
	let target = document.getElementsByClassName("navigation-link");
	let el = document.querySelector(".sitenav"); 
	let navBtn = document.querySelector("#nav-icon");
	
	for(var i = 0; i < target.length; i++) {
		target[i].addEventListener('click', function(){
			if(el.classList.contains('sitenav-show')) {
				el.classList.remove('sitenav-show');
				navBtn.classList.remove('open');
			} else {
				el.classList.add('sitenav-show');
				navBtn.classList.add('open');
				alert('borta')
			}
	  });
	}
}
/*Visar och gömmer portfoliodropdown*/
/*function toggleDropdown() {

	let el = document.getElementById('dropdown-toggle');
	let target = document.querySelector('#dropdown-wrapper');
	let dropdown = document.getElementById('dropdown-container');
	
	el.addEventListener('mouseover', function() {
		target.classList.add('show');
	});
	dropdown.addEventListener('mouseleave', function() {
		target.classList.remove('show')
	});
}

function hideDropdown() {
	let target = document.querySelector('#dropdown-wrapper');
	let dropdown = document.querySelector('#dropdown-wrapper');
	target.classList.remove('show')
	}*/
/*Gömmer naigation när användaren scrollar ner*/
function hideNavOnScroll() {

	let lastScrollTop = 0;
	let siteNav = document.querySelector('.nav-btn-container');

	window.addEventListener("scroll", () => { 
		if(window.pageYOffset > 150) {
			let offset = window.pageYOffset; 
			offset > lastScrollTop ? siteNav.classList.add('nav-btn-container-hidden') : siteNav.classList.remove('nav-btn-container-hidden')
			lastScrollTop = offset;
		}
	});
}

toggleSiteNav();
siteNavHide();
//toggleDropdown();
hideNavOnScroll();



	
