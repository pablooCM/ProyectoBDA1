// estas líneas es lo que le da control a la aplicacción, en realidad no se entiende muy bien, pero para comprobar la conexion
// entre ambos archivos hace un console.log que vendría siendo un print
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Holi desde el controlador");

// esta funcion refresh almacenada en una variable, permite refrescar la página a cada vez que el usuario agrega, remueve o edita un curso,
// lo cual permite que parezca que las operaciones que realiza son en tiempo real
var refresh = function(){
  $http.get('/listaDeCursos').success(function(response){
    console.log("Recibí la data solicitada");
    $scope.listaDeCursos = response;
    $scope.curso = "";
  });
};
//incializacion de la variable
refresh();

// este es el create del CRUD, aquí agrega nuevos cursos. es la accion al botón agregar curso en el html
$scope.addCurso = function(){
  console.log($scope.curso);
  // realiza la solicitud http con un post la cual agrega el nuevo curso en la BD
  $http.post('/listaDeCursos', $scope.curso).success(function(response){
    console.log(response);
    refresh();
  });
};

// esta funcion borra el curso que el usuario necesita borrar, es la accion al botón borrar en el html
$scope.removeCurso = function(id){
  console.log(id);
  // realiza un delete poniendo la BD+id
  $http.delete('/listaDeCursos/'+ id).success(function(response){
    refresh();
  });
};

// funcion para cargar los datos del curso en los inputs
$scope.modificarCurso = function(id){
  console.log(id);
  // hace un get de la BD para jalar los valores de la BD
  $http.get('/listaDeCursos/'+ id).success(function(response){
    $scope.curso = response;
  });
};

// función update del CRUD,
$scope.actualizar = function(){
  console.log($scope.curso._id);
  // hace un put y le cae encima a la data que tenía ese paraámetro que se estaba editando
  $http.put('/listaDeCursos/'+ $scope.curso._id, $scope.curso).success(function(response){
    refresh();
  })
};

// esta funcion simplemente limpia lo que tenga el input adentro, sirve para no generar errores
$scope.desseleccionar = function(){
  $scope.curso = "";
}

}]);
