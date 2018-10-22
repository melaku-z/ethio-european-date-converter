const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const AppManifestWebpack = require('app-manifest-webpack-plugin');

module.exports = merge.smart(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new WriteFilePlugin(),
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
        start_url: '/',    // Android start application's URL. `string` todo: /?homescreen=1 not getting serviceworker
        version: '1.3',
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
    new WorkboxPlugin.GenerateSW({
      importWorkboxFrom: 'local',
      importsDirectory: '/assets/sw/',
      exclude: [/(\.(txt|htaccess|png|xml)$)|(404.html$)|(favicon.ico$)/],
      offlineGoogleAnalytics: true
    })
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
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
  },
  serve: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
  }
});
