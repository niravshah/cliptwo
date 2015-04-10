var fs = require('fs');
var grunt = require('grunt');

var file_name = 'ng-embedly';
var header = fs.readFileSync('./banner.txt', 'utf-8');
var header_height = header.split('\n').length

grunt.initConfig({
    concat : {
        options : {
            banner : header + '\n',
            process : function(src) {
                return src.split('\n').splice(header_height).join('\n');
            }
        },
        dist : {
            src : [
                'src/app.js',
                'src/services/ngEmbedlyService.js',
                'src/directives/ngEmbedly.js'
            ],
            dest : './' + file_name + '.js'
       }
    }
});

grunt.loadNpmTasks('grunt-contrib-concat');

grunt.registerTask('default', ['concat'])