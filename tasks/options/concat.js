module.exports = {
  dist: {
    src: [
      'js/libs/*.js',
      'js/init.js',

      'js/app/urls.js',

      'js/app/my_gfw/User.js',
      'js/app/my_gfw/LoginModal.js',
      'js/app/my_gfw/LoginButton.js',

      'js/app/feedback.js',
      'js/app/menu.js',
      'js/app/menujson.js',

      'js/app/app.js',
      'js/app/loader.js',
    ],
    dest: 'js/build/production.js'
  }
};
