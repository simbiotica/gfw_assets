window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

gfw.menuGFW = {
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
        this.menu = gfw.menujsonGFW['default'];
      break;

      case 'climate.globalforestwatch.org':
        this.menu = gfw.menujsonGFW['climate'];
      break;

      // These don't exist yet
      case 'howto.globalforestwatch.org':
        this.menu = gfw.menujsonGFW['howto'];
      break;

      case 'mapbuilder.globalforestwatch.org':
        this.menu = gfw.menujsonGFW['atlas'];
      break;

      // STAGING SITES:
      // We have a problem with the jekyll apps, at least at staging:
      // The hostname is always the same 'vizzuality.github.io', so we can't set the menu by hostname
      // We are going to use another function to set the menu by path
      case 'vizzuality.github.io':
        this.menu = this.getStagingMenu();
      break;

      default: 
        this.menu = gfw.menujsonGFW['default'];
    }
  },

  printMenu: function() {
    this.$mobileMenu.html(tmplGFW('mobileMenuTPL',{ menu: this.menu }));
  },

  getStagingMenu: function() {
    switch(location.pathname) {
      case '/gfw-howto':
        return gfw.menujsonGFW['howto'];
      break;
      case '/gfw-atlas':
        return gfw.menujsonGFW['atlas'];
      break;
      default: 
        return gfw.menujsonGFW['howto'];
    }
  }
}

})(window.GFW.NavBar);
