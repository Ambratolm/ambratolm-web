//==============================================================================
// ■ Popover Directive
//------------------------------------------------------------------------------
//      This directive wraps bootstrap popover component.
//------------------------------------------------------------------------------
//      <element amb-popover="message|title|@direction"></element>
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Link
//------------------------------------------------------------------------------
function popoverDirectiveLink(scope, element, attrs) {
    var params = attrs.ambPopover.split("|");
    element.attr("data-content", params[0]);
    element.attr("title", params[1]);
    element.attr("data-placement", params[2]);
    element.attr("data-toggle", "   popover");
    element.attr("data-trigger", "hover");
    element.attr("data-html", "false");
    element.popover();
    element.click(() => element.popover("hide"));
}
//------------------------------------------------------------------------------
// ● Factoy
//------------------------------------------------------------------------------
function popoverDirectiveFactory() {
    return {
        restrict: "A",
        link: popoverDirectiveLink
    };
}
//------------------------------------------------------------------------------
// ● Directive Module
//------------------------------------------------------------------------------
export default angular
    .module("popover.directive", [])
    .directive("ambPopover", popoverDirectiveFactory).name;
