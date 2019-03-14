(function () {
  'use strict';

  angular
    .module('app')
    .controller('StudentController', StudentController);

  StudentController.$inject = [
    '$scope',
    '$http',
    '$compile',
    '$rootScope',
    '$location',
    '$state'
  ];

  function StudentController(
    $scope,
    $http,
    $compile,
    $rootScope,
    $location,
    $state) {
    var vm = this;
    vm.tagline = 'Submitted Patient Details';
    vm.user = $rootScope.user;
    alert(vm.user);
  }
})();
