// ==================================================
// ♦ Login Controller
// ==================================================
application.controller("loginCtrl", function($scope, authentication) {
	// --------------------------------------------------
    // ♦ Inner Variables
    // --------------------------------------------------
    var 〇 = $scope;
    // --------------------------------------------------
    // ♦ Scope Properties
    // --------------------------------------------------
    〇.user = {
        name : "",
        email : "",
        password : ""
    };
    // --------------------------------------------------
    // ♦ Scope Methods
    // --------------------------------------------------
    〇.status = {
        login : function() { return authentication.status.login; },
        register : function() { return authentication.status.register; }
    };
    〇.login = function() { 
        〇.loginMessage = "Loading..."; 
        authentication.login(〇.user); 
    };
    〇.register = function() {
        〇.registerMessage = "Loading...";
        authentication.register(〇.user); 
    };
    〇.$watch("status.login()", function(newValue, oldValue) {
        if (newValue != oldValue) 〇.loginMessage = 〇.status.login();
        else 〇.loginMessage = "";
    });
    〇.$watch("status.register()", function(newValue, oldValue) {
        if (newValue != oldValue) 〇.registerMessage = 〇.status.register();
        else 〇.registerMessage = "";
    });
});

// ==================================================
// ♦ Routes
// ==================================================
// application.run(function($route){
//     ROUTE_CONSTRUCTORS.add(function() {
//         $ROUTE_PROVIDER
//             .when("/login", {
//                 templateUrl : "application/pages/login.html",
//                 controller : "loginCtrl",
//                 resolve : {
//                     currentAuth : function(authentication) {
//                         return authentication.requireAuth();
//                     }
//                 }
//             });
//     });
// });