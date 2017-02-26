var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var zopfli = require('imagemin-zopfli');
var html5Lint = require('gulp-html5-lint');
var htmlmin = require('gulp-htmlmin');
var jshint = require("gulp-jshint");
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

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

gulp.task('lint-js', function() {
	return gulp.src('js/!(vendor)/*.js')
	.pipe(jshint())
  .pipe(jshint.reporter());
});

gulp.task('minify-js', ['lint-js'], function() {
	return gulp.src('js/**/*.js')
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest('build/js'));
});

gulp.task('lint-html', function() {
	return gulp.src('js/!(vendor)/*.html')
	.pipe(html5Lint());
});

gulp.task('minify-html', ['lint-html'], function() {
	return gulp.src('js/**/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build/js'));
});

gulp.task('minify-css', function() {
  return gulp.src('styles/**/*.css')
  .pipe(cleanCSS())
  .pipe(gulp.dest('build/styles'));
});

gulp.task('build', [
	'minify-css',
	'copy-images',
	'copy-root',
	'lint-html',
	'minify-html',
	'lint-js',
	'minify-js'
	]
	, function() {
  console.log("done building");
});

gulp.task('watch', function(){
  gulp.watch([
    'CNAME',
    'humans.txt',
    'LICENSE',
    'README.md',
    'robots.txt'
  ], ['copy-root']);
	gulp.watch('styles/**/*.css', ['minify-css']);
	gulp.watch('js/**/*.{html,js}', [
		'lint-html',
		'minify-html',
		'lint-js',
		'minify-js'
	]);
	console.warn('Images are not watched.');
});
