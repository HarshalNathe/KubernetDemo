  (function () {
    'use strict';

    angular
      .module('app')
      .config(routes);

    routes.$inject = ['$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
    ];

    function routes($stateProvider,
      $urlRouterProvider,
      $locationProvider) {
      $locationProvider.hashPrefix('');

      // If none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');
    }
  })();
