/**
 * Created by Administrator on 2017/5/21.
 * app入口文件
 */
var $ = require('jquery');

var App = function(dom,options){
     this.currentRouter = null;
     this.container = dom;
}


App.prototype.init = function(){
    this.initEvent();
    this.initRoute();
}

//监听函数
App.prototype.initEvent = function(){
    $(window).on("hashchange",this.hashChangeHandle)
}

App.prototype.initRoute = function(){
   this.hashChangeHandle();
}

//监听路由改变
App.prototype.hashChangeHandle = function(e){
    var pathArr = location.hash.replace(/^#/,'').split("/");
    var pathTemp =  pathArr.length > 0 ? pathArr[0] :"default",
        tempClass = router[pathTemp];
    if(tempClass == this.currentRouter){
        this.currentRouter.refresh();
    }else{
        if(this.currentRouter){
            this.currentRouter.remove();
        }
        this.currentRouter  =  new tempClass({
            path:pathArr.slice(1,pathArr.length-1),
            container:this.container
        })
    }
}

module.exports = App;










// var $ = require('jquery');
// var router = require('./')
// var App = function(options){
//     alert("sadsad");
// }
//
// App.prototype.constructor = App;
//
// App.prototype.init = function(){
//     this.currentRouter = null;
//     this.router = [];
//     this.addListen();
// }
//
// //监听函数
// App.prototype.addListen = function(){
//     $(window).on("hashchange",this.hashChangeHandle)
// }
//
// //监听路由改变
// App.prototype.hashChangeHandle = function(e){
//     var pathArr = location.hash.replace(/^#/,'').split("/");
//     var pathTemp =  pathArr.length > 0 ? pathArr[0] :"default",
//         tempClass = router[pathTemp];
//     if(tempClass == this.currentRouter){
//         this.currentRouter.refresh();
//     }else{
//         if(this.currentRouter){
//             this.currentRouter.remove();
//         }
//
//         this.currentRouter  =  new tempClass({
//             path:pathArr.slice(1,pathArr.length-1)
//         })
//     }
// }
//
// module.exports = App;
