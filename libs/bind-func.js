module.exports = function(that, methodNames) {
  for (let i = 0; i < methodNames.length; i++) {
    const method = methodNames[i];
    that.client[method] = that[method].bind(that);
  }
};
