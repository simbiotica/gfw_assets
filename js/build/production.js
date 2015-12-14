// Load fonts
WebFontConfig = {
  google: { families: [ 'Fira+Sans:300,400,500:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})(); 


(function () {

  function loadScript(url, callback) {

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) { //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js", function () {
    //Zepto loaded
    loader.init();
  });

})();


// Google translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: '',
      includedLanguages: 'ar,es,en,fr,id,pt,ru,zh-CN,de,uk,ro,tr,it,hi,km',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'googleTranslate');
}

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
    switch(location.hostname) {
      case 'localhost':
        this.params.hostname = 'http://localhost:5000'
      break;

      case 'gfw-nav.herokuapp.com':
        this.params.hostname = 'http://gfw-nav.herokuapp.com'
      break;

      default: 
        this.params.hostname = 'http://www.globalforestwatch.org'
    }
    this.$links.each(function(k,v){
      var href = $(v).attr('href');
      if (href.charAt(0) == '/') {
        $(v).attr('href', this.params.hostname + href);
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
var loader = {

  urls: {
    header: '/src/header.html',
    footer: '/src/footer.html',
    css: '/css/build/minified/global.css',
    slick: 'http://cdn.jsdelivr.net/jquery.slick/1.3.15/slick.min.js',
    // translate: 'http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  },

  init: function() {
    // Setters
    this.setElements();
    this.setParams({
      current: this.$script.data('current'),
      mobile: ($(window).width() <= 850) ? true : false,
    });
    this.setPromises()
    
    // Get data
    this.getData();
    
  },

  // Setters
  setElements: function() {
    this.$script = $('#loader-gfw');
    this.$head   = $('head');
    this.$header = $('#headerGFW');
    this.$footer = $('#footerGFW');
  },

  setParams: function(obj) {
    this.params = $.extend({}, this.params, obj)
  },

  setPromises: function() {
    this.promises = [];
    $.each(this.urls, function(k,v){
      var deferred = new $.Deferred();
      $.ajax({
        url: v,
        success: function(data) {
          deferred.resolve(data);
        }
      });
      this.promises.push(deferred.promise());
    }.bind(this));
  },

  // Getters
  getData: function() {
    $.when.apply(null, this.promises).then(function(){
      var args = Array.prototype.slice.call(arguments);
      this.setParams({
        header: args[0],
        footer: args[1],
        css: args[2],
        slick: args[3]
      })
      this.printData();
      app.init(this.params);
    }.bind(this));
  },

  // Print
  printData: function() {
    this.$head.append('<style>'+this.params.css+'</style>');
    this.$head.append('<script>'+this.params.slick+'</script>');
    this.$header.html(this.params.header);
    this.$footer.html(this.params.footer);
  },
}

