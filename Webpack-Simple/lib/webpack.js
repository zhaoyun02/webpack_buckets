const path = require("path");
const fs = require("fs");
const babelParser = require("@babel/parser");
const tranverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = class Webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  run() {
    const info = this.parse(this.entry);
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const dependce = this.modules[i].dependce;
      if (dependce) {
        for (let j in dependce) {
          // 数组边长，for循环继续 （递归）
          this.modules.push(this.parse(dependce[j]));
        }
      }
    }
    // 数组结构转对象结构
    const obj = {};
    this.modules.forEach((item) => {
      obj[item.entryFile] = {
        dependce: item.dependce,
        code: item.code,
      };
    });
    this.file(obj);
  }

  parse(entryFile) {
    // 存路径映射
    const dependce = {};
    // 读取入口文件的内容
    const fileContent = fs.readFileSync(entryFile, "utf-8");
    // 处理内容为抽象语法树
    const ast = babelParser.parse(fileContent, {
      sourceType: "module",
    });
    // 获取依赖模块  ImportDeclaration导入声明
    tranverse(ast, {
      ImportDeclaration({ node }) {
        // 完整路径
        const pathName =
          "./" + path.join(path.dirname(entryFile), node.source.value);
        dependce[node.source.value] = pathName;
      },
    });
    // 通过babel核心模块处理js代码  @babel/preset-env擅长处理js
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    return {
      entryFile,
      code,
      dependce,
    };
  }

  file(code) {
    console.log(code)
    // 生成代码内容 webpack启动函数
    const filePath = path.join(this.output.path, this.output.filename);
    const newCode = JSON.stringify(code);
    const bundle = `(function(graph){
        function require(module){
            // 解决路径引用问题
            function PathRequire(relativePath){
               return require(graph[module].dependce[relativePath])
            }
            const exports = {};
            (function(require,exports,code){
               eval(code) 
            })(PathRequire,exports,graph[module].code)
            return exports;
        }
        require('${this.entry}')
    })(${newCode})`;
    // 生成main.js 位置是./dist目录
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};

// eval中的代码如果有require, 则去参数中找，找到PathRequire，将相对路径改成./src/...
