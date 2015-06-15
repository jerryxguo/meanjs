'use strict';


angular.module('core').controller('HomeController', ['$scope', '$element',
	function($scope,$element) {
		
		// This provides Authentication context.
		
		$scope.hoverControl = function(hover){
			console.log("hoverControl"+ $element.css());
			//addClass()
		};
		
                    
	}
	
]);