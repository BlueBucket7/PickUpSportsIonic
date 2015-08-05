angular.module('pickup.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout) {

  // ROOT OF APP
  // Add background tasks
  // Define global functions here
  // Defined $rootScope functions are accessible in all controllers via $scope.functionName
  // 

  // Function to check for empty objects
  $rootScope.isEmpty = function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
  }

  // Generated code that might be useful:
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

// HOME CONTROLLER
.controller('HomeCtrl', ['$scope', function($scope){
  
}])

// REGISTER CONTROLLER
.controller('RegisterCtrl', ['$scope', 'RegisterService', '$state', '$ionicHistory', function($scope, RegisterService, $state, $ionicHistory) {
  
  $scope.user = {};
  
  // Form Submit with Validation 
  $scope.submit = function submit(){
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

    if($scope.isEmpty($scope.errors)){
      registerUser();
    }

  }

  // Register New User 
  function registerUser() {
    
    // New user info
    var newUser = {
      "email": $scope.user.email,
      "username": $scope.user.username,
      "password": $scope.user.password
    };

    // Add new user to server (commented out for development)
    // RegisterService.register(newUser).then(function(response){
    //   //console.log(JSON.stringify(response));
    //   if(response.data.data.userCreated){
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        //Redirect to Home after user is added
        $state.go('app.home');
    //   }
    // });

  }
  
}])

// LOGIN CONTROLLER
.controller('LoginCtrl', ['$scope', function($scope){

  $scope.errors = { email: 'ERROR', username: null, password: null };


}])


// MY GAMES CONTROLLER
.controller('MyGamesCtrl', ['$scope', function($scope, $stateParams) {
}])
