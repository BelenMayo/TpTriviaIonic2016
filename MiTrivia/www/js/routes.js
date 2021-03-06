angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.informaciNDeAutor', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/informaciNDeAutor.html',
        controller: 'informaciNDeAutorCtrl'
      }
    }
  })

  .state('tabsController.juego', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/juego.html',
        controller: 'juegoCtrl'
      }
    }
  })

  .state('tabsController.estadSticas', {
    url: '/page4/:conteo',
    views: {
      'tab3': {
        templateUrl: 'templates/estadSticas.html',
        controller: 'estadSticasCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/page6')

  

});