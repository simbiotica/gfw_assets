(function() {

var loaderGFW = {
  urls: {
    header: 'https://cdn.rawgit.com/simbiotica/gfw_assets/ff2ba884c4e09b626c03b1287b946665c9e7a36e/src/header.html',
    footer: 'https://cdn.rawgit.com/simbiotica/gfw_assets/7716f05c7cf320427b1ccb8f61458b8d296487c8/src/footer.html',
    css: 'https://cdn.rawgit.com/simbiotica/gfw_assets/14da456802ffb9139584bbf92a72fda735a9ef0e/css/build/global.css',
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
    $.each(this.urls_dev, function(k,v){
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
    }.bind(this));
  },

  // Print
  printData: function() {
    this.$head.append('<style>'+this.params.css+'</style>');
    setTimeout(function(){
      this.$header.html(this.params.header).show(0);
      this.$footer.html(this.params.footer).show(0);
      window.GFW.NavBar.Application.initialize(this.params);
    }.bind(this), 250)
  },
};

$(document).ready(function(){
  loaderGFW.initialize();
});

})();
