'use strict';


angular.module('core').controller('HomeController', ['$scope', '$resource','Authentication',
	function($scope,$resource, Authentication) {
		
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.hoverControl = function(){
			//console.log("hoverControl"+ $element.html());
		};
		
                    
	}
	
]);