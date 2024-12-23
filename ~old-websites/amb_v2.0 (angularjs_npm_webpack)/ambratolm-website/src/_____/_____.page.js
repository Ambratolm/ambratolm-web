//==============================================================================
// ■ _____ Page
//------------------------------------------------------------------------------
//      __________________________________________________.
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
import uirouter from "angular-ui-router";
import navbar from "ROOT/directives/navbar/navbar.directive";
import footer from "ROOT/directives/footer/footer.directive";
//------------------------------------------------------------------------------
// ● Controller
//------------------------------------------------------------------------------
class _____PageController {
    constructor() {
        //...
    }
}
//------------------------------------------------------------------------------
// ● Routes
//------------------------------------------------------------------------------
function routes($stateProvider) {
    $stateProvider.state("_____", {
        url: "/_____",
        template: require("./_____.page.html"),
        controller: _____PageController,
        controllerAs: "_____"
    });
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("_____.page", [uirouter, navbar, footer])
    .controller("_____PageController", _____PageController)
    .config(routes).name;
