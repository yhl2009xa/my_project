/**
 * @fileName：index
 * @author : hongye.liu
 * @DATE :  2018/7/5
 * @intro: 拖拽排序
 * 兼容amd与cmd的jquery拖拽排序
 */
//如果是在node的环境中$通过require导入如果浏览器通过window导入
if(typeof module !=='undefined' && typeof exports ==='object'){
    var $=require('jquery');
}else{
    var $=window.$
}

(function(){
    var dragImg = function(options){
        this.$ele =  $(options.ele);
        this.initEvent();
        this.initStatus();
        this.render();
    }

    dragImg.prototype.options = {
        ele:'body'
    }

    dragImg.prototype.initStatus = function(){
        this.isMove = false ;//当前是否移动
        this.$moveDom = null ;//当前移动的dom元素
        this.basicX = this.$ele.offset().left;
        this.basicY = this.$ele.offset().top;
    }
    /**
     * 监听拖拽事件
     */
    dragImg.prototype.initEvent = function(){
        // this.$ele.on("touchStart",".drag_item",this.touchStartHandle);
        // this.$ele.on("touchMove",".drag_item",this.touchMoveHandle);
        // this.$ele.on("touchEnd",".drag_item",this.touchEndHandle);
        this.$ele.on("mousedown",".drag_item",this.mousedownHandle.bind(this));
        this.$ele.on("mouseup",".drag_item",this.mouseupHandle.bind(this));
        this.$ele.on("mousemove",".drag_item",this.mousemoveHandle.bind(this));
    }

    dragImg.prototype.mousedownHandle = function(e){
       this.isMove = true;
       this.startX = $(e.currentTarget).offset().left;
       this.startY =  $(e.currentTarget).offset().top;
        this.$moveDom = $(e.currentTarget);
    }
    dragImg.prototype.mouseupHandle = function(e){
        this.isMove = false;
    }
    dragImg.prototype.mousemoveHandle = function(e){
        if(!this.isMove){
            return
        }
        this.moveStartX = $(e.currentTarget).offset().left;
        this.moveStartY = $(e.currentTarget).offset().top;
        this.$moveDom.css("left", this.moveStartX - this.basicX);
        this.$moveDom.css("top", this.moveStartY - this.basicY);
    }

    /***
     * 当前组件的渲染
     */
    dragImg.prototype.render = function(){
        for(var index = 0 ;index < $(".drag_item",this.$ele).length;index++){
            var $dom = $(".drag_item",this.$ele).eq(index);
            $dom.css("position","absolute");
            $dom.css("left", $dom.offset().left);
            $dom.css("top", $dom.offset().top);
        }
    }

    /**
     * 如果当前只有一个指头或者
     * 当前已经有一个正在触摸状态了
     * 事件不响应
     * @param e
     */
    // dragImg.prototype.touchStartHandle = function(e){
    //     if(e.touches.length == 1) {
    //         this.startX = ev.touches[0].clientX; // 记录开始位置
    //     }
    // }
    // dragImg.prototype.touchMoveHandle = function(e){
    //
    // }
    // dragImg.prototype.touchEndHandle = function(e){
    //
    // }


    var moduleName = dragImg;
    if(typeof module != "undefined" && typeof exports === "object"){
        module.exports = moduleName;
    }else if(typeof define === "function" && (define.amd || define.cmd)){
        define(function(){
            return moduleName
        })
    }else{
        window.dragImg = moduleName;
        console.log(window.dragImg);
    }
}).call(function(){
    return (typeof window !=='undefined' ? window : global )
},$)