const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const pathToMainJs = require.resolve('./src/js/main.js')
const pathToIndexHtml = require.resolve('./src/index.html')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const AppManifestWebpack = require('app-manifest-webpack-plugin')
module.exports = {
  entry: [
    pathToMainJs,
    './src/404.html',
    './src/humans.txt',
    './src/robots.txt',
    './src/LICENSE.txt',
    './src/.htaccess',
    './src/favicon.ico',
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: pathToIndexHtml
    }),
    new AppManifestWebpack({
      logo: './src/img/icons.png',
      output: '/assets/icons-[hash:8]/',
      config: {
        appName: 'Ethio-European Date Converter',
        appDescription: 'Convert dates between Ethiopian and European calendar offline.',
        developerName: 'Melaku Zewdu',            // Your (or your developer's) name. `string`
        developerURL: 'github.com/melaku-z',             // Your (or your developer's) URL. `string`
        background: '#fff',             // Background colour for flattened icons. `string`
        theme_color: '#157878',         // Theme color for browser chrome. `string`
        display: 'standalone',          // Android display: "browser" or "standalone". `string`
        orientation: 'portrait',        // Android orientation: "portrait" or "landscape". `string`
        start_url: '/?homescreen=1',    // Android start application's URL. `string`
        version: '1.1',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: false,
          yandex: false,
          windows: true
        }
      }
    }),
    new FriendlyErrorsWebpackPlugin(),
    new WorkboxPlugin.GenerateSW({
      importWorkboxFrom: 'local',
      importsDirectory: '/assets/sw/',
      exclude: [/(\.(?:txt|htaccess)$)|(404.html$)/],
    })
  ],
  output: {
    filename: './js/[name].[contenthash].bundle.js',
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
        test: /\.(png)$/,
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
        test: /((\.(txt|ico))|(404.html))$/,
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
        test: /\.htaccess$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]',
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