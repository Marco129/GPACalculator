'use strict';

angular.module('gpa', [])
	.controller('gpaController', function($scope, $rootScope){
		$scope.gpa = 0;
		$scope.courses = [];
		$scope.scales = [];
		$scope.add = function(){
			$scope.courses.push({course: $scope.add_course, credit: $scope.add_credit, grade: $scope.add_grade});
			$scope.reset();
			$scope.addForm.$setPristine();
			$scope.calulateGPA();
		}
		$scope.calulateGPA = function(){
			var total = 0;
			var credit_total = 0;
			angular.forEach($scope.courses, function(value, key){
				total += value.grade.point * value.credit;
				credit_total += value.credit;
			});
			if($scope.courses.length > 0){
				$scope.gpa = total / credit_total;
			}else{
				$scope.gpa = 0;
			}
		}
		$scope.reset = function(){
			$scope.add_course = $scope.add_credit = $scope.add_grade = '';
		}
		$scope.clear = function(){
			$scope.courses = angular.copy([]);
			$scope.calulateGPA();
		}
		$scope.clear();
		// receive sync from scaleController
		$rootScope.$on('scale', function(event, message){
			$scope.scales = message;
		});
	})
	.controller('scaleController', function($scope, $rootScope){
		$scope.default_scales = [
		                         {grade: 'A+', point: 4.5},
				                 {grade: 'A', point: 4.0},
				                 {grade: 'B+', point: 3.5},
				                 {grade: 'B', point: 3.0},
				                 {grade: 'C+', point: 2.5},
				                 {grade: 'C', point: 2.0},
				                 {grade: 'D+', point: 1.5},
				                 {grade: 'D', point: 1.0},
				                 {grade: 'F', point: 0.0}
		];
		$scope.reset = function(){
			$scope.scales = angular.copy($scope.default_scales);
			$rootScope.$broadcast('scale', $scope.scales); // sync with gpaController
		}
		$scope.reset();
});
