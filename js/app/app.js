var app = {
  init: function(params) {
    this.params = params;
    this.setElements();
    this.setCurrent();
    this.initSlick();
    this.initTranslate();
  },

  // Setters
  setElements: function() {
    this.$head = $('head');
    this.$submenuApps = $('#submenuApps');
    this.$footerCarousel = $('#footerCarousel');
  },

  setCurrent: function() {
    this.$submenuApps.find(this.params.current).addClass('-current');
  },

  initSlick: function() {
    this.$footerCarousel.slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slide: 'li'
    });    
  },

  initTranslate: function() {
    this.$head.append('<script type="text/javascript" src="http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>');
  }
}