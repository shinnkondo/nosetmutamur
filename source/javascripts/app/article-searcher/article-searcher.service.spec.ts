import '../angularOneApp'

import * as angular from 'angular'
import 'angular-mocks'

import ArticleSearcherService from './article-searcher.service'

describe("ArticleSearcherService", () => {

  beforeEach(() => {
    angular.mock.module('NosApp');
  });
  beforeEach(inject((ArticleSearcherService: ArticleSearcherService, $httpBackend: ng.IHttpBackendService) => {
    this.ArticleSearcherService = ArticleSearcherService
    this.$httpBackend = $httpBackend
  }))

  it("does something", () => {
    this.$httpBackend.expectGET('/articles.json').respond({})
    this.$httpBackend.expectGET('/metadata.json').respond({})

    this.$httpBackend.flush()
  })
})
