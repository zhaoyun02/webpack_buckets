// webpack 默认配置文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlwebpackplugin = require("html-webpack-plugin");
const minicssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  //   output: "./dist",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]-[chunkhash:8].js",
  },
  mode: "development",
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"],
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist", //默认访问的地址(似乎不好用)
    port: 8081,
    open: true, // 自动打开浏览器
    proxy: {
      "/api": {
        target: "http://localhost:9092",
      },
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.png$/,
      //   use: "file-loader",
      // },
      // url-loader 完全包含file-loader，多了一个linit配置
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]-[hash:8].[ext]",
            outputPath: "images/",
            publicPath: "../images",
            limit: 1024 * 3, //小于阈值会转成base64,大于则不会转,阈值一般设置3kb
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          minicssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [
          //     [
          //       "@babel/preset-env",
          //       {
          //         targets: {
          //           edge: "17",
          //           chrome: "67",
          //         },
          //         corejs: 2, // 若使用3.x版本则需要额外安装 core-js/stable 3.x版本,bundle文件大了很多，还没优化好
          //         useBuiltIns: "usage", //entry:需要在入口文件引入  usage ：不需要入口文件引入 false ：不按需加载
          //       },
          //     ],
          //   ],
          // },
        },
      },
      // {
      //   test: /\.less$/,
      //   use: ["my-style-loader", "my-css-loader", "my-less-loader"],
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     "replace-async-loader.js",
      //     {
      //       loader: "replace-loader.js",
      //       options: { info: "zhaoyun" },
      //     },
      //   ],
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     path.resolve(__dirname, "./myLoaders/replace-async-loader.js"),
      //     {
      //       loader: path.resolve(__dirname, "./myLoaders/replace-loader.js"),
      //       options: { info: "zhaoyun" },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html",
    }),
    new minicssExtractPlugin({
      filename: "css/[name]-[contentHash:8].css",
    }),
    new CleanWebpackPlugin(),
    new txtwebpackplugin(),
  ],
};
