const templateUrl = require("./article-list.component.html")

import ArticleSearcherService from '../article-searcher.service'
import * as t from '../article-searcher.const'

export default class ArticleListComponent implements ng.IComponentOptions {
    controller: any = ArticleListComponentController
    templateUrl: string = templateUrl
}

export class ArticleListComponentController implements ng.IController {
    static $inject = ['$scope', 'ArticleSearcherService']
    articles: any[]

    constructor($scope: ng.IScope, private search: ArticleSearcherService) {
        search.expose($scope);
        search.initializationDonePromise.then( () => {
            this.update();
            return $scope.$on('$locationChangeSuccess', (event, current) => {
                this.update()
            });
        }, () => {
            return console.log("init failed!");
        });
    }

    update() {
        this.articles = this.search.getCurrentItems();
    }
    tagClicked(tag: string) {
        return this.search.toggleSearch(t.TAG, tag);
    }
    isActive(tag: string) {
        return this.search.isQueried(t.TAG, tag);
    }
}