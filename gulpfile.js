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
	[
		'copy-root',
		'copy-images',
		'copy-vendor',
		'copy-styles',
		'compile-source'
	],
	() => {
		console.log('Built for development.');
		return 0;
	}
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
	() => {
		console.log('Built for deployment.');
		return 0;
	}
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
	return 0;
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
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(gulp.dest('build/'));
	console.log('Produced root files.');
	return 0;
});

/* copy-images:
		* Root copy task.
*/
gulp.task('copy-images', () => {
  gulp.src('img/**/*.{png,jpg}')
  .pipe(gulp.dest('build/img/'));
	console.log('Images copied.');
	return 0;
});

/* produce-images:
		* Image optimization task.
*/
gulp.task('produce-images', () => {
	gulp.src('img/**/*.{png,jpg}')
	.pipe(imagemin({
		use: [zopfli()]
	}))
	.pipe(gulp.dest('build/img/'));
	console.log('Images compressed.');
	return 0;
});

/* copy-vendor:
		* Vendor copy task.
*/
gulp.task('copy-vendor', () => {
  gulp.src('js/vendor/**/*.js')
  .pipe(gulp.dest('build/js/vendor/'));
	console.log('Vendor js copied.');
	return 0;
});

/* copy-styles:
		* CSS copy task.
*/
gulp.task('copy-styles', () => {
  gulp.src('styles/**/*.css')
  .pipe(gulp.dest('build/styles/'));
	console.log('CSS copied.');
	return 0;
});

/* produce-styles:
		* CSS production task.
*/
gulp.task('produce-styles', () => {
  gulp.src('styles/**/*.css')
	.pipe(cleanCSS())
  .pipe(gulp.dest('build/styles/'));
	console.log('CSS composed.');
	return 0;
});

/* compile-source:
		* Source compilation task.
*/
gulp.task('compile-source', () => {
  browserify('js/main.js', {debug: true})
	.transform(babel.configure({
      	presets : ["es2015"]
    	})
		)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('build/js'));
	gulp.src('js/plugins.js')
	.pipe(gulp.dest('build/js'));
	console.log('Source compiled.');
	return 0;
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
	gulp.src('js/plugins.js')
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
	console.log('Source composed.');
	return 0;
});

gulp.task('default', ['build-dev'], () => {
	//gulp.watch('!build/**', ['build-dev']);
	console.log('Watch nonfunctional. Blob goofy.');
	return 0;
});
