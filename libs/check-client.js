/**
 * 检查客户端是否已经存在
 * @param {ldap.Client} client - 客户端
 */
module.exports = function(client) {
  if (!client) {
    throw new Error('Client is null. Please call connect function first.');
  }
};
