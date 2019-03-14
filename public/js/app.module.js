(function () {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'html-templates',
      'ngLoadScript',
      'ngAnimate',
      'app.service',
      'app.envConfig',
      'app.directive'
    ]);
})();
