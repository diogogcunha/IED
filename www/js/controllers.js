angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $http, $location, authentication) {
  $scope.login = function() {
    if ($scope.username === 'admin' && $scope.password === 'pass') {
      console.log('successful')
      authentication.isAuthenticated = true;
      authentication.user = { name: $scope.username };
      $location.url("/");
    } else {
      $scope.loginError = "Invalid username/password combination";
      console.log('Login failed..');
    };
  };
})

.controller('AppCtrl', function($scope, authentication, $cordovaBluetoothLE, Log) {
    console.log($cordovaBluetoothLE);
    var initialize = function() {
        var params = {
        request: true,
        //restoreKey: "bluetooth-test-app"
        };

        Log.add("Initialize : " + JSON.stringify(params));

        $cordovaBluetoothLE.initialize(params).then(null, function(obj) {
            Log.add("Initialize Error : " + JSON.stringify(obj)); //Should only happen when testing in browser
        }, function(obj) {
            Log.add("Initialize Success : " + JSON.stringify(obj));
        });
    };
    
    initialize();
    
    $scope.templates =
        [
            {url:'templates/login.html'},
            {url: 'templates/home.html'}      
    ];
    
    $scope.template = $scope.templates[0];
    $scope.login = function (username, password){
        if ( username === 'maria' && password === '1234') {
            authentication.isAuthenticated = true;
            $scope.template = $scope.templates[1];
            $scope.user = username;
        } else {
            $scope.loginError = "Invalid username/password combination";
        };
    };
    
})

.controller('HomeTabCtrl', function($scope, authentication) {
    $scope.user = authentication.user.name;
})

.factory('authentication', function() {
  return {
    isAuthenticated: false,
    user: null
  }
})

.controller('LogCtrl', function($scope, $rootScope, $stateParams, $cordovaBluetoothLE, $ionicScrollDelegate, Log) {
  $scope.$on("$ionicView.beforeEnter", function () {
    $ionicScrollDelegate.scrollBottom();
  });

  $scope.clear = function() {
    Log.clear();
  };

});




