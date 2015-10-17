module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
            configFiles: {
                files: ['Gruntfile.js', 'config/*.js'],
                options: {
                    reload: true
                }
            },
            html: {
                files: ['**/*.html'],
                options: {
                    reload: true
                }
            },
            css: {
                files: '**/*.css',
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            }
        },
        sass: {
            dist: {
                files: {
                    'index.css': 'index.scss'
                }
            }
        },
        jshint: {
            all: {
                src: ['*.js'],
            },
        },
        express: {
            options: {
                spawn: false
            },
            dev: {
                options: {
                    script: '/home/dylan/Desktop/javascript/my_web/app/server.js'
                }
            },
            prod: {
                options: {
                    script: '/home/dylan/Desktop/javascript/my_web/app/server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: '/home/dylan/Desktop/javascript/my_web/app/server.js'
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:3000/index.html'
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:8080/index.html'
                    },
                    base: [
                        './'
                    ]
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['express', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    // Default task(s).
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.registerTask('default', ['jshint',  'connect', 'watch']);

};
