const { merge } = require('lodash');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const config = require('./config.json');

const configureBabelLoader = (browserlist, esmodules) => {
  return {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            loose: true,
            targets: {
              browsers: browserlist,
              // esmodules,
            },
          }],
        ],
        plugins: !esmodules ? ['@babel/plugin-syntax-dynamic-import'] : [],
      },
    },
  };
};

const baseConfig = {
  mode: process.env.NODE_ENV || 'development',
  devtool: '#source-map',
  optimization: {
    minimizer: [new TerserPlugin({
      test: /\.m?js(\?.*)?$/i,
      sourceMap: true,
      terserOptions: {
        safari10: true,
      },
    })],
  },
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '..', config.publicDir),
    publicPath: '/',
    library: 'ethDateCoverter',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
};

const modernConfig = merge({}, baseConfig, {
  output: {
    filename: '[name].es6.js',
  },
  module: {
    rules: [
      configureBabelLoader([
        // The last two versions of each browser, excluding versions
        // that don't support <script type="module">.
        'last 2 Chrome versions', 'not Chrome < 60',
        'last 2 Safari versions', 'not Safari < 10.1',
        'last 2 iOS versions', 'not iOS < 10.3',
        'last 2 Firefox versions', 'not Firefox < 54',
        'last 2 Edge versions', 'not Edge < 15',
      ], true),
    ],
  },
});

const legacyConfig = merge({}, baseConfig, {
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      configureBabelLoader([
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
      ]),
    ],
  },
});

const createCompiler = (config) => {
  const compiler = webpack(config);
  return () => {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) return reject(err);
        // eslint-disable-next-line no-console
        console.log(stats.toString({colors: true}) + '\n');
        resolve();
      });
    });
  };
};

const compileModernBundle = createCompiler(modernConfig);
const compileLegacyBundle = createCompiler(legacyConfig);

module.exports = async () => {
  await compileModernBundle();
  await compileLegacyBundle();
};
