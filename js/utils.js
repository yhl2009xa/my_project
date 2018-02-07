/**
 * Created by Administrator on 2016/11/9.
 * 常用事件与方法属性
 */
 var utils = {
     //检测鼠标的位置
     captureMosue:function(elem){
         var mouse = {x:0,y:0,event:null},
             body_scrollLeft = document.body.scrollLeft,
             elem_scrollLeft = document.documentElement.scrollLeft,
             body_scrollTop = document.body.scrollLeft,
             elem_scrollTop = document.documentElement.scrollLeft,
             offsetleft = elem.offsetLeft,
             offsetTop =elem.offsetTop;

         elem.addEventListener("mousemove",function(event){
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
             mouse.x  = x;
             mouse.y  = y;
             mouse.event = event;
         },false);
         return mouse ;
     },
//
}


if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
        return window.setTimeout(callback, 17 /*~ 1000/60*/);
    });
}

/**
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
if (!window.cancelRequestAnimationFrame) {
    window.cancelRequestAnimationFrame = (window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}