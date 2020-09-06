const webpack = require('webpack');
const path = require('path');
const webpackCommonConf = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const srcPath = path.join(__dirname, '..', 'src');
const distPath = path.join(__dirname, '..', 'dist');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    filename: '[name].[hash:8].js',
    path: distPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        env: JSON.stringify('prod'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
  ],
});
