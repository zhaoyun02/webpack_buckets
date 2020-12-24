// my-less-loader
// less=>css
const less = require("less");
module.exports = function (source) {
  less.render(source, (error, output) => {
    //  返回输出css
    this.callback(error, output.css);
  });
};

