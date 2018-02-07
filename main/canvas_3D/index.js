/**
 * Created by Administrator on 2017/6/14.
 * 3D 字符旋转 根据z的距离设置字体大小
 * canvas，animation
 */
!function(){
    var CharCanvas3D = function(elem,options){
        this.$ele = $(elem);
        this.options = $.extend(this.options,options);
        this.maxcharLength = 256;
        this.SEPARATION = 1.5;
        this.rotateArr = [];
        this.time = 0;
        this.init();

    };


    CharCanvas3D.prototype.init = function(){
        this.initCanvas();
        this.timingFun();
        this.creatPos();
        window.requestAnimationFrame(this.drawPos.bind(this));
    };

    /**
     * 初始化canvas
     */
    CharCanvas3D.prototype.initCanvas = function(){
        var  $canvas =  $('<canvas></canvas>');
        $canvas.get(0).width =  this.$ele.width();
        $canvas.get(0).height =  this.$ele.height();
        this.$ele.append($canvas);
        this.ctx = $canvas.get(0).getContext("2d");
    }
    /**
     * 绘制旋转点
     */
    CharCanvas3D.prototype.drawPos = function(){
        var ww = this.$ele.width(),
            vh = this.$ele.height();
        this.ctx.clearRect(0,0,ww,vh);
        for (var i = 0; i <  this.rotateArr.length; i++) {
            const DX = 0.005 * Math.sin(this.time * 0.001);
            const DY = 0.005 * Math.cos(this.time * 0.001);
            this.rotateArr[i].spot.rotate("x", DX);
            this.rotateArr[i].spot.rotate("y", DY);
            if(this.rotateArr[i].str == "+"){
                console.log("+");
            }
            this.render(this.rotateArr[i]);
        }
        ++this.time;
        window.requestAnimationFrame(this.drawPos.bind(this));
    }

    /*
     *根据传过来的字符串 设置当前的坐标点
     */
    CharCanvas3D.prototype.creatPos = function (){
        var rotateChars = this.options.chars,
            self = this;
        if(rotateChars == null){
            rotateChars = [];
            for(var index = 0 ;index < this.maxcharLength ;index ++){
                var tempchar = String.fromCharCode(Math.random()*94 + 33);
                rotateChars.push(tempchar);
            }
        }
        $.each(rotateChars,function(i,val){
            var spot = new Spot({
                x:(Math.random() - Math.random()) * self.SEPARATION,
                y:(Math.random() - Math.random() )* self.SEPARATION,
                z:(Math.random() - Math.random()) * self.SEPARATION,

            });
            var rotateChar = new RotateChar({
                str:val,
                spot:spot
            })
            self.rotateArr.push(rotateChar);
        })
    }

    //
    CharCanvas3D.prototype.options = {
        "chars":null //需要旋转的字符数组,如果没有就用ascii码代替
    };

    //对每个点的渲染
    CharCanvas3D.prototype.render = function(rotateChar){
        const PIXEL = rotateChar.spot.project();
        const XP = PIXEL[0] + this.$ele.width() /2 ;
        const YP = PIXEL[1] + this.$ele.height() /2 ;
        const MAX_SIZE = 50;
        const SIZE = (1 / PIXEL[2] * MAX_SIZE) ||  0;
        const BRIGHTNESS = SIZE / MAX_SIZE;
        const COL = 'rgba(255, 255, 100 * BRIGHTNESS || 0 + 150), BRIGHTNESS)';

        this.ctx .beginPath();
        this.ctx .fillStyle = COL;
        this.ctx .font = SIZE + "px monospace";
        this.ctx .fillText(rotateChar.str, XP, YP);
        this.ctx .fill();
        this.ctx .closePath();
    };



    //定时器 或者帧动画的使用
    CharCanvas3D.prototype.timingFun = function(){
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
                window.setTimeout(func, 1000 / 60);
            }
    };


    $.fn.canvas3DPlugin = function(opts){
        return this.each(function(){
            return new CharCanvas3D(this,opts);
        })
    }
}(jQuery)






