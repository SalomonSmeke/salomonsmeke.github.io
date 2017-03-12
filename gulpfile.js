"use strict";
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var zopfli = require('imagemin-zopfli');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');

/* build-dev:
		* Build task for development.
*/
gulp.task('build-dev',
	['copy-root', 'copy-images', 'copy-vendor', 'copy-styles', 'compile-source'],
	() => { console.log('Built for development.'); }
);

/* build-deploy:
		* Build task for deployment.
*/
gulp.task('build-deploy',
	[
		'produce-root',
		'produce-images',
		'copy-vendor',
		'produce-styles',
		'produce-source'
	],
	() => { console.log('Built for deployment.'); }
);

/* copy-root:
		* Root copy task.
*/
gulp.task('copy-root', () => {
	gulp.src([
    'robots.txt',
    'README.md',
    'LICENSE',
		'index.html',
    'humans.txt',
		'CNAME',
		'.gitignore'
  ]).pipe(gulp.dest('build/'));
	console.log('Copied root files.');
});

/* produce-root:
		* Root production task.
*/
gulp.task('produce-root', () => {
	gulp.src([
    'robots.txt',
    'README.md',
    'LICENSE',
    'humans.txt',
		'CNAME',
		'.gitignore'
  ]).pipe(gulp.dest('build/'));
	gulp.src('index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('build/'));
	console.log('Produced root files.');
});

/* copy-images:
		* Root copy task.
*/
gulp.task('copy-images', () => {
  return gulp.src('img/**/*.{png,jpg}')
  .pipe(gulp.dest('build/img/'));
});

/* produce-images:
		* Image optimization task.
*/
gulp.task('produce-images', () => {
	return gulp.src('img/**/*.{png,jpg}')
		.pipe(imagemin({
			use: [zopfli()]
		}))
		.pipe(gulp.dest('build/img/'));
});

/* copy-vendor:
		* Vendor copy task.
*/
gulp.task('copy-vendor', () => {
  return gulp.src('js/vendor/**/*.js')
  .pipe(gulp.dest('build/js/vendor/'));
});

/* copy-styles:
		* CSS copy task.
*/
gulp.task('copy-styles', () => {
  return gulp.src('styles/**/*.css')
  .pipe(gulp.dest('build/styles/'));
});

/* produce-styles:
		* CSS production task.
*/
gulp.task('produce-styles', () => {
  return gulp.src('styles/**/*.css')
	.pipe(cleanCSS())
  .pipe(gulp.dest('build/styles/'));
});

/* compile-source:
		* Source compilation task.
*/
gulp.task('compile-source', () => {
  browserify('js/main.js')
	.transform(babel.configure({
        presets : ["es2015"]
    })
	)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('build/js'));
	return gulp.src('js/plugins.js')
	.pipe(gulp.dest('build/js'));
});

/* produce-source:
		* Source production task.
*/
gulp.task('produce-source', () => {
  browserify('js/main.js')
	.transform(babel.configure({
        presets : ["es2015"]
    })
	)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
	return gulp.src('js/plugins.js')
	.pipe(buffer())
	.pipe(gulp.dest('build/js'));
});

gulp.task('default', ['build-dev'], () => {
	//gulp.watch('!build/**', ['build-dev']);
	console.log('Watch nonfunctional. Blob goofy.');
});
