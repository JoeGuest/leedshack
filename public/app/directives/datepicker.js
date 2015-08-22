module.exports = function () {
	return {
		restrict: 'C',
    require: '?ngModel',
		link: function (scope, element, attr, ngModel) {
			element.fdatepicker({
				format: 'dd/mm/yyyy',
        weekStart: 1
			});

      element.change(function () {
        var value = element.val();
        if(!value) return;
        var values = value.split('/');
        if(values.length !== 3) return;
        // if year is 2 characters - prepend 20
        if(values[2].length !== 2) return;
        values[2] = '20' + values[2];
        if(ngModel){
          ngModel.$setViewValue(values.join('/'));
          ngModel.$render();
        }else{
          element.val(values.join('/'));
        }
      });
		}
	};
};