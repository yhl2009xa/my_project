module.exports = function (app) {

    //静态文件
    app.get("*.html",function(req,res,next){
        next();
    })

    require()
}

