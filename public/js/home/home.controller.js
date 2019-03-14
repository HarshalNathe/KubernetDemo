(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = [
    '$scope',
    '$http',
    '$compile',
    '$rootScope',
    '$location',
    '$state'
  ];

  function HomeController(
    $scope,
    $http,
    $compile,
    $rootScope,
    $location,
    $state) {
    var vm = this;
    vm.tagline = 'Dynamic Html Form Example';

    vm.getForm = function () {
      $http({
        method: 'GET',
        url: 'api/getFileFromJson'
      }).then(function successCallback(response) {
        // This callback will be called asynchronously
        // When the response is available
        $scope.formData = response.data;
        var pageElement = angular.element(document.getElementById('formData'));
        pageElement.empty();
        pageElement.append($compile($scope.formData)($scope));
      }, function errorCallback(response) {
        alert('Something went wrong...!');
      });
    };

    vm.postForm = function () {
      console.log('Form posted', vm.user);
      $rootScope.user = vm.user;
      $state.go('app.student');
    };
  }
})();
