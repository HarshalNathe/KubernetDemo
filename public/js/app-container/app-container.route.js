(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = [
    '$stateProvider'
  ];

  function routes(
    $stateProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'app-container/app-container.html',
        controller: 'AppContainerController',
        controllerAs: 'vm',
        authenticate: false,
      });
  }
})();
