// webpack 默认配置文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlwebpackplugin = require("html-webpack-plugin");
const minicssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
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
  ],
};
