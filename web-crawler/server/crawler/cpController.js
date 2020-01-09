/**
 *360cpjh 数据抓取
 * 网站:http://www.cpjh360.com/
 *
 */

const request = require('superagent');
const superagent=require('superagent-charset')(request);

const  BASE_CP_API_URL = 'http://cpjh360.com/txt';


const CP_API = {
    //获取万码红袖
    HX:BASE_CP_API_URL + "/hongxiu.txt",
    //获取万码琅琊
    LY:BASE_CP_API_URL +"/langya.txt",
    //获取万码乾坤
    QK:BASE_CP_API_URL + "/qiankun.txt",
}


let getWyNewsData = function(type){
    let url = "" ,keyVal = "";
    switch (type) {
        case 'Hx':
            url = CP_API.HX;
            break;
        case 'Ly':
            url = CP_API.LY;
            break;
        case 'Qk':
            url = CP_API.QK;
            break;
    }
    return url;
}

exports.rquestData = function (params,type,callBackFun) {
    let url = getWyNewsData(type);
    superagent.get(url).charset('gbk').end(function (err,res) {
        if(err){
            return console.error(err);
        }
        if(res.text.length > 0){
            callBackFun(res.text);
        }

    });
}

