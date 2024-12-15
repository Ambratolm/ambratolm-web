// ==================================================
// ♦ Admin Controller
// ==================================================
application.controller("adminCtrl", function($scope, $firebaseAuth, $firebaseObject, $firebaseArray) {
    $scope.editedPageId = undefined;
    $scope.page = {
        name: "page_" + new Date().getSeconds(),
        title: "New page",
        description: "Example of new page",
        isHomePage: false,
        icon: "far fa-file"
    };

    $scope.$watch("page.icon", function(newValue) {
        angular.element("#iconView").empty();
        angular.element("#iconView").html("<i class='" + newValue + "'></i>");
    });

	var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser) {
        if (authUser) {
            // Get pages from database
            var pagesRef = ref.child("website").child("pages");
            var pages = $firebaseArray(pagesRef);
            $scope.pagesList = pages;

            // Update pages count
            // pages.$loaded().then(function() {
            //    // When pages array is loaded from database
            //    $scope.pagesCount = pages.length;
            // });
            pages.$watch(function(data) {
               $scope.pagesCount = pages.length;
            });

            // Show edited page fields
            $scope.openEdit = function(id) {
                $scope.editedPageId = id;
                var page = $firebaseObject(pagesRef.child(id));
                $scope.page = page;
            }

            // CRUD operations
            $scope.addOrEdit = function(id) {
                if (id) {
                    // Update existing page

                } else {
                    // Add new page
                    pages.$add($scope.page).then(function() {
                        // $scope.page = null;
                    });
                }
            }
            $scope.delete = function(i) {
                // Method using: i = index (array index)
                // pages.$remove(i);

                // Method using: i = item.$Id (firebase hash)
                $firebaseObject(pagesRef.child(i)).$remove(i);
            }
        }
    });
});

// ==================================================
// ♦ Routes
// ==================================================
application.run(function($route){
    ROUTE_CONSTRUCTORS.add(function() {
        $ROUTE_PROVIDER
            .when("/admin", {
                templateUrl : "application/pages/admin.html",
                controller : "adminCtrl",
                resolve : {
                    currentAuth : function(authentication) {
                        // Prevent public access to this route
                        return authentication.requireAuth();
                    }
                }
            });
    });
});