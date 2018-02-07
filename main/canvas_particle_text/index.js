/**
 * Created by Administrator on 2017/2/27.
 *任意文字的粒子效果
 *
 */
!function(){
    var particleText = function(elem,opts){
        this.$ele = $(elem);
        this.options = $.extend(this.options,opts);
        this.init();

    }
    particleText.prototype.options = {
        text:'hello,中国',//显示的文字
        gap:'5',//距离的像素显示
        size:'200',//文字大小
        colors : ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
            '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
            '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
            '#FF5722'],
    }

//绘制文字信息
    particleText.prototype.drawText = function(){
        var canvasWidth = this.$ele.width();
        var canvasHeight = this.$ele.height();
        var  ctx = this.$canvas_Dom.get(0).getContext('2d');
        ctx.clearRect(0,0,canvasWidth,canvasHeight);

        ctx.textAlign = "center";
        ctx.font = this.options.size+"px arial";
        ctx.fillText(this.options.text,canvasWidth/2,canvasHeight/2);
        var textData = ctx.getImageData(0,0,this.$ele.width(),this.$ele.height());
        //data 属性返回一个对象，是一个8位无符号整数的数组Uint8ClampedArray 横向存储的像素点
        var buffer = new Uint32Array(textData.data.buffer);
        // ctx.clearRect(0,0,canvasWidth,canvasHeight);
        for(var x = 0 ;x < textData.width;x = x + parseInt(this.options.gap)){
            for(var y = 0 ;y < textData.height;y = y +parseInt(this.options.gap)){
                if(buffer[y*canvasWidth + x]){
                    this.drawPoint(x,y);
                }
            }
        }
    };
    //绘制圆点
    particleText.prototype.drawPoint = function(x,y){
        var  ctx = this.$canvas_Dom.get(0).getContext('2d'),
            pointRadius = Math.random()+1;
        ctx.beginPath();
        ctx.arc(x,y,pointRadius,0,2*Math.PI,true);
        ctx.fillStyle = this.options.colors[Math.floor(Math.random()*this.options.colors.length)];
        ctx.fill();
    }

//
    particleText.prototype.init = function(){
        var canvasWidth = this.$ele.width(),
            canvasHeight = this.$ele.height();
        this.$canvas_Dom = $('<canvas/>',{
            style:{
                "position":"absolute",
                "left":"0px",
                "top":"0px",
            }
        }).appendTo(this.$ele).attr("width",canvasWidth).attr("height",canvasHeight);
        this.drawText();

    };

   //定时器 或者帧动画的使用
    particleText.prototype.timingFun = function(){
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
                window.setTimeout(func, 1000 / 60);
            }
    };
    $.fn.particleTextPlugin = function(opts){
        return this.each(function(){
            return new particleText(this,opts)
        })
    }
}(jQuery)