// ==================================================
// ♦ Navbar Directive
// ==================================================
application.directive("ambNavbar", function() {
    return {
        templateUrl : "application/components/navbar.html",
        controller : function($scope, $location, authentication) {
            // --------------------------------------------------
            // ♦ Inner Variables
            // --------------------------------------------------
            var 〇 = $scope;
            // --------------------------------------------------
            // ♦ Scope Properties
            // --------------------------------------------------
            〇.title = 〇.website.title;
            〇.description = 〇.website.description;
            〇.brand = 〇.currentPage().isHomePage ? 〇.website.logo : 〇.website.logoLight;
            〇.homePageName = 〇.website.pages.item("isHomePage", true).name;
            〇.pages = 〇.website.pages.$filter({ isHomePage : "!true", isHidden : "!true", isAction : "!true" });
            〇.actions =  〇.website.pages.$filter({ isHomePage : "!true", isHidden : "!true", isAction : "true" });
            〇.loginAction = 〇.actions.item("name", "login");
            // --------------------------------------------------
            // ♦ Scope Methods
            // --------------------------------------------------
            〇.isCurrentPage = function(page) { return page.name == 〇.currentPage().name; };
            〇.logout = function() { authentication.logout(); $location.path("/login"); };
            // --------------------------------------------------
            // ♦ Inner Functions
            // --------------------------------------------------
        }
    };
});