// MAP CONTROLLER

angular.module('pickup.map.controller', [])

.controller('MapCtrl', ['$scope', '$cordovaGeolocation', 'uiGmapGoogleMapApi', function($scope, $cordovaGeolocation, uiGmapGoogleMapApi) {

    var options = {
        timeout: 10000,
        enableHighAccuracy: true
    };
    $scope.marker;
    $scope.map;
    $scope.gameMarkers = [];

    // Mock Game Objects
    var games = [{
            id: 1,
        }

    ];

    ionic.Platform.ready(function() {

        $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = {
                center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                zoom: 15
            };

            uiGmapGoogleMapApi.then(function(maps) {

                //$scope.gameMarkers['id'] = 1;
                $scope.gameMarkers.push({
                    id: 1,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });

            });
            //$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            // Add marker

        }, function(error) {
            console.log("Could not get location");
        });

    });

}])