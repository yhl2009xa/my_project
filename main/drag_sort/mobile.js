/**
 * @fileName：index
 * @author : hongye.liu
 * @DATE :  2018/7/5
 * @intro: 拖拽排序
 * 兼容amd与cmd的jquery拖拽排序
 * 实现原理:
 * 1 、初始化当前的拖拽元素将每个元素的offset 与 position 位置存放一个数组initialPointsArr中
 * 2、监听3个事件mousedown 、mouseup、mousemove
 * mousedown : 拖拽元素的事件 触发后记录当前的序列号
 * mousemove ： 文档上事件监听 防止快速拖动时 划出元素区
 * 每次移动 与initialPointsArr中值比较判断当前在哪个区 是否需要交换
 * 交换后将当前的拖拽元素插入到指定节点位置
 * mouseup ：将当前拖拽元素移入当前所在区域
 */
//如果是在node的环境中$通过require导入如果浏览器通过window导入
if (typeof module !== 'undefined' && typeof exports === 'object') {
    var $ = require('jquery');
} else {
    var $ = window.$
}


(function () {
    var dragImg = function (options) {
        this.$ele = $(options.ele);
        this.initEvent();
        this.initVariables();
        this.render();
    }

    dragImg.prototype.options = {
        ele: 'body'
    }

    dragImg.prototype.initVariables = function () {
        this.isDrag = false;//当前是否移动
        this.$moveDom = null;//当前移动的dom元素
        this.initialPointsArr = [];//存放最初的每个点的位置 后面需要根据当前位置位移
        this.curr_drag_index = null; //当前拖拽的元素位置

    }
    /**
     * 监听拖拽事件
     */
    dragImg.prototype.initEvent = function () {
        // this.$ele.on("touchStart",".drag_item",this.touchStartHandle);
        // this.$ele.on("touchMove",".drag_item",this.touchMoveHandle);
        // this.$ele.on("touchEnd",".drag_item",this.touchEndHandle);
        this.$ele.on("touchstart", ".drag_item", this.mousedownHandle.bind(this));
        $(document).on("touchend", this.mouseupHandle.bind(this));
        $(document).on("touchmove", this.mousemoveHandle.bind(this));
    }

    /**
     *
     * moveStartOffsetX moveStartOffsetY 用来定位最初点与当前触摸点的 上移 还是下移
     * 不用client 来判断是因为client不受滚动条的影响 永远为正数
     * 每次只允许一个触摸点
     * @param
     */
    dragImg.prototype.mousedownHandle = function (e) {
        if( this.isDrag ){
            return ;
        }
        var evt = window.event || e;
        this.isDrag = true;
        this.moveStartX = $(e.currentTarget).position().left;
        this.moveStartY = $(e.currentTarget).position().top;
        this.moveStartClientX = evt.touches[0].clientX;
        this.moveStartClientY = evt.touches[0].clientY;

        this.$moveDom = $(e.currentTarget);
        this.curr_drag_index = $(e.currentTarget).index();
    }
    dragImg.prototype.mouseupHandle = function (e) {
        if(this.isDrag){
            var currIndex =   this.$moveDom.index();
            this.move(this.$moveDom,this.initialPointsArr[currIndex].left,this.initialPointsArr[currIndex].top,function () {
                $(this).css({
                    "opacity" : "1",
                    "z-index" : 0
                }) ;
            });
        }
        this.isDrag = false;
    }

    dragImg.prototype.mousemoveHandle = function (e) {
        e.preventDefault() ;

        if (!this.isDrag) {
            return
        }
        this.$moveDom.css({
            "opacity": "0.8",
            "z-index": 999
        });
        var evt = window.event || e;
        var left = evt.touches[0].clientX - this.moveStartClientX + this.moveStartX,
            top = evt.touches[0].clientY - this.moveStartClientY + this.moveStartY;
        this.$moveDom.css("left", left);
        this.$moveDom.css("top", top);

        this.collisionCheck( evt.touches[0].clientX, evt.touches[0].clientY);
    }

    /**
     * 判断当前的触摸点是不是在其他元素的内部
     * 这里用initialPointsArr里点来判断不用当前的dom 因为dom的滑动有500的延迟
     *
     */
    dragImg.prototype.collisionCheck = function(pointX,pointY){
        $(".drag_item",this.$ele).each(function(index,dom){
            if( this.$moveDom.index() == index){
                return true ;
            }
            var cPoint = this.initialPointsArr[index];

            if(cPoint.offsetLeft < pointX
                && cPoint.offsetTop < pointY
                && cPoint.offsetLeft + $(dom).outerWidth(true) > pointX
                && cPoint.offsetTop  + $(dom).outerHeight(true) > pointY
            ){

                if(this.moveStartY > cPoint.top){
                    this.swapUp(index);
                }else if(this.moveStartY < cPoint.top){
                    this.swapDown(index);
                }else{
                    this.swapLevel(index);
                }
                //到达转换条件后重置当前的触摸起点
                this.moveStartX = cPoint.left;
                this.moveStartY = cPoint.top;
                this.moveStartClientX = pointX;
                this.moveStartClientY = pointY;
                return false;
            }
        }.bind(this))
    }


    /**
     * 向下交换
     * @param low
     * @param high
     */
    dragImg.prototype.swapDown = function(exchangeIndex){
        var moveIndex = this.$moveDom.index(), lowIndex = "", highIndex = "";
        moveIndex < exchangeIndex ? (lowIndex = moveIndex ,highIndex = exchangeIndex ):(lowIndex = exchangeIndex ,highIndex = moveIndex);

        for(var index = highIndex ; index > lowIndex ;index --){
            var $dom  =  $(".drag_item", this.$ele).eq(index);
            this.move($dom,this.initialPointsArr[index-1].left,this.initialPointsArr[index-1].top);
        }
        this.$moveDom.insertAfter($(".drag_item", this.$ele).eq(highIndex));
    }

    /**
     * 向下交换
     * @param low
     * @param high
     */
    dragImg.prototype.swapUp = function(exchangeIndex){
        var moveIndex = this.$moveDom.index(), lowIndex = "", highIndex = "";
        moveIndex < exchangeIndex ? (lowIndex = moveIndex ,highIndex = exchangeIndex ):(lowIndex = exchangeIndex ,highIndex = moveIndex);

        for(var index = lowIndex ; index < highIndex ;index ++){
            var $dom  =  $(".drag_item", this.$ele).eq(index);
            this.move($dom,this.initialPointsArr[index+1].left,this.initialPointsArr[index+1].top);
        }
        this.$moveDom.insertBefore($(".drag_item", this.$ele).eq(lowIndex));
    }

    /**
     * 左右交换
     * @param low
     * @param high
     */
    dragImg.prototype.swapLevel = function(exchangeIndex){
        var moveIndex = this.$moveDom.index(),
            $dom = $(".drag_item", this.$ele).eq(exchangeIndex)
        this.move($dom,this.initialPointsArr[moveIndex].left,this.initialPointsArr[moveIndex].top);
        if(moveIndex > exchangeIndex){
            this.$moveDom.insertBefore($(".drag_item", this.$ele).eq(exchangeIndex));
        }else{
            this.$moveDom.insertAfter($(".drag_item", this.$ele).eq(exchangeIndex));
        }
    }


    /**
     * 移动元素
     */
    dragImg.prototype.move = function($dom ,left,top,callback) {
        // console.log($dom.attr("index"));
        $dom.stop(true).animate({
            left : left,
            top : top
        },500, function() {
            if(callback) {
                callback.call(this) ;
            }
        }) ;
    },

        /***
         * 当前组件的渲染
         */
        dragImg.prototype.render = function () {
            if ($(".drag_item", this.$ele).eq(0).css("position") == "absolute") {
                return
            }
            for (var index = 0; index < $(".drag_item", this.$ele).length; index++) {
                var $dom = $(".drag_item", this.$ele).eq(index);
                $dom.attr("data-left", $dom.position().left);
                $dom.attr("data-top", $dom.position().top);
                $dom.attr("index", index);
                this.initialPointsArr.push({
                    left:$dom.position().left,
                    offsetLeft:$dom.offset().left,
                    top:$dom.position().top,
                    offsetTop:$dom.offset().top,
                })
            }

            for (var index = 0; index < $(".drag_item", this.$ele).length; index++) {
                var $dom = $(".drag_item", this.$ele).eq(index);
                $dom.css({
                    "position": "absolute",
                    "left": $dom.attr("data-left") + "px",
                    "top": $dom.attr("data-top") + "px"
                });
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
    if (typeof module != "undefined" && typeof exports === "object") {
        module.exports = moduleName;
    } else if (typeof define === "function" && (define.amd || define.cmd)) {
        define(function () {
            return moduleName
        })
    } else {
        window.dragImg = moduleName;
    }
}).call(function () {
    return (typeof window !== 'undefined' ? window : global )
}, $)