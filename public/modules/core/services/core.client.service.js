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
		return $resource('items/:itemId', {
			itemId: '@_id'
		});
	}
]);