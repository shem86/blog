module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                expand: true,
                cwd: 'node_modules/twitter-bootstrap-3.0.0/dist',
                src: '**',
                dest: 'public/lib/bootstrap'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['copy']);

};