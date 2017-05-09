var app = angular.module('login', []);
app.controller('LoginCtrl',['$scope','$http','$window', function($scope, $http, $window){

 	$scope.goToPath = function(path) {
 		console.log("gotopath(" + path + ")");
 		$window.location.href = path;
 	}

	$scope.login = function() {
		if($scope.student.email == "admin" && $scope.student.pass == "pass"){
			window.alert("Exito al entrar a su cuenta de administrador");
			$scope.goToPath("/home_manager/");

		} else {
			$http.get('/studentList/'+ $scope.student.email).then(function(response, err) {
				if(!err){
					if(response.data == null){
						window.alert("Usuario o contraseña incorrecta");
					} else {
						if ($scope.student.pass == response.data.pass){
							window.alert("Exito al entrar a su cuenta");
							$scope.goToPath("/home_student/");
						} else {
							window.alert("Usuario o contraseña incorrecta");
						}
					}
				} else {
					window.alert("Error en la conexion");
				}
			});
		}
	}
}])
