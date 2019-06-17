var webpack = require('webpack');

var plugins = [
  new webpack.DefinePlugin({
  	'process.env': { NODE_ENV: '"production"'}
  })
];

module.exports = {

  entry: ['./DateTime.js'],

  output: {
    path: __dirname + '/dist/',
    library: 'Datetime',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
  plugins: plugins
};
