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
nosControllers.factory 'search', ['$location', ($location)->
    query = {}
    query.CAT = 'category'
    query.TAG = 'tag'
    query.ALL = 'all'
    query.query = {}
    query.category = ()-> $location.search()[query.CAT]
    query.tags = () -> $location.search()[query.TAG]
    query.expose = (scope) ->
        scope.CAT=query.CAT
        scope.TAG=query.TAG
        scope.ALL=query.ALL
        scope.loc = () -> $location.search()
        scope.search = (name,value) ->
            if $location.search()[name] == value
                $location.search(name,null)
            else
                $location.search(name,value)
    query.search = (name, value) ->
        temp = query.query[name]
        if typeof temp != 'undefined'
            if temp != value
                if typeof temp != 'object'
                    query.query[name] = {temp: null, value: null}
                else
                    temp[value] = null
        else
            query.query[name] = value
        $location.search(name, value)
    return query
]


nosControllers.controller 'ArticleListCtrl',
    ['$scope', '$http', '$sce', 'search', ($scope, $http, $sce, search) ->
        search.expose($scope)
        $http.get '/articles.json', {'cache': true}
        .success (data) ->
            $scope.articles = data
            $scope.articles.summary = $sce.trustAsHtml $scope.articles.summary
        $scope.$on '$locationChangeSuccess', (event, current) ->
            $scope.category =
                if search.category() == "all"
                    ""
                else
                    search.category()
            $scope.tag = search.tags()
]

nosControllers.controller 'MyIndexCtrl',
    ['$scope', '$http', 'search', ($scope, $http, search) ->
        search.expose($scope)
        $http.get '/metadata.json', {'cache': true}
            .success (data) ->
                $scope.categories = data.categories
                $scope.categories.unshift search.ALL
            
        $scope.$on '$locationChangeSuccess', (event, current) ->
            $scope.current =
                if typeof search.category() == "undefined"
                    search.ALL
                else
                    search.category()
        $scope.isSelected = (cat) -> cat == $scope.current
        $scope.tabClicked = (cat) -> search.search(CAT, cat)
    ]

nosControllers.controller 'HeaderCtrl', ['$scope', ($scope) ->
    $scope.isclose = false
    $scope.isCollapsed = true
]