var app = {
  init: function(params) {
    this.params = params;
    // Setters
    this.setElements();
    this.setCurrent();

    // Inits
    this.initSlick();
    this.initTranslate();
    this.initEvents();
  },

  // Setters
  setElements: function() {
    this.$head = $('head');
    this.$htmlbody = $('html,body');
    this.$header = $('#headerGFW');
    this.$footer = $('#footerGFW');

    // Header
    this.$btnSubmenuApps = this.$header.find('#btnSubmenuApps');
    this.$submenuApps = this.$header.find('#submenuApps');

    this.$btnSubmenuHome = this.$header.find('#btnSubmenuHome');
    this.$submenuHome = this.$header.find('#submenuHome');

    // Footer
    this.$footerCarousel = this.$footer.find('#footerCarousel');
  },

  setCurrent: function() {
    this.$submenuApps.find(this.params.current).addClass('-current');
  },

  // Inits
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
  },

  initEvents: function() {
    this.$header.on('click', '#btnSubmenuHome', this.toogleHomeMenu.bind(this));
    this.$header.on('click', '#btnSubmenuApps', this.toogleAppsMenu.bind(this));
  },

  // Toggles
  toogleHomeMenu: function(e) {
    if (!!this.params.mobile) {
      e && e.preventDefault();
      this.$htmlbody.toggleClass('-no-scroll');
      this.$submenuHome.toggleClass('-active');
      this.$btnSubmenuHome.toggleClass('-active').find('svg').toggle();

    }
  },

  toogleAppsMenu: function(e) {
    if (!!this.params.mobile) {
      e && e.preventDefault();
      this.$htmlbody.toggleClass('-no-scroll');
      this.$submenuApps.toggleClass('-active');
      this.$btnSubmenuApps.toggleClass('-active').find('svg').toggle();

    } 
  },
}