/**
 * Created by Administrator on 2017/2/6.
 * canvas绘制的刮刮乐效果
 * 奖品跟遮罩层可以选着不同的text或者image
 * 微信里面图片模糊图片擦除变成高清图片是一样的原理
 */
(function(){
    var ScratchCard = function(elem,options){
        this.options = $.extend(this.options,options);
        this.$ele = $(elem);
        this.isCanDraw = false;
        this.width = this.options.width || this.$ele.width();
        this.height =this.options.height || this.$ele.height();
        this.init();
    };
    ScratchCard.prototype.options = {
        fillContent:'gray',//刮刮层填充的颜色 或者图片,
        contentType:'image',//奖票的类型 文字还是图片,
        fillType:'color',//填充类型 图片还是颜色
        scratchContent:''//刮刮乐内容
    };
    /**
     * 初始化画布 矩形填充满
     */
    ScratchCard.prototype.init = function(){
        this.drawCanvas();

    };
    ScratchCard.prototype.drawCanvas = function(){
        this.background = this.background || document.createElement('canvas');
        this.background.style.cssText = "position: absolute;left:0px;top:0px";


        this.mask = this.mask || document.createElement('canvas');
        this.mask.style.cssText = "position: absolute;left:0px;top:0px";
        this.$ele.append(this.background,this.mask);

        this.maskCtx = this.mask.getContext('2d');

        if(this.options.contentType == "image"){
            var image = new Image();
            var self = this;
            image.onload = function(){
                self.width = this.width;
                self.height = this.height;
                self.resizeCanvas(self.background,this.width,this.height);
                self.background.getContext("2d").drawImage(this,0,0);
                self.drawMask();
            }
            image.src = this.options.scratchContent

            var backCtx = this.background.getContext("2d");
            this.resizeCanvas(this.background,this.width,this.height);
            backCtx.fillStyle = '#fff';
            backCtx.fillRect(0,0,this.width,this.height);
            backCtx.font = 'Bold 30 px Arial';
            backCtx.textAlign = "center";
            backCtx.fillStyle = "#f60";
            backCtx.fillText(this.options.scratchContent,this.width/2,this.height/2 - 15);
        }
    };
    /**
     * 画遮着
     */
    ScratchCard.prototype.drawMask = function(){
        this.resizeCanvas(this.mask,this.width,this.height);
        if(this.options.fillType == "color"){

            this.maskCtx.fillStyle = this.options.fillContent;
            this.maskCtx.fillRect(0,0,this.width,this.height);
            this.maskCtx.globalCompositeOperation = 'destination-out';//在源图像之外显示目标图像。只有源图像之外的目标图像部分会被显示，源图像是透明的。
            this.addListen();
        }else if(this.options.fillType == "image"){
            var maskImage = new Image();
            var self = this ;
            maskImage.onload = function(){
                self.maskCtx.drawImage(this,0,0);
                self.addListen();
                self.maskCtx.globalCompositeOperation = 'destination-out';//在源图像之外显示目标图像。只有源图像之外的目标图像部分会被显示，源图像是透明的。
            }
            maskImage.src = this.options.fillContent;
        }
    }
    /**
     * 监听鼠标的移动
     */
    ScratchCard.prototype.addListen = function(){
        this.mask.globalCompositeOperation = 'destination-out';
        this.mask.addEventListener("mousemove",this.moveHandle.bind(this),false);
        this.mask.addEventListener("mouseup",this.upHandle.bind(this),false);
        this.mask.addEventListener("mousedown",this.downHandle.bind(this),false);
        this.mask.addEventListener("mouseleave",this.upHandle.bind(this),false);

        // //移动端的处理
        // this.$ele.addEventListener('touchstart', eventDown,false);
        // this.$ele.addEventListener('touchend', eventUp,false);
        // this.$ele.addEventListener('touchmove', eventMove,false);

    }
//鼠标移动操作
    ScratchCard.prototype.moveHandle = function(e){
        e.preventDefault();
        if(this.isCanDraw){
            var bodyScorllLeft = $('body').scrollLeft(),
                documentScorllLeft = document.documentElement.scrollLeft,
                bodyScorllTop = $('body').scrollTop(),
                documentScorllTop = document.documentElement.scrollTop,
                elemLeft = this.$ele.offset().left,
                elemTop = this.$ele.offset().top,
                x = 0,
                y = 0;
            if(e.pageX || e.pageY){
                x = e.pageX;
                y = e.pageY;
            }else{
                x = e.clientX +  bodyScorllLeft + documentScorllLeft;
                y = e.clientY +  bodyScorllTop + documentScorllTop;
            }
            x = x - elemLeft;
            y  = y - elemTop;
            this.clearLayer(x,y);
        }
    }

    ScratchCard.prototype.upHandle = function(e){
        e.preventDefault();
        this.isCanDraw = false;

    };
    ScratchCard.prototype.downHandle = function(e){
        e.preventDefault();
        this.isCanDraw = true;
    };
    //刮图层
    ScratchCard.prototype.clearLayer = function(x,y){
        with(this.maskCtx){
            beginPath();
            arc(x, y, 15, 0, Math.PI * 2);
            // clearRect(x,y,15,15);
            fill();
            // closePath();
        }


    };
    //清空canvas
    ScratchCard.prototype.resizeCanvas = function(canvas, width, height){
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").clearRect(0,0,width,height);
    }

    $.fn.ScratchCardPlugin = function(options){
        return this.each(function(){
            return new ScratchCard(this,options)
        })
    }
})(jQuery)
