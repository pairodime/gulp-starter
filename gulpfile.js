//get gulp node package
var gulp 			   = require('gulp'),
	uglify 			   = require('gulp-uglify'),
	uglifycss 	 	 = require('gulp-uglifycss'),
	autoprefixer 	 = require('gulp-autoprefixer'),
	sass 			     = require('gulp-sass'),
	sourcemaps		 = require('gulp-sourcemaps'),
	imagemin 		   = require('gulp-imagemin'),
	pngquant 		   = require('imagemin-pngquant'),
  livereload     = require('gulp-livereload');


gulp.task('js', function() {
  	return gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('js/min'));
});


// Changes to Javascript files- DO SOMETHING
gulp.task('js-watch', function() {
    return gulp.src('js/*.js')
    // Livereload
    .pipe(livereload());
});

gulp.task('php-watch', function() {
    return gulp.src('*.php')
    // Livereload
    .pipe(livereload());
});


gulp.task('css', function () {
  	gulp.src('css/style.css')
	.pipe(uglifycss())
	.pipe(gulp.dest('css/min'));
});

gulp.task('prefix', function () {
    return gulp.src('css/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'));
});

gulp.task('sass', function () {
  gulp.src('css/scss/*.scss')
    // Sourcemaps for Chrome Browser Debuging
    .pipe(sourcemaps.init())
    .pipe(sass({
    	// Quick relative paths for extra Sass libraries
      includePaths: require('node-normalize-scss').with('node_modules/breakpoint-sass/stylesheets', 'node_modules/susy/sass')
     }))
    // Compile Sass into CSS with Gulp LibSass
    .pipe(sass().on('error', sass.logError))
    // Make it easy to read
    .pipe(sass({outputStyle: 'expanded'}))
    // Add Vendor Prefizxes for CSS3 styles
    .pipe(autoprefixer())
    // Writes sourcemaps into the CSS file
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('css'))
    // Livereload
    .pipe(livereload());
});

gulp.task('images', function () {
    return gulp.src('images/raw/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images'));
});

//set default task
gulp.task('default', function(){

});

// Auto Watch
gulp.task('watch', ['sass', 'images', 'js-watch', 'php-watch'], function () {
   livereload.listen();
   gulp.watch('css/scss/*.scss', ['sass']);
   gulp.watch('js/*.js', ['js-watch']);
   gulp.watch('*.php', ['php-watch']);
   gulp.watch('images/raw/*', ['images']);
});

