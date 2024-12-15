//==============================================================================
// ■ Tooltip Directive
//------------------------------------------------------------------------------
//      This directive wraps bootstrap tooltip component.
//------------------------------------------------------------------------------
//      <element amb-tooltip="message|@direction"></element>
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Link
//------------------------------------------------------------------------------
function tooltipDirectiveLink(scope, element, attrs) {
    let params = attrs.ambTooltip.split("|");
    element.attr("title", params[0]);
    element.attr("data-placement", params[1]);
    element.attr("data-toggle", "tooltip");
    element.attr("data-trigger", "hover");
    element.tooltip();
    element.click(() => element.tooltip("hide"));
}
//------------------------------------------------------------------------------
// ● Factoy
//------------------------------------------------------------------------------
function tooltipDirectiveFactory() {
    return {
        restrict: "A",
        link: tooltipDirectiveLink
    };
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("tooltip.directive", [])
    .directive("ambTooltip", tooltipDirectiveFactory).name;
