const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const path = require('path')

module.exports = merge.smart(common, {
  mode: 'production',
  module: {
  plugins: [
    new CleanWebpackPlugin(['public_html']),
    new WriteFilePlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public_html'),
    compress: true,
  },
  serve: {
    contentBase: path.resolve(__dirname, 'public_html'),
    compress: true,
  }
})
