window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

gfw.myGFW = gfw.myGFW || {};

var LoginModal = gfw.myGFW.LoginModal = function(options) {
  this.el = options.el;
  this.render();
};

LoginModal.prototype.render = function() {
  var id = 'my-gfw-menu-modal-template',
      template = document.getElementById(id).innerHTML;

  this.el.innerHTML = template;
  this.el.classList.add('is-active');
  this.delegateEvents();

  return this;
};

LoginModal.prototype.delegateEvents = function() {
  var modalClose = this.el.getElementsByClassName('modal-close')[0];
  if (modalClose !== null) {
    modalClose.onclick = this.close.bind(this);
  }
};

LoginModal.prototype.close = function() {
  this.el.classList.remove('is-active');
  this.el.innerHTML = '';
};

})(window.GFW.NavBar);
