module.exports = {
  options: {
    livereload: true,
  },
  scripts: {
    files: ['js/**/*.js', '!js/build/**/*.js'],
    tasks: ['concat'],
    options: {
      spawn: false,
    }
  },
  css: {
    files: ['css/*.scss', 'css/modules/*.scss'],
    tasks: ['sass', 'autoprefixer', 'cssmin'],
    options: {
      spawn: false,
    }
  },
  images: {
    files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
    tasks: ['sprite:all'],
    options: {
      spawn: false,
    }
  },
  html:{
    files: ['./**/*.html'],
    tasks: [],
    options: {
      spawn: false
    }
  }
};
