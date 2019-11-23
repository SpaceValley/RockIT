'use strict';

var gulp = require('gulp');


var replace = require('gulp-replace');
 
gulp.task('url', async function(){
  gulp.src(['src/utils/**'])
    // See http://mdn.io/string.replace#Specifying_a_string_as_a_parameter
    //.pipe(replace('http://softdeal.beget.tech/api', 'http://crm-backend/api'))		// local
    .pipe(replace('http://rockit2019.beget.tech/api', 'http://crm-backend/api'))		// local 2
    //.pipe(replace('http://crm-backend/api', 'http://softdeal.beget.tech/api'))		// test
    //.pipe(replace('http://crm-backend/api', 'http://rockit2019.beget.tech/api'))		// prod
    //.pipe(replace('http://softdeal.beget.tech/api', 'http://rockit2019.beget.tech/api'))// prod 2
    //.pipe(gulp.dest('build/'));
    .pipe(gulp.dest('src/utils/'));
});



