window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

gfw.myGFW = gfw.myGFW || {};

var LoginButton = gfw.myGFW.LoginButton = function(options) {
  this.el = options.el || document.createElement('div');
  this.checkStatus();
};

LoginButton.prototype.render = function() {
  var id;
  if (this.loggedIn === true) {
    id = 'my-gfw-menu-loggedin-template';
  } else {
    id = 'my-gfw-menu-loggedout-template';
  }

  var template = document.getElementById(id).innerHTML;
  this.el.innerHTML = template;
  this.delegateEvents();

  return this;
};

LoginButton.prototype.checkStatus = function() {
  var context = this;
  gfw.myGFW.User.isLoggedIn({
    success: function() {
      context.loggedIn = true;
      context.render();
    },
    failure: function() {
      context.loggedIn = false;
      context.render();
    }
  });
};

LoginButton.prototype.showModal = function() {
  var modalView = new gfw.myGFW.LoginModal({
    el: document.getElementById('my-gfw-modal')});
};

LoginButton.prototype.signOut = function() {
  document.cookie = "_eauth=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  location.reload();
};

LoginButton.prototype.delegateEvents = function() {
  var openModal = document.getElementById('my-gfw-open-modal');
  if (openModal !== null) {
    openModal.addEventListener('click', this.showModal.bind(this));
  }

  var signOut = document.getElementById('my-gfw-sign-out');
  if (signOut !== null) {
    signOut.onclick = this.signOut;
  }
};

})(window.GFW.NavBar);
