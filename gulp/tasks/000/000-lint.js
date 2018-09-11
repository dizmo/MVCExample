let pkg = require('../../package.js'),
    extend = require('xtend');
let gulp = require('gulp'),
    gulp_eslint = require('gulp-eslint');

gulp.task('lint:js', function (done) {
    let lint = true;
    if (pkg.dizmo && pkg.dizmo.build) {
        let cfg_lint = pkg.dizmo.build.lint;
        if (cfg_lint || cfg_lint === undefined) {
            lint = extend({}, cfg_lint);
        } else {
            lint = false;
        }
    }

    let argv = require('yargs')
        .default('lint', lint).argv;
    if (typeof argv.lint === 'string') {
        argv.lint = JSON.parse(argv.lint);
    }

    if (argv.lint || argv.lint === undefined) {
        let stream = [gulp.src([
            './src/**/*.js', '!src/lib/**', '!build/**', '!node_modules/**'
        ])];
        stream.push(gulp_eslint.apply(
            this, [extend({}, argv.lint)]
        ));
        stream.push(
            gulp_eslint.format()
        );
        require('pump')(stream, done);
    } else {
        done();
    }
});

gulp.task('lint', ['lint:js']);
