/* ------------------------------------------------------------------------------
 *
 *  # Gulp file
 *
 *  Gulp tasks for Limitless template
 *
 *  Includes following tasks:
 *  # style - compiles SCSS files. Depends on variables defined below
 *  # watch - watches for changes in all SCSS files and automatically recompiles them
 *  # default - runs default set of tasks. Configurable by user
 *
 * ---------------------------------------------------------------------------- */


// Configuration
// ------------------------------
var paths = {
    styles: {
        src: "app/scss/**/*.scss",
        dest: "app/assets/css"
    },
    pugTemplate: {
        src: "app/pug/**/*.pug",
        dest: "app/build"
    }
};


// Define plugins
var gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    sass = require("gulp-sass"),
    rename = require('gulp-rename'),
    changed = require('gulp-changed');
    cssnano = require("cssnano"),
    npmDist = require('gulp-npm-dist');
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();


// Setup tasks
// ------------------------------


//
// SCSS compilation
//

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(changed(paths.styles.dest))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        // .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}


//
// Watch files for changes
//

// Listen for changes in all SCSS files and automatically re-compile

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app",
            injectChanges: true
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch("app/*.html").on('change', browserSync.reload);
}


//
// Default task
//

exports.watch = watch
exports.style = style;

var build = gulp.parallel(style, watch);
gulp.task('default', build);