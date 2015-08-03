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
          $http.post('/signup', JSON.stringify(json))
          .success(function (data, status, headers, config) {
              console.log(JSON.stringify(data));
          })
          .error(function (data, status, headers, config) {
              console.log(JSON.stringify(data));
          })
        );
        //console.log(JSON.stringify(deferred));
        return deferred.promise;
      }
    };

    return HttpService;
  }
])

.factory('RegisterService', ['$q', 'HttpService', function($q, HttpService){
	
	var RegisterService = {
      register: function(newUser) {
        return HttpService.post('/services/account/signup', newUser);
      },
    };

    return RegisterService;
}])