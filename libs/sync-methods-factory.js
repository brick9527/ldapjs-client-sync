const checkClient = require('./check-client');

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
