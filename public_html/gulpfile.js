/**
 * Base Paths
 * Store where each of our component areas sit
 *
 */
var base_paths = {
	src: './'
};


/**
 * Asset Paths
 * Store the location of each of our assets
 *
 */
var paths = {
	styles: {
		src: base_paths.src + 'scss/',
		dest: base_paths.src + 'css/'
	},
    scripts: {
        src: base_paths.src + 'js/',
        dest: base_paths.src + 'js/'
    }
};


/**
 * App Files
 * Tell Gulp where to look for our core app files
 *
 */
var app_files = {
    styles: paths.styles.src + '**/*.scss',
    scripts: [
        paths.scripts.src + 'angular/*.js',
        paths.scripts.src + 'controllers/*.js',
        paths.scripts.src + 'directives/*.js',
        paths.scripts.src + 'helpers/*.js',
        paths.scripts.src + 'services/*.js',
        paths.scripts.src + 'vendor/*.js',
    ]
};


/**
 * Vendor Files
 * Allow Gulp to store a collection of vendor file scripts
 *
 */
var vendor_files = {
    styles: '',
    scripts: [ 'node_modules/underscore/underscore.js' ]
};


/**
 * Core Modules
 * Include some core files needed to include further modules
 * Require Gulp, Event Streaming and GUtil
 * Then use Gulp Load Plugins to cycle our package.json and load modules
 */
var gulp = require('gulp'),
	es = require('event-stream'),
	gutil = require('gulp-util'),
	del = require('del'),
	sequence = require('run-sequence'),
    replace = require('gulp-replace'),
	plugins = require("gulp-load-plugins")({
    	pattern: ['gulp-*', 'gulp.*'],
    	replaceString: /\bgulp[\-.]/
	});


/**
 * function change_event
 * Our event handler for our Event Stream output pipe
 *
 * @param object evt
 */
var change_event = function( evt ) {
    gutil.log('File', gutil.colors.cyan( evt.path.replace(new RegExp('/.*(?=/' + base_paths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};


/**
 * Task css
 * Handles CSS file manipulation and outputting to dist
 *
 */
gulp.task('css', function( ) {
	// Collate our SASS files
    var sass_files = gulp.src( paths.styles.src + '**/*.scss' )
    	.pipe( plugins.order([
  			"core.scss",
  			"**/*"
		]))
    	.pipe( plugins.sass({
        	errLogToConsole: true
    	}))
    	.on('error', function( err ) {
        	new gutil.PluginError('CSS', err, {
        		showStack: true
        	});
    	});

    return es.concat( gulp.src( vendor_files.styles ), sass_files )
        .pipe( plugins.concat( 'main.css' ) )
        .pipe( replace( '/*!', '/*' ) )
        //.pipe( plugins.cssmin( ) )
        .pipe( plugins.size( ) )
        .pipe( gulp.dest( paths.styles.dest ) );
});


/**
 * Task watch
 * Watches our CSS and JS file paths for changes and outputs build comments
 *
 */
gulp.task('watch', ['css'], function( ) {
	// Watch our SASS file base
    gulp.watch( app_files.styles, ['css'] ).on( 'change', function( evt ) {
    	// Log changes to the command line
        change_event( evt );
    });

    // Watch our JS file base
    gulp.watch( paths.scripts.src + '**/*.js', ['scripts'] ).on( 'change', function( evt ) {
        // Log changes to the command line
        change_event( evt );
    });
});

/**
 * Task scripts
 * Handles JS file manipulation and outputting to dist
 *
 */
gulp.task('scripts', function( ) {
    return gulp.src( vendor_files.scripts.concat( app_files.scripts ) )
        .pipe( plugins.concat( 'main.js' ) )
        .pipe( gulp.dest( paths.scripts.dest ) )
        .pipe( plugins.size( ) )
        .pipe( gulp.dest( paths.scripts.dest ) );
});


/**
 * Task default
 * Our default Gulp build task which defers to our CSS and JS tasks
 *
 */
gulp.task('default', function( cb ) {
	sequence( 'css', 'scripts', 'watch' );
});