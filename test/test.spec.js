const LDAP = require('../index');

async function main() {
  const ldap = new LDAP();

  const client = await ldap.connect({
    url: ['ldap://192.168.1.24:389'],
    timeout: 3000,
    connectTimeout: 3000,
  });
  await client.bindSync('cn=admin,dc=example,dc=org', 'admin');
  const result = await client.searchSync('o=PTC,dc=example,dc=org');
  console.log(result.objects[0]);
}

main();