var webpackConfig = require('./webpack.config');
module.exports = function(config) {
    var settings = {
        basePath: '',
        frameworks: ['jasmine'],
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

        reporters: ['mocha'],
        browsers: ['Chrome'],
        singleRun: false,
        concurrency:  Infinity,
        mime: {
            'text/x-typescript': ['ts','tsx']
        }
    };
    config.set(settings);
};