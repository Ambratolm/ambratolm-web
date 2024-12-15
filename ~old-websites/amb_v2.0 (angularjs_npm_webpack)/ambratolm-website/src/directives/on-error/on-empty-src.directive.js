//==============================================================================
// ■ OnEmtySrc Directive
//------------------------------------------------------------------------------
//      This directive handles the case of when
//      ng-src attribute of an element is empty.
//------------------------------------------------------------------------------
//      <element amb-on-empty-src="https://example.com/empty.png"></element>
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Link
//------------------------------------------------------------------------------
function onEmptySrcDirectiveLink(scope, element, attrs) {
    let title = "";
    scope.$watch(
        () => attrs.ngSrc,
        ngSrc => {
            if (ngSrc) {
                if (title) element.attr("title", title);
            } else {
                title = element.attr("title");
                element.attr("src", attrs.ambOnEmptySrc);
                element.attr(
                    "title",
                    attrs.ambOnEmptyTitle || "Empty: Unavailable Image"
                );
            }
        }
    );
}
//------------------------------------------------------------------------------
// ● Factory
//------------------------------------------------------------------------------
function onEmptySrcDirectiveFactory() {
    return {
        restrict: "A",
        link: onEmptySrcDirectiveLink
    };
}
//------------------------------------------------------------------------------
// ● Directive Module
//------------------------------------------------------------------------------
export default angular
    .module("onEmptySrc.directive", [])
    .directive("ambOnEmptySrc", onEmptySrcDirectiveFactory).name;
