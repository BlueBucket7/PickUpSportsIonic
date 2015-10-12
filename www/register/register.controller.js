// REGISTER CONTROLLER
angular.module('pickup.register.controller', [])

.controller('RegisterCtrl', ['$scope', 'RegisterService', '$state', '$ionicHistory', function($scope, RegisterService, $state, $ionicHistory) {

    $scope.user = {};

    // Form Submit with Validation 
    $scope.submit = function() {
        $scope.showLoading();
        $scope.errors = {};
        if (!$scope.user.email) {
            //$scope.errors.email = "Invalid email!";
        }
        if (!$scope.user.username) {
            //$scope.errors.username = "Invalid username!";
        }
        if ($scope.user.password && $scope.user.password.length < 8) {
            $scope.errors.password = "Password must be at least 8 characters long.";
        }
        if ($scope.user.password != $scope.user.passwordConfirm) {
            $scope.errors.passwordConfirm = "Passwords must match!";
        }
        if (!$scope.user.email || !$scope.user.username || !$scope.user.password) {
            $scope.errors.empty = "Fields cannot be empty!";
        }

        // Check user exists
        RegisterService.userExists({
            "email": $scope.user.email
        }).then(function(response) {
            //console.log(JSON.stringify(response));
            if (response.data.data.exists) {
                $scope.errors.email = " Email already in use!";
            } else {
                // If no errors, register user
                if ($scope.isEmpty($scope.errors)) {
                    registerUser();
                }
            }
        }, function() {
            $scope.errors.email = "Error checking email. Try again shortly.";
        });

        $scope.hideLoading();
    }

    // Register New User 
    function registerUser() {

        // New user obj
        var newUser = {
            "email": $scope.user.email,
            "username": $scope.user.username,
            "password": $scope.user.password
        };

        // Add new user to server (commented out for development)
        RegisterService.register(newUser).then(function(response) {
            // console.log(JSON.stringify(response));
            if (response.data.data.userCreated) {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                // Redirect to Home after user is added
                $state.go('app.home');
            }
        }, function() {
            $scope.errors.email = "Can't seem to register you right now. Try again shortly.";
        });

        $scope.hideLoading();
    }

}]);