/**
 * Created by Administrator on 2016/11/10.
 * tooltips 提示工具
 * 左右上下的提示方法
 */
(function(){

    var  toolTips = function(elem,options){
        this.options = $.extend(this.defaultOptions,options);
        this.$elem = $(elem);
        this.data = this.options.data || "";
        this.$mainContent;
        this.addEvent();
    }


    toolTips.prototype.defaultOptions = {
        direction : "right",
        bgColor:'#000',
        bgClass:"cus_tips_bg"
    }


    toolTips.prototype.addEvent = function(){
        this.$elem.on("mouseover",this.mouseoverHandle.bind(this));
        this.$elem.on("mouseout",this.mouseoutHandle.bind(this));
    };

    //鼠标移除事件监听
    toolTips.prototype.mouseoutHandle = function(){
        this.$mainContent.fadeOut(1000,function(){
            this.remove();
        });
    };
    //鼠标移入显示内容
    toolTips.prototype.mouseoverHandle = function(){
        if(this.$elem.next().hasClass("cus_tips")){
            return ;
        }
        this.$mainContent = $('<div class="cus_tips"></div>').addClass("cus_tips_" + this.options.direction).css("background-color",this.options.bgColor).html(this.data);
        this.$elem.after(this.$mainContent);
        this.upDateTipsPos();

    }
    //更新当前提示框的位置
    toolTips.prototype.upDateTipsPos = function(){
        switch (this.options.direction){
            case "right":
                this.$mainContent.css({
                    "left":this.$elem.position().left + this.$elem.width(),
                    "top":this.$elem.position().top +  (this.$elem.height() - this.$mainContent.outerHeight())/2
                })
                break;
            case "left":
                this.$mainContent.css({
                    "left":this.$elem.position().left - this.$mainContent.outerWidth(true),
                    "top":this.$elem.position().top +  (this.$elem.height() - this.$mainContent.outerHeight())/2
                })
                break;
            case "top":
                this.$mainContent.css({
                    "left":this.$elem.position().left + (this.$elem.width() - this.$mainContent.outerWidth(true))/2,
                    "top":this.$elem.position().top -  this.$mainContent.outerHeight(true)
                })
                break;
            case "bottom":
                this.$mainContent.css({
                    "left":this.$elem.position().left + (this.$elem.width() - this.$mainContent.outerWidth(true))/2,
                    "top":this.$elem.position().top +  this.$elem.height()
                })
                break;
            default:

                break;
        }
    }

    $.fn.toolTipsPlugin = function(options){
        return this.each(function(){
            return new toolTips(this,options)
        })
    }
})(jQuery)