const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');
const url = require('url');
const hupuUrl = require('./const').HPURL;



let ssr = [];
let allUrl = [];
let curCount = 0;

for(let index = 1;index <=4;index++ ){
    let cr_url = hupuUrl + index;
    superagent.get(cr_url).end(function (err,res) {
        if(err){
            return console.error(err);
        }
        let $ = cheerio.load(res.text);
        $('.titlelink>a:first-child').each(function (idx, element) {
            let $element = $(element);
            let href = url.resolve(cr_url,$element.attr('href'));
            allUrl.push(href);
            curCount++;
            superagent.get(href).end(function (err,res) {
                if(err){
                    return console.error(err);
                }
                let $ = cheerio.load(res.text);
                let add = href;
                let title = $('.bbs-hd-h1>h1').attr('data-title');//帖子标题
                let tximg = $('.headpic:first-child>img').attr('src');//用户头像
                let txname = $('.j_u:first-child').attr('uname');//用户ID
                let contentimg1 = $('.quote-content>p:nth-child(1)>img').attr('src');//图1
                let contentimg2 = $('.quote-content>p:nth-child(2)>img').attr('src');//图2
                let contentimg3 = $('.quote-content>p:nth-child(3)>img').attr('src');//图3
                ssr.push({
                    'tx': tximg,
                    'name': txname,
                    'pic': contentimg1,contentimg2,contentimg3
                });

                let stad = {
                    "address": add,
                    "title":title,
                    "ID" : txname,
                    "touxiang" : tximg,
                    "pic1" : contentimg1,
                    "pic2" : contentimg2,
                    "pic3" : contentimg3
                };
                let picArr = [contentimg1,contentimg2,contentimg3];
                fs.appendFile('./data/result1.json', JSON.stringify(stad) ,'utf-8', function (err) {
                    if(err) throw new Error("appendFile failed...");
                    //console.log("数据写入success...");
                });

                fs.exists('data/download_images',function (exists) {
                    if(!exists){
                        fs.mkdir("data/download_images", function(err) {
                            if (err) {
                                throw err;
                            }
                            async.mapSeries(picArr,function(item, callback){
                                setTimeout(function(){
                                    //downloadPic方法下载图片
                                    downloadPic(item, 'data/'+ (new Date()).getTime() +'.jpg');
                                    callback(null, item);
                                },400);
                            }, function(err, results){});
                        });
                        console.log('ye')
                    }else {
                        console.log('er')
                    }
                })


            })
        })

    })
}


var downloadPic = (opts,path)=>{
    superagent.get(opts).end((err,res)=>{
        if(err){
           return console.log(err);
        }
        const stream =   fs.createWriteStream(path);
        // const req = request.post('/somewhere');
        // req.type('json');
        stream.pipe(res);
    })

}
