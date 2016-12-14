var webpackConfig = require('../webpack/webpack.test')

module.exports = function (config) {

  config.set({
    basePath: '../',
    files: [
      { pattern: 'test/karma.test-shim.js', watched: false },
    ],
    preprocessors: {
      'test/karma.test-shim.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    reporters: ['progress'],
  });
};