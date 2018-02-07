/**
 * Created by Administrator on 2016/11/9.
 * 水波纹效果
 * 点击后添加样式
 */
(function(){
    var waveCanvas = function(elem,options){
        this.$elem = $(elem);
        this._addEvent();
    };


    //监听事件
    waveCanvas.prototype._addEvent = function(){
        this.$elem.on("click",this.clickHandle.bind(this));
    };

    //处理元素的点击事件
    waveCanvas.prototype.clickHandle = function(event){
        var $dom = $(event.currentTarget);
        $dom.find(".wave_ripple").remove();

        var x = event.pageX;
        var y = event.pageY;

        var radius = Math.max(this.$elem.width(),this.$elem.height());
        var $ripple = $('<div></div>').css({width:radius,height:radius});

        $ripple.appendTo(this.$elem).css({
            left: x -  radius/2,
            top: y -  radius/2,
        }).addClass("wave_ripple")
    }

    $.fn.WaterWavePlugin = function(options){
        return this.each(function(){
            return new waveCanvas(this,options);
        })

    };
})(jQuery)