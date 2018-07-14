/**
 * Created by Punk.Li on 2016/7/2.
 */

var express = require('express');
var path = require('path');
var compression = require('compression');
var httpProxy = require('http-proxy');

var app  = new express();
var port = 9000;

app.use(compression());


var apiProxy = httpProxy.createProxyServer();

//这里拦截所有的请求 找出所有是当前图片的
// app.use(function (req, res, next) {
//
//     if(req.url.indexOf('/images/') > -1){
//         res.redirect("http://web.resource.zhonghuajinfu.com" + req.url + "?imageslim");
//     } else {
//         next();
//     }
// });

app.use(express.static(path.join(__dirname,'dist')));

app.all("/web/*", function(req, res){
    // apiProxy.web(req, res, { target: 'https://www.haoyisha.com' });
    // apiProxy.web(req, res, { target: 'http://192.168.1.220:10001' });
    apiProxy.web(req, res, { target: 'http://192.168.1.220:10001' });
});


app.listen(port,function(error){
    if(error){
        console.error(error);
    } else {
        console.log("===> listen on port %s.Open up http://localhost:%s/ in your browser.",port,port );
    }
})

