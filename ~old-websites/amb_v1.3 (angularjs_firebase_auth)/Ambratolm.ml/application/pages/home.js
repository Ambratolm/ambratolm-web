// ==================================================
// ♦ Home Controller
// ==================================================
application.controller("homeCtrl", function($scope, $location, $interval) {
	// --------------------------------------------------
    // ♦ Inner Variables
    // --------------------------------------------------
	var 〇 = $scope;
	var categoriesNav = new Navigation([{
        name : undefined,
        title : "Everything",
        description: "Made by Ambratolm",
        tags: undefined,
        icon: "fas fa-crown",
        image : 〇.website.imageToken,
        video : 〇.website.videoToken
    }].concat(〇.creationsCategories));
	// --------------------------------------------------
    // ♦ Scope Properties
    // --------------------------------------------------
    〇.categories = categoriesNav.items();
    〇.autoMode = true;
    // --------------------------------------------------
    // ♦ Scope Methods
    // --------------------------------------------------
    〇.currentCategory = function(category) {
        return categoriesNav.currentItem(category);
    };
    〇.currentCategoryIndex = function(index) {
        return categoriesNav.currentIndex(index);
    };
    〇.links = function() {
        return categoriesNav.currentIndex() ? 
            〇.creationsLinks.$filter({ categories : categoriesNav.currentItem().name }) : 〇.contactLinks;
    };
    〇.queryUrl = function() {
        var categoryPart = 〇.currentCategory().name ? ("/c/" + 〇.currentCategory().name): "";
        var queryPart = 〇.query ? ("/q/" + 〇.query) : "";
        var url = $location.absUrl().replace($location.url(), "/creations" + categoryPart + queryPart);
        return url;
    };
    〇.$watch("currentCategory()", function() {
    	angular.element(".current-category-icon").empty().addClass(〇.currentCategory().icon);
    });
    // --------------------------------------------------
	// ♦ Inner Functions
	// --------------------------------------------------
    (function(time) {
        var timer = $interval(function() { 
            if (〇.autoMode) {
                categoriesNav.next();
            } 
        }, time);
        〇.$on('$destroy', function() {
            if (isDefined(timer)) {
                $interval.cancel(timer);
                timer = undefined;
            }
        });
    })(2000);
});