var app = angular.module("demo", ['ngMaterial', 'ngMessages','material.svgAssetsCache', 'ngSanitize' ]);

app.controller("calendarDemo", function ($scope, $http, $rootScope, $mdDialog) {
	  console.log("Loaded");
	  $rootScope.status = '  ';
  $rootScope.customFullscreen = false;

  $rootScope.showAlert = function(ev) {
	  console.log("Called");
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };

//   $scope.openOffscreen = function() {
//     $mdDialog.show(
//       $mdDialog.alert()
//         .clickOutsideToClose(true)
//         .title('Opening from offscreen')
//         .textContent('Closing to offscreen')
//         .ariaLabel('Offscreen Demo')
//         .ok('Amazing!')
//         // Or you can specify the rect to do the transition from
//         .openFrom({
//           top: -50,
//           width: 30,
//           height: 80
//         })
//         .closeTo({
//           left: 1500
//         })
//     );
//   };
	
	$scope.day = moment();
	$rootScope.attendanceData = [];
	$rootScope.attendance = [];
	// var promise = $http.get("assets/attendance.json").then(function (response) {
	// 	$rootScope.attendance = response.data[0];
	// 	$scope.attendance = response.data[0];
	// 	// console.log(response.data[0]);
	// 	$rootScope.attendanceData = Object.keys(response.data[0]);
	// 	//   console.log(attendance[1].attendanceStatus);
	// 	console.log('called1');
	// 	//   console.log($rootScope.attendance);
	// });
});

app.directive("calendar", function ($rootScope, $http, $mdDialog) {
	return {
		restrict: "E",
		templateUrl: "templates/calendar.html",
		scope: {
			selected: "=",
			data: "=",
		},
		link: function (scope) {

			scope.$watch("attendance", function (data, newData) {
				scope.selected = _removeTime(scope.selected || moment());
				scope.month = scope.selected.clone();
				var start = scope.selected.clone();
				start.date(1);
				// console.log(scope.month);
				// console.log(start.date(1));
				//getting staring day in month
				_removeTime(start.day(0));

				_buildMonth(scope, start, scope.month);
				console.log(scope.weeks);

			});
scope.showAlert = function(ev,day) {
	  console.log("Called");
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
	if(day.status.attendanceStatus === "Present"){
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .htmlContent('In Time: '+day.status.punchIn+'<br>Out Time:'+day.status.punchOut)
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
        .targetEvent(ev)
    );}
	else if(day.status.attendanceStatus === "Leave"){
		 $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .htmlContent('Reason: '+day.status.reason)
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
        .targetEvent(ev)
    );
	}
	else if(day.status.attendanceStatus === "CompLeave"){
		 $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .htmlContent('Reason: '+day.status.reason)
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
        .targetEvent(ev)
    );
	}	
  };

			//getting week day(sunday)
			// console.log(scope.selected);
			// Promise.all([promise]).then(function(){
			// 	console.log("promise");
			// });


			scope.select = function (day) {
				console.log(day.number + " select");

			};
			scope.checkAttend = function (day) {
				var todayDate=moment();
				console.log(day);
				console.log(todayDate.diff(day.date));
				
				if(day.number>todayDate|| day.isCurrentMonth){
					console.log("called up");
					day.enable= false;
					return "upcoming";
				}
				else if(day.isCurrentMonth){
				if (day.status.markedStatus === "true") {
					return day.status.attendanceStatus;
				} else return "unmark";
				}
			};

			scope.next = function () {
				var next = scope.month.clone();
				_removeTime(next.month(next.month() + 1).date(1));
				scope.month.month(scope.month.month() + 1);
				_buildMonth(scope, next, scope.month);
			};

			scope.previous = function () {
				var previous = scope.month.clone();
				_removeTime(previous.month(previous.month() - 1).date(1));
				scope.month.month(scope.month.month() - 1);
				_buildMonth(scope, previous, scope.month);
			};
		},
		controller: function ($scope, $http, $rootScope) {
			// $scope.attendance=[];
			$http.get("assets/attendance.json").then(function (response) {
				$scope.attendance = response.data[0];
			});
			// $scope.isAttend = function (id) {
			// 		// console.log(attendanceData.length);
			// 		if ($rootScope.attendanceData.length != 0 && id.number !== "") {
			// 			// $http.get("assets/attendance.json").then(function(response) {
			// 			// attendanceData = Object.keys(response.data[0]);
			// 			// console.log("calledatt");
			// 			return $rootScope.attendanceData.indexOf("" + id.number) >= 0;
			// 			// });
			// 		}

			// 	}
				// 			   $scope.isPresent = function(id) {

			// 					   // console.log($rootScope.attendance );
			// // return true;				   
			// 				   if($rootScope.attendance[id]){
			// 					// $http.get("assets/attendance.json").then(function(response) {
			// 					 // console.log("calledpre");
			//          		 	// attendanceData = Object.keys(response.data[0]);
			// 				  	return $rootScope.attendance[id].attendanceStatus === "Present" ;
			//     				// });
			// 					}
			// 			   }
			// 			   $scope.isLeave = function(id) {
			// // return true;				   
			// 				   if($rootScope.attendance[id]){
			// 					// $http.get("assets/attendance.json").then(function(response) {
			//          		 	// attendanceData = Object.keys(response.data[0]);
			// 				  	return $rootScope.attendance[id].attendanceStatus === "Leave" ;
			//     				// });
			// 					}
			// 			   }
			// 			   $scope.isCompLeave = function(id) {

			// 				   if($rootScope.attendance[id]){
			// 					// $http.get("assets/attendance.json").then(function(response) {
			//          		 	// attendanceData = Object.keys(response.data[0]);
			// 				  	return $rootScope.attendance[id].attendanceStatus === "CompLeave" ;
			//     				// });
			// 					}
			// 			   }
			

		}
	};

	function _removeTime(date) {
		return date.day(0).hour(0).minute(0).second(0).millisecond(0);
	}

	function _buildMonth(scope, start, month) {
		scope.weeks = [];
		var done = false,
			date = start.clone(),
			monthIndex = date.month(),
			count = 0;
		while (!done) {
			scope.weeks.push({
				days: _buildWeek(date.clone(), month, scope)
			});
			date.add(1, "w");
			done = count++ > 2 && monthIndex !== date.month();
			monthIndex = date.month();
			// console.log(monthIndex);
		}

		// console.log(scope.weeks);
	}

	function _buildWeek(date, month, scope) {

		var days = [];
		for (var i = 0; i < 7; i++) {
			console.log(scope.attendance[date.date()]);
			if (date.month() === month.month() && (scope.attendance[date.date()] !== undefined)) {
				if (scope.attendance[date.date()] !== undefined)
					days.push({
						name: date.format("dd").substring(0, 1),
						number: date.date(),
						isCurrentMonth: date.month() === month.month(),
						isToday: date.isSame(new Date(), "day"),
						date: date,
						enable: true,
						status: scope.attendance[date.date()]
					});
			} else if (date.month() === month.month())
				days.push({
					name: date.format("dd").substring(0, 1),
					number: date.date(),
					isCurrentMonth: date.month() === month.month(),
					isToday: date.isSame(new Date(), "day"),
					date: date,
					enable:true,
					status: ''

				});
			else
				days.push({});

			date = date.clone();
			date.add(1, "d");
		}
		return days;
	}

});
