$(document).on('ready', function () {

  /*-------------------------------------------------------------------------------
    PRE LOADER
  -------------------------------------------------------------------------------*/

  $(window).load(function () {
    $('.preloader').fadeOut(1000);
  });

  /*-------------------------------------------------------------------------------
    jQuery Parallax
  -------------------------------------------------------------------------------*/

  function initParallax() {
    $('#home').parallax('50%', 0.3);

  }

  initParallax();

  /*-------------------------------------------------------------------------------
    LazyLoad
  -------------------------------------------------------------------------------*/

  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
    load_delay: 300
  });

  /*-------------------------------------------------------------------------------
    Back top
  -------------------------------------------------------------------------------*/

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.go-top').fadeIn(200);
    } else {
      $('.go-top').fadeOut(200);
    }
  });

  // Animate the scroll to top
  $('.go-top').click(function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 300);
  });

  function lazyBg() {
    const bgMap = [
      {
        url: './img/mobile/home-bg-mobile.jpg',
        breakpoint: 768
      },
      {
        url: './img/home-bg.jpg',
        breakpoint: Number.POSITIVE_INFINITY
      }
    ];

    for (let i = 0; i < bgMap.length; i++) {
      if($(this).width() < bgMap[i].breakpoint) {
        $('#home').attr({
          'data-was-processed': false,
          'data-bg': `url(${bgMap[i].url})`
        });

        new LazyLoad({
          elements_selector: '#home',
          load_delay: 300,
          data_bg: `url(${bgMap[i].url})`
        });

        break;
      }
    }
  }

  $(window).resize(lazyBg);
  lazyBg.call(window);
});

