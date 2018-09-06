const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const pathToMainJs = require.resolve('./src/main.js')
const pathToIndexHtml = require.resolve('./src/index.html')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = {
  entry: [
    pathToMainJs,
    pathToIndexHtml
  ],
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: pathToIndexHtml
    // }),
    new FriendlyErrorsWebpackPlugin(),
    new WorkboxPlugin.GenerateSW({
      importWorkboxFrom: 'local',
      importsDirectory: 'sw-assets'
    })
  ],
  output: {
    filename: '[name].bundle.js', //todo: multiple outputs for multiple entry
    path: path.resolve(__dirname, 'public_html_temp')
  },
  module: {
    rules: [
      {
        test: pathToIndexHtml,
        use: [
          {loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {loader: 'extract-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src'],
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
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
      },
      // { 
      //   test: /\.html$/, 
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       attrs: [':data-src'],
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        use: [
          'file-loader',
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },{
        test: /\.png$/,
        use: ['file-loader']
      },
      {
        test: /\.(jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/'
            }
          }
        ]
      },
      // file-loader(for fonts)
      { test: /\.(woff|woff2|eot|ttf|otf)$/, 
        use: ['file-loader']
      }]
  },
  watchOptions: {
    ignored: /node_modules/
  }
}