const del 			= require('del');
const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const rigger 		= require('gulp-rigger');
const concat 		= require('gulp-concat');
const uglify 		= require('gulp-uglify');
const cleanCSS 		= require('gulp-clean-css');
const autoprefixer 	= require('gulp-autoprefixer');
const browserSync 	= require('browser-sync').create();

const jsFiles = [
	'./src/js/jquery-3.3.1.slim.min.js',
	'./src/js/bootstrap-colorpicker.min.js',
	'./src/js/popper.min.js',
	'./src/js/bootstrap.min.js',
	'./src/js/scripts.js',
];

function styles() {
	return gulp.src('./src/scss/*.scss')
			   .pipe(sass().on('error', sass.logError))
			   .pipe(concat('styles.css'))
			   .pipe(autoprefixer({
					browsers: ['> 0.1%'],
					cascade: false
			   }))
			   .pipe(cleanCSS({
			   		level: 2
			   }))
			   .pipe(gulp.dest('./build/css/'))
			   .pipe(browserSync.stream());
}

function scripts() {
	return gulp.src(jsFiles)
			   .pipe(concat('scripts.js'))
			   .pipe(uglify({
			   		toplevel: true
			   }))
			   .pipe(gulp.dest('./build/js/'))
			   .pipe(browserSync.stream());
}

function html() {
	return gulp.src('./src/html/*.html')
			   .pipe(rigger())
			   .pipe(gulp.dest('./build/'))
			   .pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
        server: {
            baseDir: './build/'
        },
        // tunnel: true
    });

	gulp.watch('./src/html/**/*.html', html);
	gulp.watch('./src/scss/**/*.scss', styles);
	gulp.watch('./src/js/**/*.js', scripts);
}

function clean() {
	return del(['build/*']);
}

function movieFiles() {
	gulp.src('./src/webfonts/**/*')
		.pipe(gulp.dest('./build/webfonts'));
	return gulp.src('./src/img/**/*')
			   .pipe(gulp.dest('./build/img'));
}

gulp.task('movieFiles', movieFiles);
gulp.task('html', html);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean,
					   		gulp.parallel(styles, scripts, html, movieFiles)
					   	));
gulp.task('dev', gulp.series('build', 'watch'));