import '../lib/ui-bootstrap-custom-0.13.0'
import * as angular from 'angular'
import 'angular-material'
import 'angular-utils-pagination/dirPagination'
import 'angular-route'
import 'angular-aria'
import 'angular-animate'
import 'angular-sanitize'


import ArticleSearcherService from "./article-searcher/article-searcher.service"
import CategoryTabsComponent from "./article-searcher/category-tabs/category-tabs.component"
import ArticleListComponent from "./article-searcher/article-list/article-list.component"

let app = angular.module('NosApp', ['ngMaterial', 'ui.bootstrap', 'ngSanitize', 'ngRoute', 'angularUtils.directives.dirPagination']);
app.config([
    '$mdThemingProvider', function ($mdThemingProvider: angular.material.IThemingProvider) {
        return $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('deep-purple');
    }
]);

app.config([
    '$qProvider', function ($qProvider: any) { //TODO: find a right type
        return $qProvider.errorOnUnhandledRejections(false);
    }
])

app.service('ArticleSearcherService', ArticleSearcherService)
app.component('articleList', new ArticleListComponent())
app.component('categoryTabs', new CategoryTabsComponent())