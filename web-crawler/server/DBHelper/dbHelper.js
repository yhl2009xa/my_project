
var pool = require('./sqlPool');
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
        //查询
        let $sql = "select * from user;";
        conn.query(
            $sql,()=>function(err,res){
                if(err){
                    console.log("");
                }else{
                    pool.releaseConnection(conn)
                }
            }
        );
    })
}

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
var hhh = new dbHelper();

module.exports = hhh;



