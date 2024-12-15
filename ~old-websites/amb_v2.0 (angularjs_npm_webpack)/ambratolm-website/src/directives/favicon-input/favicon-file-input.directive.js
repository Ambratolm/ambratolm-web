//==============================================================================
// ■ FaviconFileInput Directive
//------------------------------------------------------------------------------
//      Favicon Internal URL Getter (from File)
//------------------------------------------------------------------------------
//      This directive validates imported file input and returns it
//      with its internal URL if it is a valid favicon image.
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Attributes
//------------------------------------------------------------------------------
const scope = {
    file: "=ambFile",
    blobUrl: "=ambBlobUrl",
    visible: "=ambVisible"
};
//------------------------------------------------------------------------------
// ● Link
//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
// ● Controller
//------------------------------------------------------------------------------
function faviconFileInputDirectiveController($scope) {
    //--------------------------------------------------------------------------
    // ● Favicon Image OnErrorSrc Assets
    //--------------------------------------------------------------------------
    this.onEmptySrc =
        require("ROOT/assets/images/favicons/amb-favicon.empty.png");
    this.onErrorSrc =
        require("ROOT/assets/images/favicons/amb-favicon.error.png");
    //--------------------------------------------------------------------------
    // ● Favicon Image Properties Reference
    //--------------------------------------------------------------------------
    const imageMIMETypes = [
        "image/x-icon",
        "image/png",
        "image/jpeg",
        "image/bmp"
    ];
    // const imageResolutions = ["16x16", "32x32", "64x64", "48x48"];
    //--------------------------------------------------------------------------
    // ● Favicon Image Validation Functions
    //--------------------------------------------------------------------------
    function isValidFaviconFileExtension(file) {
        return imageMIMETypes.includes(file.type);
    }
    // function isValidFaviconImageResolution(file) {

    // }
    //--------------------------------------------------------------------------
    // ● Favicon File Watcher
    //--------------------------------------------------------------------------
    $scope.$watch(
        () => this.file,
        file => {
            if (file) {
                if (isValidFaviconFileExtension(file)) {
                    if (this.error) {
                        this.error.invalidImageExtension = undefined;
                        this.error = undefined;
                    }
                } else {
                    if (!this.error) this.error = {};
                    this.error.invalidImageExtension = true;
                }
            }
        }
    );
    //--------------------------------------------------------------------------
    // ● Favicon Apply & Cancel Functions
    //--------------------------------------------------------------------------
    this.apply = () =>  {
        if (!this.error) {
            $scope.file = this.file;
            $scope.blobUrl = this.blobUrl;
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
function faviconFileInputDirectiveFactory() {
    return {
        restrict: "AE",
        scope: scope,
        // link: faviconFileInputDirectiveLink,
        controller: faviconFileInputDirectiveController,
        controllerAs: "faviconFileInput",
        template: require("./favicon-file-input.directive.html")
    };
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("faviconFileInput.directive", [])
    .directive("ambFaviconFileInput", faviconFileInputDirectiveFactory).name;
