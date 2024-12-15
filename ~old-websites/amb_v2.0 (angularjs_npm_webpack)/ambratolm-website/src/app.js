//==============================================================================
// ■ Application Main
//------------------------------------------------------------------------------
//      This file is the entry point of the application.
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/js/all.js";
import "animate.css/animate.css";
import angular from "angular";
import uirouter from "angular-ui-router";
import firebase from "firebase/app";
import "ROOT/assets/themes/main.scss";
import database from "ROOT/services/database.service";
import admin from "ROOT/pages/admin/admin.page";
//------------------------------------------------------------------------------
// ● Dependencies
//------------------------------------------------------------------------------
const dependencies = [uirouter, database, admin];
//------------------------------------------------------------------------------
// ● Configuration
//------------------------------------------------------------------------------
function config($locationProvider, $urlRouterProvider) {
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/admin");
    $locationProvider.hashPrefix("");
}
//------------------------------------------------------------------------------
// ● Startup
//------------------------------------------------------------------------------
function run($rootScope, Database) {
    const website = Database.website();
    website.$bindTo($rootScope, "website");
    $rootScope.favicon = require("./favicon.ico");
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
angular
    .module("ambratolmApp", dependencies)
    .config(config)
    .run(run);
//------------------------------------------------------------------------------
// ● Database
//------------------------------------------------------------------------------
firebase.initializeApp({
    apiKey: "AIzaSyBnWl9MtVtQYwxjWcnm0nCFkwjpAK09_3A",
    authDomain: "ambratolmapp.firebaseapp.com",
    databaseURL: "https://ambratolmapp.firebaseio.com",
    projectId: "ambratolmapp",
    storageBucket: "ambratolmapp.appspot.com",
    messagingSenderId: "886493009176"
});
