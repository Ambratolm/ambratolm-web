app.controller('footerCtrl', function($scope) {
	var year = (new Date()).getFullYear();
  	$scope.copyrightYearRange = (year - 20) + " - " + year;
});