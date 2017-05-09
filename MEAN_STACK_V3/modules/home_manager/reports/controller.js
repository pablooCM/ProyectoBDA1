var app = angular.module('editCourse', []);
app.controller('editCourseCtrl', ['$scope','$http', function($scope, $http){

	var refresh = function(){ 
		$http.get('/courseList').then(function(response,err){
			$scope.courseList = response.data;
		});
	};

	refresh();

}])