(function () {
  'use strict';

  angular
    .module('app')
    .config(configure);

  configure.$inject = [
    '$httpProvider',
    '$qProvider'
  ];

  function configure(
    $httpProvider,
    $qProvider) {
    // Initialize url to API_URL

    var API_URL = '';

    activate();

    function activate() {
      $httpProvider.interceptors.push(apiInterceptor);
      $httpProvider.defaults.headers.post['Accept'] = 'application/json';
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
      $qProvider.errorOnUnhandledRejections(false);
    }

    function apiInterceptor($q) {
      return {
        request: function (config) {
          var url = config.url;

          if (url.endsWith('.html') || url.endsWith('.json') || url.endsWith('.svg')) {
            return config || $q.when(config);
          }

          config.url = API_URL + config.url;

          return config || $q.when(config);
        }
      };
    }
  }
})();
