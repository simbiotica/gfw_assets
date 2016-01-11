// https://cdn.rawgit.com/simbiotica/gfw_assets/0612702e5ec4cc8e1cc75c4a4a63c8274f7ea870/js/build/production.js
var feedbackModal = {

  init: function() {
    this._initVars();
    this._setListeners();
    this._setHiddenInputs();
    this._setColors();
  },

  _setListeners: function() {
    this.$body.on('click', '#feedbackLink', this.show.bind(this));

    this.$el.on('click', '.js-modal-close', this.hide.bind(this));
    this.$el.on('click', '.js-btn-continue', this.actionContinue.bind(this));
    this.$el.on('click', '.js-btn-submit', this.actionSubmit.bind(this));
    this.$el.on('click', '.js-btn-close', this.actionClose.bind(this));
    this.$el.on('change','.js-radio-box input', this.changeRequire.bind(this));
  },

  _initVars: function() {

    this.$window =    $(window);
    this.$document =  $(document);
    this.$body =      $('body');
    this.$htmlbody =  $('html, body');
    this.$el =        $('#feedbackModal');
    
    this.$content =        this.$el.find('.modal-content');
    this.$contentWrapper = this.$el.find('.modal-wrapper');
    this.$backdrop =       this.$el.find('.modal-backdrop');
    this.$close =          this.$el.find('.modal-close');
    this.$spinner =        this.$el.find('.modal-spinner');

    this.$modalStep =      this.$el.find('.modal-step');
    this.$modalStepBtn =   this.$el.find('.modal-step-btn');

    this.$form =           this.$el.find('#feedback-form');
    this.$textarea =       this.$el.find('#feedback-textarea');
    this.$email =          this.$el.find('#feedback-email');
    this.$hostname =       this.$el.find('#feedback-hostname');

    this.$dinamicColor =   this.$el.find('.js-dinamic-color')

    this.hidden = true;
    this.mobile = (this.$window.width() > 850) ? false : true;
  },


  _initBindings: function() {
    // this.mobile = (this.$window.width() > 850) ? false : true;
    // this.scrollTop = this.$document.scrollTop();
    // if(this.mobile) {
    //   this.$htmlbody.addClass('active');
    //   this.$htmlbody.animate({ scrollTop: this.scrollTop },0);
    // }
    // document keyup
    this.$document.on('keyup', function(e) {
      if (e.keyCode === 27) {
        this.hide();
      }
    }.bind(this));
    // backdrop
    this.$backdrop.on('click', function() {
      this.hide();
    }.bind(this));
  },

  _stopBindings: function() {
    // if(this.mobile) {
    //   this.$htmlbody.removeClass('active');
    //   this.$htmlbody.animate({ scrollTop: this.scrollTop },0);
    // }
    this.$document.off('keyup');
    this.$backdrop.off('click');
  },

  _toggle: function() {
    (!!this.hidden) ? this._stopBindings() : this._initBindings();
    this.$el.toggleClass('-active', !this.hidden);
    //Prevent scroll beyond modal window.
    this.$htmlbody.toggleClass('-no-scroll', !this.hidden);
  },

  _setColors: function() {
    switch(location.hostname) {
      case 'fires.globalforestwatch.org':
        this.color = 'red';
      break;

      case 'commodities.globalforestwatch.org':
        this.color = 'orange';
      break;

      case 'climate.globalforestwatch.org':
        this.color = 'blue';
      break;

      default: 
        this.color = 'green';
    }

    this.$dinamicColor.each(function(k,v){
      $(v).removeClass('green').addClass(this.color);
    }.bind(this));
  },

  _setHiddenInputs: function() {
    this.$hostname.val(location.hostname);
  },

  hide: function(e) {
    e && e.preventDefault();
    this.hidden = true;
    this._toggle();

    //Give back scroll beyond modal window.
    this.$htmlbody.removeClass('-no-scroll');
    this.changeStep(1);

    return this;
  },

  show: function(e) {
    e && e.preventDefault() && e.stopPropagation();
    this.hidden = false;
    this._toggle();
  },

  // Events inside modal
  actionContinue: function(e) {
    this.changeStep(2);
  },

  actionSubmit: function(e) {
    //Check if any input are filled. Should we use a plugin?
    if (this.$email.hasClass('required')) {
      if (this.validateEmail(this.$email.val())) {
        this.actionSend();
      } else {
        alert('Please enter an email address to continue');
      }
    } else {
      if (!!this.$textarea.val()) {
        this.actionSend();
      } else {
        alert('Please enter feedback, or sign up to be a GFW tester and enter an email address to continue');
      }
    }
  },

  actionClose: function(e) {
    this.hide();
  },

  actionSend: function(){
    this.$spinner.show(0);
    $.ajax({
      url: 'http://gfw-nav.herokuapp.com/feedback_jsonp',
      jsonp: "callback",
      dataType: "jsonp",
      data: this.serializeObject(this.$form.serializeArray()),
      success: function(data) {
        this.changeStep(3);
        this.$spinner.hide(0);
      }.bind(this),

      error: function(data) {
        this.changeStep(4);
        this.$spinner.hide(0);
      }.bind(this)
    });
  },


  // Changes
  changeRequire: function(e) {
    e && e.preventDefault();
    ($(e.currentTarget).val() === 'true') ? this.$email.addClass('required') : this.$email.removeClass('required');
  },

  changeStep: function(step) {
    this.$contentWrapper.animate({scrollTop: 0},0);
    this.$modalStep.removeClass('-active');
    this.$modalStepBtn.removeClass('-active');

    // Set actives
    this.$el.find('.modal-step[data-step="'+step+'"]').addClass('-active');
    this.$el.find('.modal-step-btn[data-step="'+step+'"]').addClass('-active');
  },


  // Helpers
  serializeObject: function(_arr) {
    var o = {};
    var a = _arr;
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  },

  validateEmail: function(email){
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
}