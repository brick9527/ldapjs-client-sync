const ldap = require('ldapjs');

const checkClient = require('./libs/check-client');
const syncMethodsFactory = require('./libs/sync-methods-factory');
const bindFunc = require('./libs/bind-func');

class LDAP {
  constructor() {
    this.client = null;
  }

  /**
   * 连接LDAP服务器
   * @param {any} params - ldap.createClient()方法所需参数
   * @returns 
   */
  connect(params) {
    return new Promise((resolve, reject) => {
      const client = ldap.createClient(params);

      client.on('error', err => {
        return reject(err);
      });

      this.client = client;

      bindFunc(this, ['bindSync', 'addSync', 'delSync', 'modifySync', 'modifyDNSync', 'searchSync', 'starttlsSync', 'unbindSync']);

      return resolve(this.client);
    });
  }

  /**
   * bind
   * @param  {...any} params - bind()方法所需参数
   */
  bindSync(...params) {
    return syncMethodsFactory(this.client, 'bind', ...params);
  }

  /**
   * add
   * @param  {...any} params - add()方法参数
   */
  addSync(...params) {
    return syncMethodsFactory(this.client, 'add', ...params);
  }

  /**
   * del
   * @param  {...any} params - del()方法参数
   */
  delSync(...params) {
    return syncMethodsFactory(this.client, 'del', ...params);
  }

  /**
   * modify
   * @param  {...any} params - modify()方法参数
   * @param {*} change - change对象
   * @returns 
   */
  modifySync(...params) {
    const ldapChange = new ldap.Change(params[params.length - 1]);

    return syncMethodsFactory(this.client, 'modify', ...params, ldapChange);
  }

  /**
   * modifyDN
   * @param  {...any} params - modifyDN()方法参数
   * @returns 
   */
  modifyDNSync(...params) {
    return syncMethodsFactory(this.client, 'modifyDN', ...params);
  }

  /**
   * search
   * @param  {...any} params - search()方法参数
   * @returns 
   */
  searchSync(...params) {
    return new Promise((resolve, reject) => {
      checkClient(this.client);

      this.client.search(...params, (err, res) => {
        let entries = [];
        res.on('searchEntry', (entry) => {
          entries.push(entry);
        });

        res.on('searchReference', (referral) => {
          return resolve({ status: 'searchReference', referral });
        });

        res.on('error', (err) => {
          return reject(err);
        });

        res.on('end', (result) => {
          const objects = entries.map(item => item.object);
          return resolve({ status: 'end', result, entries, objects });
        });
      });
    });
  }

  /**
   * starttls
   * @param  {...any} params - starttls()方法参数
   * @returns 
   */
  starttlsSync(...params) {
    return syncMethodsFactory(this.client, 'starttls', ...params);
  }

  /**
   * unbind
   * @returns 
   */
  unbindSync() {
    return new Promise((resolve, reject) => {
      this.client.unbind((err) => {
        if (err) {
          return reject(err);
        }

        return resolve(true);
      });
    });
  }
}

module.exports = LDAP;