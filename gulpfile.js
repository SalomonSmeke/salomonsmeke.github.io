var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var zopfli = require('imagemin-zopfli');

//In-place zopfli task. Probably infrequently run.
gulp.task('zopfli', function() {
	return gulp.src('img/**/*.{png,jpg}')
		.pipe(imagemin({
			use: [zopfli()]
		}))
		.pipe(gulp.dest('img/'));
});

gulp.task('default', ['build', 'watch']);

gulp.task('copy-images', function() {
  return gulp.src('img/**/*.{png,jpg}')
  .pipe(gulp.dest('build/img/'));
});

gulp.task('copy-root', function() {
  return gulp.src([
    'CNAME',
    'humans.txt',
    'LICENSE',
    'README.md',
    'robots.txt'
  ]).pipe(gulp.dest('build/'));
});

gulp.task('minify-css', function() {
  return gulp.src('styles/**/*.css')
  .pipe(cleanCSS())
  .pipe(gulp.dest('build/styles'));
});

gulp.task('build', ['minify-css', 'copy-images', 'copy-root'], function() {
  console.log("done building");
});

gulp.task('watch', function(){
  gulp.watch(['index.html', 'styles/**/*.css', 'js/**.*.{html,js}'], ['build']);
});
