module.exports = function(config) {

	config.set({

	    frameworks: ['jasmine'],

	    files: [
	      "src/gates.js",
	      "src/tests.js"
	    ],

	    browsers: [ 'Chrome' , 'Firefox' ],
	    singleRun: true

	 });

};
