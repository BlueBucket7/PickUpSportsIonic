angular.module('pickup.controllers', [])

// ROOT OF APP
// Add background tasks
// Define global functions here
// Defined $rootScope functions are accessible in all controllers via $scope.functionName
.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicLoading) {

  // Function to check for empty objects
  $rootScope.isEmpty = function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
  }

  // Ionic loading spinner
  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });
  };
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  // Modal pop-up
  $ionicModal.fromTemplateUrl('loading_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  // Generated code that might be useful later:
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
  $scope.submit = function(){
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
    RegisterService.userExists({"email":$scope.user.email}).then(function(response){
      //console.log(JSON.stringify(response));
      if(response.data.data.exists){
          $scope.errors.email = $scope.user.email + " already registered!";
      }
      else {
          // If no errors, register user
          if($scope.isEmpty($scope.errors)){
            registerUser();
          }
      }
      $scope.hideLoading();
    });  

    
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
