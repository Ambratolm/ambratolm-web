var components = {
	navbar : { 
		id 		: "#navbar", 	 	
		url 	: "components/navbar.html",
		load 	: function() { components.load(this.id, this.url); }
	},
	jumbotron	: { 
		id 		: "#jumbotron",
		url 	: "components/jumbotron.html",
		load 	: function() { components.load(this.id, this.url); } 
	},
	sidebar : { 
		id 		: "#sidebar",
		url 	: "components/sidebar.html",
		load 	: function() { components.load(this.id, this.url); } 
	},
	content : { 
		id 		: "#content",
		url 	: "components/content.html",
		load 	: function() { components.load(this.id, this.url); }
	},
	footer : { 
		id 		: "#footer",
		url 	: "components/footer.html",
		load 	: function() { components.load(this.id, this.url); }
	},
	load : function(id, url) {
		$(id).empty(); 
		$(id).load(url);
	}
}