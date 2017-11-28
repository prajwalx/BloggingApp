'use strict';

angular.module('bloggingApplicationApp', ['bloggingApplicationApp.auth',
    'bloggingApplicationApp.admin', 'bloggingApplicationApp.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngRoute', 'btford.socket-io', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
