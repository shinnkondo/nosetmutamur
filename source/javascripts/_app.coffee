app = angular
    .module 'NosApp', ['ngMaterial', 'ui.bootstrap', 'ngSanitize', 'ngRoute', 'nosControllers', 'angularUtils.directives.dirPagination']
app.config ['$mdThemingProvider', ($mdThemingProvider) ->
        $mdThemingProvider
            .theme 'default'
            .primaryPalette 'blue-grey'
            .accentPalette 'deep-purple'
    ]

app.controller 'CollapseVersionCtrl', ['$scope', ($scope) -> $scope.isCollapsed = true]


app.config ['$routeProvider', ($routeProvider) ->
    $routeProvider
        .when '/all', {
            templateUrl: 'ng-partials/article-list.html',
            controller: 'ArticleListCtrl'
        }
        .when '/:category', {
            templateUrl: 'ng-partials/article-list.html',
            controller: 'ArticleListCtrl'
             }
        .otherwise {
            templateUrl: 'ng-partials/article-list.html',
            controller: 'ArticleListCtrl'
        #     redirectTo: '/all'
        }
    ]

      
nosControllers = angular.module('nosControllers', [])

nosControllers.controller 'ArticleListCtrl', ['$scope', '$http', '$sce', '$routeParams', ($scope, $http, $sce, $routeParams) ->
    $http.get '/articles.json', {'cache': true}
        .success (data) ->
            $scope.articles = data
            $scope.articles.summary = $sce.trustAsHtml $scope.articles.summary
    $scope.category = $routeParams.category
]

nosControllers.controller 'MyIndexCtrl', ['$scope', '$location', '$routeParams','$http', '$route', ($scope, $location, $routeParams, $http, $route) ->
    $http.get '/metadata.json', {'cache': true}
        .success (data) ->
            $scope.categories = data.categories
            $scope.categories.unshift 'all'
        
    $scope.$on '$routeChangeSuccess', (event, current) ->
        $scope.current = 
            if typeof $routeParams.category == "undefined"
                'all'
            else
                $routeParams.category
    $scope.isSelected = (cat) -> cat == $scope.current
    ]

nosControllers.controller 'HeaderCtrl', ['$scope', ($scope) ->
    $scope.isclose = false
    $scope.isCollapsed = true
]