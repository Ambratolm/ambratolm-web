var app = angular.module('ambratolm', ['ngSanitize', 'ngAnimate', 'ngRoute']);
app.controller('mainCtrl', function($scope, $sce, $http, $location) {
	$scope.current = "home";
	$scope.sections = new Array();
	var sectionsIds = [ "programs", "games", "audio", "videos", "images", "documents" ];
	for (var i = 0; i < sectionsIds.length; i++) {
		$http.get("data/" + sectionsIds[i] + ".json").then(function(response) {
			$scope.sections.push({
				id : response.data.id,
				title : response.data.title,
                description : response.data.description,
                tags : response.data.tags,
                icon : response.data.icon,
                banner : response.data.banner,
                embed : $sce.trustAsResourceUrl(response.data.embed),
                profiles : response.data.profiles,
                entries : response.data.entries
			});
		});	
	}
  	$scope.setCurrent = function(pageName) {
  		if (sectionsIds.includes(pageName.toLowerCase())
  			|| pageName.toLowerCase() == "home") {
	    	$scope.current = pageName;
            //jQuery("a[href='" + $scope.current + "']").class("active");
	    }
  	};
    var retrieveData = function(title) {
        if (title) {
            $http.get("data/" + title + ".json").then(function(response) {
                $scope.title = response.data.title;
                $scope.description = response.data.description;
                $scope.icon = response.data.icon;
                $scope.banner = response.data.banner;
                $scope.embed = $sce.trustAsResourceUrl(response.data.embed);
                $scope.profiles = response.data.profiles;
                $scope.entries = response.data.entries;
            }, function(response) {
                $scope.title = title + ".json" + " CONTENT NOT FOUND";
                $scope.icon = "fas fa-exclamation-triangle";
            });
        } else {
            $scope.title = "NO CONTENT";
            $scope.icon = "far fa-times-circle";
        }
    };
    var log = function(txt, clear) {
    	if (clear) { console.clear(); }
    	console.log("%c" + txt, "background: red; color:yellow; font-size: x-large");
    }
    $scope.$on('$locationChangeStart', function(event, next, current) {
	    $scope.setCurrent($location.hash());
	});
    $scope.$watch('current', function(newValue, oldValue) {
        log("url : " + $location.hash(), true);
        switch ($scope.current) {
            case "home":
                retrieveData("faq");
                break;
            case "programs":
                retrieveData("programs");
                break;
            case "games":
                retrieveData("games");
                break;
            case "audio":
                retrieveData("audio");
                break;
            case "videos":
                retrieveData("videos");
                break;
            case "images":
                retrieveData("images");
                break;
            case "documents":
                retrieveData("documents");
                break;
            default:
                retrieveData();
                break;
        }
    });
});
app.filter('newline', function($sce) {
    return function(value) {
        return (value) ? $sce.trustAsHtml(value.replace(/\n/g, '<br>')) : "";
    };
});
app.directive('tooltip', function() {
    return {
        restrict : 'A',
        scope: {
            tooltipText: "@tooltip"
        },
        link : function(scope, element, attrs) {
        	element.attr("data-toggle", "tooltip");
        	element.attr("title", scope.tooltipText);
            element.tooltip();
        }
    };
});
