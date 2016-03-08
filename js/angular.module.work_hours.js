var app = angular.module('WorkHour', []);

/**
 * День недели.
 */
app.factory('WeekDay', [function () {
    function WeekDay(name) {
        angular.extend(this, {title: name, interval: -1});
    };

    return WeekDay;
}]);

/**
 * Интервал времени.
 */
app.factory('Interval', [function () {
    function Interval(id) {
		// TODO: вынести в константы
        angular.extend(this, {index: id, beginHour: 9, beginMinute: 0, endHour: 18, endMinute: 0});
    };

    Interval.prototype = {
		calculate: function(hour, minute) {
			// TODO: вынести в константы
			return parseInt(hour) * 60 + parseInt(minute);
		},
		getBegin: function() {
			return this.calculate(this.beginHour, this.beginMinute);
		},
		getEnd: function() {
			return this.calculate(this.endHour, this.endMinute);
		}
    };

    return Interval;
}]);

/**
 * Фильтр для вывода диапазона часов.
 */
app.filter('range', function() {
    return function(input, min, max) {
        
		min = parseInt(min);
        max = parseInt(max);

        for (var i = min; i < max; i++) {
			input.push(i);
		}
            
        return input;
    };
});

app.controller('WorkHourController', function ($scope, WeekDay, Interval) {

	var indexInterval = 0;

	// Список дней
	// TODO: вынести в константы
	$scope.weekDays = [
		new WeekDay('Пн'),
		new WeekDay('Вт'),
		new WeekDay('Ср'),
		new WeekDay('Чт'),
		new WeekDay('Пт'),
		new WeekDay('Сб'),
		new WeekDay('Вс')
	];


	// Спискок интервалов
	$scope.listInterval = [];

	$scope.getResult = function(){
		var result = [];

		for (var i = 0; i < $scope.weekDays.length; i++) {
			if (typeof($scope.listInterval[$scope.weekDays[i].interval]) === "undefined") {
				result.push(null);
				result.push(null);
			} else {
				result.push($scope.listInterval[$scope.weekDays[i].interval].getBegin());
				result.push($scope.listInterval[$scope.weekDays[i].interval].getEnd());
			}
        }

		$scope.result = result.join(',');
	};

	/**
	 * Добавить интервал.
	 */
	$scope.add = function() {
		$scope.listInterval.push(new Interval(indexInterval));
		indexInterval++;
	};

	/**
	 * Удалить интервал.
	 */
	$scope.remove = function(index) {
		$scope.listInterval.splice(index, 1);
		$scope.getResult();
	};

	/**
	 * Интервал не заполнен.
	 */
	$scope.isEmpty = function(index) {
		for (var i = 0; i < $scope.weekDays.length; i++) {
            if ($scope.weekDays[i].interval == index) {
                return false;
            }
        }

		return true;
	};

	$scope.everyDay = function(index) {
		for (var i = 0; i < $scope.weekDays.length; i++) {
            $scope.weekDays[i].interval = index;
        }

		$scope.getResult();
	};

	$scope.add();
	$scope.getResult();
});
