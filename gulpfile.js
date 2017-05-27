const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const zopfli = require('imagemin-zopfli');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const unCSS = require('gulp-uncss');
const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const insert = require('gulp-insert');
// const prepack = require('gulp-prepack');

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
    'produce-vendor',
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

/* produce-vendor:
  * Vendor production task.
*/
gulp.task('produce-vendor', () => {
  gulp.src('js/vendor/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js/vendor/'));
  console.log('Vendor js produced.');
  return 0;
});

/* copy-styles:
  * CSS copy task.
*/
gulp.task('copy-styles',
  [
    'copy-root',
    'compile-source'
  ],
  () => {
    gulp.src(['styles/normalize.css', 'styles/global.css'])
    .pipe(concat('bundle.css'))
    .pipe(unCSS({
      html: ['./build/index.html']
    }))
    .pipe(gulp.dest('build/styles/'));
    console.log('CSS copied.');
    return 0;
  }
);

/* produce-styles:
  * CSS production task.
*/
gulp.task('produce-styles',
  [
    'produce-root',
    'produce-source'
  ],
  () => {
    gulp.src(['styles/normalize.css', 'styles/global.css'])
    .pipe(concat('bundle.css'))
    .pipe(unCSS({
      html: ['./build/index.html']
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('build/styles/'));
    console.log('CSS composed.');
    return 0;
  }
);

/* compile-source:
  * Source compilation task.
*/
gulp.task('compile-source', () => {
  browserify('js/main.js', { debug: true })
  .transform(babelify.configure({
    presets: ['es2015']
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(replace('"use strict";', ''))
  .pipe(insert.prepend('"use strict";\n\n'))
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
  .transform(babelify.configure({
    presets: ['es2015']
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  //  .pipe(prepack()) this does not yet work: 05/27/2017
  .pipe(replace('"use strict";', ''))
  .pipe(insert.prepend('"use strict";'))
  // I dont know why babelify doesnt default to scoping the whole thing as strict.
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
  gulp.src('js/plugins.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
  console.log('Source composed.');
  return 0;
});

gulp.task('default', ['build-dev'], () => {
  // gulp.watch('!build/**', ['build-dev']);
  console.log('Watch nonfunctional. Blob goofy.');
  return 0;
});
