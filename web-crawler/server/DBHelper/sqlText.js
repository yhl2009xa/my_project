let huPuAction = {
    getInsertText:function(param){
        let valueStr = "";
        param.forEach(function(value,index){
            valueStr = valueStr + "('" + value.imgSrc + "','huPu','" + value.title+"'),";
        });
        let $sql = 'insert into t_img (imgSrc,originAddress,title) values ' + valueStr.substr(0,valueStr.length-1);
        return $sql;
    }
};


let appAction = {
    getQueryText:function(param){
        let $sql = 'select id,imgSrc,title from t_img order by id desc limit ' + param.pagestart +  "," + param.pagenum;
        return $sql;

    }
}

exports.huPuAction = huPuAction;
exports.appAction = appAction;
