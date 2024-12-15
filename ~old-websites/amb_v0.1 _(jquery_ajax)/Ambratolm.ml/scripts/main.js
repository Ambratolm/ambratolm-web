$(document).ready(function() {
	pages.home.load();
	pages[window.location.hash.replace("#", "")].load();
});