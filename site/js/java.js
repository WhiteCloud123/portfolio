window.addEventListener('scroll',()=>{
  const header=document.querySelector('header');
  if(scrollY>0){
    header.classList.add('fix');
  }else{
    header.classList.remove('fix');
  }
})

$(function(){
  $('header #toggle').click(function(){
    $(this).css({'display':'none'})
    $('header .s_menu').css({'display':'block','display':'flex'})
  })
  $('header #close').click(()=>{
    $('header #toggle').css({'display':'block'})
    $('header .s_menu').css({'display':'none'})
  })
  $('header .btn_s_menu').click(function(){
    if($(this).next('ul').hasClass('list_down')){
      $(this).next('ul').removeClass('list_down')
    }else{
      $('header .btn_s_menu').next('ul').removeClass('list_down')
      $(this).next('ul').addClass('list_down')
    }
  })
  
  const page = $('.b_spans span');
  const banner=$('.banner img');
  const num=$('.b_number');
  // $('.banners2').css('width','calc(100%*3)')
  let a=0;
  page.click(function(){
    page.removeClass('black')
    $(this).addClass('black')
    a=$(this).index()
    $('.b_number>span').text(a+1)
    $('.banners').children('img').fadeOut();
    $('.banners').children('img').eq(a).fadeIn();
    $('.banners2').children('img').fadeOut();
    $('.banners2').children('img').eq(a).fadeIn();
    if($('#play').css("display")=="none"){
      clearInterval(bannerSlide);
      bannerSlide=setInterval(banner_move,4000);
    }
  })
  $('#stop').click(function(){
    $(this).css('display','none')
    $('#play').css('display','block')
    clearInterval(bannerSlide);
  })
  $('#play').click(function(){
    $(this).css('display','none')
    $('#stop').css('display','block')
    bannerSlide=setInterval(banner_move,4000);
  })
  let bannerSlide=setInterval(banner_move,4000);
  function banner_move(){
    a++;
    if(a>=3){a=0;}
    page.removeClass('black')
    page.eq(a).addClass('black')
    $('.b_number>span').text(a+1)
    $('.banners').children('img').fadeOut();
    $('.banners').children('img').eq(a).fadeIn();
    $('.banners2').children('img').fadeOut();
    $('.banners2').children('img').eq(a).fadeIn();
  }
  


  const story=$('.story_menu>div');
  story.click(function(){
    story.removeClass('on')
    $(this).addClass('on')
  })
  $('.story_menu>.all').click(()=>{
    $('.story_main').css('display','none')
    $('.storyall').css({'display':'block','display':'flex'})
  })
  $('.story_menu>.us').click(()=>{
    $('.story_main').css('display','none')
    $('.story_us').css({'display':'block','display':'flex'})
  })
  $('.story_menu>.people').click(()=>{
    $('.story_main').css('display','none')
    $('.story_people').css({'display':'block','display':'flex'})
  })
  $('.story_menu>.menu').click(()=>{
    $('.story_main').css('display','none')
    $('.story_menu2').css({'display':'block','display':'flex'})
  })
  
  $('.story_main>div').mouseenter(function(){
    let cat_num=Math.floor(Math.random()*4);
    $(this).children('img').eq(cat_num).css('display','block')
  })
  $('.story_main>div').mouseleave(function(){
    $(this).children('img').css('display','none')
  })
  
  $('#top_button').click(()=>{
    $('html,body').animate({scrollTop:0},400)
  })
})

