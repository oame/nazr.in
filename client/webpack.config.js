const webpack = require('webpack')
const DEBUG = process.env.NODE_ENV !== 'production'

console.log(DEBUG ? 'development' : 'production')

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin()
]

if (!DEBUG) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: false } }),
    new webpack.optimize.AggressiveMergingPlugin()
  )
}

module.exports = {
  debug: DEBUG,
  devtool: DEBUG ? 'inline-source-map' : 'hidden-source-map',
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
  plugins: plugins
}
