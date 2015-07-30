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
      ctrl = $controller('CollapseVersionCtrl', {$scope: scope});
    }));

    it('should set isCollapsed true', function() {
      expect(scope.isCollapsed).toEqualData(true);
    });
  });

});