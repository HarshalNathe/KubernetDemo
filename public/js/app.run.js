(function () {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  runBlock.$inject = ['$rootScope'];

  function runBlock($rootScope) {
    var localizationConfig = {
      locale: navigator.language || '',
      path: 'locales/'
    };
  }
})();
