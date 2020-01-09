
var pool = require('./sqlPool');
var errorLog = require('../common/logger').getLogger("error");
var sqlLog = require('../common/logger').getLogger();
var crawlerLog = require('../common/logger').getLogger("crawler");


var  dbHelper = function(){

};

/**
 * 查询操作
 * 并发访问时，通过conn.release()释放连接死活不成功，导致一定访问达到连接数上限后，pool.getConnection直接卡死没有任何的回调！
 * 改成pool.releaseConnection(conn)才okay！
 */
dbHelper.prototype.query = function (params) {
    this.dBQuery('query',params);
};
dbHelper.prototype.dBQuery = function(type,param){
    pool.getConnection((err,conn)=>{
        if(err){

            if(param.type = "crawler"){
                crawlerLog.error(err);
            }else{
                sqlLog.error(err);
            }
            return ;
        }
        conn.query(
            param.sqlText,function(error, results, fields){
                pool.releaseConnection(conn);
                if(param.type = "crawler"){
                    crawlerLog.error(err);
                }else{
                    sqlLog.error(err);
                }
                if(results && param.backFun){
                    param.backFun(results);
                }
            }
        );

    })

};

/**
 * 删除操作
 */
dbHelper.prototype.delete = function(params){
    this.dBQuery('delete',params);
};

/**
 * 插入操作
 */
dbHelper.prototype.insert = function(params){
    this.dBQuery('insert',params);
};




dbHelper.prototype.update = function(params){
    this.dBQuery('update',params);
};

module.exports = new dbHelper();

