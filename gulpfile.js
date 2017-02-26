var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var zopfli = require('imagemin-zopfli');

gulp.task('default', function() {
  print("nothing yet")
});

//In-place zopfli task. Probably infrequently run.
gulp.task('zopfli', function() {
	return gulp.src('img/**/*.{png,jpg}')
		.pipe(imagemin({
			use: [zopfli()]
		}))
		.pipe(gulp.dest('img'));
});
