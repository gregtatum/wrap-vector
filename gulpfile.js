var gulp = require('gulp');
var gulpJasmine = require('gulp-jasmine');

gulp.task('test', function () {
	return gulp.src("./spec/**/*.js")
		.pipe(gulpJasmine());
});