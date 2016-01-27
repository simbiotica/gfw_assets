var menuGFW = {
  init: function(params) {
    this.cacheVars();
    // Choose the menu you want to render
    this.switchMenu();
    // Print it
    this.printMenu();
  },

  cacheVars: function() {
    this.$mobileMenu = $('#submenuMenuMobile');
  },

  switchMenu: function() {
    switch(location.hostname) {
      case 'localhost':
        this.menu = menujsonGFW['default'];
      break;

      case 'climate.globalforestwatch.org':
        this.menu = menujsonGFW['climate'];
      break;

      default:
        this.menu = menujsonGFW['default'];
    }
  },

  printMenu: function() {
    this.$mobileMenu.html(tmplGFW('mobileMenuTPL',{ menu: this.menu }));
  }
}