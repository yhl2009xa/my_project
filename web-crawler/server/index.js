var express = require('express');
var path = require('path');
var compression = require('compression');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
var router = require('./router');
var history =  require('connect-history-api-fallback');

var app  = new express();
var port = 8089;

app.use(compression());
app.use('/',history());
app.use(express.static(path.join(__dirname,'../app')));

app.use(bodyParser());
//开启路由
var router = express.Router();
// app.use(router);
app.use('/', router);
require('./router/index')(router);


app.listen(port,function(error){
    if(error){
        console.error(error);
    } else {
        console.log("===> listen on port %s.Open up http://localhost:%s/ in your browser.",port,port );
    }

})
