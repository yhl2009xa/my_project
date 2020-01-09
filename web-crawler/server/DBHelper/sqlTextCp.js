let cpAction = {

    getInsertText:function(param){
        let valueStr = "";
        param.forEach(function(value,index){
            valueStr = valueStr + "('" + value.imgSrc + "','huPu','" + value.title+"'),";
        });
        let $sql = 'insert into t_img (imgSrc,originAddress,title) values ' + valueStr.substr(0,valueStr.length-1);
        return $sql;
    }
};

module.exports = cpAction;

