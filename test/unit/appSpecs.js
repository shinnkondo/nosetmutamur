'use strict';

describe('NosApp', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('NosApp'));
  beforeEach(module('nosControllers'));

  describe('CollapseController', function() {
  var scope, ctrl;

    beforeEach(inject(function( $rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('VersionInfoCtrl', {$scope: scope});
    }));

    it('should set isCollapsed true', function() {
      expect(scope.isCollapsed).toEqualData(true);
    });
  });

  describe('HeaderController', function() {
    var scope, ctrl;
    beforeEach(inject(function( $rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('HeaderCtrl', {$scope: scope});
    }));

    it('should set isMenuOpen false', function() {
      expect(scope.isMenuOpen).toEqualData(false);
    });
  });

  // describe('Factory Search', function() {
  //   var scope, ctrl, $httpBackend;

  //   beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
  //     $httpBackend = _$httpBackend_;
  //     $httpBackend.expectGET('phones/phones.json').
  //         respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

  //     scope = $rootScope.$new();
  //     ctrl = $controller('PhoneListCtrl', {$scope: scope});
  //   }));
  // });

});