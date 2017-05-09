var app = angular.module('editCourse', []);
app.controller('editCourseCtrl', ['$scope','$http', function($scope, $http){

	var refresh = function() { 
		$http.get('/courseList').then(function(response, err) {
			$scope.courseList = response.data;
		});
	};

	refresh();

	$scope.fillCourseData = function() {

		var e = document.getElementByName("ddlViewBy");
		var strUser = e.options[e.selectedIndex].value;

		console.log("Course selected: " + $scope.courseSelected.courseName);
		$http.get('/courseList/' + $scope.courseSelected).then(function(response, err){
			$scope.courseData = response.data;
			$scope.courseData.studentList.forEach(function(email) {
				console.log("studentEmail: " + email);
				$http.get('/studentList/' + email).then(function(res, err) {
					$scope.studentList.push(res);
				});
			});
		});
	};
}])