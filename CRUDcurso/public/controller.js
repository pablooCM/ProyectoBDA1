var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Holi desde el controlador");


var refresh = function(){
  $http.get('/listaDeCursos').success(function(response){
    console.log("Recibí la data solicitada");
    $scope.listaDeCursos = response;
    $scope.curso = "";
  });
};

refresh();

$scope.addCurso = function(){
  console.log($scope.curso);
  $http.post('/listaDeCursos', $scope.curso).success(function(response){
    console.log(response);
    refresh();
  });
};

$scope.removeCurso = function(id){
  console.log(id);
  $http.delete('/listaDeCursos/'+ id).success(function(response){
    refresh();
  });
};

$scope.modificarCurso = function(id){
  console.log(id);
  $http.get('/listaDeCursos/'+ id).success(function(response){
    $scope.curso = response;
  });
};

$scope.actualizar = function(){
  console.log($scope.curso._id);
  $http.put('/listaDeCursos/'+ $scope.curso._id, $scope.curso).success(function(response){
    refresh();
  })
};

$scope.desseleccionar = function(){
  $scope.curso = "";
}

}]);
