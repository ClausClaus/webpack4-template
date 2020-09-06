const path = require('path');

const resolve = (dir) => path.join(__dirname, '..', dir);
const srcPath = resolve('src');
const htmlPath = resolve('src/views');
const scriptPath = resolve('src/scripts');
const distPath = resolve('dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * 多页应用支持
 * 1. 添加入口文件的配置项
 * 2. 实例化一个 HtmlWebpackPlugin 实例，并配置chunks，
 * chunks的值即是配置的入口配置项的key值，默认是全部引用，所以需要指定一下
 */

module.exports = {
  entry: {
    index: path.join(srcPath, 'index.js'),
    demo1: path.join(scriptPath, 'demo1.js'),
    demo2: path.join(scriptPath, 'demo2.js'),
  },
  output: {
    filename: '[name].[hash:8].js',
    path: distPath,
  },
  module: {
    noParse: '/jquery|lodash/',
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 小于 5kb 的图片用 base64 格式产出
              // 否则，依然延用 file-loader 的形式，产出 url 格式
              limit: 5 * 1024,
              esModule: false,
              // outputPath: '/images/',
            },
          },
        ],
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 第三方模块
        vendor: {
          priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1,
        },

        // 公共模块打包
        common: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      chunks: ['index'], // 只引用 index.js
    }),
    new HtmlWebpackPlugin({
      template: path.join(htmlPath, 'demo1.html'),
      filename: 'demo1.html',
      chunks: ['demo1'],
    }),

    new HtmlWebpackPlugin({
      template: path.join(htmlPath, 'demo2.html'),
      filename: 'demo2.html',
      chunks: ['demo2'],
    }),
  ],
};
