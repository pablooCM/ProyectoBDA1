var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl',['$scope','$http', function($scope, $http){
	console.log("Hello World from controller");

var refresh = function(){ 
	$http.get('/estudiantes').then(function(response){
		console.log("I got de data I requested");
		$scope.estudiantes = response.data;
		$scope.student = null;
});
};

refresh();

$scope.addStudent = function(){
	console.log($scope.student);
	$http.post('/estudiantes', $scope.student).then(function(response){
		console.log(response);
		refresh();
	});
};	

$scope.remove = function(id){
	console.log(id);
	$http.delete('/estudiantes/'+id).then(function(response){
		refresh();
	})
};

$scope.edit = function(id){
	console.log(id);
	$http.get('/estudiantes/'+id).then(function(response){
		$scope.student = response.data;
	});
};

$scope.update = function(){
	console.log($scope.student._id);
	$http.put('/estudiantes/'+$scope.student._id, $scope.student).then(function(response){
		refresh();
	})
};	

$scope.deselect = function(){
	$scope.student = null;
}

}])