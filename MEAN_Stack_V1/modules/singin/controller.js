var app = angular.module('singin', []);
app.controller('SinginCtrl',['$scope','$http', function($scope, $http){
	console.log("Singin Controller Activate");

	var returnToLogin = function(){
		console.log("Return to Login");
	}

	$scope.addStudent = function(){
		console.log($scope.student);
		$http.post('/student', $scope.student).then(function(response){
			console.log(response);
			refresh();
		});
	};



}])