(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$templateCache',
    'EnvironmentConfig'
  ];

  function LoginController($templateCache, EnvironmentConfig) {
    var vm = this;

    vm.animate = false;
    console.log(EnvironmentConfig.API);
    vm.play = function () {
      vm.animate = !vm.animate;
      vm.url = 'login/include.html';
      console.log('some log');
    };
  }
})();
