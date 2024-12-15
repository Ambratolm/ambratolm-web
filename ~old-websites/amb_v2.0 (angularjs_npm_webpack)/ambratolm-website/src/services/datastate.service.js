//==============================================================================
// ■ Datastate Service
//------------------------------------------------------------------------------
//      This service is a helper for tracking data objects
//      changes and saving state using angularfire objects.
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
import angularfire from "angularfire";
//------------------------------------------------------------------------------
// ● Service
//------------------------------------------------------------------------------
class Datastate {
    constructor($rootScope) {
        //----------------------------------------------------------------------
        // ● Data
        //----------------------------------------------------------------------
        this._dataObject = undefined;
        this._dataObjectSnapshot = undefined;
        //----------------------------------------------------------------------
        // ● States
        //----------------------------------------------------------------------
        this._isSaving = false;
        this._isSaved = false;
        this._isChanged = false;
        this._isLoaded = false;
        // ----------------------------------------------------------------------
        // ● Data Watcher
        // ----------------------------------------------------------------------
        $rootScope.$watch(
            () => this._dataObject,
            (dataObject, dataObjectOld) => {
                // Checks if dataObject really changed
                if (!angular.equals(dataObject, dataObjectOld)) {
                    if (this._isLoaded) {
                        // Checks if current data hasn't changed compared
                        // to its initial state when loaded (using snapshot)
                        if (angular.equals(this._dataObject,
                            this._dataObjectSnapshot)) {
                            this._isChanged = false;
                        } else {
                            this._isChanged = true;
                            this._isSaved = false;
                        }
                    }
                }
            },
            true
        );
    }
    initialize(dataObject) {
        if (dataObject) {
            this._dataObject = dataObject;
            this._dataObject.$loaded(() => {
                this._isLoaded = true;
                this._dataObjectSnapshot = this.dataObject;
            });
            return this;
        }
    }
    markSaveStart() {
        this._isSaving = true;
    }
    markSaveEnd() {
        this._isSaving = false;
        this._isSaved = true;
        this._isChanged = false;
        // Takes a snapshot of current saved data
        this._dataObjectSnapshot = this.dataObject;
    }
    get dataObject() {
        return angular.copy(this._dataObject);
    }
    get dataObjectSnapshot() {
        return angular.copy(this._dataObjectSnapshot);
    }
    get isSaving() { return this._isSaving }
    get isSaved() { return this._isSaved }
    get isChanged() { return this._isChanged }
    get isLoaded() { return this._isLoaded }
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("datastate.service", [angularfire])
    .service("Datastate", Datastate).name;
