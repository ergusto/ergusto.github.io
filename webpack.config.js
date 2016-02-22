module.exports = {
	entry: './app/Main.jsx',
	output: {
		filename: 'build/bundle.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint',
				exclude: /(node_modules|bower_components)/
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	}
};