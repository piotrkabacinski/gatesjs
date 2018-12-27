module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			"src/gates.js",
			"src/gates.spec.js"
		],
		browsers: [ 'ChromeHeadless' ],
		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		}

	});

	if(process.env.TRAVIS){
      config.browsers = ['Chrome_travis_ci'];
    }
};
