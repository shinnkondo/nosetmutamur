const templateUrl = require("./category-tabs.component.html")

import ArticleSearcherService from '../article-searcher.service'
import * as t from '../article-searcher.const'

export default class CategoryTabsComponent implements ng.IComponentOptions {
    
    public controller: any = CategoryTabsComponentController
    public templateUrl:string = templateUrl
}

export class CategoryTabsComponentController implements ng.IController {

    static $inject = ['$scope', 'ArticleSearcherService']
    static CAT = t.CAT
    current: string
    categories: string[]
    categoryLang: any

    constructor(private $scope: ng.IScope, private articleSearcherService: ArticleSearcherService) {
        articleSearcherService.expose($scope)
        articleSearcherService.metadataPromise.then((response) => {
            let data: any = response.data;
            this.categories = data.categories;
            this.categories.unshift(t.ALL);
            this.categoryLang = data.category_lang;
        });
        $scope.$on('$locationChangeSuccess', (event, current) => {
            return this.current = typeof this.articleSearcherService.category() === "undefined" ? t.ALL : this.articleSearcherService.category();
        });
   }

   shouldCategoryBeHidden(cat: string) {
        this.articleSearcherService.searchQuery.lang !== "" && cat !== t.ALL && !this.categoryLang[cat][this.articleSearcherService.searchQuery.lang];
   };

   isSelected(cat: string): boolean {
        return cat === this.current;
   };
   tabClicked(cat:string) {
        this.articleSearcherService.search(t.CAT, cat);
        this.articleSearcherService.search(t.TAG, "");
   }
}