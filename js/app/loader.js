var loaderGFW = {

  urls: {
    header: 'https://cdn.rawgit.com/simbiotica/gfw_assets/b61c67ad78492c3e9958cf9b03e6a057b890bde3/src/header.html',
    footer: 'https://cdn.rawgit.com/simbiotica/gfw_assets/bf34b7cc11c7a931e08493252de34cfdcf0924e7/src/footer.html',
    css: 'https://cdn.rawgit.com/simbiotica/gfw_assets/b398d18b2206e308f35a875c328807f052388a54/css/build/minified/global.css',
  },

  urls_dev: {
    header: 'http://localhost:8000/src/header.html',
    footer: 'http://localhost:8000/src/footer.html',
    css: 'http://localhost:8000/css/build/global.css',
  },

  init: function() {
    // Setters
    this.setElements();
    this.setParams({
      current: this.$script.data('current'),
    });
    this.setPromises()
    
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
    this.params = $.extend({}, this.params, obj)
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
      })
      this.printData();
      appGFW.init(this.params);
    }.bind(this));
  },

  // Print
  printData: function() {
    this.$head.append('<style>'+this.params.css+'</style>');
    this.$header.html(this.params.header).delay(100).show(0);
    this.$footer.html(this.params.footer).delay(100).show(0);
  },
}

$(document).ready(function(){
  loaderGFW.init();
})
