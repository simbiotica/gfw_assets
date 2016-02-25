window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

gfw.Application = {
  initialize: function(params) {
    this.params = params;

    // Setters
    this.setElements();
    this.setCurrent();
    this.setUrls();

    // Inits
    this.initTranslate();
    this.initEvents();
    this.initFeedback();
    this.initMyGFW();
    this.initMobileMenu();

    $(document).ready(this.initLogos.bind(this));

    // resize function
    $(window).on('resize', this.setMobileParam.bind(this));
    this.setMobileParam({
      mobile: ($(window).width() <= 850) ? true : false,
    });
  },

  // Setters
  setElements: function() {
    this.$head = $('head');
    this.$htmlbody = $('html,body');
    this.$header = $('#headerGfw');
    this.$footer = $('#footerGfw');
    this.$links = $('#headerGfw a, #footerGfw a');
    this.$linksSubmenu = $('#submenuApps a');

    // Header
    this.$headerSubmenu = this.$header.find('.m-header-submenu');
    this.$headerSubmenuBtns = this.$header.find('.m-header-submenu-btn');

    // Footer
    this.$footerCarousel = this.$footer.find('#footerCarousel');

    // My GFW
    this.$toggleMyGFW = this.$header.find('#toggleMyGFW');
  },

  setCurrent: function() {
    this.$header.find(this.params.current).addClass('-current');
  },

  setUrls: function() {
    this.params.targets = !gfw.Utils.isDefaultHost();
    this.params.hostname = gfw.Utils.getHost();

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

  setParams: function(obj) {
    this.params = $.extend({}, this.params, obj);
  },

  setMobileParam: function() {
    this.setParams({
      mobile: ($(window).width() <= 850) ? true : false,
    });
  },

  // Inits
  initTranslate: function() {
    this.$head.append('<script type="text/javascript" src="http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>');
  },

  initEvents: function() {
    this.$header.on('click', '.m-header-submenu-btn', this.showMenus.bind(this));
    this.$header.on('click', '.m-header-backdrop', this.hideMenus.bind(this));
  },

  initFeedback: function() {
    gfw.feedbackModal.init();
  },

  initMyGFW: function() {
    var containerEl = document.getElementById('my-gfw-container');

    if (gfw.Utils.isDefaultHost() === true) {
      var loginButton = new gfw.myGFW.LoginButton({
        el: containerEl});
      loginButton.render();
    } else {
      containerEl.style.display = 'none';
    }
  },

  initMobileMenu: function() {
    gfw.menuGFW.init();
  },

  // Events related to UI
  showMenus: function(e) {
    if (!!this.params.mobile) {
      e && e.preventDefault();

      if (!$(e.currentTarget).hasClass('-active')) {
        this.hideMenus();
        this.$htmlbody.toggleClass('-no-scroll');
        $(e.currentTarget).toggleClass('-active').find('svg').toggle();
        $($(e.currentTarget).data('submenu')).toggleClass('-active');
      } else {
        this.hideMenus();
      }
    } else {
      if ($(e.currentTarget).data('stopnavigation')) {
        e && e.preventDefault();
      }
    }
  },

  hideMenus: function() {
    this.$htmlbody.removeClass('-no-scroll');
    this.$headerSubmenu.removeClass('-active');
    this.$headerSubmenuBtns.each(function(){
      if ($(this).hasClass('-active')) {
        $(this).removeClass('-active').find('svg').toggle();
      }
    });
  },

  initLogos: function() {
    var sliderEl = document.querySelector('#my-gfw-slider'),
        sliderTimer;

    var cancelTimer = function() { clearInterval(sliderTimer); };
    var nextEl = sliderEl.getElementsByClassName('js_next')[0],
        prevEl = sliderEl.getElementsByClassName('js_prev')[0];
    nextEl.addEventListener('click', cancelTimer);
    prevEl.addEventListener('click', cancelTimer);

    var slider = window.lory.lory(sliderEl, {
      infinite: 5,
      slidesToScroll: 1,
      slideSpeed: 500
    });

    sliderTimer = setInterval(slider.next.bind(slider), 3000);
  },
};

})(window.GFW.NavBar);
