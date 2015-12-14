var loader = {

  urls: {
    header: 'https://cdn.rawgit.com/simbiotica/gfw_assets/29205eb50fe9b4a578f230614defa4724c4fff55/src/header.html',
    footer: 'https://cdn.rawgit.com/simbiotica/gfw_assets/b53f31b50a680476924a61f883376e14407b4c5c/src/footer.html',
    css: 'https://cdn.rawgit.com/simbiotica/gfw_assets/de63d92ae18e9d449474bd9ba614c259c14c21b5/css/build/global.css',
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

