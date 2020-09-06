const path = require('path');
const srcPath = path.join(__dirname, '..', 'src');
const distPath = path.join(__dirname, '..', 'dist');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(srcPath, 'index'),
  module: {
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
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
};
