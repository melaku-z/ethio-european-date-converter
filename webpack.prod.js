const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: [
  //         {
  //           loader: 'clean-css-loader',
  //           options: {
  //             compatibility: 'ie9',
  //             level: 2,
  //           }
  //         }
  //       ]
  //     }
  //   ]    
  // }, todo: merge.smart
  plugins: [
    new CleanWebpackPlugin(['public_html'])
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
  }
})
