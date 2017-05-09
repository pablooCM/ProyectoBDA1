var myApp = angular.module('myAppPref', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Holi desde el controlador");

var refresh = function(){
  $http.get('/preferencias').success(function(response){
    console.log("Recibí la data solicitada");
    $scope.preferencias = response;
    $scope.preferenciaG = "";
  });
};
    //incializacion de la variable
refresh();

}]);
