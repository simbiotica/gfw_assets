window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

gfw.myGFW = gfw.myGFW || {};

var User = gfw.myGFW.User = {
  isLoggedIn: function() {
    return $.ajax({
      dataType: "json",
      url: 'http://localhost:8080/user',
      crossDomain: true,
      xhrFields: {withCredentials: true}
    });
  }
};

})(window.GFW.NavBar);
