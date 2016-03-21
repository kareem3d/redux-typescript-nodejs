var path = require('path');
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index'
  ],
  output: {
    path: path.resolve(path.join(__dirname, 'public')),
    filename: 'frontend.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  recordsPath: path.resolve(path.join(__dirname, 'build/_frontend_records')),
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.tsx', '.html'],
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loaders: ['react-hot', 'ts-loader']}
    ]
  }
}
