var app = angular.module('singin', []);

app.controller('SinginCtrl',['$scope','$http', function($scope, $http){
	var returnToLogin = function(){
		$http.get("/student", function(){
			console.log("Return to Login");
			$scope.student = null;
		});
	}

	$scope.addStudent = function(){
		$http.post('/student', $scope.student).then(function(response){
			console.log(response);
			returnToLogin();
		});	
	};
}])
