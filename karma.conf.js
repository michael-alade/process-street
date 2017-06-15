// Karma configuration
// Generated on Wed Jun 14 2017 21:51:45 GMT+0100 (WAT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './js/jquery.min.js',
      './js/angular.js',
      // './public/index.html',
      './public/wistia-upload.html',
      './node_modules/angular-mocks/angular-mocks.js',
      './js/blueimp/jquery.ui.widget.js',
      './js/blueimp/jquery.fileupload.js',
      './js/blueimp/jquery.fileupload-process.js',
      './js/blueimp/jquery.fileupload-validate.js',
      './js/blueimp/jquery.fileupload-angular.js',
      './js/app.js',
      './spec/*.spec.js',
    ],
    exclude: [
    ],
    preprocessors: {
      './public/wistia-upload.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      cacheIdFromPath: function(filepath) {
        return filepath.replace('public/', '');
      },
      moduleName: 'wistia-upload.html'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
