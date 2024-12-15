//==============================================================================
// ■ Administration Page
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
import uirouter from "angular-ui-router";
import navbar from "ROOT/directives/navbar/navbar.directive";
import footer from "ROOT/directives/footer/footer.directive";
import websiteSettings from "./website-settings/website-settings.page";
import creationsManagement from "./creations-management/creations-management.page";
//------------------------------------------------------------------------------
// ● Controller
//------------------------------------------------------------------------------
class AdminPageController {
    constructor($state) {
        const admin = this;
        admin.isAdminState = () => $state.current.name === "admin";
        admin.sections = [
            {
                title: "Website Settings",
                description: "View and change website settings.",
                stateName: "websiteSettings",
                iconClass: "fas fa-globe-africa"
            },
            {
                title: "Creations Management",
                description: "View and manage creations.",
                stateName: "creationsManagement",
                iconClass: "fas fa-copyright"
            },
            {
                title: "Downloads Management",
                description: "View and manage downloads.",
                stateName: "downloadsManagement",
                iconClass: "fas fa-download"
            }
        ];
    }
    someMethod() {
        //...
    }
}
//------------------------------------------------------------------------------
// ● Routes
//------------------------------------------------------------------------------
function routes($stateProvider) {
    $stateProvider.state("admin", {
        url: "/admin",
        template: require("./admin.page.html"),
        controller: AdminPageController,
        controllerAs: "admin"
    });
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("admin.page", [
        uirouter,
        navbar,
        footer,
        websiteSettings,
        creationsManagement
    ])
    .controller("AdminPageController", AdminPageController)
    .config(routes).name;
