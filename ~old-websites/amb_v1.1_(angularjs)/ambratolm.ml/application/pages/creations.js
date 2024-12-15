// ==================================================
// ♦ Creations Controller
// ==================================================
application.controller('creationsCtrl', function($rootScope, $scope, $location, $routeParams, $timeout) {
	var generalCreationsCategory = {
		name : "",
        title : "All",
        description: "All creations",
        tags: ["Program","Game","Audio","Video","Image","Document"],
        icon: "fas fa-asterisk",
        image : "assets/images/creations.png",
        video : $rootScope.website.videoToken
	};
	$scope.creationsCategoriesNav = new Navigation([generalCreationsCategory].concat($rootScope.creationsCategories));
	$scope.$watch("creationsCategoriesNav.currentItem", function(newCurrentItem) {
		angular.element(".creationsCategoriesNavIcon").empty().addClass(newCurrentItem.icon);
	});
	$scope.$watch("entriesQuery", function() {
		$scope.setCopied(false);
	});
	$scope.clearFilters = function() {
		$scope.entriesQuery = "";
	};
	$scope.setEntriesQuery = function(query) {
		$scope.entriesQuery = query;
	}
	$scope.setCopied = function(copied) {
		$scope.copied = copied;
	}
	$scope.setEntriesOrder = function(order) {
		if (angular.isUndefined(order)) order = "";
		$scope.entriesOrder = order;
	}
	$scope.setEntriesOrder();
	$scope.absUrl = function(query) {
		var url = $location.absUrl();
		if (!angular.isUndefined(query))
			url += "/" + query;
		return url;
	}
	if ($routeParams.category) {
		var category = $scope.creationsCategoriesNav.array.item("name", $routeParams.category);
		if (category) {
			var categoryIndex = $scope.creationsCategoriesNav.array.indexOf(category);
			$scope.creationsCategoriesNav.current(categoryIndex);
		} else {
			$scope.setEntriesQuery($routeParams.category);
		}
	}
	if ($routeParams.query) {
		$scope.setEntriesQuery($routeParams.query);
	}
});

// ==================================================
// ♦ Routes
// ==================================================
application.run(function($route){
    〇routeConstructor.add(function() {
		〇routeProvider
			.when("/creations/:category", {
		        templateUrl : "application/pages/creations.html",
		        controller : "creationsCtrl"
		    })
		    .when("/creations/:category/:query", {
		        templateUrl : "application/pages/creations.html",
		        controller : "creationsCtrl"
		    });
	});
});