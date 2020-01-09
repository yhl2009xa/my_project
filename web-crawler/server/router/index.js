var dbHelper = require('../DBHelper/dbHelper');
var appAction = require('../DBHelper/sqlText').appAction;
var wyAction = require('../crawler/wyController');
var cpAction = require('../crawler/cpController');

module.exports = function (app) {
    //静态文件
    app.get("*.html",function(req,res,next){
        next();
    })

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",'3.2.1')
        if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
        else  next();
    });


    app.post("/getMainPage",function(req,res,next){
        dbHelper.query({sqlText:appAction.getQueryText(req.body),backFun:function(data){
            if(data){
                res.send({errorcode:0,data:data});
            }
        }});
    })


    app.post("/getWyNews",function(req,res,next){
        wyAction.rquestData(req.body,function (data) {
            res.send({errorcode:0,data:data})
        });
    })


    app.post("/getCpHx",function(req,res,next){
        cpAction.rquestData(req.body,"Hx",function (data) {
            res.send({errorcode:0,data:data})
        });
    })


    app.post("/getCpLy",function(req,res,next){
        cpAction.rquestData( req.body,"Ly",function (data) {
            res.send({errorcode:0,data:data})
        });
    })


    app.post("/getCpQk",function(req,res,next){
        cpAction.rquestData(req.body,"Qk",function (data) {
            res.send({errorcode:0,data:data})
        });
    })

    app.get("/test",function(req,res,next){
       console.log("test");
    })

}

