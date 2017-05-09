var app = angular.module('managerApp', []);
app.controller('ManagerCtrl', ['$scope', '$http','$window', function($scope, $http, $window) {

  $scope.goToPath = function(path) {
    console.log("Go to Path: " + path);
    $window.location.href = path;
  }

  var refresh = function(){
    $http.get('/courseList').success(function(response){
      $scope.courseList = response;
      $scope.course = "";
    });
  };

  refresh();

  $scope.addCourse = function(){
    console.log($scope.course);
    $http.post('/courseList', $scope.course).success(function(response){
      console.log(response);
      refresh();
    });
  };

  $scope.removeCourse = function(id){
    console.log(id);
    $http.delete('/courseList/'+ id).success(function(response){
      refresh();
    });
  };

  $scope.editCourse = function(id){
    console.log(id);
    $http.get('/courseList/'+ id).success(function(response){
      $scope.course = response;
    });
  };

  $scope.updateCourse = function(){
    console.log($scope.course._id);
    $http.put('/courseList/'+ $scope.course._id, $scope.course).success(function(response){
      refresh();
    })
  };

  $scope.unselectCourse = function(){
    $scope.course = "";
  }

  $scope.logout = function(){
    $http.get('/login').then(function(){
      console.log("Logout()");
      refresh();
    });
  }

}]);
