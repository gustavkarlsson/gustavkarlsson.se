/*eslint no-process-exit:0 */

'use strict';

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;

  gulp.task('fonts', function(){
    gulp.src(['./node_modules/fa-stylus/fonts/**/*.*'])
    .pipe(gulp.dest(dirs.destination + '/fonts'));
  });
};
