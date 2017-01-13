const PourOver = require('pourover')
import * as t from './article-searcher.const'
import Article from './article.model'
import Metadata from './metadata.model'

export default class ArticleSearchService {

    static $inject = ['$location', '$q', '$http', '$sce']
    collection: any
    view: any
    searchQuery: SearchQuery
    filters: any[]
    metadataPromise: ng.IHttpPromise<Metadata>
    initializationDonePromise: ng.IPromise<any>;

    constructor(private $location:ng.ILocationService, $q:ng.IQService, $http:ng.IHttpService, $sce:ng.ISCEService) {
        this.searchQuery = {};
        this.filters = [];
        let articlePromise = $http.get('/articles.json', {
            'cache': true
        });
        articlePromise.then((response: ng.IHttpPromiseCallbackArg<Article[]>) => {
            let articles: Article[] = response.data
            for (let article of articles) {
                article.summary = $sce.trustAsHtml(article.summary);
            }
            this.collection = new PourOver.Collection(articles);
            this.view = new PourOver.View("default_view", this.collection);
        });
        this.metadataPromise = $http.get('/metadata.json', {
            'cache': true
        });
        this.metadataPromise.then((response) => {
            let metadata = response.data;
            this.filters.push(PourOver.makeExactFilter(t.CAT, metadata.categories));

            for (let lang of metadata.langs) {
                let re = new RegExp("/" + lang + "/")
                if (this.$location.absUrl().match(re)) {
                    this.searchQuery.lang = lang
                }
            }

            this.filters.push(PourOver.makeExactFilter(t.LANG, metadata.langs));
            this.filters.push(PourOver.makeInclusionFilter(t.TAG, metadata.tags));
        })
        this.initializationDonePromise = $q.all([articlePromise, this.metadataPromise])
        this.initializationDonePromise.then(this.updateByLocation, (error) => {
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
    public updateByLocation() {
        if (this.collection) {
            this.collection.addFilters(this.filters);
            this.clearOrUpdateQuery(t.CAT, this.getCategory());
            this.clearOrUpdateQuery(t.TAG, this.getTags());
            this.clearOrUpdateQuery(t.LANG, this.searchQuery.lang);
        }

    }

    getCurrentItems() {
        return this.view.getCurrentItems();
    }

    getCategory() {
        return this.$location.search()[t.CAT];
    };

    getTags() {
        return this.$location.search()[t.TAG];
    };

    search(name:string, value:string ) {
        return this.$location.search(name, value);
    };
    searchByObject(Obj: any) {
        return this.$location.search(Obj)
    }
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