const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

//修改App.tsx,浏览器会自动刷新后再显示修改后的内容,
//但我们想要的不是刷新浏览器,而是在不需要刷新浏览器的前提下模块热更新,并且能够保留react组件的状态。
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: './dist'
    },
    plugins: [
        new ReactRefreshWebpackPlugin() // 添加热更新插件
    ]
})
