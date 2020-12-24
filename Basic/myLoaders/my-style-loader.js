
// my-style-loader
module.exports = function (source) {
  // 1.动态创建style标签
  // 2.将css插入到style标签
  // 3.将style标签插入到头部

  return `
        const tag = document.createElement('style');
        tag.innerHTML = ${source};
        document.head.appendChild(tag);
    `;
};
