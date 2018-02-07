/**
 * Created by Administrator on 2017/7/6.
 */
var BV = require('../../basic/view');


var  Home = function(options){
    BV.call(this,options);
}

Home.prototype = Object.create(BV.prototype);



module.exports = Home