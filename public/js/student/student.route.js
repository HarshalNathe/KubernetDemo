(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = [
    '$stateProvider'
  ];

  function routes($stateProvider) {
    $stateProvider
      .state('app.student', {
        url: '/student',
        templateUrl: 'student/student.html',
        controller: 'StudentController',
        controllerAs: 'vm'
      });
  }
})();
