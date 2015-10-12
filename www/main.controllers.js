angular.module('pickup.main.controllers', [])

// ROOT OF APP
// Add background tasks
// Define global functions here
// Defined $rootScope functions are accessible in all controllers via $scope.functionName
.controller('AppCtrl', function($rootScope,
    $scope,
    $ionicModal,
    $timeout,
    $ionicLoading) {

    // Function to check for empty objects
    $rootScope.isEmpty = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
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
    $scope.hideLoading = function() {
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
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });


    // Generated code that might be useful later:
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
})