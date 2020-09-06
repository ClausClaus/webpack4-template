const webpack = require('webpack');
const path = require('path');
const webpackCommonConf = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const srcPath = path.join(__dirname, '..', 'src');
const distPath = path.join(__dirname, '..', 'dist');

module.exports = merge(webpackCommonConf, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        env: JSON.stringify('dev'),
      },
    }),
  ],
  devServer: {
    hot: true,
    port: 3000,
    progress: true, // 显示打包的进度条
    contentBase: distPath, // 根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩
    // 设置代理
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      // '/api': 'http://localhost:3000',
      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      // '/api2': {
      //   target: 'http://localhost:3000',
      //   pathRewrite: {
      //     '/api2': '',
      //   },
      // },
    },
  },
});
