const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const pathToMainJs = require.resolve('./src/main.js')
const pathToIndexHtml = require.resolve('./src/index.html')
module.exports = {
  entry: [
    pathToMainJs,
    pathToIndexHtml
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: pathToIndexHtml
    }),
    new WorkboxPlugin.GenerateSW()
  ],
  output: {
    filename: '[name].bundle.js', //todo: multiple outputs for multiple entry
    path: path.resolve(__dirname, 'public_html_temp')
  },
  module: {
    rules: [
    //   {
    //   test: pathToIndexHtml,
    //   use: [
    //     // 'file-loader',
    //     // 'extract-loader',
    //     {
    //       loader: 'html-loader',
    //       options: {
    //         attrs: ['img:src', 'link:href']
    //       }
    //     }
    //   ]
    // },
      {
        test: /\.(js|jsx)$/,
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
      },{ 
        test: /\.html$/, 
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: [
        // 'file-loader',
        // 'extract-loader',
          'style-loader',
          'css-loader'
        ]
      /*
      },
    // file-loader(for images)
    {
      test: /\.(jpg|png|gif|svg)$/,
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
      */
      }]
  }
}