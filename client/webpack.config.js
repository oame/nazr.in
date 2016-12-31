const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  debug: DEBUG,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map',
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
  }
}
