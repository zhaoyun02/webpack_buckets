// 本质是一个函数，但不能是箭头函数，因为会使用thi
// 必须有返回值 str | buffer
// return 返回一个信息 this.callback返回多个信息
// 处理多个loader
const { call } = require("file-loader");

// 处理异步逻辑 this.async=>返回this.callback
module.exports = function (source) {
  console.log(this.query);
  
  return source.replace("webpack", this.query.info);

  // const msg = source.replace("webpack", this.query.info);
  // this.callback(null, msg);

  
};
