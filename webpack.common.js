const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, 'src', 'js', 'main.js'),
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
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
    },{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
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
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  }
};