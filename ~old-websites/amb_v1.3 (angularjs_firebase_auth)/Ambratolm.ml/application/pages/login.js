// ==================================================
// ♦ Login Controller
// ==================================================
application.controller("loginCtrl", function($scope, $location, authentication) {
	// --------------------------------------------------
    // ♦ Inner Variables
    // --------------------------------------------------
    var 〇 = $scope;
    if (〇.currentUser) $location.path("/home");
    // --------------------------------------------------
    // ♦ Scope Properties
    // --------------------------------------------------
    〇.user = {
        name : "",
        email : "",
        password : ""
    };
    〇.status = {
        login : "",
        register : ""
    };
    〇.refPage = {
        name : "",
        title : "",
        error : ""
    }
    // --------------------------------------------------
    // ♦ Scope Methods
    // --------------------------------------------------
    〇.login = function() {
        authentication.login(〇.user);
    };
    〇.register = function() {
        authentication.register(〇.user);
    };
    〇.$watch(function() { return authentication.status.login }, function(newValue, oldValue) {
        〇.status.login = newValue;
    });
    〇.$watch(function() { return authentication.status.register }, function(newValue, oldValue) {
        〇.status.register = newValue;
    });
    // --------------------------------------------------
    // ♦ Inner Functions
    // --------------------------------------------------
    (function() {
        queryStringParams = $location.search();
        if (queryStringParams) {
            〇.refPage.name = queryStringParams.ref;
            var page = 〇.website.pages.item("name", 〇.refPage.name);
            〇.refPage.title = page ? page.title : 〇.refPage.name;
            〇.refPage.error = queryStringParams.err;
        }
    })();
});

// ==================================================
// ♦ Routes
// ==================================================