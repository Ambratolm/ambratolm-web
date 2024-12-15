// ==================================================
// ♦ Module
// ==================================================
var application = angular.module("ambratolmApp", 
	["ngRoute", "ngResource", "ngSanitize", "ngAnimate", "ngclipboard", "firebase"]);

// 
// ==================================================
// ♦ Database
// ==================================================
firebase.initializeApp({
    apiKey: "AIzaSyBnWl9MtVtQYwxjWcnm0nCFkwjpAK09_3A",
    authDomain: "ambratolmapp.firebaseapp.com",
    databaseURL: "https://ambratolmapp.firebaseio.com",
    projectId: "ambratolmapp",
    storageBucket: "ambratolmapp.appspot.com",
    messagingSenderId: "886493009176"
});

// ==================================================
// ♦ Run
// ==================================================
application.run(
	function($rootScope, $http, $route, $location, $filter, $timeout) {
        // --------------------------------------------------
        // ♦ Initialization
        // --------------------------------------------------
        $http.get("application/data/@website.json").then(function(response) {
            $rootScope.website = response.data;
            createDataObjects($rootScope.website.dataSources);
            $timeout(function() {
                createDynamicRoutes($rootScope.website.pages);
            }, 100);
        });
        // --------------------------------------------------
        // ♦ Data Objects
        // --------------------------------------------------
        var createDataObjects = function(dataSources) {
            angular.forEach(dataSources, function(value, key) {
                $http.get(value).then(function(response) {
                    $rootScope[key] = response.data;
                });
            });
        };
        // --------------------------------------------------
        // ♦ Dynamic Routes
        // --------------------------------------------------
        var createDynamicRoutes = function(pages) {
            pages.forEach(function(page) {
                $ROUTE_PROVIDER.when("/" + page.name, {
                    templateUrl : "application/pages/" + page.name + ".html",
                    controller : page.name + "Ctrl"
                });
                if (page.isHomePage) {
                    $ROUTE_PROVIDER.otherwise({
                        redirectTo : "/" +  page.name
                    });
                }
            });
            ROUTE_CONSTRUCTORS.execute();
            $rootScope.currentPage = function(pageName) {
                if (isUndefined(pageName)) pageName = $location.url().match(/\w+/i);  
                var page = $rootScope.website.pages.item("name", pageName);
                return page ? page : $rootScope.website.pages.item("isHomePage", true);
            };
            $route.reload();
            $rootScope.currentPage();
            $rootScope.$on("$locationChangeSuccess", function() {
                $rootScope.currentPage();
            });
        };
        // --------------------------------------------------
        // ♦ Events
        // --------------------------------------------------
        $rootScope.$on("$routeChangeError", function(event, next, prev, error) {
            log(error);
            if (error == "AUTH_REQUIRED") {
                alert("Access Denied !");
                $location.path("/home");
            }
        });
        // --------------------------------------------------
        // ♦ Array Extensions
        // --------------------------------------------------
        Array.prototype.$filter = function(expression, comparator) {
            return $filter("filter")(this, expression, comparator);
        };
    }
);

// ==================================================
// ♦ Routes 
// ==================================================
var $ROUTE_PROVIDER;
var ROUTE_CONSTRUCTORS = new BatchFunctions();
application.config(function($routeProvider, $locationProvider) {
    $ROUTE_PROVIDER = $routeProvider;
    $locationProvider.hashPrefix("");
});

// ==================================================
// ♦ Directives
// ==================================================
application.directive("tooltip", function() {
    // --------------------------------------------------
    // ♦ Bootstrap Tooltip
    // --------------------------------------------------
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
        	element.attr("data-toggle", "tooltip");
            element.attr("data-trigger", "hover");
        	element.attr("title", attrs.tooltip);
            element.tooltip();
            element.on("click", function() {
                element.tooltip("hide");
            });
        }
    };
});
application.directive("popover", function() {
    // --------------------------------------------------
    // ♦ Bootstrap Popover
    // --------------------------------------------------
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
            var popoverTextArray = attrs.popover.split("|");
            element.attr("data-toggle", "popover");
            element.attr("data-trigger", "hover");
            element.attr("data-html", "false");
            element.attr("title", popoverTextArray[0]);
            element.attr("data-content", popoverTextArray[1]);
            element.popover();
            element.on("click", function() {
                element.popover("hide");
            });
        }
    };
});
application.directive("collapse", function() {
    // --------------------------------------------------
    // ♦ Bootstrap Collapse
    // --------------------------------------------------
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
            element.attr("data-toggle", "collapse");
            element.attr("data-target", attrs.collapse);
            element.attr("aria-expanded", "false");
            // element.attr("aria-controls", "");
        }
    };
});

// ==================================================
// ♦ Filters 
// ==================================================
application.filter("html", function($sce) {
    // --------------------------------------------------
    // ♦ Text as HTML
    // --------------------------------------------------
    return function(value) {
        return (value) ? $sce.trustAsHtml(value.replace(/\n/g, '<br>')) : "";
    };
});
application.filter("resourceUrl", function($sce) {
    // --------------------------------------------------
    // ♦ Text as Resource URL
    // --------------------------------------------------
    return function(value) {
        return (value) ? $sce.trustAsResourceUrl(value) : "";
    };
});
application.filter("capitalize", function() {
    // --------------------------------------------------
    // ♦ Text to Capital Case
    // --------------------------------------------------
    return function(value) {
        return (value) ? value.replace(/\w\S*/g, function (text) { 
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        }) : "";
    };
});
application.filter("type", function() {
    // --------------------------------------------------
    // ♦ Data Type of Variable
    // --------------------------------------------------
    return function(value) {
        return (value) ? typeof value : undefined;
    };
});