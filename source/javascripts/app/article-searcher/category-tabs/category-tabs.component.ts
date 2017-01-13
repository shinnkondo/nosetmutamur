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
    currentCategory: string
    categories: string[]
    categoryLang: any

    constructor(private $scope: ng.IScope, private articleSearcherService: ArticleSearcherService) {
        articleSearcherService.metadataPromise.then((response) => {
            let data: any = response.data;
            this.categories = data.categories;
            this.categories.unshift(t.ALL);
            this.categoryLang = data.category_lang;
        });
        $scope.$on('$locationChangeSuccess', (event, current) => {
                this.articleSearcherService.updateByLocation()
                let locCategory = this.articleSearcherService.getCategory()
                this.currentCategory = typeof locCategory === "undefined" ? t.ALL : locCategory
        });
   }

   shouldCategoryBeHidden(cat: string) {
        this.articleSearcherService.searchQuery.lang !== "" && cat !== t.ALL && !this.categoryLang[cat][this.articleSearcherService.searchQuery.lang];
   };

   isSelected(cat: string): boolean {
        return cat === this.currentCategory;
   };
   tabClicked(cat:string) {
        let search: any = {}
        search[t.CAT] = cat
        search[t.TAG] = ""
        this.articleSearcherService.searchByObject(search);
   }
}