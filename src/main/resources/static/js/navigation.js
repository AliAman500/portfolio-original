let header = document.querySelector(".header");
let logospan = document.querySelector(".logo > .last");
let links = document.querySelectorAll(".navbar > .links a");
let s_links = document.querySelectorAll(".sidebar > .links a");
let sections = document.querySelectorAll("section");
let sidebar = document.querySelector(".sidebar");
let menubar = document.querySelector(".navbar > #menu-bar");

const scrollOffset = 150;

function updateActiveLinks() {
	sections.forEach(sec => {
		let top = window.scrollY;
		let offset = sec.offsetTop - scrollOffset;
		let height = sec.offsetHeight;
		let id = sec.getAttribute('id');
		if (top >= offset && top < offset + height) {
			links.forEach(link => {
				link.classList.remove('active');
				document.querySelector('.navbar > .links a[href*=' + id + ']').classList.add('active');
			});

			s_links.forEach(s_link => {
				s_link.classList.remove('active');
				document.querySelector('.sidebar > .links a[href*=' + id + ']').classList.add('active');
			});
		}
	});
}

function updateHeader() {
	if(window.scrollY > 0) {
		header.classList.add("active");	
		logospan.classList.add("active");
	}
	else {
		header.classList.remove("active");
		logospan.classList.remove("active");
	}
}

document.addEventListener('DOMContentLoaded', function(event) {
    updateActiveLinks();
	updateHeader();
});

window.addEventListener("scroll", function(event) {
	updateActiveLinks();
	updateHeader();
});

function toggleSidebar() {
	if(sidebar.classList.contains("active")) {
		sidebar.classList.remove("active");
		document.body.style.overflowY = 'scroll';
		menubar.classList.remove("active");
		if(window.scrollY <= 0) {
			header.classList.remove("active");	
			logospan.classList.remove("active");
		}
	} else {
		document.body.style.overflowY = 'hidden';
		sidebar.classList.add("active");
		header.classList.add("active");	
		logospan.classList.add("active");
		menubar.classList.add("active");
	}
}

function hideSidebar() {
	sidebar.classList.remove("active");
	document.body.style.overflowY = 'scroll';
	menubar.classList.remove("active");
}