/**
  Services
**/
angular.module('pickup.services', [])

.factory('HttpService', ['$http', '$q', function($http, $q) {

    var HttpService = {
      post: function(url, json) {
        var deferred = $q.defer();
        var apiUrl = 'http://pickupapp.herokuapp.com';
        
        deferred.resolve(
          $http.post(url, JSON.stringify(json))
          .success(function (data, status, headers, config) {
              console.log(JSON.stringify(data));
          })
          .error(function (data, status, headers, config) {
              console.log(JSON.stringify(data));
          })
        );

        return deferred.promise; 
      }
    };

    return HttpService;
  }
])

.factory('RegisterService', ['$q', 'HttpService', function($q, HttpService){
	
	var RegisterService = {
      register: function(newUser) {
        return HttpService.post('/signup', newUser);
      },
      userExists: function(userEmail) {
        return HttpService.post('/emailexist', userEmail);
      },
    };

    return RegisterService;
}])

.factory('CreateGameService', ['$q', 'HttpService', function($q, HttpService){
  
  var CreateGameService = {
      create: function(newGame) {
        return HttpService.post('/creategame', newGame);
      },
      gameExists: function(game) {
        return HttpService.post('/gameexist', game);
      },
    };

    return CreateGameService;
}])