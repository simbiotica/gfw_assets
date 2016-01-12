window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

  gfw.Utils = gfw.Utils || {};

  var DEFAULT_URL = 'www.globalforestwatch.org';
  var URLS = {
    'www.globalforestwatch.org': 'www.globalforestwatch.org',
    'localhost': 'localhost:5000',
    'gfw-nav.herokuapp.com': 'gfw-nav.herokuapp.com',
    'staging.globalforestwatch.org': 'staging.globalforestwatch.org'
  };

  var API_URLS = {
    'localhost': 'localhost:8080',
    'www.globalforestwatch.org': 'api.globalforestwatch.org'
  };

  gfw.Utils.getHost = function() {
    var currentLocation = window.location.hostname;
    if (URLS[currentLocation] === undefined) {
      currentLocation = DEFAULT_URL;
    }

    return 'http://' + URLS[currentLocation];
  };

  gfw.Utils.isDefaultHost = function() {
    var currentLocation = window.location.hostname;
    return (URLS[currentLocation] === undefined);
  };

  gfw.Utils.getAPIHost = function() {
    if (window.gfw && window.gfw.config) {
      return window.gfw.config.GFW_API_HOST;
    }

    var currentLocation = window.location.hostname;
    if (API_URLS[curentLocation] === undefined) {
      currentLocation = DEFAULT_URL;
    }

    return 'http://' + API_URLS[currentLocation];
  };

})(window.GFW.NavBar);
