(function ($) {
  const $window = $(window);

  const scrollIt = function () {
    const scroll = $window.scrollTop();
    const $body = $("body");

    // var rootStyle = getComputedStyle(document.documentElement);
    // var menuBarPlaceholderHeight = parseInt(
    // rootStyle
    // .getPropertyValue('--gallop--menu-bar-placeholder-height')
    // .replace(/\D/g, '')
    // );
    // const $html = $("html");

    if (scroll > 1) {
      $body.addClass("scrolled-1px");
    } else {
      $body.removeClass("scrolled-1px");
    }

    if (scroll > 100) {
      $body.addClass("sticky-menu");
    } else {
      $body.removeClass("sticky-menu");
      $body.removeClass("scrolled");
    }

    if (scroll > 300) {
      $body.addClass("sticky-menu-long");
      $body.addClass("scrolled");
    } else {
      $body.removeClass("sticky-menu-long");
    }
  };

  $window.scroll(scrollIt);
  window.onload = scrollIt;
  $window.resize(scrollIt);
})(jQuery);
