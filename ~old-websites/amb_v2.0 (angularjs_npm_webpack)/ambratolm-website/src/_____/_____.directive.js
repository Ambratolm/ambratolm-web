//==============================================================================
// ■ _____ Directive
//------------------------------------------------------------------------------
//      This directive is ________________________________________.
//------------------------------------------------------------------------------
//      <_____></_____>
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Attributes
//------------------------------------------------------------------------------
const scope = {
    _____: "=amb_____", // Two-way model binding
    _____: "<amb_____", // One-way binding
    _____: "@amb_____", // String
    _____: "&amb_____" // Function
};
//------------------------------------------------------------------------------
// ● Link
//------------------------------------------------------------------------------
function _____DirectiveLink(scope, element, attrs, controller, transcludeFn) {
    //...
}
//------------------------------------------------------------------------------
// ● Controller
//------------------------------------------------------------------------------
function _____DirectiveController() {
    //...
}
//------------------------------------------------------------------------------
// ● Factory
//------------------------------------------------------------------------------
function _____DirectiveFactory() {
    return {
        transclude: false, // ng-transclude attribute required
        require: "^^_____", // Use only parent controller
        bindToController: true,

        restrict: "AE", // A, E, C, M
        scope: scope,
        link: _____DirectiveLink,
        controller: _____DirectiveController,
        controllerAs: "_____",
        template: require("./_____.directive.html")
    };
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("_____.directive", [])
    .directive("amb_____", _____DirectiveFactory).name;
