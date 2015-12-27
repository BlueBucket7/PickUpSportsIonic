// LOBBY CONTROLLER
angular.module('pickup.lobby.controller', [])

.controller('LobbyCtrl', ['$scope', '$state', '$ionicHistory', 'uiGmapGoogleMapApi', function($scope, $state, $ionicHistory, uiGmapGoogleMapApi) {

    //$scope.user = {};
    $scope.gameMarkers = [];
    $scope.mockGame = {
        sport: 'Basketball',
        players: 8,
        location: null,
        date: null,
        start: null
    }

    $scope.map = {
                    center: {
                        latitude: 45.4215296,
                        longitude: -75.69719309999999
                    },
                    zoom: 15
    };
    
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.gameMarkers.push({
                    id: 1,
                    latitude: 45.4215296,
                    longitude: -75.69719309999999
                });
    });
    

}]);