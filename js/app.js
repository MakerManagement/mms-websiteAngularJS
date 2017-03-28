'use strict';

var app = angular.module('myApp', []);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.controller('MovieController', function($scope, $http){
	
	fetchItems();
	fetchCatagories();
	
	function fetchItems() {
      $http.get("http://158.39.162.161/api/items")
      .then(function(response){ $scope.items = response.data; });
	}
	
	function fetchCatagories() {
      $http.get("http://158.39.162.161/api/categories")
      .then(function(response){ $scope.categories = response.data; });
	}
  });
