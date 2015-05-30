'use strict';


angular.module('core').controller('HomeController', ['$scope', '$resource','Authentication',
	function($scope,$resource, Authentication) {
		$scope.menus = [{css:'nav-home',caption:'Norway'},
                    {css:'nav-about',caption:'Sweden'},
                    {css:'nav-destination',caption:'Denmark'}];
		var Menus = $resource('/api/menus');
        Menus.query(function(results){
             $scope.menus = results;
        });
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.hoverControl = function(){
			//console.log("hoverControl"+ $element.html());
		};
		$scope.addRow = function(){
			var meetup = new Meetup();
            meetup.name = $scope.meetupName;            
            meetup.$save(function(result){
                $scope.meetups.push(result);
                $scope.meetupName ='';
            });
		};
                    
	}
	
]);