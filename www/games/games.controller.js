// MY GAMES CONTROLLER

angular.module('pickup.games.controller', [])

.controller('GamesCtrl', ['$scope', 'RegisterService', '$state', '$ionicHistory', function($scope, $stateParams, RegisterService, $state, $ionicHistory) {

    $scope.game = {};

    // Form Submit with Validation 
    $scope.submit = function() {
        $scope.showLoading();
        $scope.errors = {};
        if (!$scope.game.newGame) {
            //$scope.errors.email = "Invalid email!";
        }
        if (!$scope.game.location) {
            //$scope.errors.username = "Invalid username!";
        }
        // if ($scope.user.password && $scope.user.password.length < 8) {
        //     $scope.errors.password = "Password must be at least 8 characters long.";
        // }
        // if ($scope.user.password != $scope.user.passwordConfirm) {
        //     $scope.errors.passwordConfirm = "Passwords must match!";
        // }
        if (!$scope.game.newGame || !$scope.game.location) {
            $scope.errors.empty = "Fields cannot be empty!";
        }

        // Check if game exists
        RegisterService.gameExists({
            "email": $scope.game.newGame
        }).then(function(response) {
            //console.log(JSON.stringify(response));
            if (response.data.data.exists) {
                $scope.errors.newGame = " Game already in use!";
            } else {
                // If no errors, register user
                if ($scope.isEmpty($scope.errors)) {
                    createGame();
                }
            }
        }, 
        // function() {
        //     $scope.errors.email = "Error checking email. Try again shortly.";
        // })
        ;

        $scope.hideLoading();
    }

    // Register New User 
    function createGame() {

        // New game obj
        var newGame = {
            "game": $scope.user.email,
            "location": $scope.user.username
        };

        // Add new game to server (commented out for development)
        RegisterService.create(newGame).then(function(response) {
            // console.log(JSON.stringify(response));
            if (response.data.data.gameCreated) {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                // Redirect to Home after game is created
                $state.go('app.home');
            }
        }, function() {
            $scope.errors.email = "Can't seem to create game right now. Try again shortly.";
        });

        $scope.hideLoading();
    }

}])