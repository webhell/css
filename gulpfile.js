const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const rename = require('gulp-rename');

// create readable css from scss files
function sassTask() {
    return src(['src/index.scss', 'src/**/*.css', '!src/var.scss'])
        .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(dest('build/'))
}
// create minified scss files
function sassMinTask() {
    return src(['src/index.scss', 'src/**/*.css', '!src/var.scss'])
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename(function (path) {
            path.basename += ".min";
            return path;
        }))
        .pipe(dest('build/'))
}
// delete build folder
function cleanTask() {
    return del(['build']);
}

// start development watch scss change
exports.default = exports.dev = series(sassTask, function () {
    watch('src/index.scss', sassTask)
})
exports.clean = cleanTask;
exports.build = series(cleanTask, sassTask, sassMinTask)
