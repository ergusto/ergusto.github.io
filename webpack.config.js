var webpack = require('webpack');

module.exports = {
	entry: './app/App.jsx',
	output: {
		filename: 'build/ergusto.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ['react', 'stage-0', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	}
};