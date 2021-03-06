/**
 * Created by Administrator on 2017/5/21.
 */
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugin:[commonsPlugin],
    //入口文件
    entry:{
        index:'./app/index.js',
    },
    output:{
        path:'dist/js/page',
        filename:'[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style!css!less?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        //查找module的话从这里开始查找
        root: 'src/',
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.less'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            // AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            // ActionType : 'js/actions/ActionType.js',
            // AppAction : 'js/actions/AppAction.js'
        }
    },
    devServer:{
        hot:true,  // 关闭这里
    },
}