module.exports = function(client) {
  if (!client) {
    throw new Error('Client is null. Please call connect function first.');
  }
};
