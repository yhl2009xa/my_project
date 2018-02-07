/**
 * Created by Administrator on 2017/2/23.
 * canvas绘制粒子效果
 * 1 绘制N个随机的点（圆形或者方形）
 * 3 添加动态连接点一次电周围的都连线
 * 4 双重循环遍历每个点  当其他点与该店的 距离不超过某个值事时 画一条链接两点的线
 * 5 监听鼠标的移动 将此点作为连接点
 */

!function(){

    var particle = function (elem,opts) {
        this.$ele = $(elem);
        this.praticlesArr = [];//存放所有节点的数组
        this.options = $.extend(this.options,opts);
        this.timingFun();
        this.init();
        this.addEvent();
    };
    particle.prototype.options = {
        numbers:99,//粒子的个数
        color:"0,0,0",//粒子的颜色
        radius:2,//粒子的半径
        speed:1,//粒子每次移动的最大速度
        opacity:1,
        maxConnectRange:6400,
        isConnect:true
    };
    particle.prototype.init = function(){
        var canvasWidth = this.$ele.width();
        var canvasHeight = this.$ele.height();
        this.$canvas_Dom = $('<canvas/>',{
            style:{
                "position":"absolute",
                "left":"0px",
                "top":"0px",
            }
        }).appendTo(this.$ele).attr("width",canvasWidth).attr("height",canvasHeight);
        this.randomData();

        setTimeout(this.drawParticle.bind(this),200);
    };
    //生成随机的节点
    particle.prototype.randomData = function(){
        for(var index = 0 ;index < this.options.numbers;index++){
            var particleObj = new Object();
            particleObj._x = Math.random()*this.$ele.width();
            particleObj._xTo = this.options.speed + 2 * Math.random() -1;
            particleObj._y = Math.random()*this.$ele.height();
            particleObj._yTo = this.options.speed + 2 * Math.random() -1;
            particleObj.maxCR = this.options.maxConnectRange;
            particleObj._color = this.options.color;
            particleObj.radius = this.options.radius;
            particleObj._opacity = this.options.opacity;
            this.praticlesArr.push(particleObj);
        }
        if(this.options.isConnect){
            this.currentPraticles = {_x:null,_y:null,maxCR:10000};//默认的连接点
            this.praticlesArrAdd = this.praticlesArr.concat([this.currentPraticles]);
        }else{
            this.praticlesArrAdd = this.praticlesArr;
        }
    };
    //绘制粒子
    particle.prototype.drawParticle = function(){
        var context = this.$ele.find("canvas").get(0).getContext("2d"),
            canvasWidth=this.$ele.width(),
            canvasHeight = this.$ele.height();
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        this.praticlesArr.forEach(function(obj,index){
            obj._x =  obj._x + obj._xTo;
            obj._y =  obj._y + obj._yTo;

            //遇到超出边界就反弹
            obj._xTo *= (obj._x > canvasWidth || obj._x < 0) ? -1: 1;
            obj._yTo *= (obj._y > canvasHeight || obj._y < 0)? -1: 1;
            context.beginPath();
            // context.strokeStyle = obj.color ;
            context.fillStyle = "rgba(" + obj._color +  "," + obj._opacity + ")";
            context.arc(obj._x,obj._y,obj.radius,0 ,2*Math.PI,false);
            context.fill();
            for(var z_index = index +1 ;z_index < this.praticlesArrAdd.length ;z_index ++){
                var eObj = this.praticlesArrAdd[z_index];
                if(eObj._x == null || eObj._y == null){
                    continue;
                }

                  var  dist = Math.pow((eObj._x - obj._x),2) + Math.pow((eObj._y - obj._y),2);
                if(dist < eObj.maxCR){
                    //大于1/2 加速
                    context.beginPath();
                    context.strokeStyle = this.options.color;
                    context.lineWidth = 0.5,
                    context.moveTo(eObj._x,eObj._y);
                    context.lineTo(obj._x,obj._y);
                    context.stroke();
                    //当超出时将其拉回在指定范围内 这里拉的速度要比步长的速度快
                    if(dist >= eObj.maxCR/2 && eObj ===  this.currentPraticles){
                        obj._x = obj._x - (obj._x - eObj._x > 0 ? 0.01*Math.random() + Math.abs(obj._xTo):-(0.01*Math.random() + Math.abs(obj._xTo)));
                        obj._y = obj._y - (obj._y - eObj._y > 0 ? 0.01*Math.random() + Math.abs(obj._yTo):-(0.01*Math.random() + Math.abs(obj._yTo)));
                        console.log(obj._x + "..........." +obj._y );
                    }
                }
            }
        }.bind(this));
        window.requestAnimationFrame(this.drawParticle.bind(this));
    };

    //定时器 或者帧动画的使用
    particle.prototype.timingFun = function(){
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
                window.setTimeout(func, 1000 / 60);
            }
    };
    //设置canvas的高宽
    particle.prototype.set_canvas_size = function() {
        this.$canvas_Dom.attr("width",this.$ele.width()).attr("height",this.$ele.height());

    };
    particle.prototype.addEvent = function() {
        this.captureMosue(this.$canvas_Dom);
        window.onresize = this.set_canvas_size.bind(this);

    };
    particle.prototype.captureMosue = function(elem){
        var body_scrollLeft = document.body.scrollLeft,
            elem_scrollLeft = document.documentElement.scrollLeft,
            body_scrollTop = document.body.scrollLeft,
            elem_scrollTop = document.documentElement.scrollLeft,
            offsetleft = elem.offset().left,
            offsetTop =elem.offset().top;

        elem.on("mousemove",function(event){
            var x ,y;
            if(event.pageX || event.pageY){
                x = event.pageX;
                y = event.pageY;
            }else{
                x = event.clientX + body_scrollLeft + elem_scrollLeft;
                y = event.clientY + body_scrollTop + elem_scrollTop;
            }
            x -= offsetleft;
            y -= offsetTop;
            this.currentPraticles._x  = x;
            this.currentPraticles._y  = y;
        }.bind(this));
        elem.on("mouseout",function(event){
            this.currentPraticles._x  = null;
            this.currentPraticles._y  = null;
        }.bind(this));

    }


    $.fn.particlePlugin = function(opts){
        return this.each(function(){
            return new particle(this,opts);
        })
    }
}(jQuery)