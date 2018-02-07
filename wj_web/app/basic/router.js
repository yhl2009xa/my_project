/**
 * Created by Administrator on 2017/6/29.
 * 继承component基类的路由，可能存在多个组件 可能只有一个
 *
 */
var BC = require('./component')
var Router = function(options){
    BC.call(this,options);
}

Router.prototype = Object.create(BC.prototype,{
    router:[],//路由数组
    currentRouter:null,//当前路由

});

Router.prototype.refresh = function(paths){

}

module.exports = Router;