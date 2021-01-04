const webpack = require("./lib/webpack");
const options = require("./webpack.config");

const compiler = new webpack(options);
compiler.run();
