var mysql = require('mysql');
var  pool =  mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Yhlxhwj2012',
    database:'net_resource'
});


module.exports = pool;