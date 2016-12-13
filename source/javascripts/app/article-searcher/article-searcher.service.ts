const PourOver = require('pourover')
import * as t from './article-searcher.const'


export default class ArticleSearchService {

    static $inject = ['$location', '$q', '$http', '$sce']
    collection: any
    view: any
    searchQuery: SearchQuery
    filters: any[]
    metadataPromise: ng.IHttpPromise<any>
    initializationDonePromise: ng.IPromise<any>;

    constructor(private $location:ng.ILocationService, $q:ng.IQService, $http:ng.IHttpService, $sce:ng.ISCEService) {
        this.searchQuery = {};
        this.filters = [];
        let articlePromise = $http.get('/articles.json', {
            'cache': true
        });
        articlePromise.then((response) => {
            let articles: any = response.data
            articles.summary = $sce.trustAsHtml(articles.summary);
            this.collection = new PourOver.Collection(articles);
            return this.view = new PourOver.View("default_view", this.collection);
        });
        this.metadataPromise = $http.get('/metadata.json', {
            'cache': true
        });
        this.metadataPromise.then((response) => {
            let metadata: any = response.data;
            this.filters.push(PourOver.makeExactFilter(t.CAT, metadata.categories));

            for (let lang in metadata.langs) {
                let re = new RegExp("/" + lang + "/")
                if (this.$location.absUrl().match(re)) {
                    this.searchQuery.lang = lang
                }
            }

            this.filters.push(PourOver.makeExactFilter(t.LANG, metadata.langs));
            this.filters.push(PourOver.makeInclusionFilter(t.TAG, metadata.tags));
        })
        this.initializationDonePromise = $q.all([articlePromise, this.metadataPromise])
        this.initializationDonePromise.then(() => {
            this.collection.addFilters(this.filters);
            this.clearOrUpdateQuery(t.CAT, this.category());
            this.clearOrUpdateQuery(t.TAG, this.tags());
            this.clearOrUpdateQuery(t.LANG, this.searchQuery.lang);
      }, (error) => {
        return console.log("init failed! " + error );
      });
    }

    private clearOrUpdateQuery(name: string, value: string) {
        if (value === t.ALL || value === "" || value === null || typeof value === 'undefined') {
          return this.collection.filters[name].clearQuery();
        } else {
          return this.collection.filters[name].query(value);
        }
    }
    getCurrentItems() {
        return this.view.getCurrentItems();
    }
    category() {
        return this.$location.search()[t.CAT];
    };
    tags() {
        return this.$location.search()[t.TAG];
    };
    expose (scope: ISearchScope) {
        scope.loc = () => {
          return this.$location.search();
        };
    };
    search(name:string, value:string ) {
        this.clearOrUpdateQuery(name, value);
        return this.$location.search(name, value);
    };
    toggleSearch (name: string, value: string) {
        if (this.isQueried(name, value)) {
          value = null;
        }
        return this.search(name, value);
    };
    isQueried (name: string , value: string) {
        return this.$location.search()[name] === value;
    };
}

class SearchQuery {
    lang?: string
}

interface ISearchScope extends ng.IScope {
    loc?: any
}