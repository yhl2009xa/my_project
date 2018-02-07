/**
 * Created by lhy on 2016/11/29.
 */
var slider = function(elem,options){
    this.$elem = $(elem)
    this.options = $.extend(options,this.defaultOptions);
    //上层容器
    this.topContainer ;
    //下层缩略图
    this.botttomContainer;
    this.initContainer(this.options);
    this.allImgArr = [];
}


//初始化容器
slider.prototype.initContainer = function(opts){
    var wrap = this.$elem.addClass('slider_wrap');
    var topContainer = $('<div class="slider_topContainer"></div>');
    wrap.wrapInner('<div class="slide_src"></div>').wrapInner(topContainer);

    //内容
    var target = $('<div class="slider_target"></div>');
    topContainer.append(target);
    
    if(opts.navigation){
        topContainer.append('<div class="slider_prev"></div>').append('<div class="slider_prev"></div>');
    }
    if(opts.thumbnails){
        wrap.append('<div class="slider_bottom"><div class="slider_thumbnails_content"></div></div>');
    }

    var allImgArr = new Array();
    var allThumbs = new Array();
    
    $('> div',$('slide_src',this.$elem)).each(function(){
        allImgArr.push($(this).data("src"));
        if($(this).data('thumb')){
            allThumbs.push($(this).data("thumb"));
        }else{
            allThumbs.push('');
        }
    })


    var targetContent = $('<div class="slider_target_content" />');
    target.append('targetContent');

    for (var loop=0;loop < allImgArr.length ; loop++)
    {
        targetContent.append('<div class="cameraSlide cameraSlide_'+loop+'" />');
    }

}



//初始化大图
slider.prototype.initBigPic = function(){
    var $thumbs_content = $('.slider_bottom .slider_thumbnails_content',this.$elem);
    var thumbs_wrap = $('<ul></ul>');
    $.each(allThumbs,function(i,val){
        var newImg = new Image();
        newImg.src = this.allImgArr[i];
        thumbs_wrap.wrapInner('<li class="pix_thumb_' +i+'"></li>').appned($(newImg).attr("class","slider_thumbs_img"));

    })
}

//初始化缩略图
slider.prototype.initThumbnail = function(){
    var $thumbs_content = $('.slider_bottom .slider_thumbnails_content',this.$elem);
    var thumbs_wrap = $('<ul></ul>');
    $.each(allThumbs,function(i,val){
        var newImg = new Image();
        newImg.src = this.allImgArr[i];
        thumbs_wrap.wrapInner('<li class="pix_thumb_' +i+'"></li>').appned($(newImg).attr("class","slider_thumbs_img"));

    })
}
//显示缩略图
slider.prototype.thumbnailVisible = function(){
    var thumWidth = $('.slider_bottom',this.elem).width();

    $('slide_src > div ',this.$elem).each(function(){
        if($(this).data('thumb')){
            allThumbs.push($(this).data("thumb"));
        }else{
            allThumbs.push('');
        }
    })
}


slider.prototype.defaultOptions = {
    navigation:true,//显示导航按钮
    thumbnails:true,//是否显示缩略图
}