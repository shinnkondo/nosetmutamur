var app = angular
    .module('NosApp', ['ngMaterial', 'ui.bootstrap'])
    .config(function($mdThemingProvider){
        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('deep-purple');
            });
angular.module('NosApp').controller('CollapseVersionCtrl', function ($scope) {
  $scope.isCollapsed = false;
});