// ==================================================
// ♦ Creations Controller
// ==================================================
application.controller("creationsCtrl", function($scope, $location, $routeParams) {
	// --------------------------------------------------
    // ♦ Inner Variables
    // --------------------------------------------------
    var 〇 = $scope;
	var categoriesNav = new Navigation([{
        name : undefined,
        title : "All Creations",
        description: "All creations by Ambratolm",
        tags: [ "Programs", "Games", "Audio", "Videos", "Images", "Documents" ],
        icon: "fas fa-copyright",
        image : 〇.website.imageToken.replace("token", "creations"),
        video : 〇.website.videoToken
    }].concat(〇.creationsCategories));
    // --------------------------------------------------
    // ♦ Scope Properties
    // --------------------------------------------------
    〇.categories = categoriesNav.items();
    〇.query = undefined;
    〇.queryUrlCopied = undefined;
    // --------------------------------------------------
    // ♦ Scope Methods
    // --------------------------------------------------
    〇.currentCategory = function(category) {
        return categoriesNav.currentItem(category);
    };
    〇.currentCategoryIndex = function(index) {
        return categoriesNav.currentIndex(index);
    };
    〇.links = function(category, query) {
    	var currentCategory = isDefined(category) ? category : 〇.currentCategory();
        var query = isDefined(query) ? query : 〇.query;
        if (query) return 〇.creationsLinks.$filter(query);
        else return 〇.creationsLinks.$filter({ categories : currentCategory.name });
    };
    〇.entries = function(category, query) {
        var currentCategory = isDefined(category) ? category : 〇.currentCategory();
        var query = isDefined(query) ? query : 〇.query;
        return 〇.creationsEntries.$filter({ categories : currentCategory.name }).$filter(query);
    };
    〇.linksChanged = function(category) {
        return (JSON.stringify(〇.links(category)) != JSON.stringify(〇.links(category, "")));
    };
    〇.entriesChanged = function(category) {
        return (JSON.stringify(〇.entries(category)) != JSON.stringify(〇.entries(category, "")));
    };
    〇.queryUrl = function(category, query) {
    	var categoryParam = isDefined(category) ? category.name : 〇.currentCategory().name;
    	var queryParam = isDefined(query) ? query : 〇.query;
        var categoryPart = categoryParam ? ("/c/" + categoryParam) : "";
        var queryPart = queryParam ? ("/q/" + queryParam) : "";
        return $location.absUrl().replace($location.url(), "/creations" + categoryPart + queryPart);
    };
    〇.copyQueryUrl = function() {
        〇.queryUrlCopied = true;
    };
    〇.clearQuery = function() {
        〇.query = undefined;
    };
    〇.categoryIcon = function(categoryName) {
        if (isUndefined(categoryName)) categoryName = "";
        var category = 〇.categories.item('name', categoryName, { caseInsensitive : true });
        return category ? category.icon : "fas fa-x";
    };
    〇.$watch("currentCategory()", function() {
    	angular.element(".current-category-icon").empty().addClass(〇.currentCategory().icon);
        〇.queryUrlCopied = false;
    });
    〇.$watch("query", function() {
        〇.queryUrlCopied = false;
    });
    // --------------------------------------------------
	// ♦ Inner Functions
	// --------------------------------------------------
	(function() {
        if ($routeParams) {
            if ($routeParams.category) 
                〇.currentCategory(〇.categories.item("name", $routeParams.category));
            if ($routeParams.query) 
                〇.query = $routeParams.query;
        }
    })();
});

// ==================================================
// ♦ Routes
// ==================================================
application.run(function($route){
    ROUTE_CONSTRUCTORS.add(function() {
		$ROUTE_PROVIDER
			.when("/creations/c/:category", {
		        templateUrl : "application/pages/creations.html",
		        controller : "creationsCtrl"
		    })
		    .when("/creations/q/:query", {
		        templateUrl : "application/pages/creations.html",
		        controller : "creationsCtrl"
		    })
		    .when("/creations/c/:category/q/:query", {
		        templateUrl : "application/pages/creations.html",
		        controller : "creationsCtrl"
		    })
	});
});