(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',ListItem);

function ListItem(){
	var ddo = {
			scope : {
				found : '<',
				onRemove : '&'
			},
			templateUrl : 'listItem.html',
			bindToController: true,
			controller: NarrowItDownController,
			controllerAs: 'nid'
	};

	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var nid = this;
	nid.name = "Chicken";

	nid.getMatchedMenuItems = function(){
			var promise1 = MenuSearchService.FindIt(nid.name);
			promise1.then(function (result2){
				//console.log(result2);
				nid.found = result2;
			}).catch(function(error){
					console.log("Ooops");
			});
	}

	nid.removeItem = function(index){
		//console.log(index);
		nid.found.splice(index,1);
			//var arr = MenuSearchService.getArrayOfItems();
			//console.log(arr);
	}
}


MenuSearchService.$inject = ['$http']
var foundItems = [];

function MenuSearchService($http){
	var search = this;

 	search.FindIt = function(searchTerm) {
		var response = $http({
 			method: "GET",
		 url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
	 }).then(function (result){
		 var result1 = result.data;
 	 	 for (var property in result1) {
	 		 if (result1.hasOwnProperty(property)) {
				 //console.log(result1[property].length);
	 					for (var i = 0; i < result1[property].length; i++) {
 							var line = result1[property][i].name;
 							if (line.includes(searchTerm)){
 							  	foundItems.push(line);
 					    }
	 				 }
	 		 }
 		 }
		 return foundItems;
	 }).catch(function(error){
		 	 console.log("I can't access data");
	 });
	 return response;
 }


	search.FindIt1 = function(searchTerm) {
		alert(searchTerm);
		var response = $http({
 			method: "GET",
		 url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
	 });
	 console.log(response);
		return response;
	}

	search.getArrayOfItems = function(){
		return foundItems;
	}

}



})();
