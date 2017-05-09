var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl',['$scope','$http', function($scope, $http){
	console.log("Hello World from controller");

var refresh = function(){ 
	$http.get('/contactlist').then(function(response,err){
		console.log("I got de data I requested");
		console.log(response);
		$scope.contactlist = response.data;
		console.log($scope.contactlist);
		$scope.datos = response.data;
		
		$scope.d = null;
});
};

$scope.cargardatos = function(){
	$http.get('/contactlist').then(function(response, err){
		$scope.llenar = response.data;
		console.log(response);
		refresh();
});
};

refresh();
$scope.cargardatos();


$scope.addContact = function(){
	console.log($scope.contact);
	$http.get('/contactlist').then(function(response){
		console.log(response);
		$scope.contactlist = response.data;
	});
};	

$scope.remove = function(id){
	console.log(id);
	$http.delete('/contactlist/'+id).then(function(response){
		refresh();
	})
};

$scope.edit = function(id){
	console.log(id);
	$http.get('/contactlist/'+id).then(function(response){
		$scope.contact = response.data;
	});
};

$scope.update = function(){
	console.log($scope.contact._id);
	$http.put('/contactlist/'+$scope.contact._id, $scope.contact).then(function(response){
		refresh();
	})
};	

$scope.deselect = function(){
	$scope.contact = null;
}

}])