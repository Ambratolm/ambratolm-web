var pages = {
	current : "home",
	home : { 
		id : "#logo",
		name : "home",
		load : function() {
			pages.current = this.name;
			components.navbar.load();
			components.jumbotron.load();
			components.sidebar.load();
			components.content.load();
			components.footer.load();
		}
	},
	programs : {
		id : "#programs",
		name : "programs",
		load : function() {
			pages.current = this.name;
			components.jumbotron.load();
			components.sidebar.load();
			components.content.load() 
		} 	
	},
	games : {
		id : "#games",
		name : "games",
		load : function() {
			pages.current = this.name;
			components.jumbotron.load();
			components.sidebar.load();
			components.content.load(); 
		} 
	},
	audio : {
		id : "#audio",
		name : "audio",
		load : function() {
			pages.current = this.name;
			components.jumbotron.load();
			components.sidebar.load();
			components.content.load();
		} 
	},
	videos : {
		id : "#videos",
		name : "videos",
		load : function() { 
			pages.current = this.name;
			components.jumbotron.load();
			components.sidebar.load();
			components.content.load();
		}  
	},
	images : {
		id : "#images",
		name : "images",
		load : function() { 
			pages.current = this.name;
			components.jumbotron.load();
			components.sidebar.load();
			components.content.load();
		}  
	},
	documents : {
		id : "#documents",
		name : "documents",
		load : function() {
			pages.current = this.name;
			components.jumbotron.load();
			components.sidebar.load();
			components.content.load();
		} 
	}
}