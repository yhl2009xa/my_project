/**
 * Created by Administrator on 2017/6/29.
 * 多view的模板基类
 */
var BV = require("./view");
var Component = function(opt){
    BV.call(this,opt);
    this.init();
    this.initView();
}

Component.prototype.init = function(){
    this.views = [];
    this.components = [];
}



/**
 * 初始化视图
 */
Component.prototype.initView = function(){
    $.each(this.views,function(index,view){
        this.components.push(new view.componentClass(
            $.extend({},view.options)
        ));
    })
}

module.exports  = Component