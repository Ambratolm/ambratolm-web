//==============================================================================
// ■ Database Service
//------------------------------------------------------------------------------
//      This service wraps the firebase database API for custom use.
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import angularfire from "angularfire";
//------------------------------------------------------------------------------
// ● Service
//------------------------------------------------------------------------------
class Database {
    constructor($firebaseObject, $firebaseArray) {
        this.$firebaseObject = $firebaseObject;
        this.$firebaseArray = $firebaseArray;
        this.databaseRef = firebase.database().ref();
    }
    website() {
        return this.$firebaseObject(this.databaseRef.child("website"));
    }
    creations() {
        return this.$firebaseArray(this.databaseRef.child("creations"));
    }
    downloads() {
        return this.$firebaseArray(this.databaseRef.child("downloads"));
    }
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("database.service", [angularfire])
    .service("Database", Database).name;
