//==============================================================================
// ■ WebsiteSettings Page
//------------------------------------------------------------------------------
//      Administration Child Page
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
import uirouter from "angular-ui-router";
import database from "ROOT/services/database.service";
import datastate from "ROOT/services/datastate.service";
import storage from "ROOT/services/storage.service";
import onEmptySrc from "ROOT/directives/on-error/on-empty-src.directive";
import onErrorSrc from "ROOT/directives/on-error/on-error-src.directive";
import fileInput from "ROOT/directives/file-input/file-input.directive";
import faviconUrlInput
from "ROOT/directives/favicon-input/favicon-url-input.directive";
import faviconFileInput
from "ROOT/directives/favicon-input/favicon-file-input.directive";
//------------------------------------------------------------------------------
// ● Page Controller Class
//------------------------------------------------------------------------------
class WebsiteSettingsPageController {
    constructor($scope, Database, Datastate, Storage) {
        //----------------------------------------------------------------------
        // ● Services
        //----------------------------------------------------------------------
        this.$scope = $scope;
        this.Storage = Storage;
        //----------------------------------------------------------------------
        // ● Data Objects
        //----------------------------------------------------------------------
        this.website = Database.website();
        this.state = Datastate.initialize(this.website);
        //--------------------------------------------------------------------------
        // ● Favicon Image OnErrorSrc Assets
        //--------------------------------------------------------------------------
        this.onEmptySrc =
            require("ROOT/assets/images/favicons/amb-favicon.empty.png");
        this.onErrorSrc =
            require("ROOT/assets/images/favicons/amb-favicon.error.png");
    }
    faviconOption(option) {
        if (option === "url") {
            this.isFaviconUrlOption = true;
            this.isFaviconUploadOption = false;
        } else if (option === "upload") {
            this.isFaviconUrlOption = false;
            this.isFaviconUploadOption = true;
        } else {
            return this.faviconUrlOption ? "url" : "upload";
        }
    }
    save() {
        this.state.markSaveStart();
        if (this.faviconFile) {
            let uploadTask = this.Storage.uploadImage(this.faviconFile);
            uploadTask.then(fileSnapshot => {
                this.website.favicon.internalUrl = fileSnapshot.downloadURL;
                this.website.favicon.externalUrl = null;
                delete this.website.favicon.tempUrl;
                this.faviconFile = undefined;
                this.website.$save().then(() => {
                    this.state.markSaveEnd();
                });
            });
            uploadTask.on("state_changed", fileSnapshot => {
                let percent =
                (fileSnapshot.bytesTransferred / fileSnapshot.totalBytes) * 100;
                this.faviconUploadedPercent = percent.toFixed(2);
                this.$scope.$apply();
            });
        } else if (this.website.favicon.tempUrl) {
            this.website.favicon.externalUrl = this.website.favicon.tempUrl;
            this.website.favicon.internalUrl = null;
            delete this.website.favicon.tempUrl;
            this.website.$save().then(() => {
                this.state.markSaveEnd();
            });
        }
    }
    undo() {
        this.website = this.state.dataObjectSnapshot;
    }
}
//------------------------------------------------------------------------------
// ● Page Routes
//------------------------------------------------------------------------------
function routes($stateProvider) {
    $stateProvider.state("websiteSettings", {
        parent: "admin",
        url: "/website-settings",
        template: require("./website-settings.page.html"),
        controller: WebsiteSettingsPageController,
        controllerAs: "websiteSettings"
    });
}
//------------------------------------------------------------------------------
// ● Page Module
//------------------------------------------------------------------------------
export default angular
    .module("admin.websiteSettings.page", [
        uirouter,
        database,
        datastate,
        storage,
        onEmptySrc,
        onErrorSrc,
        fileInput,
        faviconUrlInput,
        faviconFileInput
    ])
    .controller("WebsiteSettingsPageController", WebsiteSettingsPageController)
    .config(routes).name;
