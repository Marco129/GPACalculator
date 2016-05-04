'use strict';

var node_dir = __dirname + '/node_modules';

module.exports = {
	entry : {
		bundle : [ 'angular', './src/main.js' ]
	},
	output : {
		filename : 'bundle.js'
	},
	resolve : {
		alias : {
			'angular' : node_dir + '/angular/angular.min.js'
		}
	},
	module : {
		noParse : [ 'angular' ]
	}
}
