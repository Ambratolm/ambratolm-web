//==============================================================================
// ■ Navbar Directive
//------------------------------------------------------------------------------
//      <amb-navbar></amb-navbar>
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Controller
//------------------------------------------------------------------------------
function navbarDirectiveController($state) {
    this.title = "Ambratolm";
    this.description = "Making cool things for cool multimedias";
    this.brand =
        $state.current.name === "home"
            ? require("ROOT/assets/images/logos/amb-logo.light.png")
            : require("ROOT/assets/images/logos/amb-logo.muted.png");
}
//------------------------------------------------------------------------------
// ● Factory
//------------------------------------------------------------------------------
function navbarDirectiveFactory() {
    return {
        restrict: "E",
        controller: navbarDirectiveController,
        controllerAs: "navbar",
        template: require("./navbar.directive.html")
    };
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("navbar.directive", [])
    .directive("ambNavbar", navbarDirectiveFactory).name;
