$(document).ready(function(){
   /*slider*/
	$('#slider-code').tinycarousel({ pager: true, interval: true, intervaltime: 10000, duration: 500, controls: true });

	$(".pagenum").bind("click", function(){
     var rel = $(this).attr('rel');
     $(this).addClass('active');
    });
    
    /*отключаем на переход по ссылкам-картинкам в слайдере*/
    $(".sl_img").bind("click", function(){return false;});
   /*end slider*/
   
   /*head-menu -> .activo*/
   $("#head-menu .act").css({overflow:'visible'})
   .append("<div class='hoverDiv'><div class='activo'></div></div>");
   var wA = $(".act a").width();
   $(".activo").css({width:wA+'px'});

  /*script's for page1.html*/
  $(".token").hover(function(){
    $(this).stop().animate({marginTop:-8},300);
  },
  function(){
    $(this).stop().animate({marginTop:0}, 600, 'easeOutBounce');
  });


  $(window).scroll(function(e){
   /* s = величина отступа окна от верха страницы*/
   var s = $(this).scrollTop();
   
    if ( s >= 136 ){
      $(".blackJack").css('display', 'block');
      $("#topIcon").css({marginTop:0,top:0,position:'fixed',padding: "20px 0px 15px 0"});
      $("#topIcon .botgrad").css({bottom: '-39px' });
      $('.backToTopOfPage').fadeIn(300);
      $("#topIcon li p").each(function(){
       $(this).stop().animate({top:30},300);
      }); 
      $(".token").stop().animate({width: 70,left: 10},300);
    }
    else if ( s < 136 ){ 
    	$('.backToTopOfPage').fadeOut(300);
      $(".blackJack").css('display', 'none');
      $("#topIcon").css({marginTop:"80px",position:'static',padding: 0});
      $("#topIcon .botgrad").css({bottom: '-69px' });
      $("#topIcon li p").each(function(){
       $(this).stop().animate({top:60},300);
      }); 
      $(".token").stop().animate({width: 96,left: 0},300);      
    }
    else { }
    
    $("#work > li").each(function(){
      var topW = $(window).height()/2;
       if(($(this).offset().top-$(window).scrollTop())<topW&&($(this).offset().top-$(window).scrollTop())>0){
        $("#work li.activeOpacity").removeClass("activeOpacity");
        $(this).addClass("activeOpacity");
       }
    });
    
  });
  
  $("#topIcon .token").bind("click", function(){
   var ind = $(this).parent('li').index(),
       liW = $("#work li").eq(ind).offset().top-300;
         
   $("html, body").stop().animate({
    scrollTop: (liW)+'px'
   }, 800, 'easeOutCubic');
  });

  
  
  /*new script (popup -> video -> (youtube~mediaget) = popy)*/
  var wh = $(window).height();
  $("li p .tele a").bind("click", function(e){
     e.preventDefault();
     var ti = $(this).parents('li').index(),
         obj = '<object width="600" height="410">';
         obj += '<param name="movie" value="' + $(this).attr('href') + '&fs=1"></param>';
         obj += '<param name="allowFullScreen" value="true"></param>';
         obj += '<param name="wmode" value="opaque" /> ';
         obj += '<embed src="' + $(this).attr('href') + '&fs=1"';
         obj += 'type="application/x-shockwave-flash"';
         obj += 'allowfullscreen="true"';
         obj += 'width="600" height="410" wmode="transparent">';         
         obj += '</embed></object>';
      $(".popy").css({display:'block'});console.log(obj);
      $(".popy .videohere").html(obj);
      $(".popy .videohere").css('top','0px')
  });
  
  /*centering .popy div|iframe*/
  $(".popy div").css({ top: (wh/2 - 200)+'px' });
  $(window).resize(function(){
    var wh = $(this).height();
     $(".popy div").css({ top: wh/2 - $(".popy div").height()/2 });
  });
  
  /*close popy*/
  $('.popy div span').bind('click', function(){
    $('.popy div iframe').attr('src','');
     $('.popy').css({display:'none'});
      return false;
  });
  
  
});

function backToTopOfPage(){
	$("html, body").stop().animate({
    	scrollTop: (0)+'px'
   }, 1000, 'easeOutCubic',function(){$('.backToTopOfPage').fadeOut(300)});
}