const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'js', 'dateconverter.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public_html_temp')
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/public_html_temp/')
  }
};