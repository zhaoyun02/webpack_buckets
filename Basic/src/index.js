// import pic from "./images/users.png";
// import "./index.css";
// import "./index.less";
// console.log("hello webpack");

// 集成react @babel/preset-react
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
ReactDom.render(<App />, document.getElementById("app"));
// import "@babel/polyfill";  //  useBuildIns usage不需要引入 entry需要引入
// 测试 babel-loader babel/preset-env（语法转换） es6+特性还需单独处理
// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map((item) => {
//   console.log(item);
// });
// webpack-dev-server
// import axios from "axios";

// axios.get("/api/info").then((res) => {
//   console.log(11111, res);
// });

// webpack解析插件的过程
// const webpack = require("webpack");
// const options = require("../webpack.config");

// const compiler = webpack(options);

// // compiler.hooks=>编译的阶段
// Object.keys(compiler.hooks).forEach((key) => {
//   if (compiler.hooks[key].tap) {
//     compiler.hooks[key].tap("any", () => {
//         // 整个过程的钩子
//       console.log(`run -> ${key}`);
//     });
//   }
// });
// compiler.run();
