window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

gfw.myGFW = gfw.myGFW || {};

var LoginModal = gfw.myGFW.LoginModal = function() {
  this.$el = $('<div>');
  this.render();
};

LoginModal.prototype.render = function() {
  var template = $('#my-gfw-menu-modal-template').html();
  this.$el.html(template);
  this.delegateEvents();

  return this;
};

LoginModal.prototype.delegateEvents = function() {
  this.$el.on('click', '#my-gfw-modal-close', this.close.bind(this));
};

LoginModal.prototype.close = function() {
  this.$el.remove();
};

})(window.GFW.NavBar);
