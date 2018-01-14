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
				onRemove : '&',
				nothing : '<'
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
	nid.name = "";
	nid.nothing = false;

	nid.getMatchedMenuItems = function(){
			if ((nid.name=="") || (nid.name == undefined)){
				nid.nothing = true;
			}else{
				nid.nothing = false;
				var promise1 = MenuSearchService.FindIt(nid.name);
				promise1.then(function (result2){
					//console.log(result2);
					nid.found = result2;
					if (nid.found.length == 0){
						nid.nothing = true;
					}
				}).catch(function(error){
						console.log("Ooops");
				});
			}
	}

	nid.removeItem = function(index){
		//console.log(index);
		nid.found.splice(index,1);
			//var arr = MenuSearchService.getArrayOfItems();
			//console.log(arr);
	}
}


MenuSearchService.$inject = ['$http']

function MenuSearchService($http){
	var search = this;

 	search.FindIt = function(searchTerm) {
		var response = $http({
 			method: "GET",
		 url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
	 }).then(function (result){
		 var foundItems = [];
		 var result1 = result.data;
 	 	 for (var property in result1) {
	 		 if (result1.hasOwnProperty(property)) {
				 //console.log(result1[property].length);
	 					for (var i = 0; i < result1[property].length; i++) {
 							var line = result1[property][i].name.toUpperCase();
 							if (line.includes(searchTerm.toUpperCase())){
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

}



})();
