/**
 * Created by Administrator on 2016/12/1.
 * 下拉加载的函数
 */
(function(){
    var loadMore = function(options){
        this.options = $.extend(this.defaultOptions,options);
        this.counter = 0;//当前查询的次数,
        this.ajaxLoading = false;//当前是否在发生ajax请求
    }

//设置默认参数
    loadMore.prototype.defaultOptions = {
        isAutoLoad:false,//是否开始默认的加载 跟随滚动条加载
        removeHeight:0,//需要移除的高度
        stopAutoCount:1,//从第几次开始 不需要再自动加载
        callBack:'',//返回的默认函数
        loadingEnd:false,//加载完毕
        isNeedStopAuto:false//判断是否会在某次停止自动加载 改为手动
    }
//初始化当前的事件
    loadMore.prototype.initEvent= function(){
        var self = this,
            opts = this.options;
        $(window).on("scroll.loadMore",function(){
            if( !opts.isAutoLoad || (opts.isNeedStopAuto && self.count >= opts.stopAutoCount) ){
                return ;
            } if(self.ajaxLoading){
                return ;
            }else{
                if($(document).height() - $(this).scrollTop() - $(this).height() <= opts.removeHeight){
                    self.counter ++;
                    opts.callBack();
                }
            }
        })
    }

    loadMore.prototype.destroyEvent = function(){
        $(window).off(".loadMore");
    };

    loadMore.prototype.changeAjaxState = function(state){
        this.ajaxLoading = state;
    };


    $.loadMorePlugin = function(options){
        return new loadMore(options);
    };

})(jQuery)

