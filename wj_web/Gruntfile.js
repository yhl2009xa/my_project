/**
 * Created by Administrator on 2016/11/7.
 */
module.exports = function(grunt) {

        grunt.initConfig({
            pkg:grunt.file.readJSON('package.json'),//读取项目配置信息存入pkg文件中
            less:{
                dev: {
                    options: {
                        // strictMath: true,
                        // sourceMap: true,
                        // outputSourceFiles: true,
                    },
                    // src: 'less/index.less',
                    // dest: 'less/index.css',
                    files: {
                        // "less/index.css": "less/index.less",
                        "app/index.css": "app/less/index.less",
                    }
                }
            },

            autoprefixer: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9']
                },
                pro: {
                    src: ['less/index.css']
                }
            },
            //清空文件夹
            // clean:{
            //     dist:'dist'
            // },
            watch: {
                less: {
                    files: ['**/*.less'],
                    tasks: [ 'less', 'autoprefixer']
                },
                // scripts: {
                //     files: ['**/*.js'],
                // },
            },

            paths: {
                tmp: '.tmp',
                dist: 'dist'
            },

            copy:{
                image:{
                    expand:true,
                    cwd:'src/images/',
                    src:'**/*.*',
                    dest:'dist/images/'
                }
            },

        })



    require('load-grunt-tasks')(grunt,{ scope: 'devDependencies' });


    grunt.registerTask('default', [
        'less',
        'autoprefixer',
        'watch'
    ]);
}
