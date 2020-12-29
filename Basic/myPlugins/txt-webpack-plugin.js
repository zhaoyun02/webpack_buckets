module.exports = class txtwebpackplugin {
  // 通过apply钩入到相应的hooks，接受complier
  apply(compiler) {
    // emit是异步钩子，通过tapAsync触发
    // compile同步钩子，通过tap触发
    // complilation每一步处理的结果
    compiler.hooks.emit.tapAsync("txtwebpackplugin", (complilation, cb) => {
      // complilation.asset为输出到dist目录的文件
      const assetsArray = Object.keys(complilation.assets);
      // fileList文件数
      let fileList = `fileList: ${assetsArray.length}`;
      // fileList清单文件名称
      assetsArray.forEach((key) => {
        fileList += `\n${key}`;
      });
      complilation.assets["fileList.txt"] = {
        // 输出文件内容
        source: function () {
          return fileList;
        },
        // 输出文件大小
        size: function () {
          return 1024;
        },
      };
      // 执行回调，否则webpack卡住
      cb();
    });
  }
};

// 原材料加工
// 流水线----1------2------3-------4--------5--------6
// 经过1、2、3加工后的原材料就是complilation
