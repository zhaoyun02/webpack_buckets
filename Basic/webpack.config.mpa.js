// webpack 默认配置文件
const htmlwebpackplugin = require("html-webpack-plugin");
const minicssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const glob = require("glob");

// 多页面打包 自动生产entry 与 html模板
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  //查找所有符合要求的目录
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  entryFiles.map((item) => {
    // 正则匹配查找文件夹名称
    const match = item.match(/src\/(.*)\/index\.js$/);
    const filename = match[1];
    // 添加入口
    entry[filename] = item;
    // 添加对应的html
    htmlWebpackPlugins.push(
      new htmlwebpackplugin({
        template: path.join(__dirname, `/src/${filename}/index.html`),
        filename: `${filename}.html`,
        chunks: [filename],
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.png$/,
        use: "file-loader",
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
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new minicssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
