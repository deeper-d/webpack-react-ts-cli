const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
console.log('是否是开发环境: ', isDev, process.env.NODE_ENV)

 module.exports = {
   entry: {
    //  index: './src/index.js',
     index: './src/index.tsx',
   },
   plugins: [
     new ESLintPlugin({
      context: path.resolve(__dirname, "src"),
      exclude: "node_modules", // 默认值-排除不处理
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
          __dirname,
          "node_modules/.cache/.eslintcache"
      )
     }),
     new HtmlWebpackPlugin({
      title: 'webpack demo',
      template: 'index.html'
     }),
     new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
     }),
     new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
    }),
   ],
   output: {
    filename: "static/js/[name].[chunkhash:8].js",    //'[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '',
   },
   module: {
    rules: [
      
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          // MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          'postcss-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            // 模块小于 maxSize，会被作为Base64编码的字符串注入到包中， 
            // 否则模块文件会被生成到输出的目标目录中
            maxSize: 1 * 1024
          }
        },
        generator: {
          filename: 'assets/img/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   // include: path.resolve(__dirname, 'src'),
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ["@babel/preset-env", "@babel/preset-react"]
      //   }
      // },
      {
        test: require.resolve('./src/globals.js'),
        use:
          'exports-loader?type=commonjs&exports=helpers',
      },
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /.(ts|tsx|js)$/, // 匹配.ts, tsx文件
        use: ['thread-loader', 'babel-loader'],
        include: [path.resolve(__dirname, 'src')],  // 只对项目src文件的ts,tsx进行loader解析
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, 'src')
    },
    // 如果用的是pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
    modules: [path.resolve(__dirname, 'node_modules')], // 查找第三方模块只在本项目的node_modules中查找
  },

  cache: {
    type: 'filesystem', // 使用文件缓存
  },
 };
