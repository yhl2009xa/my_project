const superagent = require('superagent');
const  BASE_WY_API_URL = 'https://3g.163.com/touch/reconstruct/article/list/';

const WY_KEY = {
    //娱乐
    WY_STR_NAME_YL:'BA10TA81wangning',
    WY_STR_NAME_TY:'BA8E6OEOwangning',
    WY_STR_NAME_CJ:'BA8EE5GMwangning',
    WY_STR_NAME_JS:'BAI67OGGwangning',
    WY_STR_NAME_KJ:'BA8D4A3Rwangning',
    WY_STR_NAME_SJ:'BAI6I0O5wangning',
    WY_STR_NAME_SM:'BAI6JOD9wangning',
    WY_STR_NAME_YX:'BAI6RHDKwangning',
    WY_STR_NAME_LY:'BEO4GINLwangning',
}

const WY_API = {
    //获取网易新闻娱乐
    NEWS_WY_LIST_YL:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_YL +"/",
    //获取网易新闻体育
    NEWS_WY_LIST_TY:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_TY +"/",
    //获取网易新闻财经
    NEWS_WY_LIST_CJ:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_CJ +"/",
    //获取网易新闻军事
    NEWS_WY_LIST_JS:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_JS+"/",
    //获取网易新闻科技
    NEWS_WY_LIST_KJ:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_KJ +"/",
    //获取网易新闻手机
    NEWS_WY_LIST_SJ:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_SJ +"/",
    //获取网易新闻数码
    NEWS_WY_LIST_SM:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_SM +"/",
    //获取网易新闻游戏
    NEWS_WY_LIST_YX:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_YX +"/",
    //获取网易新闻旅游
    NEWS_WY_LIST_LY:BASE_WY_API_URL + WY_KEY.WY_STR_NAME_LY +"/",
}


let getWyNewsData = function(type){
    let url = "" ,keyVal = "";
    switch (type) {
        case 2:
            url = WY_API.NEWS_WY_LIST_YL;
            keyVal = WY_KEY.WY_STR_NAME_YL;
            break;
        case 3:
            url = WY_API.NEWS_WY_LIST_TY;
            keyVal = WY_KEY.WY_STR_NAME_TY;
            break;
        case 4:
            url = WY_API.NEWS_WY_LIST_CJ;
            keyVal = WY_KEY.WY_STR_NAME_CJ;
            break;
        case 6:
            url = WY_API.NEWS_WY_LIST_JS;
            keyVal = WY_KEY.WY_STR_NAME_JS;
            break;
        case 7:
            url = WY_API.NEWS_WY_LIST_KJ;
            keyVal = WY_KEY.WY_STR_NAME_KJ;
            break;
        case 8:
            url = WY_API.NEWS_WY_LIST_SJ;
            keyVal = WY_KEY.WY_STR_NAME_SJ;
            break;
        case 9:
            url = WY_API.NEWS_WY_LIST_SM;
            keyVal = WY_KEY.WY_STR_NAME_SM;
            break;
        case 10:
            url = WY_API.NEWS_WY_LIST_YX;
            keyVal = WY_KEY.WY_STR_NAME_YX;
            break;
        case 11:
            url = WY_API.NEWS_WY_LIST_LY;
            keyVal = WY_KEY.WY_STR_NAME_LY;
            break;
    }
    return {url,keyVal};
}

exports.rquestData = function (params,callBackFun) {
    let url = getWyNewsData(params.type).url,keyVal =  getWyNewsData(params.type).keyVal;
    superagent.get(url + params.page + "-" + params.count + ".html"
    ).end(function (err,res) {
        if(err){
            return console.error(err);
        }
        if(res.text.length > 0){
            let result = JSON.parse(res.text.substr(9,res.text.length -10));
            callBackFun(result[keyVal]);
        }

    });
}
