'use strict';

// Menu controller
angular.module('core').controller('MenuController', ['$scope', 'TopMenus','Items',
	function($scope,  TopMenus, Items) {	
		$scope.topMenus = [];
		TopMenus.query(function(results){
             	$scope.topMenus = results;				
        	});
		// Create new TopMenu
		$scope.createMenu = function() {
			// Create new Article object
			var topMenu = new TopMenus({
				title: this.title,
				class: this.css,
				link:  this.link,
				position: this.position,
			});

			// Redirect after save
			topMenu.$save(function(response) {
				console.log('response='+JSON.stringify(response));
				$scope.topMenus.push(response);
				// Clear form fields
				$scope.title = '';
				$scope.css = '';
				$scope.link = '';
				$scope.position = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing menu
		$scope.removeMenu = function(topMenu) {
			if (topMenu) {
				topMenu.$remove();

				for (var i in $scope.topMenus) {
					if ($scope.topMenus[i] === topMenu) {
						$scope.topMenus.splice(i, 1);
					}
				}
			} 
		};


		// Create new Item
		$scope.creatItem = function() {
			// Create new Article object
			var item = new Item({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			item.$save(function(response) {
				
				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing item
		$scope.removeItem = function(item) {
			if (item) {
				item.$remove();

				for (var i in $scope.items) {
					if ($scope.items[i] === menu) {
						$scope.items.splice(i, 1);
					}
				}
			} 
		};

		// Find a list of items
		$scope.findItems = function() {
			
			item.query(function(results){
             	$scope.items = results;				
        	});
		};
	}
]);