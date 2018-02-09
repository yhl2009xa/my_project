/**
 * Created by Administrator on 2018/2/9.
 * 模块说明:
 */
var config = require('./config');

var  init = function(io){

    io.sockets.on("connection",function(socket){
        console.log("a user come in")
    });

    io.sockets.on("disconnect",function(socket){
        console.log("a user go out");
    });

    io.sockets.on("message",function(message){

        var mData = analyzeMessageData(message);
        handleMessage(mData);

    })

}

var handleMessage = function(mData){
    switch (mData){
        case config.EVENT_TYPE.LOGIN :
            break;
        case  config.EVENT_TYPE.LOGOUT :
            break;
    }
}


var analyzeMessageData = function(message){
    try{
        return JSON.parse(message);
    }catch (error){
        console.log("获取数据异常:" + error);
    }
    return null;
}



module.exports = {
    init:init
}

