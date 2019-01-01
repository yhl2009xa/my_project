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

                let contentimgs = $('.quote-content>p>img').map(function(index,item){
                    return  $(item).attr("src");
                })

                // let contentimg1 = $('.quote-content>p:nth-child(1)>img').attr('src');//图1
                // let contentimg2 = $('.quote-content>p:nth-child(2)>img').attr('src');//图2
                // let contentimg3 = $('.quote-content>p:nth-child(3)>img').attr('src');//图3
                // ssr.push({
                //     'tx': tximg,
                //     'name': txname,
                //     'pic': contentimg1,contentimg2,contentimg3
                // });

                let stad = {
                    "address": add,
                    "title":title,
                    "ID" : txname,
                    "touxiang" : tximg,
                    "pic":contentimgs.toString()
                };
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
                            async.mapSeries(contentimgs,function(item, callback){
                                setTimeout(function(){
                                    //downloadPic方法下载图片
                                    downloadPic(item, 'data/'+ (new Date()).getTime() +'.jpg');
                                    callback(null, item);
                                },400);
                            }, function(err, results){});
                        });
                        console.log('ye')
                    }else {
                        async.mapSeries(contentimgs,function(item, callback){
                            setTimeout(function(){
                                //downloadPic方法下载图片
                                downloadPic(item, 'data/download_images/'+ (new Date()).getTime() +'.jpg');
                                callback(null, item);
                            },400);
                        }, function(err, results){});
                    }
                })


            })
        })

    })
}

// var request=require("request");
// var http = require('https')
//
// //保存图片
// function downloadPic(url,path) {
//     console.log(url);
//     var option={
//         path:'https://i10.hoopchina.com.cn/hupuapp/bbs/210130861371844/thread_210130861371844_20181218001817_s_109167_w_750_h_1000_57494.jpg?x-oss-process=image/resize,w_800/format,webp',
//         headers:{
//             'Referer':'https://m.hupu.com/'
//         }
//     };
//
//
//     http.get(option,function (req,res) {
//         var imgData = '';
//         req.on('data',function (chunk) {
//             imgData += chunk;
//         })
//         req.setEncoding('binary');
//         req.on('end',function () {
//             fs.writeFile(path,imgData,'binary',function (err) {
//                 console.log('保存图片成功'+path)
//             })
//         })
//     })
// }



var downloadPic = (opts,path)=>{

    if(opts.indexOf("placeholder.png") > -1){
        return ;
    }

    let queryOptions =  opts;
     if(opts.indexOf("?")>-1){
         queryOptions =  opts.substr(0,opts.indexOf("?"));
     }

    let stream = fs.createWriteStream(path);

    console.log(queryOptions);
    superagent.get(queryOptions).set('Referer', '')
        .set("User-Agent",
            'User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36 Core/1.47.933.400 QQBrowser/9.4.8699.400'
        ).pipe(stream);

    // superagent.get(req.query.url)
    //     .set('Referer', '')
    //     .set("User-Agent",
    //         'User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36 Core/1.47.933.400 QQBrowser/9.4.8699.400'
    //     )
    //     .end(function(err, result) {
    //         if (err) {
    //             //res.send(err);
    //             return false;
    //         }
    //         res.end(result.body);
    //         return;
    //     });







}
