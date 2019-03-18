let huPuAction = {
    getInsertText:function(param){
        let $sql = 'insert into t_img set imgSrc = ' + param.imgSrc
            + ',originAddress = huPu'
            + ',title = ' + param.title;
        return $sql;
    }
};

exports.huPuAction = huPuAction;