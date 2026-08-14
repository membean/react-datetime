module.exports = {
	testEnvironment: 'jsdom',
	testMatch: ['**/test/**/*.spec.js'],
	transform: {
		'^.+\\.jsx?$': ['babel-jest', {
			configFile: './babel.jest.config.js',
			babelrc: false,
		}],
	},
};
