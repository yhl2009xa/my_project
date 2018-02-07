/**
 * Created by Administrator on 2017/5/21.
 * 组件的基类
 * 数据与模板的渲染
 */
var etpl = require('etpl');

var  View = function(options){
    this.init();
    this.setOptions(options);
    this.setData(options);
    this.render();
}


/**
 * 初始化视图
 */
View.prototype.init = function(){
    this.data = null;//数据源
    this.template = null;//视图的模板
    this.$container = null;//组件的容器
    this.events = null;
}


/**
 * 设置视图的属性
 */
View.prototype.setOptions = function(options){
    $.extend(this,options);
}
/**
 *组件的数据获取
 */
View.prototype.setData = function(data){
    if( !!data.data){
        this.data = data.data;
    }
}

/**
 * 渲染view页面
 */
View.prototype.render = function(){
    if(typeof this.template == "string"){
        this.template  = etpl.compile(this.template);
        var tempHtml =  this.template(this.data).trim();
        this.$container.empty().append(tempHtml);
    }
}

/**
 * 事件的监听
 */
View.prototype.addEvents  = function(){
    $.each(this.events ,function(index,evt){
        $(evt.target).on(evt.eventType,evt.callFun);
    })
}
/**
 * 事件的移除
 */
View.prototype.destroyEvents  = function(){
    $.each(this.events ,function(index,val){
        $(val.target).off(val.eventType,val.callFun);
    })
}
