const maria = require('mysql');

const conn = maria.createConnection({
    host: '',
    port: 3306,
    user: '',
    password: ''
});

module.exports = conn;
