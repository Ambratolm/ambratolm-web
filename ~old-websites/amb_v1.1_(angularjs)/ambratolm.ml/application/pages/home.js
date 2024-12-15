// ==================================================
// ♦ Home Controller
// ==================================================
application.controller("homeCtrl", function($rootScope, $scope, $interval) {
	var generalCreationsCategory = {
		name : "",
        title : "Everything",
        description: "Made by Ambratolm",
        tags: [],
        icon: "fas fa-crown",
        image : $rootScope.website.imageToken,
        video : $rootScope.website.videoToken
	};
	$scope.creationsCategoriesNav = new Navigation([generalCreationsCategory].concat($rootScope.creationsCategories));
	$scope.$watch("creationsCategoriesNav.currentItem.icon", function(newValue, oldValue) {
		angular.element("#creationsCategoriesNavIcon").empty().addClass(newValue);
	});
	$scope.autoNav = true;
	$interval(function() {
		if ($scope.autoNav) $scope.creationsCategoriesNav.next();
	}, 2000);
});