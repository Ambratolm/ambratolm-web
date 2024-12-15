//==============================================================================
// ■ OnErrorSrc Directive
//------------------------------------------------------------------------------
//      This directive handles the onerror event when the
//      URL in a src attribute of an element is not resolved.
//------------------------------------------------------------------------------
//      <element amb-on-error-src="https://example.com/error.png"></element>
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Attributes
//------------------------------------------------------------------------------
// const scope = {
//     isError: "=ambIsError"
// }
//------------------------------------------------------------------------------
// ● Link
//------------------------------------------------------------------------------
function onErrorSrcDirectiveLink(scope, element, attrs) {
    element.bind("error", () => {
        if (attrs.src && attrs.src != attrs.ambOnerrorSrc) {
            element.attr("src", attrs.ambOnErrorSrc);
            element.attr(
                "title",
                attrs.ambOnErrorTitle ||
                    "Error: Inexistent or Inaccessible Image"
            );
            // scope.isError = true;
        }
    });
}
//------------------------------------------------------------------------------
// ● Factory
//------------------------------------------------------------------------------
function onErrorSrcDirectiveFactory() {
    return {
        restrict: "A",
        // scope: scope,
        link: onErrorSrcDirectiveLink
    };
}
//------------------------------------------------------------------------------
// ● Directive Module
//------------------------------------------------------------------------------
export default angular
    .module("onErrorSrc.directive", [])
    .directive("ambOnErrorSrc", onErrorSrcDirectiveFactory).name;
