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
  this.setupLinks();

  return this;
};

LoginModal.prototype.delegateEvents = function() {
  var modalClose = this.el.getElementsByClassName('my-gfw-modal-close')[0];
  if (modalClose !== null) {
    modalClose.onclick = this.close.bind(this);
  }

  var modalBackdrop = this.el.getElementsByClassName('my-gfw-modal-backdrop')[0];
  if (modalBackdrop !== null) {
    modalBackdrop.onclick = this.close.bind(this);
  }
};

LoginModal.prototype.setupLinks = function() {
  var links = document.getElementsByClassName('my-gfw-sign-in');

  var i = 0;
  for (; i < links.length; i++) {
    var link = links[i];
    link.href = gfw.Utils.getAPIHost() + link.getAttribute('href');
  }
};

LoginModal.prototype.close = function() {
  this.el.classList.remove('is-active');
  this.el.innerHTML = '';
};

})(window.GFW.NavBar);
