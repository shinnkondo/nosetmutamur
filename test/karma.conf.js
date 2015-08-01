module.exports = function(config){
  config.set({

    basePath : '../',
    preprocessors: {
      '**/*.coffee': ['coffee']
    },
    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js')
      }
    },
    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-material/angular-material.js',
      "bower_components/angular-aria/angular-aria.js",
      "bower_components/angular-sanitize/angular-sanitize.js",
      "bower_components/angular-utils-pagination/dirPagination.js",
      'source/javascripts/_include/ui-bootstrap-custom-0.13.0.js',
      'source/javascripts/_app.coffee',
      'test/unit/**/*.js'
    ],

    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome', 'Firefox'],
    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coffee-preprocessor'
            ],
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};