var webpackConfig = require('./webpack.config');
module.exports = function(config) {
    var settings = {
        basePath: '',
        frameworks: ['jasmine'],

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        autoWatchBatchDelay: 300,

        files: [
            {pattern: './tests/**/*.spec.ts', watched: false},
        ],
        preprocessors: {
            './tests/**/*.spec.ts': ['webpack'],
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        webpackMiddleware: { noInfo: true },

        specReporter: {
            maxLogLines: 5, // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false, // do not print information about failed tests
            suppressPassed: false, // do not print information about passed tests
            suppressSkipped: true, // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        }
    };

    settings.reporters = ['spec']; // Add spec reporter for local testing
    settings.browsers = ['Chrome'];
    settings.singleRun = false;
    settings.concurrency = Infinity;

    config.set(settings);
};