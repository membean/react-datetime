module.exports = {
	testEnvironment: 'jsdom',
	testMatch: ['**/test/**/*.spec.js'],
	transform: {
		'^.+\\.jsx?$': ['babel-jest', {
			configFile: './babel.jest.config.js',
			babelrc: false,
		}],
	},
	// react-onclickoutside registers document listeners that keep Jest alive
	forceExit: true,
};
