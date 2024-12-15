//==============================================================================
// ■ FaviconUrlInput Directive
//------------------------------------------------------------------------------
//		Favicon External URL Getter (from HTTP)
//------------------------------------------------------------------------------
// 		This directive validates external URL input and returns it
// 		if it is a valid favicon image.
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Attributes
//------------------------------------------------------------------------------
const scope = {
	url: "=ambUrl",
	visible: "=ambVisible"
};
//------------------------------------------------------------------------------
// ● Link
//------------------------------------------------------------------------------
function faviconUrlInputDirectiveLink(scope, element, attrs, controller) {
	//...
}
//------------------------------------------------------------------------------
// ● Controller
//------------------------------------------------------------------------------
function faviconUrlInputDirectiveController($scope) {
	//--------------------------------------------------------------------------
	// ● Favicon Image OnErrorSrc Assets
	//--------------------------------------------------------------------------
	this.onEmptySrc =
		require("ROOT/assets/images/favicons/amb-favicon.empty.png");
    this.onErrorSrc =
    	require("ROOT/assets/images/favicons/amb-favicon.error.png");
    //--------------------------------------------------------------------------
    // ● Favicon Image Validation Functions
    //--------------------------------------------------------------------------
    function isValidUrl(url) {
        return url.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

    }
    //--------------------------------------------------------------------------
    // ● Favicon URL Watcher
    //--------------------------------------------------------------------------
    $scope.$watch(
        () => this.url,
        url => {
            if (url) {
                if (isValidUrl(url)) {
                    if (this.error) {
                        this.error.invalidUrl = undefined;
                        this.error = undefined;
                    }
                } else {
                    if (!this.error) this.error = {};
                    this.error.invalidUrl = true;
                }
            }
        }
    );
    //--------------------------------------------------------------------------
    // ● Favicon Apply & Cancel Functions
    //--------------------------------------------------------------------------
    this.apply = () =>  {
        if (!this.error) {
            $scope.url = this.url;
            this.cancel();
        }
    }
    this.cancel = () => {
        $scope.visible = false;
    }
}
//------------------------------------------------------------------------------
// ● Factory
//------------------------------------------------------------------------------
function faviconUrlInputDirectiveFactory() {
	return {
		restrict: "AE",
		scope: scope,
		link: faviconUrlInputDirectiveLink,
		controller: faviconUrlInputDirectiveController,
		controllerAs: "faviconUrlInput",
		template: require("./favicon-url-input.directive.html")
	};
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
	.module("faviconUrlInput.directive", [])
	.directive("ambFaviconUrlInput", faviconUrlInputDirectiveFactory).name;
