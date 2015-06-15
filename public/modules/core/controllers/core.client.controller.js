'use strict';

// Menu controller
angular.module('core').controller('MenuController', ['$scope', '$timeout', '$animate','TopMenus','Items','services',
	function($scope,  $timeout, $animate, TopMenus, Items, services ) {	
		$scope.topMenus = [];
		TopMenus.query(function(results){
             	$scope.topMenus = results;	
				
				for( var i=0; i< $scope.topMenus.length; i++){
					
					$scope.topMenus[i].items  = Items.query({menuId:$scope.topMenus[i]._id}); 
				}
				
        	});

		$scope.currentIndex = 0;

		$scope.slides = [
            {image: '/modules/core/img/photos/opera.jpg', description: 'Image 00'},
            {image: '/modules/core/img/photos/gc.jpg', description: 'Image 01'},
            {image: '/modules/core/img/photos/great.jpg', description: 'Image 02'},
            {image: '/modules/core/img/photos/ocean.jpg', description: 'Image 03'},
            {image: '/modules/core/img/photos/alices.jpg', description: 'Image 04'}
        ];		

	    $scope.isCurrentSlideIndex = function (index) {
			console.log("isCurrentSlideIndex="+ index);
	        return $scope.currentIndex === index;
	    };

	    function nextSlide() {
	        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
	        $timeout(nextSlide, $scope.interval);
	    };

	    $scope.loadSlides = function (interval) {
			console.log("loadSlides="+ interval);
			$scope.interval = interval;
	        $timeout(nextSlide, $scope.interval);
	    };
		
		// Create new TopMenu
		$scope.createMenu = function() {
			// Create new Article object
			var topMenu = new TopMenus({
				title: this.title,
				class: this.css,
				highlightClass:this.hover,
				link:  this.link,
				position: this.position,
				hasChild: this.hasChild,
			});

			// Redirect after save
			topMenu.$save(function(response) {
				//console.log('response='+JSON.stringify(response));
				$scope.topMenus.push(response);
				// Clear form fields
				$scope.title = '';
				$scope.css = '';
				$scope.hover = '';				
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
		$scope.createItem = function() {
			// Create new Article object
			var item = new Items({
				title: this.title,
				class: this.class,
				highlightClass:this.highlightClass,
				link:  this.link,
				position: this.position,
				menuId: this.menuId,
			});

			// Redirect after save
			item.$save(function(response) {
				
				// Clear form fields
				$scope.title = '';
				$scope.class = '';
				$scope.highlightClass = '';
				$scope.link = '';
				$scope.position = '';

				for( var i=0; i< $scope.topMenus.length; i++){
					
					if ($scope.topMenus[i]._id==response.menu){					
						$scope.topMenus[i].items.push(item);	
							console.log('$scope.topMenus.items='+JSON.stringify($scope.topMenus[i].items));
							return;
					}
				
				}

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing item
		$scope.removeItem = function(item) {
			if (item) {
				item.$remove();
				
				for( var i=0; i< $scope.topMenus.length; i++){
					for (var j in $scope.items) {
						if ($scope.topMenus.items[j] === item) {
							$scope.topMenus.items.splice(j, 1);
							return;
						}
					}
				
				}
				
			} 
		};

		
	}
]);


angular.module('core').animation('.fadde', [function() {
  return {
    enter: function(element, doneFn) {
	  console.log("animation");
      jQuery(element).slideIn(1000, doneFn);
    }
  }
}]);