$(function(){

  // 반응형 gnb처리
  $('.btn-gnb-mo').click(function(){
    $('.gnb').toggle();
  })

  $(window).resize(function(){
    let windowWidth = $(window).width()
    
    if(windowWidth > 1100) {   
      // PC에서 실행할 화면     
      $('.gnb-item').off();
      $('.gnb').show().find('.gnb-item').removeClass('active').find('.sub-list').hide();

      $('.gnb-item').mouseover(function(e){
        e.preventDefault();
        $(this).addClass('active');
        $('.gnb-item').find('.sub-list').show();
      })
      $('.gnb-item').mouseout(function(e){
        e.preventDefault();
        $(this).removeClass('active');
        $('.gnb-item').find('.sub-list').hide();
      })
    } else {
      // 모바일에서 실행할 화면
      $('.gnb-item').off();
      $('.gnb').hide();
      
      $('.gnb-item').click(function(e){
        e.preventDefault();
        if($(this).hasClass('active')){
          $(this).removeClass('active').find('.sub-list').stop().slideUp();
        } else {
          $('.gnb-item').removeClass('active').find('.sub-list').stop().slideUp();
          $(this).addClass('active').find('.sub-list').stop().slideDown();
        }
      })
    }
    
  })
  $(window).resize();
  
  // 버튼누르면 컨텐츠 보여주기 
  $('.sc-visual .pagination button').click(function(){
    target = $(this).data('target');

    if(!$(this).hasClass('active')) {
      $('.sc-visual .pagination button').removeClass('active');
      $(this).addClass('active');
      $(target).addClass('active').siblings().removeClass('active');
    }
  })


  // 이벤트 슬라이드
  var swiper = new Swiper(".event-slide", {
    loop: true,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
  });

  // const eventList = $('.sc-event .slide .slide-list');
  // const eventItem = $('.sc-event .slide .slide-item');
  // const eventWidth = eventItem.width();

  // let eventIndex = 0;

  // $('.sc-event .slide .next').click(function(){
  //   $('.sc-event .slide .prev').show();
  //   if(eventIndex < eventItem.length-1) {
  //     eventIndex++;
  //     eventList.css({ left: `${eventIndex * -eventWidth}px` });
  //     if(eventIndex == eventItem.length-1) {
  //       $(this).hide();
  //     } else {
  //       $('.sc-event .slide .prev').show();
  //     }
  //   }
  // })

  // $('.sc-event .slide .prev').click(function(){
  //   if(eventIndex > 0) {
  //     eventIndex--;
  //     eventList.css({ left: `${eventIndex * -eventWidth}px` });
  //     if(eventIndex == 0) {
  //       $(this).hide();
  //     } else {
  //       $('.sc-event .slide .next').show();
  //     }
  //   }
  // })


  // 배너 슬라이드
  const bannerList = $('.sc-sponbanner .slide .slide-list');
  const bannerItem = $('.sc-sponbanner .slide .slide-item');
  const bannerCount = bannerItem.length;
  const bannerGap = 18;
  const bannerWidth = bannerItem.width();
  const bannerPrev = $('.sc-sponbanner .slide .prev');
  const bannerNext = $('.sc-sponbanner .slide .next');
  let bannerIndex = 0;

  makeClone();

  bannerNext.click(function(){
    moveItem(bannerIndex + 1);
  });

  bannerPrev.click(function(){
    moveItem(bannerIndex - 1);
  });

  function makeClone(){
    bannerItem.each(function(idx){
      cloneItem = bannerItem.eq(idx).clone(true);
      cloneItem.addClass('clone');
      bannerList.append(cloneItem);
    })
    for(let i=bannerCount; i>=0; i--){
      cloneItem = bannerItem.eq(i).clone(true);
      cloneItem.addClass('clone');
      bannerList.prepend(cloneItem);
    }
    updateWidth();
    setInitPos();
    bannerList.addClass('animate');
  }

  function updateWidth(){
    currentItem = $('.sc-sponbanner .slide .slide-item');
    newItemCount = currentItem.length;
    newWidth = (bannerWidth + bannerGap) * newItemCount - bannerGap + 'px';
    bannerList.width(newWidth);
  }

  function setInitPos(){
    initTranslate = -(bannerWidth + bannerGap) * bannerCount;

    bannerList.css({ transform: 'translateX('+ initTranslate +'px)' });
  }

  function moveItem(num) {
    bannerList.css({ left: -num * (bannerWidth + bannerGap) + 'px' });
    bannerIndex = num;
    if(bannerIndex == bannerCount || bannerIndex == -bannerCount) {
      setTimeout(function(){
        bannerList.removeClass('animate');
        bannerList.css({ left: '0' });
        bannerIndex = 0;
      }, 200);
      setTimeout(function(){
        bannerList.addClass('animate');
      }, 300);
    }
  }

})
