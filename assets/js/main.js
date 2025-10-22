(function ($) {
  "use strict";
  /*-------------------------------------------
  preloader active
  --------------------------------------------- */
  jQuery(window).on("load", function () {
    jQuery(".preloader").fadeOut("slow");
  });

  $(window).on("scroll", function () {
    const scrolled = $(this).scrollTop() >= 300;
    $(".header-area").toggleClass("stick", scrolled);
  });

  jQuery(document).ready(function () {
    /*-------------------------------------------
    js scrollup
    --------------------------------------------- */
    $.scrollUp({
      scrollText: '<i class="fa fa-angle-up"></i>',
      easingType: "linear",
      scrollSpeed: 900,
      animation: "fade",
    });
    /*-------------------------------------------
      one page nave active
    --------------------------------------------- */
    $(function () {
      const $menuLinks = $('nav a');
      const headerHeight = $('header').outerHeight();
      $menuLinks.on('click', function (e) {
        e.preventDefault();

        const target = $(this.getAttribute('href'));
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - headerHeight
          }, 600, 'swing');
        }
        $menuLinks.removeClass('active');
        $(this).addClass('active');
      });
      $(window).on('scroll', function () {
        const scrollPos = $(window).scrollTop();

        $('section').each(function () {
          const top = $(this).offset().top - headerHeight - 1;
          const bottom = top + $(this).outerHeight();
          const id = $(this).attr('id');

          if (scrollPos >= top && scrollPos < bottom) {
            $menuLinks.removeClass('active');
            $menuLinks.filter('[href="#' + id + '"]').addClass('active');
          }
        });
      });
    });
  });
})(jQuery);
