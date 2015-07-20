var app = angular
    .module('NosApp', ['ngMaterial'])
    .config(function($mdThemingProvider){
        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('deep-purple');
            });