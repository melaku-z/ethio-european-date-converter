const path = require('path');
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
        require.resolve('./src/html/social.html')
      ],
      minimize: true,
      purifyOptions: {
        whitelist: []
      }
    }),
    new HtmlWebpackPlugin({
      template: pathToIndexHtml,
      minify: true,
      inject: 'body',
      // files: { //todo: try
      //   "chunks": {
      //     "head": {
      //       "css": []
      //     },
      //     "main": {
      //       "css": ["main.css",  "vendor.css"]
      //     },
      //   }
      // }
    }),
  ],
  output: {
    filename: './js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public_html'),
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
          presets: ['@babel/preset-env']
        }
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
  }
};