app = angular
    .module 'NosApp', ['ngMaterial', 'ui.bootstrap', 'ngSanitize', 'ngRoute', 'nosControllers']
    .config ['$mdThemingProvider', ($mdThemingProvider) ->
        $mdThemingProvider
            .theme 'default'
            .primaryPalette 'blue-grey'
            .accentPalette 'deep-purple'
    ]

app.controller 'CollapseVersionCtrl', ['$scope', ($scope) -> $scope.isCollapsed = true]


app.config ['$routeProvider', ($routeProvider) ->
    $routeProvider
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
    $scope.param = $routeParams

    $category_names = []
    for a in articles
        if ($.inArray(a.data.category, category_names) === -1)
            category_names.push(a.data.category)


]