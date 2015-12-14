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
    this.$headerSubmenu = this.$header.find('.m-header-submenu');
    this.$headerSubmenuBtns = this.$header.find('.m-header-submenu-btn');

    this.$submenuApps = this.$header.find('#submenuApps');

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
    this.$header.on('click', '.m-header-submenu-btn', this.showMenu.bind(this));
    this.$header.on('click', '.m-header-backdrop', this.hideSubmenus.bind(this));
  },

  showMenu: function(e) {
    if (!!this.params.mobile) {
      e && e.preventDefault();

      if (!$(e.currentTarget).hasClass('-active')) {
        this.hideSubmenus();
        this.$htmlbody.toggleClass('-no-scroll');
        $(e.currentTarget).toggleClass('-active').find('svg').toggle();
        $($(e.currentTarget).data('submenu')).toggleClass('-active');
      } else {
        this.hideSubmenus();
      }

    } 
  },

  hideSubmenus: function() {
    this.$htmlbody.removeClass('-no-scroll');
    this.$headerSubmenu.removeClass('-active');
    this.$headerSubmenuBtns.each(function(){
      if ($(this).hasClass('-active')) {
        $(this).removeClass('-active').find('svg').toggle();
      }
    });
  }
}