/**
 * Created by Administrator on 2017/5/21.
 */
var App = require('./basic/app.js');
var mainLyout = require('./layout/main');
var  app = new App({
    router:{
        defaultRoute:mainLyout,
        main:mainLyout
    }
})
app.init();