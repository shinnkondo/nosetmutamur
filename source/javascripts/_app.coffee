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
nosControllers.factory 'search', ['$location', '$q', '$http', '$sce', ($location, $q, $http, $sce)->
    s = {}
    s.collection = null
    s.filters = []
    s.view = null
    s.CAT = 'category'
    s.TAG = 'tags'
    s.LANG = 'lang'
    s.ALL = 'all'
    langs = null
    s.lang = ""
    

    article_promise = $http.get '/articles.json', {'cache': true}
    article_promise.success (data) ->
        articles = data
        articles.summary = $sce.trustAsHtml articles.summary
        s.collection = new PourOver.Collection articles
        s.view = new PourOver.View("default_view", s.collection)

    s.meta_promise = $http.get '/metadata.json', {'cache': true}
    s.meta_promise.success (data) ->
        s.filters.push PourOver.makeExactFilter(s.CAT, data.categories)
        for lang in data.langs
            re = new RegExp("/"+lang+"/")
            if $location.absUrl().match(re)
                s.lang =  lang
        s.filters.push PourOver.makeExactFilter(s.LANG, data.langs)
        s.filters.push PourOver.makeInclusionFilter(s.TAG, data.tags)
    s.init_done = $q.all([article_promise, s.meta_promise])
    s.init_done.then () ->
        s.collection.addFilters(s.filters)
        # update query by interpretting URL
        clear_or_update_query(s.CAT, s.category())
        clear_or_update_query(s.TAG, s.tags())
        clear_or_update_query(s.LANG, s.lang)

    

    ## Replace query value 'all' with an empty string
    clear_or_update_query = (name, value) ->
        if value == s.ALL or value == "" or value == null or typeof value == 'undefined'
            s.collection.filters[name].clearQuery()
        else
            s.collection.filters[name].query(value)


    s.getCurrentItems = () -> s.view.getCurrentItems()

    s.category = ()-> $location.search()[s.CAT]
    s.tags = () -> $location.search()[s.TAG]
    s.expose = (scope) ->
        scope.CAT=s.CAT
        scope.TAG=s.TAG
        scope.ALL=s.ALL
        scope.loc = () -> $location.search()
            
    s.search = (name, value) ->
        clear_or_update_query(name, value)
        $location.search(name, value)
    s.toggleSearch = (name, value) ->
        if s.isQueried(name, value)
            value = null
        s.search(name,value)

    s.isQueried = (name, value) ->
        $location.search()[name] == value
    return s
]


nosControllers.controller 'ArticleListCtrl',
    ['$scope', 'search', ($scope, search) ->
        search.expose($scope)
        search.init_done.then () ->
            update()
            $scope.$on '$locationChangeSuccess', (event, current) ->
                update()
        update = ()-> $scope.articles = search.getCurrentItems()
        $scope.tagClicked = (tag) ->
            search.toggleSearch(search.TAG, tag)
        $scope.isActive = (tag) ->
            search.isQueried(search.TAG, tag)
]

nosControllers.controller 'MyIndexCtrl',
    ['$scope', 'search', ($scope, search) ->
        search.expose($scope)
        search.meta_promise.success (data) ->
            $scope.categories = data.categories
            $scope.categories.unshift search.ALL
            $scope.categorylang = data.category_lang
            $scope.hideCat = (cat) ->
                search.lang != "" and cat != search.ALL and
                !$scope.categorylang[cat][search.lang]
            
        $scope.$on '$locationChangeSuccess', (event, current) ->
            $scope.current =
                if typeof search.category() == "undefined"
                    search.ALL
                else
                    search.category()
        $scope.isSelected = (cat) -> cat == $scope.current
        $scope.tabClicked = (cat) ->
                search.search(search.CAT, cat)
                search.search(search.TAG, "") # reset tag query.
    ]

nosControllers.controller 'HeaderCtrl', ['$scope', ($scope) ->
    $scope.isclose = false
    $scope.isCollapsed = true
]