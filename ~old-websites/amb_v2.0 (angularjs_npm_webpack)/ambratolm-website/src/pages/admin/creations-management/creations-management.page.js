//==============================================================================
// ■ CreationsManagement Page
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
//------------------------------------------------------------------------------
// ● Page Controller Class
//------------------------------------------------------------------------------
class CreationsManagementPageController {
	constructor($scope, Database, Datastate, Storage) {
		//----------------------------------------------------------------------
		// ● Services
		//----------------------------------------------------------------------
		this.$scope = $scope;
		this.Storage = Storage;
		//----------------------------------------------------------------------
		// ● Data Objects
		//----------------------------------------------------------------------
		this.creations = Database.creations();
		this.state = Datastate.initialize(this.creations);
		//----------------------------------------------------------------------
		// ● Creations Loaded Event
		//----------------------------------------------------------------------
		this.creations.$loaded(() => {
			//...
		});
		//--------------------------------------------------------------------------
		// ● Images OnErrorSrc Assets
		//--------------------------------------------------------------------------
		this.onEmptySrc = require("ROOT/assets/images/favicons/amb-favicon.empty.png");
		this.onErrorSrc = require("ROOT/assets/images/favicons/amb-favicon.error.png");
	}
	save() {

	}
	undo() {

	}
}
//------------------------------------------------------------------------------
// ● Page Routes
//------------------------------------------------------------------------------
function routes($stateProvider) {
	$stateProvider.state("creationsManagement", {
		parent: "admin",
		url: "/creations-management",
		template: require("./creations-management.page.html"),
		controller: CreationsManagementPageController,
		controllerAs: "creationsManagement"
	});
}
//------------------------------------------------------------------------------
// ● Page Module
//------------------------------------------------------------------------------
export default angular
	.module("admin.creationsManagement.page", [
		uirouter,
		database,
		datastate,
		storage,
		onEmptySrc,
		onErrorSrc,
		fileInput
	])
	.controller(
		"CreationsManagementPageController",
		CreationsManagementPageController
	)
	.config(routes).name;
