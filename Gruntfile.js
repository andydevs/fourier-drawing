/**
 * Use this template for building basic static websites
 * 
 * Author:  [Your Name Here]
 * Created: [Date of Creation]
 */
const webpackConfig = require('./webpack.config')

// Grunt configuration
module.exports = function configGrunt(grunt) {
    // Initial config
    grunt.initConfig({
        webpack: {
            config: webpackConfig
        },
        watch: {
            webpack: {
                files: [
                    'app/**/*',
                    'assets/**/*',
                    'pages/*'
                ],
                tasks: ['webpack']
            }
        },
        connect: {
            server: {
                options: {
                    base: 'public/',
                    open: true
                }
            }
        }
    })

    // Load npm tasks
    grunt.loadNpmTasks('grunt-webpack')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-connect')

    // Register tasks
    grunt.registerTask('build', ['webpack'])
    grunt.registerTask('serve', ['build', 'connect', 'watch'])
    grunt.registerTask('default', ['build'])
}