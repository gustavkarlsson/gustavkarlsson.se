'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer');
var gulpif = require('gulp-if');
var nib = require('nib');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var entries = config.entries;
  var dest = path.join(taskTarget, dirs.styles.replace(/^_/, ''));

  // Stylus compilation
  gulp.task('stylus', function() {
    gulp.src(path.join(dirs.source, dirs.styles, entries.css))
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.stylus({
        use: nib(),
        compress: true,
        'include css': true
      }))
      .pipe(plugins.postcss([autoprefixer({browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']})]))
      .pipe(plugins.rename(function(filepath) {
        // Remove 'source' directory as well as prefixed folder underscores
        // Ex: 'src/_styles' --> '/styles'
        filepath.dirname = filepath.dirname.replace(dirs.source, '').replace('_', '');
      }))
      .pipe(gulpif(args.production, plugins.minifyCss({rebase: false})))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream());
  });
};