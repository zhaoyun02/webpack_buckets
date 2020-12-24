module.exports = function (source) {
  const callback = this.async();
  setTimeout(() => {
    const msg = source.replace("hello", 'good');
    callback(null, msg);
  }, 2000);
};
