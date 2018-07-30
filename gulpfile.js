let gulp = require('gulp')
  , pug = require('gulp-pug')
  , stylus = require('gulp-stylus')
  , sourcemaps = require('gulp-sourcemaps')
  , connect = require('gulp-connect')
  ;


gulp.task('connect', () => {
  connect.server({
    port: 1337,
    livereload: 'on',
    root: './dist'
  })
});

gulp.task('pug', () => {
  gulp.src('app/**/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

gulp.task('stylus', () => {
  gulp.src('app/styl/**/*.styl')
  .pipe(sourcemaps.init()) 
  .pipe(stylus({
    compress: true // config for stylus
  }))
  .pipe(sourcemaps.write('./maps')) // folder for *.map files
  .pipe(gulp.dest('dist/css'))
  .pipe(connect.reload());
});



gulp.task('watch', () => {
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/styl/**/*.styl', ['stylus'])
});

gulp.task('default', ['pug', 'connect', 'stylus', 'watch']);