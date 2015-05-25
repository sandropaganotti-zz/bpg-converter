module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        
        watch: {
            files: ['app/js/*.js'],
            tasks: ['uglify']
        },
        
        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    compress: false,
                    mangle: false
                },
                files: {
                    'app/dist/bpg-converter.js' : [
                        'app/js/bpgdec.js',
                        'app/js/bpg.js',
                        'app/js/topng.js',
                        'app/js/converter.js',
                        'app/js/bpg-converter.js'
                    ]
                }
            }
        }
    
    });

    grunt.registerTask('default', ['watch']);
};