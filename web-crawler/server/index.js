var express = require('express');
var path = require('path');
var compression = require('compression');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser')

var app  = new express();
var port = 8089;

app.use(compression());

app.use(express.static(path.join(__dirname,'/')));

app.use(bodyParser());


app.listen(port,function(error){
    if(error){
        console.error(error);
    } else {
        console.log("===> listen on port %s.Open up http://localhost:%s/ in your browser.",port,port );
    }
})