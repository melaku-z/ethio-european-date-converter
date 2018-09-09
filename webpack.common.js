const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const pathToMainJs = require.resolve('./src/js/main.js')
const pathToIndexHtml = require.resolve('./src/index.html')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
module.exports = {
  entry: [
    pathToMainJs,
    './src/404.html',
    './src/humans.txt',
    './src/robots.txt',
    './src/browserconfig.xml',
    './src/LICENSE.txt',
    './src/.htaccess',
    './src/favicon.ico',
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: pathToIndexHtml
    }),
    new FaviconsWebpackPlugin({
      logo: './src/favicon.ico',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true
      }
    }),
    new FriendlyErrorsWebpackPlugin(),
    // new WorkboxPlugin.GenerateSW({ todo
    //   importWorkboxFrom: 'local',
    //   importsDirectory: 'sw-assets'
    // })
  ],
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'public_html_temp'),
    libraryTarget: 'var',
    library: 'dateconverterUI'
  },
  module: {
    rules: [
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
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './css/'
            }
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(png|webmanifest)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: './src'
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/media/',
              context: './src'
            }
          }
        ]
      },
      // file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/fonts/',
              context: './src'
            }
          }
        ]
      },
      {
        test: /((\.(txt|htaccess|xml|ico))|(404.html))$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: './src'
            }
          }
        ]
      }]
  },
  watchOptions: {
    ignored: /node_modules/
  }
}