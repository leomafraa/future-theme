var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var cssimport = require('gulp-cssimport');
var gulpShopify = require('gulp-shopify-upload');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var jsoncombine = require('gulp-jsoncombine');
var postcss = require('gulp-postcss');
var pxtorem = require('postcss-pxtorem');

// Autoprefix CSS
gulp.task('autoprefixer', function() {
  var evaluateFile = function(file) {
    return file.path.indexOf('_variables.scss') === -1 && file.path.indexOf('_avalanche.scss') === -1;
  };

  var processors = [
    pxtorem({
      replace: false,
      root_value: 18,
      prop_white_list: ['font', 'font-size'],
      selector_black_list: ['html']
    })
  ];

  return gulp.src('scss/**/*.*')
    .pipe(gulpif(evaluateFile, autoprefixer({
      browsers: ['last 3 versions', 'ie 9', 'ie 10', 'ie 11'],
      cascade: false
    })))
    .pipe(gulpif(evaluateFile, postcss(processors)))
    .pipe(gulp.dest('tmp/scss/'));
});

// Upload CSS
gulp.task('scss', function() {
  return gulp.src('tmp/scss/theme.scss.liquid')
    .pipe(cssimport())
    .pipe(gulp.dest('dist/assets/'));
});

// Concat vendor JS
gulp.task('vendorJs', function() {
  return gulp.src('js/vendor/*.js')
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/'));
});

// Concat custom JS
gulp.task('customJs', function() {
  return gulp.src(['js/custom/*.js', 'js/routes.js', 'js/routes/*.js'])
    .pipe(concat('script.js.liquid'))
    .pipe(gulp.dest('dist/assets/'));
});

// Concat config
gulp.task('config', function() {
  return gulp.src('config/*.json')
    .pipe(jsoncombine('settings_schema.json', function(data) {
      return new Buffer(JSON.stringify(Object.keys(data).map(function (key) {return data[key]}), false, 2));
    }))
    .pipe(gulp.dest('dist/config'));
});

// Upload to Shopify
gulp.task('shopify', function() {
  return watch('./dist/+(assets|layout|config|snippets|templates|locales|sections)/**')
    .pipe(gulpShopify('91db63c227b317e33ba2a7e478bd840b', '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', 'leonardo-future.myshopify.com', 121025396888, {
      basePath: 'dist/'
    }));
});

// Watch files
gulp.task('watch', function() {
  gulp.watch('js/vendor/*.js', ['vendorJs']);
  gulp.watch(['js/custom/*.js', 'js/routes.js', 'js/routes/*.js'], ['customJs']);
  gulp.watch('scss/**/*.*', ['autoprefixer']);
  gulp.watch('config/*.json', ['config']);
  gulp.watch('tmp/scss/**/*.*', ['scss']);
});

// Default Task
gulp.task('default', ['autoprefixer', 'scss', 'vendorJs', 'customJs', 'config', 'shopify', 'watch']);