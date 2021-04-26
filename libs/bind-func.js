/**
 * 绑定函数的this指针
 * @param {any} that - 所要绑定的this指针
 * @param {String} methodNames - 方法名
 */
module.exports = function(that, methodNames) {
  for (let i = 0; i < methodNames.length; i++) {
    const method = methodNames[i];
    that.client[method] = that[method].bind(that);
  }
};
