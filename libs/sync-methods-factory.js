const checkClient = require('./check-client');

/**
 * 异步->同步工厂函数
 * @param {ldap.Client} client - 客户端
 * @param {String} funcName - 异步方法名称
 * @param  {...any} params - 方法参数
 * @returns 
 */
module.exports = function(client, funcName, ...params) {
  return new Promise((resolve, reject) => {
    checkClient(client);

    client[funcName](...params, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(client);
    });
  });
};
