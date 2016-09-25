module.exports = {
	entry: ['babel-polyfill', '.'],
	output: {
		filename: '../public/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: /node_modules/
		},
		{
			test: /\.styl$/,
			loader: 'style!css!stylus'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.styl']
	},
	devtool: 'source-map'
};
