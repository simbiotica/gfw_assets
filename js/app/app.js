var app = {
  init: function(params) {
    this.params = params;
    
    // Setters
    this.setElements();
    this.setCurrent();
    this.setUrls();

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
    this.$links = $('#headerGFW a, #footerGFW a');
    this.$linksSubmenu = $('#submenuApps a');

    // Header
    this.$headerSubmenu = this.$header.find('.m-header-submenu');
    this.$headerSubmenuBtns = this.$header.find('.m-header-submenu-btn');


    // Footer
    this.$footerCarousel = this.$footer.find('#footerCarousel');
  },

  setCurrent: function() {
    this.$header.find(this.params.current).addClass('-current');
  },

  setUrls: function() {
    this.params.targets = false;
    switch(location.hostname) {
      case 'localhost':
        this.params.hostname = 'http://localhost:5000';
      break;

      case 'gfw-nav.herokuapp.com':
        this.params.hostname = 'http://gfw-nav.herokuapp.com'
      break;

      case 'www.globalforestwatch.org':
        this.params.hostname = 'http://www.globalforestwatch.org'
      break;

      default: 
        this.params.hostname = 'http://www.globalforestwatch.org'
        this.params.targets = true;
    }
    this.$links.each(function(k,v){
      var href = $(v).attr('href');
      if (href.charAt(0) == '/') {
        $(v).attr('href', this.params.hostname + href);
      }
    }.bind(this));

    this.$linksSubmenu.each(function(k,v){
      var external = $(v).hasClass('external-link');
      if (this.params.targets) {
        (!!external) ? $(v).removeAttr('target') : $(v).attr('target','_blank');
      }
    }.bind(this));

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