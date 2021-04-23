# 简介（Summary）

`ldapjs-client-sync`基于[node-ldapjs](https://github.com/ldapjs/node-ldapjs)的*Client API*部分封装出Client API的**同步**方法，便于客户端逻辑的编写，避免回调地狱。

所有`ldapjs-client-sync`的API及API参数都可参考[node-ldapjs官方文档](http://ldapjs.org/client.html)。

# 环境

开发环境：Node >= 12.21.0

# 安装（Install）

- `npm`安装

```sh
npm i ldapjs-client-sync --save
```

- `cnpm`安装

```sh
cnpm i ldapjs-client-sync --save
```

# API

## new LDAP()

返回一个`LDAP`实例，该实例为基于`ldap.Client`进行封装，添加了同步的方法。下文中所有的`ldap`都是指该`LDAP`类的实例，并非`ldapjs`中原生的`ldap.Client`实例。

该实例用于调用`connect()`方法。

示例：

```js
const LDAP = require('ldapjs-client-sync');

const ldap = new LDAP();
```

## ldap.connect()

连接服务器，该方法参数详见官方文档中[`ldap.createClient()`方法的参数](http://ldapjs.org/client.html#create-a-client)

如果连接成功，将返回客户端对象，所有同步方法都在该客户端对象中。

示例：

```js
const LDAP = require('ldapjs-client-sync');

const ldap = new LDAP(); // 创建ldap实例

// 连接服务器，获取客户端对象
const client = await ldap.connect({
  url: ['ldap://127.0.0.1:1389', 'ldap://127.0.0.2:1389']
});
```

## client.bindSync()

`bind`的同步方法，参数详见[官方文档-bind()方法](http://ldapjs.org/client.html#bind)

示例：

```js
const LDAP = require('ldapjs-client-sync');

const ldap = new LDAP(); // 创建ldap实例

// 连接服务器，获取客户端对象
const client = await ldap.connect({
  url: ['ldap://127.0.0.1:1389', 'ldap://127.0.0.2:1389']
});

// 绑定客户端到指定DN
await client.bindSync('cn=admin,dc=example,dc=org', 'my_password');
```

## client.searchSync()

`search`的同步方法，参数详见[官方文档-search()方法](http://ldapjs.org/client.html#search)

示例：

```js
const LDAP = require('ldapjs-client-sync');

const ldap = new LDAP(); // 创建ldap实例

// 连接服务器，获取客户端对象
const client = await ldap.connect({
  url: ['ldap://127.0.0.1:1389', 'ldap://127.0.0.2:1389']
});

// 绑定客户端到指定DN
await client.bindSync('cn=admin,dc=example,dc=org', 'my_password');

// 搜索指定DN的数据
const result = await client.searchSync('o=my_organization,dc=example,dc=org');

console.log(result.objects[0]);
```

## client.addSync()

`add`的同步方法，参数详见[官方文档-add()方法](http://ldapjs.org/client.html#add)

## client.delSync()

`del`的同步方法，参数详见[官方文档-del()方法](http://ldapjs.org/client.html#del)

## client.modifySync()

`modify`的同步方法，参数详见[官方文档-modify()方法](http://ldapjs.org/client.html#modify)

## client.modifyDNSync()

`modifyDN`的同步方法，参数详见[官方文档-modifyDN()方法](http://ldapjs.org/client.html#modifyDN)

## client.starttlsSync()

`starttls`的同步方法，参数详见[官方文档-starttls()方法](http://ldapjs.org/client.html#starttls)

## client.unbindSync()

`unbind`的同步方法，参数详见[官方文档-unbind()方法](http://ldapjs.org/client.html#unbind)
