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
        } else {
            $rootScope.currentUser = undefined;
        }
    });
    var redirect = function() {
        queryStringParams = $location.search();
        if (queryStringParams) {
            var ref = queryStringParams.ref;
            if (angular.isUndefined(ref) || ref == "login") {
                $location.path("/home");
            } else {
                var page = $rootScope.website.pages.item("name", ref);
                if (page) $location.path("/" + page.name);
                else $location.path("/home");
            }
        } else {
            $location.path("/home");
        }
    }
    var authentication = {
        status : {
            login : "",
            register : ""
        },
        login : function(user) {
            try {
                authentication.status.login = "";
                auth.$signInWithEmailAndPassword(user.email, user.password)
                .then(function(response) {
                    authentication.status.login = "Login success.";
                    redirect();
                })
                .catch(function(error) {
                    authentication.status.login = error.message;
                });
            } catch(e) {
                authentication.status.login = e.message;
            }
        },
        logout : function () {
            auth.$signOut().then(function() {
                authentication.status.login = "";
                authentication.status.register = "";
                $rootScope.currentUser = undefined;
                var ref = $rootScope.currentPage().name;
                $location.path("/login").search({ ref : ref });
            })
        },
        requireAuth : function() {
            return auth.$requireSignIn();
        },
        register : function(user) {
            try {
                authentication.status.register = "";
                auth.$createUserWithEmailAndPassword(user.email, user.password)
                .then(function(response) {
                    ref.child("users").child(response.user.uid).set({
                        id      : response.user.uid,
                        name    : user.name,
                        email   : user.email,
                        date    : firebase.database.ServerValue.TIMESTAMP,
                    }).then(function() {
                        authentication.status.register = "Registration success.";
                        redirect();
                    });
                })
                .catch(function(error) {
                    authentication.status.register = error.message;
                });
            } catch(e) {
                authentication.status.register = e.message;
            }
        }
    };
    return authentication;
});