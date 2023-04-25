const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const globAll = require('glob-all')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    // usedExports: true,
    // moduleIds: 'deterministic',
    // runtimeChunk: 'single',
    // 分隔代码
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: { // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        }
      },
    },
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
    ],
  },
  plugins: [
    // 抽离css插件
    // new MiniCssExtractPlugin({
    //   filename: 'static/css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
    // }),
    // 清理无用css
    new PurgeCSSPlugin({
      // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
      // 只打包这些文件中用到的样式
      paths: globAll.sync([
        `${path.join(__dirname, 'src')}/**/*.tsx`,
        path.join(__dirname, 'index.html')
      ]),
      safelist: {
        standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
      }
    }),
  ]
});