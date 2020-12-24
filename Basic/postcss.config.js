module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions", "> 1%"],
    }),
    require("cssnano"), //压缩css
  ],
};
//小范围设置overrideBrowserslist(不建议，如果其他loader也需要配置，不方便)，会覆盖package.json 和 .browserslist
