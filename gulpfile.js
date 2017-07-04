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
const replace = require('gulp-replace');
const header = require('gulp-header');
// const prepack = require('gulp-prepack');

const pages_files = [
  'about',
  'index'
];
const pages_dest = 'build/js/modules/pages';
const img_src = 'img/**/*.{png,jpg}';
const img_dest = 'build/img/';
const vendor_src = 'js/vendor/**/*.js';
const vendor_dest = 'build/js/vendor/';

function browserifyHelper(entry, kwargs, prod) {
  const res = browserify(`${entry}main.js`, kwargs)
  .transform(babelify.configure({
    presets: ['es2015']
  }))
  .bundle()
  .pipe(source('bundle.js'));
  if (prod) {
    res.pipe(buffer())
    .pipe(replace('"use strict";', ''))
    .pipe(header('"use strict";'))
    // I dont know why babelify doesnt default to scoping the whole thing as strict.
    .pipe(uglify())
    .pipe(gulp.dest(`build/${entry}`));
  } else {
    res.pipe(gulp.dest(`build/${entry}`));
  }
}

function directCopy(src, dest, message) {
  gulp.src(src)
  .pipe(gulp.dest(dest));
  if (message) {
    console.log(message);
  }
}

/* build-dev:
  * Build task for development.
*/
gulp.task('build-dev',
  () => {
    [
      [
        ['robots.txt', 'README.md', 'LICENSE', 'index.html', 'humans.txt', 'CNAME', '.gitignore'],
        'build/',
        'Copied root files.'
      ],
      [img_src, img_dest, 'Images copied.'],
      [vendor_src, vendor_dest, 'Vendor js copied.']
    ].forEach(([src, dest, msg]) => directCopy(src, dest, msg));

    browserifyHelper('js/', { debug: true }, false);
    console.log('Source compiled.');

    pages_files.forEach((k) => {
      directCopy(`js/modules/pages/${k}/fill.html`, `${pages_dest}/${k}`);
      browserifyHelper(`js/modules/pages/${k}/`, { debug: true }, false);
    });
    console.log('Pages compiled.');

    gulp.src(['styles/normalize.css', 'styles/global.css'])
    .pipe(concat('bundle.css'))
    .pipe(unCSS({
      html: ['./build/index.html']
    }))
    .pipe(gulp.dest('build/styles/'));
    console.log('CSS copied.');

    console.log('Built for development.');
    return 0;
  }
);

/* build-deploy:
  * Build task for deployment.
*/
gulp.task('build-deploy',
  () => {
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

    gulp.src(img_src)
    .pipe(imagemin({
      use: [zopfli()]
    }))
    .pipe(gulp.dest(img_dest));
    console.log('Images compressed.');

    gulp.src(vendor_src)
    .pipe(uglify())
    .pipe(gulp.dest(vendor_dest));
    console.log('Vendor js produced.');

    browserifyHelper('js/', {}, true);
    console.log('Source produced.');

    pages_files.forEach((k) => {
      gulp.src(`js/modules/pages/${k}/fill.html`)
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(gulp.dest(`${pages_dest}/${k}`));
      browserifyHelper(`js/modules/pages/${k}/`, {}, true);
    });
    console.log('Pages produced.');

    gulp.src(['styles/normalize.css', 'styles/global.css'])
    .pipe(concat('bundle.css'))
    .pipe(unCSS({
      html: ['./build/index.html']
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('build/styles/'));

    console.log('Built for deployment.');
    return 0;
  }
);

gulp.task('default', ['build-dev'], () => {
  // gulp.watch('!build/**', ['build-dev']);
  console.log('Watch nonfunctional. Blob goofy.');
  return 0;
});
