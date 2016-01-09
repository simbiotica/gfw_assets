window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

gfw.myGFW = gfw.myGFW || {};

var LoginButton = gfw.myGFW.LoginButton = function(options) {
  this.$el = options.$el || $('<div>');
  this.checkStatus();
};

LoginButton.prototype.render = function() {
  var template;
  if (this.loggedIn === true) {
    template = $('#my-gfw-menu-loggedin-template').html();
  } else {
    template = $('#my-gfw-menu-loggedout-template').html();
  }

  this.$el.html(template);
  this.delegateEvents();

  return this;
};

LoginButton.prototype.checkStatus = function() {
  var context = this;
  gfw.myGFW.User.isLoggedIn().then(function() {
    context.loggedIn = true;
  }).fail(function() {
    context.loggedIn = false;
  }).always(function() {
    context.render();
  });
};

LoginButton.prototype.showModal = function() {
  var modalView = new gfw.myGFW.LoginModal();
  this.$el.append(modalView.$el);
};

LoginButton.prototype.signOut = function() {
  document.cookie = "_eauth=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  location.reload();
};

LoginButton.prototype.delegateEvents = function() {
  this.$el.on('click', '#my-gfw-open-modal', this.showModal.bind(this));
  this.$el.on('click', '#my-gfw-sign-out', this.signOut);
};

})(window.GFW.NavBar);
