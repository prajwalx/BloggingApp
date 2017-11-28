'use strict';

angular.module('bloggingApplicationApp.auth', ['bloggingApplicationApp.constants',
    'bloggingApplicationApp.util', 'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
