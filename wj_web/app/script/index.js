/**
 * Created by Administrator on 2017/2/17.
 */
$(function () {

    var  wordIndex = 0;//当前的单词数量;
    var audio = document.createElement("audio");

    new Particleground.particle( '.back' ,{  opacity: 1,
        maxSpeed: 1,
        minSpeed: 0.5,
        range: 0});
    addEvent();

    var setInt = window.setInterval(function(){
        if(wordIndex >= config.content1.dec.length){
            config.content1.dec.substr(0,wordIndex);
            clearInterval(setInt);
        }else {
            printString(config.content1.dec.substr(0,wordIndex),$('.dec'));
            wordIndex = wordIndex + 1;
        }
    },200);



    function audioplay(){
        if($('.suspend_Drag').is(':visible')){
            if(audio.paused){
                audio.play();
                $('.suspend_Drag').addClass("on");
            }else{
                audio.pause();
                $('.suspend_Drag').removeClass("on");
            }
        }
    }

    //监听事件
    function addEvent(){
        // audio.src = "resource/xintiao.mp3";
        // audio.loop  = true;
        // audio.addEventListener("canplaythrough",
        //     function() {
        //         $(".suspend_Drag").show().addClass("on");
        //         audio.play();
        //     },
        //     false);
        // audio.load();

        $('.suspend_Drag').on("click",audioplay);
        setTimeout(function(){
            $('.wrapContent1 .item').fadeIn(2000);
        },1000)
    }
    //打印
    function printString(orgStr,$ele){
        $ele.html(orgStr + "_");
    }

})