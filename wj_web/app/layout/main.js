/**
 * Created by Administrator on 2017/7/4.
 * 页面的主布局元素
 */
var BR = require('../basic/router');
var Home = require('../module/home/index')
var mainLayout = function(options){
    BR.call(this,options);
}

mainLayout.prototype = Object.create(BR.prototype,{
    router:{
        default:Home,
        home:Home
    }
});


module.exports = mainLayout;