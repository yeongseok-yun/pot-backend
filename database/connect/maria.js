const maria = require('mysql');

const conn = maria.createConnection({
    host: '43.200.183.37',
    port: 3306,
    user: 'dev',
    password: 'dudtjr12##'
});

module.exports = conn;
