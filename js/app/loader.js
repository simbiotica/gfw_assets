(function() {

var loaderGFW = {
  urls: {
    header: 'https://cdn.rawgit.com/simbiotica/gfw_assets/acc5d4c6186dc19ac0faec3c41a27036989d1e56/src/header.html',
    footer: 'https://cdn.rawgit.com/simbiotica/gfw_assets/f6904182ffe20d63842bd8800ad01cc313555212/src/footer.html',
    css: 'https://cdn.rawgit.com/simbiotica/gfw_assets/14f21d4b37da3d766444339ba30e358558ccbab5/css/build/global.css',
  },

  urls_dev: {
    header: 'http://localhost:9000/src/header.html',
    footer: 'http://localhost:9000/src/footer.html',
    css: 'http://localhost:9000/css/build/global.css',
  },

  initialize: function() {
    // Setters
    this.setElements();
    this.setParams({
      current: this.$script.data('current'),
    });
    this.setPromises();

    // Get data
    this.getData();
  },

  // Setters
  setElements: function() {
    this.$script = $('#loader-gfw');
    this.$head   = $('head');
    this.$header = $('#headerGfw');
    this.$footer = $('#footerGfw');
  },

  setParams: function(obj) {
    this.params = $.extend({}, this.params, obj);
  },

  setPromises: function() {
    this.promises = [];
    // If you want to develop you should change this.urls => this.urls_dev
    // It may be better if we set this var by branches
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

  getData: function() {
    this.$header.hide(0);
    this.$footer.hide(0);
    $.when.apply(null, this.promises).then(function(){
      var args = Array.prototype.slice.call(arguments);
      this.setParams({
        header: args[0],
        footer: args[1],
        css: args[2],
      });
      this.printData();
      window.GFW.NavBar.Application.initialize(this.params);
    }.bind(this));
  },

  printData: function() {
    this.$head.append('<style>'+this.params.css+'</style>');
    this.$header.html(this.params.header).delay(100).show(0);
    this.$footer.html(this.params.footer).delay(100).show(0);
  },
};

$(document).ready(function(){
  loaderGFW.initialize();
});

})();
