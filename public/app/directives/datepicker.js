module.exports = function () {
	return {
		restrict: 'C',
    require: '?ngModel',
		link: function (scope, element, attr, ngModel) {
			console.log(element[0]);
			var cal = rome(element[0], {
				inputFormat: 'DD/MM/YY HH:mm',
				initialValue: moment().format('DD/MM/YY HH:mm'),
				min: moment().format('DD/MM/YY HH:mm')
			});

	    cal.on('data', function(value) {
      	scope.ngModel = moment(value, 'DD/MM/YY HH:mm').format();
      	scope.$apply();
	    });
      
      
		}
	};
};