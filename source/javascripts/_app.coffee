app = angular
    .module 'NosApp', ['ngMaterial', 'ui.bootstrap', 'ngSanitize', 'ngRoute', 'nosControllers', 'angularUtils.directives.dirPagination']
app.config ['$mdThemingProvider', ($mdThemingProvider) ->
        $mdThemingProvider
            .theme 'default'
            .primaryPalette 'blue-grey'
            .accentPalette 'deep-purple'
    ]

app.controller 'CollapseVersionCtrl',['$scope', ($scope) -> $scope.isCollapsed = true]

      
nosControllers = angular.module('nosControllers', [])
nosControllers.constant 'CAT', 'category'
nosControllers.constant 'TAG', 'tag'
nosControllers.service 'search', ['$location', 'CAT', 'TAG', ($location, CAT, TAG)->
    this.CAT = 'category'
    this.TAG = 'tag'
    this.ALL = 'ALL'
    this.category = ()-> $location.search()[this.CAT]
    this.tags = () -> $location.search()[this.TAG]
    this.exposeConstants = ($scope) -> 
        $scope[this.CAT]=this.CAT
        $scope[this.TAG]=this.TAG
        $scope[this.ALL]=this.ALL

]


nosControllers.controller 'ArticleListCtrl',
    ['$scope', '$http', '$sce', '$location','TAG', ($scope, $http, $sce, $location, TAG) ->
        $scope.TAG = TAG
        $http.get '/articles.json', {'cache': true}
        .success (data) ->
            $scope.articles = data
            $scope.articles.summary = $sce.trustAsHtml $scope.articles.summary
        $scope.$on '$locationChangeSuccess', (event, current) ->
            $scope.category =
                if $location.search()['category'] == "all"
                    ""
                else
                    $location.search()['category']
]

nosControllers.controller 'MyIndexCtrl',
    ['$scope', '$location','$http', 'search', 'CAT', ($scope, $location, $http, search, CAT) ->
        ALL = 'all'
        $scope.CAT = CAT
        $http.get '/metadata.json', {'cache': true}
            .success (data) ->
                $scope.categories = data.categories
                $scope.categories.unshift ALL
            
        $scope.$on '$locationChangeSuccess', (event, current) ->
            $scope.loc = $location.search()
            $scope.current =
                if $scope.loc.hasOwnProperty(CAT)
                    $scope.loc[CAT]
                else
                    ALL
        $scope.isSelected = (cat) -> cat == $scope.current
        $scope.tabClicked = (cat) -> $location.search(CAT, cat)
    ]

nosControllers.controller 'HeaderCtrl', ['$scope', ($scope) ->
    $scope.isclose = false
    $scope.isCollapsed = true
]