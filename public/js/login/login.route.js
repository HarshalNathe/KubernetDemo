(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = [
    '$stateProvider'
  ];

  function routes($stateProvider) {
    $stateProvider.state(
      'login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }
})();
