/**
 * 爬虎扑网数据
 *
 */

const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');
const hupuUrl = require('../const').HPURL;
var dbHelper = require('../DBHelper/dbHelper');
var huPuAction = require('../DBHelper/sqlText').huPuAction;



let valueArr = [],
    curCount = 0,maxCatchNum = 4;


//这里要将所有的网络请求完毕以后才能获取所有的插入数据
//所以：
// 1 、$('.titlelink>a:first-child').each循环体每次执行完毕以后都要去 判断数据是不是爬取完毕
// 2 、每页的 $('.titlelink>a:first-child') 查询完毕后也要去判断是不是 爬取完毕
// 3、 这里为了省事 在一分钟后 不管数据是否爬取完毕 进入插入数据库操作 后面的不管


var init = function(){
    for(let index = 1;index <=maxCatchNum;index++ ){
        let cr_url = hupuUrl + index;

        superagent.get(cr_url).end(function (err,res) {
            if(err){
                return console.error(err);
            }
            let $ = cheerio.load(res.text);
            console.log(cr_url);

            $('.titlelink>a:first-child').each(function (idx, element) {

                let $element = $(element);
                let href = url.resolve(cr_url,$element.attr('href'));
                curCount++;
                superagent.get(href).end(function (err,res) {
                    if(err){
                        console.log(err);
                        return true;
                    }
                    let $ = cheerio.load(res.text);
                    let title = $('.bbs-hd-h1>h1').attr('data-title');//帖子标题
                    let contentimgs = [];
                    console.log(index + "..." + cr_url + "..." + href + "..." +$('.quote-content>p>img').length);
                    $('.quote-content>p>img').each(function(i, elem) {
                        if($(elem).attr("src").indexOf("placeholder.png") < 0){
                            contentimgs.push($(elem).attr("src"));
                        }
                    });
                    contentimgs.length >0 &&  valueArr.push({title:title,imgSrc:contentimgs.join(";")});

                })
            })
        });
    }

    setTimeout(function(){
        valueArr.length > 0 && dbHelper.insert({sqlText:huPuAction.getInsertText(valueArr),type:'crawler'});
    },10000);

}



module.exports = {
    init:init
}
