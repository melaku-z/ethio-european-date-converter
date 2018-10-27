const path = require('path');
const glob = require('glob');
// const devMode = process.env.NODE_ENV !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathToMainJs = require.resolve('./src/js/main.js');
const pathToIndexHtml = require.resolve('./src/index.html');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
module.exports = {
  entry: [
    pathToMainJs,
    './src/404.html',
    './src/humans.txt',
    './src/robots.txt',
    './src/LICENSE.txt',
    './src/.htaccess',
    './src/favicon.ico',
    './src/google4ea6bc293950abe1.html',
  ],
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new PurifyCSSPlugin({
      paths: [
        pathToMainJs,
        pathToIndexHtml,
      ].concat(glob.sync(path.join(__dirname, '/src/html/*.html'))),
      minimize: true,
      purifyOptions: {
        whitelist: []
      }
    }),
    new HtmlWebpackPlugin({
      template: pathToIndexHtml,
      inject: false,
      minify: true,
    }),
  ],
  output: {
    filename: './js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
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
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
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
      // {
      //   test: /\.svg$/,
      //   use: [
      //     'svg-inline-loader',
      //     'file-loader',
      //   ]
      // },
      {
        test: /\.(jpg|gif)$/,
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
        test: /((\.(txt|ico))|(404.html)|(google4ea6bc293950abe1.html))$/,
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
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
      // 'vue$': 'vue/dist/vue.runtime.esm.js' todo
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
};