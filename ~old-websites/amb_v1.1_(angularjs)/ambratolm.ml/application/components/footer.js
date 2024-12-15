// ==================================================
// ♦ Footer Directive
// ==================================================
application.directive("ambFooter", function() {
    return {
        templateUrl : "application/components/footer.html",
        controller : function($rootScope, $scope) {
  			$scope.copyright = $rootScope.website.copyright.replace("0000", (new Date()).getFullYear());
        }
    };
});