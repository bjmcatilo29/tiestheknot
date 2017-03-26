var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    del = require('del');

// URI paths for our tasks to use.
    var paths = {
       src: './../src/',
       dest: './../'  
    }

// Image compression
gulp.task('imagemin', function() {
  return  gulp.src(paths.src + 'images/**/*.+(png|jpg|gif|svg)')
       .pipe(imagemin())
       .pipe(gulp.dest(paths.dest + 'images'))
});

// SASS compiler
gulp.task('sass',function(){
  return gulp.src(paths.src + 'sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle:'compressed'
    }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.dest + 'css/'))
});

// Concatenate JS files
gulp.task('concat', function() {
  return gulp.src([
        paths.src + 'js/lib/*.js',
        paths.src + 'js/vendor/*.js',
        paths.src + 'js/custom/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('script.concat.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest + 'js'));
});

// Compress and minify recently concatenated JS files
gulp.task('compress', ['concat'], function (cb) {
  pump([
        gulp.src(paths.dest + 'js/script.concat.js'),
        sourcemaps.init(),
        uglify(),
        rename('script.min.js'),
        sourcemaps.write('./'),
        gulp.dest(paths.dest + 'js')
    ],
    cb
  );
});

// Concatenate JS HEAD files
gulp.task('concat-head', function() {
  return gulp.src([
        paths.src + 'js/head/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('head.concat.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest + 'js'));
});

// Compress and minify recently concatenated JS HEAD files
gulp.task('compress-head', ['concat-head'], function (cb) {
  pump([
        gulp.src(paths.dest + 'js/head.concat.js'),
        sourcemaps.init(),
        uglify(),
        rename('head.min.js'),
        sourcemaps.write('./'),
        gulp.dest(paths.dest + 'js')
    ],
    cb
  );
});

// Watch SASS, JS and images from "src" folWder
gulp.task('watch', function() {
  gulp.watch(paths.src + 'sass/**/*.scss', ['css']);
  gulp.watch([paths.src + 'js/**/*.js'], ['script']);
  gulp.watch(paths.src +  'images/**/*.+(png|jpg|gif|svg)', ['imagemin']);
});

// Copy fonts
gulp.task('fonts', function() {
  return gulp.src(paths.src + 'fonts/**/*')
  .pipe(gulp.dest(paths.dest + 'fonts'))
});

// Delete generated files; css/, js/, images/
gulp.task('clean', function() {
    return del(
      [
        paths.dest + 'css',
        paths.dest + 'js',
        paths.dest + 'images',
        paths.dest + 'fonts'
      ],
      {force: true}
    );
});


// Gulp tasks runners =====================================
gulp.task('default', ['watch']);

gulp.task('css', ['sass']);

gulp.task('script', function(callback) {
  runSequence(['concat', 'concat-head'], ['compress', 'compress-head'], callback);
});

gulp.task('build', function(callback) {
  runSequence('clean', ['sass', 'script', 'imagemin', 'fonts'], callback);
});

// gulp.task('build', function(callback) {
//   runSequence(['sass', 'script', 'imagemin'], callback);
// });
