var app = angular.module('singup', []);
app.controller('SingupCtrl', ['$scope','$http', function($scope, $http) {

	var refresh = function() {
		$http.get('/courseList').then( function(res) {
			$scope.courseList = res.data;
		});
	}

	refresh();

	$scope.goLogin = function() {
		$http.get('/').then( function(res) {
			$scope.student = "";
		});
	}

	$scope.addStudent = function(){
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
						$http.post('/studentList', $scope.student).then( function(res, err2) {
							if(!err2){
								window.alert("Éxito en el registro del usuario");
							} else {
								window.alert("ERROR en la conexión");
							}
						});
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
