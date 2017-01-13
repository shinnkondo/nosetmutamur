import * as angular from 'angular'
import 'angular-material'
import 'angular-route'
import 'angular-aria'
import 'angular-animate'
import 'angular-sanitize'

import 'angular-utils-pagination/dirPagination'
import 'angular-ui-bootstrap/src/collapse'

import ArticleSearcherService from "./article-searcher/article-searcher.service"
import CategoryTabsComponent from "./article-searcher/category-tabs/category-tabs.component"
import ArticleListComponent from "./article-searcher/article-list/article-list.component"

export const appName  = 'NosApp'

let app = angular.module(appName, ['ui.bootstrap.collapse', 'ngSanitize', 'ngRoute', 'ngMaterial', 'angularUtils.directives.dirPagination']);
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

// angular.bootstrap(document.body, ['NosApp']);