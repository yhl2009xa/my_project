var errorLog = require('./logger').getLogger("error");
var sqlLog = require('./logger').getLogger();

exports.send = function (res,data,info) {
    //返回数据
    res.set('Content-Type', 'application/json; charset=UTF-8');
    res.send(data);

    //打印日志
    if(!!info){
        if (data.state === 1) {
            errorLog.error(info);
        } else {
            sqlLog.info(info);
        }
    }
}
