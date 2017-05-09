var app = angular.module('login', []);
app.controller('LoginCtrl',['$scope','$http', function($scope, $http){

	$scope.login = function() {
		if($scope.student.email == "admin" && $scope.student.pass == "pass"){
			window.alert("Exito al entrar a su cuenta de administrador");
			// Mostrar ventana de admin			
		}
		else{
			$http.get('/studentList/'+ $scope.student.email).then(function(response, err) {
				if(!err){
					if(response.data == null){
						window.alert("Usuario o contraseña incorrecta");
					}
					else{
						if ($scope.student.pass == response.data.pass){
							window.alert("Exito al entrar a su cuenta");
							// Mostrar ventana de estudiante
						}
						else{
							window.alert("Usuario o contraseña incorrecta");
						}
					}
				}
				else{
					window.alert("Error en la conexion");
				}
			});
		}
	}
}])