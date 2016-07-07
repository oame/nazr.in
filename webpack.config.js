module.exports = {
  entry: './client',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: 'source-map'
}
