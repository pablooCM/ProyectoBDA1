var app = angular.module('singup', []);
app.controller('SingupCtrl', ['$scope','$http','$window', function($scope, $http, $window) {

	$scope.goToPath = function(path) {
		console.log("Go to Path: " + path);
 		$window.location.href = path;
 	}

	var refresh = function() {
		$http.get('/courseList').then( function(res) {
			$scope.courseList = res.data;
		});
	}

	var addStudent = function() {
		$http.post('/studentList', $scope.student).then( function(res, err) {
			if(!err){
				window.alert("Éxito en el registro del usuario");
				$scope.gotopath("/");
			} else {
				window.alert("ERROR en la conexión");
			}
		});
	}

	refresh();

	$scope.register = function(){
		if(	$scope.student == "" || 
			$scope.student.name == "" || 
			$scope.student.cardNumber == "" || 
			$scope.student.email == "" || 
			$scope.student.pass == "") {

			window.alert("Rellene los datos solicitados");

		} else {
			$http.get('/studentList/' + $scope.student.email).then( function(response, err) {
				if(!err){
					if(response.data == null){
						addStudent();
					} else {
						window.alert("El correo electrónico que ingresó ya existe");
					}
				} else {
					window.alert("ERROR en la conexión");
				}
			});
		}
	};
}])
