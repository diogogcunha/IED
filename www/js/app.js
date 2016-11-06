// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngAnimate', 'ui.router','ngRoute', 'ngCordovaBluetoothLE'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.list', {
        url: "/list",
        views: {
        'menuContent': {
        templateUrl: "templates/list.html"
        }
        }
    })
    
    .state('app.info', {
      url: "/info",
      views: {
        'menuContent': {
          templateUrl: "templates/info.html"
        }
      }
    })
  
    .state('app.form', {
        url: "/form",
        views: {
            'menuContent': {
                templateUrl: "templates/form.html",
                controller: 'formController'
            }
        }
    })
  
    .state('tab.log', {
    url: '/log',
    views: {
      'tab-log': {
        templateUrl: 'log.html',
        controller: 'LogCtrl'
      }
    }
  })

  
 // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('app.form.step1', {
            url: '/step1',
            templateUrl: 'templates/step-1.html'
        })
        
        // url will be /form/interests
        .state('app.form.step2', {
            url: '/step2',
            templateUrl: 'templates/step-2.html'
        })
        
        // url will be /form/payment
        .state('app.form.step3', {
            url: '/step3',
            templateUrl: 'templates/step-3.html'
        })
             // url will be /form/payment
        .state('app.form.step4', {
            url: '/step4',
            templateUrl: 'templates/step-4.html'
        })
         .state('app.form.step5', {
            url: '/step5',
            templateUrl: 'templates/step-5.html'
        })
          .state('app.form.step6', {
            url: '/step6',
            templateUrl: 'templates/step-6.html'
        })
           .state('app.form.step7', {
            url: '/step7',
            templateUrl: 'templates/step-7.html'
        })
            .state('app.form.final', {
            url: '/final',
            templateUrl: 'templates/final.html'
        })




.state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html'
        }
      }
    })
   
  $urlRouterProvider.when("/form", "/form/step1");
   // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
    
})

.config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    });
    
    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
})

.run(function(authentication, $rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(evt) {
        if(!authentication.isAuthenticated){ 
            $location.url("/login");
        }
    event.preventDefault();
    });
})

  
// our controller for the form
// =============================================================================
.controller('formController', function($scope, $http) {
    
    
    // we will store all of our form data in this object
    $scope.formData={}
    
    getMedication(); //load all available meds
    function getMedication(){
        $http.post("getMedication.php").sucess(function(data){
            $scope.medication = data;
        });
    };
    $scope.addMedication = function(medication){
        http.post("addMedication.php?medication="+medication).sucess(function(data){
            getMedication();
            $scope.medicationInput="";
        });
    };
    $scope.deleteMedication = function (medication){
        if(confirm("Are you sure to delete this line?")){
            $http.post("deleteMedication.php?MedicationID="+medication).sucess(function(dta){
                getMedication();
            });
        }
    };
   


})

.factory('Log', function($rootScope, $ionicPopup) {
    $rootScope.log = [];

    var add = function(message) {
        console.log(message);
        $rootScope.log.push({
            message: message,
            datetime: new Date().toISOString(),
        });
    };

    $rootScope.show = function(item) {
        $ionicPopup.show({
            template: item.message,
            title: 'Log',
            subTitle: item.datetime,
            buttons: [
                { text: 'Cancel' },
            ]
        });
    };

    var clear = function() {
      $rootScope.log = [];
    };

    return {
      add: add,
      clear: clear,
    };
})

.controller('BluetoothCtrl', function($scope, $cordovaBluetoothLE){
    
});









