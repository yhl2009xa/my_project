/**
 * Created by Administrator on 2018/2/7.
 * 模块说明:
 */
var config = require("./config");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var socketHandle = require("socket_handle");

var io = require('socket.io')(server,{
    path: '/test',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

socketHandle.init(io);
server.listen(config.PORT);


// module.exports={
//
// }