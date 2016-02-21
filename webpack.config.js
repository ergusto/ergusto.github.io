module.exports = {
	entry: './app/Main.jsx',
	output: {
		filename: 'build/bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"],
			}
		]
	}
};