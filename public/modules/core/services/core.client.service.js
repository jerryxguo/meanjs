'use strict';

//Menu service used for communicating with the menu REST endpoints
angular.module('core').factory('TopMenus', ['$resource',
	function($resource) {
		return $resource('menus/:menuId', {
			menuId: '@_id'
		});
	}
]);

//Items service used for communicating with the items REST endpoints
angular.module('core').factory('Items', ['$resource',
	function($resource) {
		return $resource('items/:menuId/:itemId', {
			menuId: '@menuId',
			itemId: '@_id'
		});
	}
]);


angular.module('core').factory('services', function(){
  
	var service = {};

	service.chunk = function(arr, size) {
	  var newArr = [];
	  for (var i=0; i<arr.length; i+=size) {
	    newArr.push(arr.slice(i, i+size));
	  }
	  return newArr;
	}


	return service;
});
