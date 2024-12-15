// ==================================================
// ♦ Authentication Service
// ==================================================
application.factory("authentication", function($rootScope, $location, $firebaseAuth, $firebaseObject) {
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser) {
        if (authUser) {
        	var userRef = ref.child("users").child(authUser.uid);
            $rootScope.currentUser = $firebaseObject(userRef);
            $location.path("/home");
        } else {
            $rootScope.currentUser = undefined;
            $location.path("/login");
        }
        $rootScope.loginMessage = undefined;
        $rootScope.registerMessage = undefined;
    });
    var authentication = {
        status : {
            login : "",
            register : ""
        },
        login : function(user) {
            try {
                auth.$signInWithEmailAndPassword(user.email, user.password)
                .then(function(response) {
                    authentication.status.login = "Login success !";
                })
                .catch(function(error) {
                    authentication.status.login = error.message;
                });
            } catch(e) {
                authentication.status.login = e;
            }
        },
        logout : function () {
            return auth.$signOut();
        },
        requireAuth : function() {
            return auth.$requireSignIn();
        },
        register : function(user) {
            try {
                auth.$createUserWithEmailAndPassword(user.email, user.password)
                .then(function(response) {
                    var regRef = ref.child("users").child(response.user.uid).set({
                        id : response.user.uid,
                        name : user.name,
                        email : user.email,
                        date : firebase.database.ServerValue.TIMESTAMP,
                    });
                    authentication.status.register = "Register success !";
                })
                .catch(function(error) {
                    authentication.status.register = error.message;
                });
            } catch(e) {
                authentication.status.register = e;
            }
        }
    };
    return authentication;
});