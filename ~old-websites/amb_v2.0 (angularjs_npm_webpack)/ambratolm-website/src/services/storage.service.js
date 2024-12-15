//==============================================================================
// ■ Storage Service
//------------------------------------------------------------------------------
//      This service wraps the firebase storage API for custom use.
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
import firebase from "firebase/app";
import "firebase/storage";
import angularfire from "angularfire";
//------------------------------------------------------------------------------
// ● Service
//------------------------------------------------------------------------------
class Storage {
    constructor($firebaseStorage) {
        this.$firebaseStorage = $firebaseStorage;
    }
    uploadImage(file) {
        let filename = `${+new Date()} - ${file.name}`;
        let storageRef = firebase.storage().ref(`images/${filename}`);
        return storageRef.put(file);
    }
    deleteImage(path) {
        let storageRef = firebase.storage().ref(path);
        return storageRef.delete();
    }
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("storage.service", [angularfire])
    .service("Storage", Storage).name;
