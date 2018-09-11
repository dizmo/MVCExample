let pkg = require('../../package.js');
let gulp = require('gulp'),
    gulp_ver = require('gulp-ver'),
    gulp_zip = require('gulp-zip');

gulp.task('process-dzm', function (done) {
    require('pump')([
        gulp.src(['build/**/*'], {base: 'build'}),
        gulp_zip('{0}.dzm'.replace('{0}', pkg.name)),
        gulp_ver(),
        gulp.dest('build')
    ], done);
});
