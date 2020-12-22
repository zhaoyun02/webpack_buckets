// webpack 默认配置文件
const htmlwebpackplugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  //   output: "./dist",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "main.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.png$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html",
    }),
  ],
};
